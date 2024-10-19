'use client';

import { Button } from '@/components/ui/button';
import { PokemonType } from '@/types';
import { useTypeFilter } from './hooks/useTypeFilter';

interface TypeListProps {
  types: PokemonType[];
  selectedType: string | null;
}

export function TypeList({ types }: TypeListProps) {
  const { selectedType, setTypeFilter } = useTypeFilter();

  return (
    <div className="mb-4">
      <div className="flex flex-wrap gap-2 mb-2">
        {types.map((type) => (
          <Button
            key={type.name}
            onClick={() => setTypeFilter(type.name)}
            variant={selectedType === type.name ? 'secondary' : 'outline'}
          >
            {type.name}
          </Button>
        ))}
      </div>
      {selectedType && (
        <Button
          onClick={() => setTypeFilter(null)}
          variant="destructive"
          className="w-full sm:w-auto"
        >
          Reset Filter
        </Button>
      )}
    </div>
  );
}
