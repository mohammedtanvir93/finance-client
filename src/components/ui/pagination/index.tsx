import Select, { Option } from '@/components/form/Select';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';

interface Props {
    itemsPerPage?: number[];
    totalItems: number;
    page: number;
    onPageOrPageItemChange: (page: number, itemsPerPage: number) => void;
}

const Pagination = ({
    itemsPerPage = [10, 20, 50, 100],
    totalItems,
    onPageOrPageItemChange,
    page = 1
}: Props) => {
    const [perPageItems, setPerPageItems] = useState<number | null>(null);

    const selectOptions: Option[] = useMemo(() => {
        return itemsPerPage.map((itemPerPage) => ({
            label: itemPerPage.toString(),
            value: itemPerPage.toString()
        }));
    }, [itemsPerPage]);

    const maxPages = useMemo(() => {
        return perPageItems && totalItems ? Math.ceil(totalItems / perPageItems) : 1;
    }, [perPageItems, totalItems]);

    useEffect(() => {
        setPerPageItems(itemsPerPage[0]);
    }, []);

    const onPageChange = (currentPage: number) => {
        onPageOrPageItemChange(currentPage, perPageItems as number);
    };

    const handlePerPageItemsChange = (currentPerPageItems: number) => {
        setPerPageItems(currentPerPageItems);
        onPageOrPageItemChange(page, currentPerPageItems);
    };

    return (
        <div className="flex items-center justify-between w-full mt-3">
            <div className="relative w-[100px] flex items-center">
                <Select
                    options={selectOptions}
                    placeholder="Select"
                    onChange={(value) => handlePerPageItemsChange(parseInt(value))}
                    className="dark:bg-dark-900"
                    defaultValue={itemsPerPage[0].toString()}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none dark:text-gray-400">
                    <ChevronDown width={12} />
                </span>
            </div>
            <div className="flex items-center space-x-2">
                <button onClick={() => onPageChange(1)} disabled={(page) <= 1} className="p-1.5 border rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                    <ChevronsLeft className="w-4 h-4 text-gray-600 dark:text-white" />
                </button>
                <button onClick={() => onPageChange(page - 1)} disabled={(page) <= 1} className="p-1.5 border rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                    <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-white" />
                </button>
                <input
                    type="number"
                    min="1"
                    max={maxPages}
                    className="w-[60px] px-2 py-1 border rounded text-center text-gray-700 dark:bg-gray-800 dark:text-white"
                    value={page}
                    onChange={
                        (event: ChangeEvent<HTMLInputElement>) => {
                            const value = parseInt(event.target.value);
                            if (!isNaN(value))
                                onPageChange(value);
                            else
                                onPageChange(1);
                        }
                    }
                />
                <button onClick={() => onPageChange(page + 1)} disabled={(page) >= maxPages} className="p-1.5 border rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                    <ChevronRight className="w-4 h-4 text-gray-600 dark:text-white" />
                </button>
                <button onClick={() => onPageChange(maxPages)} disabled={(page) >= maxPages} className="p-1.5 border rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                    <ChevronsRight className="w-4 h-4 text-gray-600 dark:text-white" />
                </button>
            </div>
        </div>
    )
};

export default Pagination;
