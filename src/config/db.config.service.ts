import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DBConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {}
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mongodb',
            url: this.configService.get<string>('DB_URL'),
            entities: [__dirname + '/../**/*entity{.js,.ts}'],
        };
    }
}
