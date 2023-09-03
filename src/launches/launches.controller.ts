import {
    Controller,
    Get,
    Post,
    BadRequestException,
    Param,
    Query,
} from '@nestjs/common';
import { LaunchesService } from './launches.service';
import { CreateLaunchDto } from './dto/create-launch.dto';
import { SendLaunchDTO } from './dto/send-launch.dto';
import { SendRocketDTO } from './dto/send-rocket.dto';
import { Cron } from '@nestjs/schedule';

@Controller('launches')
export class LaunchesController {
    constructor(private launchesService: LaunchesService) {}

    @Cron('* 9 * * *')
    @Post()
    async create() {
        try {
            const now = new Date();
            const currentHour = now.getHours();

            const latestResponse = await fetch(
                'https://api.spacexdata.com/v5/launches/latest',
            );

            const latestData = await latestResponse.json();

            const rocketResponse = await fetch(
                'https://api.spacexdata.com/v4/rockets/' + latestData.rocket,
            );
            const rocketData = await rocketResponse.json();
            const send = {
                ...latestData,
                rocket: new SendRocketDTO(rocketData),
            };
            const entity = new SendLaunchDTO(send);

            const launcheCretead = await this.launchesService.create(entity);
            return launcheCretead;
        } catch (error) {
            throw new BadRequestException();
        }
    }

    @Get()
    async findAll(@Query() searchOptions: any) {
        try {
            const lanchers =
                await this.launchesService.findSearch(searchOptions);
            return lanchers;
        } catch (error) {
            throw new BadRequestException();
        }
    }

    @Get('/stats/pie')
    async statsPie() {
        try {
            const lanchers = await this.launchesService.findStatsPie();
            return lanchers;
        } catch (error) {
            throw new BadRequestException();
        }
    }
    @Get('/stats/bar')
    async statsBar() {
        try {
            const lanchers = await this.launchesService.findStatsBar();
            return lanchers;
        } catch (error) {
            throw new BadRequestException();
        }
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.launchesService.findOne(id);
    }

    @Post('/start-repository')
    async startRepository() {
        const lanchers = await this.launchesService.findAll();

        if (lanchers.length > 0) return;

        const spaceXResponse = await fetch(
            'https://api.spacexdata.com/v5/launches',
        );
        const spaceXData = await spaceXResponse.json();

        const launchedCreated = await Promise.all(
            spaceXData.map(async (item: any) => {
                const rocketResponse = await fetch(
                    'https://api.spacexdata.com/v4/rockets/' + item.rocket,
                );
                const rocketData = await rocketResponse.json();
                const send = { ...item, rocket: new SendRocketDTO(rocketData) };
                const entity = new SendLaunchDTO(send);

                const created = await this.launchesService.create(entity);
                return created;
            }),
        );

        return launchedCreated;
    }
}
