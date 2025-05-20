import { useState } from "react";

const usePagination = (
    defaultSortBy: string,
    defaultSortOrder: 'asc' | 'desc',
    defaultItemsPerPage = 10
) => {
    const [searchKey, setSearchKey] = useState('');
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
    const [sortBy, setSortBy] = useState(defaultSortBy);
    const [sortOrder, setSortOrder] = useState(defaultSortOrder);

    const toggleSortOrder = () => {
        if (sortOrder === 'asc')
            setSortOrder('desc');
        else
            setSortOrder('asc');
    };

    return {
        searchKey, setSearchKey,
        page, setPage,
        itemsPerPage, setItemsPerPage,
        sortBy, setSortBy,
        sortOrder, setSortOrder, toggleSortOrder
    }
};

export default usePagination;