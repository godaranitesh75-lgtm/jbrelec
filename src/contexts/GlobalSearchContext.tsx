import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { searchAllItems, type SearchableItem } from '../data/catalogueData.ts';

interface GlobalSearchContextValue {
  query: string;
  setQuery: (query: string) => void;
  results: SearchableItem[];
  isSearching: boolean;
  search: (query: string) => void;
  clear: () => void;
}

const GlobalSearchContext = createContext<GlobalSearchContextValue | undefined>(undefined);

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

export function useGlobalSearch() {
  const context = useContext(GlobalSearchContext);
  if (!context) {
    throw new Error('useGlobalSearch must be used within GlobalSearchProvider');
  }
  return context;
}
