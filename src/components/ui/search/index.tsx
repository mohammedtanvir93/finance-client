import { Search } from 'lucide-react';
import { ChangeEvent, useRef } from 'react';

interface IProps {
    className?: string;
    label: string;
    onSearchKeyChange: (searchKey: string) => void;
}

const SearchInput = ({
    className,
    label,
    onSearchKeyChange
}: IProps) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const onSearchKeyChangeHandler = (searchKey: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            onSearchKeyChange(searchKey);
        }, 500);
    };

    return (
        <div className={`relative mb-4 ${className}`}>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/30 w-5 h-5" />
            <input
                onChange={
                    (e: ChangeEvent<HTMLInputElement>) => onSearchKeyChangeHandler(e.target.value)
                }
                type="text"
                placeholder={label}
                className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            />
        </div>
    );
}

export default SearchInput;
