import { useState } from 'react';

function useSearchFilter(items, key) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredItems = items.filter(item =>
        item[key].toLowerCase().includes(searchQuery.toLowerCase())
    );

    return { searchQuery, setSearchQuery, filteredItems };
}

export default useSearchFilter;