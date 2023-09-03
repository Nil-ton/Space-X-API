export class SendLaunchDTO {
    _id: string;
    name: string;
    success: boolean;
    flight_number: number;
    logo: { small: string; large: string };
    date_utc: string;
    rocket: { name: string };
    webcast: string;
    constructor(data: {
        id: string;
        name: string;
        success: boolean;
        flight_number: number;
        links: {
            patch: {
                small: 'https://images2.imgbox.com/eb/d8/D1Yywp0w_o.png';
                large: 'https://images2.imgbox.com/33/2e/k6VE4iYl_o.png';
            };
            webcast: string;
        };
        date_utc: string;
        rocket: { name: string };
        webcast: string;
    }) {
        this._id = data.id;
        this.name = data.name;
        this.success = data.success;
        this.flight_number = data.flight_number;
        this.logo = data.links.patch;
        this.date_utc = data.date_utc;
        this.rocket = data.rocket;
        this.webcast = data.links.webcast;
    }
}
