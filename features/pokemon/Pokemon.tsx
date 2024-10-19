import { Suspense } from 'react';
import PokemonList, { PokemonListSkeleton } from '@/features/pokemon/PokemonList';
import Pagination from '@/components/common/Pagination';
import { fetchPokemonData } from '@/lib/pokemon';
import TypeFilter, { TypeFilterSkeleton } from '@/features/pokemon/TypeFilter';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface PokemonProps {
  page: number;
  type: string | null;
}

export default async function Pokemon({ page, type }: PokemonProps) {
  const pokemonData = await fetchPokemonData(page, type);
  const { totalPages, pokemon } = pokemonData;

  return (
    <>
      <Suspense fallback={<TypeFilterSkeleton />}>
        <TypeFilter selectedType={type} />
      </Suspense>
      {pokemon.length === 0 ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Pokémon Found</AlertTitle>
          <AlertDescription>
            No Pokémon match the current filter criteria. Try changing the type or page.
          </AlertDescription>
        </Alert>
      ) : (
        <>
          <Suspense fallback={<PokemonListSkeleton />} key={`${type}-${page}`}>
            <PokemonList type={type} page={page} />
          </Suspense>
          <Pagination currentPage={page} totalPages={totalPages} />
        </>
      )}
    </>
  );
}
