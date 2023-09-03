import { LaunchEntity } from '../launch.entity';

export class PaginatedResponseDto {
    results: LaunchEntity[];
    totalDocs: number;
    page: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;

    constructor(
        results: LaunchEntity[],
        totalDocs: number,
        page: number,
        totalPages: number,
        hasNext: boolean,
        hasPrev: boolean,
    ) {
        this.results = results;
        this.totalDocs = totalDocs;
        this.page = page;
        this.totalPages = totalPages;
        this.hasNext = hasNext;
        this.hasPrev = hasPrev;
    }
}
