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

const NoPokemonAlert = () => (
  <Alert variant="destructive">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>No Pokémon Found</AlertTitle>
    <AlertDescription>
      No Pokémon match the current filter criteria. Try changing the types or page.
    </AlertDescription>
  </Alert>
);

const PokemonContent = ({
  pokemon,
  totalCount,
  page,
  totalPages,
}: {
  pokemon: any[];
  totalCount: number;
  page: number;
  totalPages: number;
}) => (
  <>
    <Suspense fallback={<PokemonListSkeleton />}>
      <PokemonList pokemon={pokemon} totalCount={totalCount} />
    </Suspense>
    <Pagination currentPage={page} totalPages={totalPages} />
  </>
);

export default async function Pokemon({ page, types }: PokemonProps) {
  const { totalPages, pokemon, totalCount } = await fetchPokemonData(page, types);

  return (
    <>
      <Suspense fallback={<TypeFilterSkeleton />}>
        <TypeFilter selectedTypes={types} />
      </Suspense>
      {pokemon.length === 0 ? (
        <NoPokemonAlert />
      ) : (
        <PokemonContent
          pokemon={pokemon}
          totalCount={totalCount}
          page={page}
          totalPages={totalPages}
        />
      )}
    </>
  );
}
