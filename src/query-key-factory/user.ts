import PaginatedList from "@/types/paginatedList";

const userKeys = {
    all: ['users'] as const,
    paginatedList: (params: PaginatedList) =>
        [...userKeys.all, 'paginatedList', { ...params }] as const,
    details: (id: string) => [...userKeys.all, 'details', id] as const,
};

export default userKeys;