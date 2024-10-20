import { Suspense } from 'react';
import PokemonList, { PokemonListSkeleton } from '@/features/pokemon/PokemonList';
import Pagination from '@/components/common/Pagination';
import { fetchPokemonData } from '@/lib/pokemon';
import TypeFilter, { TypeFilterSkeleton } from '@/features/pokemon/TypeFilter';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface PokemonProps {
  page: number;
  types: number[];
}

export default async function Pokemon({ page, types }: PokemonProps) {
  const pokemonData = await fetchPokemonData(page, types);
  const { totalPages, pokemon } = pokemonData;

  return (
    <>
      <Suspense fallback={<TypeFilterSkeleton />}>
        <TypeFilter selectedTypes={types} />
      </Suspense>
      {pokemon.length === 0 ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Pokémon Found</AlertTitle>
          <AlertDescription>
            No Pokémon match the current filter criteria. Try changing the types or page.
          </AlertDescription>
        </Alert>
      ) : (
        <>
          <Suspense fallback={<PokemonListSkeleton />} key={`${types.join('-')}-${page}`}>
            <PokemonList types={types} page={page} />
          </Suspense>
          <Pagination currentPage={page} totalPages={totalPages} />
        </>
      )}
    </>
  );
}
