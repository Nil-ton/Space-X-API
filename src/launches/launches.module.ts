import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LaunchEntity } from './launch.entity';
import { LaunchesService } from './launches.service';
import { LaunchesController } from './launches.controller';

@Module({
    imports: [TypeOrmModule.forFeature([LaunchEntity])],
    controllers: [LaunchesController],
    providers: [LaunchesService],
})
export class LaunchesModule {}
