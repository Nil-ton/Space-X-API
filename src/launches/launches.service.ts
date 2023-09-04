import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLaunchDto } from './dto/create-launch.dto';
import { UpdateLaunchDto } from './dto/update-launch.dto';
import { LaunchEntity } from './launch.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SendLaunchDTO } from './dto/send-launch.dto';
import { PaginatedResponseDto } from './dto/pagination.dto';

@Injectable()
export class LaunchesService {
    private colorMapping: { [key: string]: string };
    constructor(
        @InjectRepository(LaunchEntity)
        private readonly launchRepository: Repository<LaunchEntity>,
    ) {
        this.colorMapping = {};
    }
    async create(createLaunchDto: SendLaunchDTO) {
        const launcheCreated =
            await this.launchRepository.save(createLaunchDto);
        return launcheCreated;
    }

    async findAll() {
        const launches = await this.launchRepository.find({
            order: { date_utc: 'DESC' },
        });

        return launches;
    }

    getRandomColor(): string {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r},${g},${b})`;
    }

    private getColorForRocketName(rocketName: string): string {
        if (!this.colorMapping[rocketName]) {
            this.colorMapping[rocketName] = this.getRandomColor();
        }
        return this.colorMapping[rocketName];
    }

    async findStatsBar() {
        const launches = await this.launchRepository.find({
            order: { date_utc: 'DESC' },
        });

        const yearCounts: { [key: string]: number } = {};
        const rocketColors: { [key: string]: string } = {};
        const rocketCounts: { [key: string]: { [key: string]: number } } = {};

        launches.forEach((item) => {
            const year = new Date(item.date_utc).getFullYear().toString();
            const rocketName = item.rocket.name;

            if (!yearCounts[year]) {
                yearCounts[year] = 1;
            } else {
                yearCounts[year]++;
            }

            if (!rocketColors[rocketName]) {
                rocketColors[rocketName] =
                    this.getColorForRocketName(rocketName);
            }

            if (!rocketCounts[rocketName]) {
                rocketCounts[rocketName] = {};
            }

            if (!rocketCounts[rocketName][year]) {
                rocketCounts[rocketName][year] = 1;
            } else {
                rocketCounts[rocketName][year]++;
            }
        });

        const labels = Object.keys(yearCounts).sort();
        const datasets = [];

        for (const rocketName of Object.keys(rocketColors)) {
            const data = labels.map((year) => {
                return rocketCounts[rocketName][year] || 0;
            });

            const backgroundColor = labels.map(() => {
                return rocketColors[rocketName];
            });

            datasets.push({
                label: rocketName,
                data,
                backgroundColor,
            });
        }

        const dataset = {
            labels,
            datasets,
        };

        return dataset;
    }

    async findStatsPie() {
        const launches = await this.launchRepository.find({
            order: { date_utc: 'DESC' },
        });

        const result = launches.reduce((acc, item) => {
            const rocketName = item.rocket.name;

            if (!acc[rocketName]) {
                acc[rocketName] = {
                    name: rocketName,
                    success: 0,
                    fail: 0,
                    color: this.getColorForRocketName(rocketName),
                };
            }

            if (item.success === true) {
                acc[rocketName].success++;
            } else {
                acc[rocketName].fail++;
            }

            return acc;
        }, {});

        const finalResult = Object.values(result);

        return finalResult;
    }

    async findOne(id: string) {
        const launches = await this.launchRepository.findOne({
            where: { _id: id },
        });
        return launches;
    }

    async findSearch(searchOptions?: any): Promise<PaginatedResponseDto> {
        const { limit = 10, page = 1 } = searchOptions;
        const skip = (Number(page) - 1) * Number(limit);

        const where: any = {};

        if (searchOptions) {
            Object.entries(searchOptions).forEach(([key, value]) => {
                if (key === 'limit' || key === 'page') return;
                where[key] = new RegExp(`^${value}`, 'i');
                if (searchOptions.flight_number) {
                    if (isNaN(searchOptions.flight_number))
                        throw new BadRequestException();
                    where.flight_number = Number(searchOptions.flight_number);
                }
                if (searchOptions.success) {
                    where.success =
                        searchOptions.success === 'true' ? true : false;
                } else if (searchOptions.name) {
                    where.name = new RegExp(`^${searchOptions.name}`, 'i');
                } else if (searchOptions._id) {
                    where._id = new RegExp(`^${searchOptions._id}`, 'i');
                } else if (searchOptions.rocket) {
                    where['rocket.name'] = new RegExp(
                        `^${searchOptions.rocket}`,
                        'i',
                    );
                    delete where.rocket;
                }
            });
        }

        const [launches, total] = await this.launchRepository.findAndCount({
            where,
            order: { date_utc: 'DESC' },
            skip,
            take: Number(limit),
        });

        const totalPages = Math.ceil(total / Number(limit));
        const hasNext = Number(page) < totalPages;
        const hasPrev = Number(page) > 1;

        return new PaginatedResponseDto(
            launches,
            total,
            Number(page),
            totalPages,
            hasNext,
            hasPrev,
        );
    }
}
