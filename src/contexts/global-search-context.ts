import { createContext } from 'react';
import type { SearchableItem } from '../data/catalogueData.ts';

export interface GlobalSearchContextValue {
  query: string;
  setQuery: (query: string) => void;
  results: SearchableItem[];
  isSearching: boolean;
  search: (query: string) => void;
  clear: () => void;
}

export const GlobalSearchContext = createContext<GlobalSearchContextValue | undefined>(undefined);
