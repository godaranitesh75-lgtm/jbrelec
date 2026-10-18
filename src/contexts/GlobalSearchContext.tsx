import { useState, useCallback, type ReactNode } from 'react';
import { searchAllItems, type SearchableItem } from '../data/catalogueData.ts';
import { GlobalSearchContext } from './global-search-context.ts';

export function GlobalSearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchableItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const search = useCallback((q: string) => {
    setQuery(q);
    setIsSearching(true);
    if (!q.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }
    const data = searchAllItems(q);
    setResults(data);
    setIsSearching(false);
  }, []);

  const clear = useCallback(() => {
    setQuery('');
    setResults([]);
    setIsSearching(false);
  }, []);

  return (
    <GlobalSearchContext.Provider value={{ query, setQuery, results, isSearching, search, clear }}>
      {children}
    </GlobalSearchContext.Provider>
  );
}
