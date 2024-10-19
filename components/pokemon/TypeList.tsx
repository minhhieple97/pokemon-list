'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface PokemonType {
  name: string;
  url: string;
}

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
    <div className="mb-4 flex flex-wrap gap-2">
      {types.map((type) => (
        <Button
          key={type.name}
          onClick={() => onTypeChange(type.name)}
          variant={selectedType === type.name ? 'secondary' : 'outline'}
        >
          {type.name}
        </Button>
      ))}
      {selectedType && (
        <Button onClick={() => onTypeChange(null)} variant="outline">
          Reset
        </Button>
      )}
    </div>
  );
}
