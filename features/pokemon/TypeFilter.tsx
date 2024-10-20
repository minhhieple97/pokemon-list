import { Skeleton } from '../../components/ui/skeleton';
import { TypeList } from './TypeList';
import { getPokemonTypes } from '@/lib/pokemon';

interface TypeFilterProps {
  selectedTypes: number[];
}

export default async function TypeFilter({ selectedTypes }: TypeFilterProps) {
  const types = await getPokemonTypes();
  return <TypeList types={types} selectedTypes={selectedTypes} />;
}

export function TypeFilterSkeleton() {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {[...Array(10)].map((_, index) => (
        <Skeleton key={index} className="h-10 w-20" />
      ))}
    </div>
  );
}
