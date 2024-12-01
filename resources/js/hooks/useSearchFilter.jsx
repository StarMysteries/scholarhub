import { useState } from 'react';

function useSearchFilter(items, key) {
    const [searchQuery, setSearchQuery] = useState('');

    const resetSearchQuery = () => {
        setSearchQuery('');
    };

    const filteredItems = items.filter(item =>
        item[key].toLowerCase().includes(searchQuery.toLowerCase())
    );

    return { searchQuery, setSearchQuery, resetSearchQuery, filteredItems };
}

export default useSearchFilter;
