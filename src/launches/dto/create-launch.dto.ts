import { IsNotEmpty } from 'class-validator';

export class CreateLaunchDto {
    @IsNotEmpty()
    id: string;
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    success: boolean;
    @IsNotEmpty()
    flight_number: number;
    @IsNotEmpty()
    logo: { small: string; large: string };
    @IsNotEmpty()
    date_utc: string;
}
