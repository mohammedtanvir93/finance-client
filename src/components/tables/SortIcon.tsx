import { ArrowDownAZ, ArrowDownZA } from 'lucide-react';

interface Props {
    matchingField: string;
    sortedColumn: string;
    sortDir: 'asc' | 'desc';
    onDirChange: () => void;
}

const SortIcon = ({ matchingField, sortedColumn, sortDir, onDirChange }: Props) => {
    if (matchingField !== sortedColumn) return;

    const iconClasses = "w-4 h-4 text-blue-500 cursor-pointer";

    if (sortDir === 'asc')
        return <ArrowDownZA onClick={onDirChange} className={iconClasses} />;

    return <ArrowDownAZ onClick={onDirChange} className={iconClasses} />;
};

export default SortIcon;
