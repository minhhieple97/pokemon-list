import { Suspense } from 'react';
import PokemonList, { PokemonListSkeleton } from '@/components/pokemon/PokemonList';
import Pagination from '@/components/common/Pagination';
import { fetchPokemonData } from '@/lib/pokemon';
import TypeFilter, { TypeFilterSkeleton } from '@/components/pokemon/TypeFilter';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string; type?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const type = searchParams.type || null;
  const pokemonData = await fetchPokemonData(page, type);
  const { totalPages, pokemon } = pokemonData;

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Pokemon List</h1>
      </header>
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
    </div>
  );
}
