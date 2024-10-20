'use client';

import { Button } from '@/components/ui/button';
import { PokemonType } from '@/types';
import { useTypeFilter } from './hooks/useTypeFilter';

interface TypeListProps {
  types: PokemonType[];
  selectedTypes: number[];
}

export function TypeList({ types }: TypeListProps) {
  const { selectedTypes, setTypeFilter, removeTypeFilter } = useTypeFilter();

  return (
    <div className="mb-4">
      <div className="flex flex-wrap gap-2 mb-2">
        {types.map((type) => (
          <Button
            key={type.name}
            onClick={() => setTypeFilter(type.id)}
            variant={selectedTypes.includes(type.id) ? 'secondary' : 'outline'}
          >
            {type.name}
          </Button>
        ))}
      </div>
      {selectedTypes.length > 0 && (
        <Button onClick={removeTypeFilter} variant="destructive" className="w-full sm:w-auto">
          Reset Filter
        </Button>
      )}
    </div>
  );
}
