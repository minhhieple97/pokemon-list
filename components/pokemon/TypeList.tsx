'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PokemonType } from '@/types';

interface TypeListProps {
  types: PokemonType[];
  selectedType: string | null;
}

export function TypeList({ types, selectedType }: TypeListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onTypeChange = (type: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (type) {
      params.set('type', type);
    } else {
      params.delete('type');
    }
    params.set('page', '1');
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="mb-4">
      <div className="flex flex-wrap gap-2 mb-2">
        {types.map((type) => (
          <Button
            key={type.name}
            onClick={() => onTypeChange(type.name)}
            variant={selectedType === type.name ? 'secondary' : 'outline'}
          >
            {type.name}
          </Button>
        ))}
      </div>
      {selectedType && (
        <Button
          onClick={() => onTypeChange(null)}
          variant="destructive"
          className="w-full sm:w-auto"
        >
          Reset Filter
        </Button>
      )}
    </div>
  );
}
