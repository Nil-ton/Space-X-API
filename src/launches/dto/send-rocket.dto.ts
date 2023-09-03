export class SendRocketDTO {
    name: string;
    type: string;
    active: boolean;
    stages: number;
    boosters: number;
    cost_per_launch: number;
    success_rate_pct: number;
    first_flight: string;
    country: string;
    company: string;
    wikipedia: string;
    description: string;
    constructor(data: {
        name: string;
        type: string;
        active: boolean;
        stages: number;
        boosters: number;
        cost_per_launch: number;
        success_rate_pct: number;
        first_flight: string;
        country: string;
        company: string;
        wikipedia: string;
        description: string;
    }) {
        this.name = data.name;
        this.type = data.type;
        this.active = data.active;
        this.stages = data.stages;
        this.boosters = data.boosters;
        this.cost_per_launch = data.cost_per_launch;
        this.success_rate_pct = data.success_rate_pct;
        this.first_flight = data.first_flight;
        this.country = data.country;
        this.company = data.company;
        this.wikipedia = data.wikipedia;
        this.description = data.description;
    }
}
