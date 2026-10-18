import { useContext } from 'react';
import { GlobalSearchContext } from '../contexts/global-search-context.ts';

export function useGlobalSearch() {
  const context = useContext(GlobalSearchContext);
  if (!context) {
    throw new Error('useGlobalSearch must be used within GlobalSearchProvider');
  }
  return context;
}
