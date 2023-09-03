import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBConfigService } from './config/db.config.service';
import { ConfigModule } from '@nestjs/config';
import { LaunchesModule } from './launches/launches.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';

@Module({
    imports: [
        LaunchesModule,
        ScheduleModule.forRoot(),
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            useClass: DBConfigService,
            inject: [DBConfigService],
        }),
    ],
    controllers: [AppController],
})
export class AppModule {}
