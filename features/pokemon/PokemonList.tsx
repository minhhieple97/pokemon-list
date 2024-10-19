import PokemonCard from '@/features/pokemon/PokemonCard';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchPokemonData } from '@/lib/pokemon';

interface PokemonSearchProps {
  type: string | null;
  page: number;
}

export default async function PokemonList({ type, page }: PokemonSearchProps) {
  const { pokemon, totalCount } = await fetchPokemonData(page, type);
  return (
    <div>
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Total Pokemon in PokeAPI: {totalCount}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-8">
        {pokemon.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>
    </div>
  );
}

export function PokemonListSkeleton() {
  return (
    <div>
      <Skeleton className="mb-4 h-6 w-64" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-8">
        {[...Array(12)].map((_, index) => (
          <Skeleton key={index} className="h-48 w-full" />
        ))}
      </div>
    </div>
  );
}
