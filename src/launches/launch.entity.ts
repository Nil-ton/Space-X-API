import { Entity, Column, ObjectIdColumn, ManyToOne, JoinTable } from 'typeorm';

@Entity({ name: 'launches' })
export class LaunchEntity {
    @ObjectIdColumn()
    _id: string;

    @Column({ name: 'flight_number' })
    flight_number: number;

    @Column({ name: 'logo' })
    logo: { small: string; large: string };

    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'success' })
    success: boolean;

    @Column({ name: 'webcast' })
    webcast: string;

    @Column({ name: 'date_utc', type: 'datetime' })
    date_utc: string;

    @Column()
    rocket: { name: string };
}
