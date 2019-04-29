export class PaginatedContent<T> {
    page: number;
    totalPages: number;
    totalItems: number;
    items: T[];
}
