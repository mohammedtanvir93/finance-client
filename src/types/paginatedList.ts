interface PaginatedList {
    skip: number;
    limit: number;
    filter: {
        search: string;
        sort: {
            sortBy: string;
            sortOrder: 'asc' | 'desc';
        }
    }
}

export default PaginatedList;