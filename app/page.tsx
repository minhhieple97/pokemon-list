import { PAGE_PARAM, TYPES_PARAM } from '@/constants';
import { Pokemon } from '@/features/pokemon';

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const page = Number(searchParams[PAGE_PARAM]) || 1;
  const types = searchParams[TYPES_PARAM] ? searchParams[TYPES_PARAM].split(',').map(Number) : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Pokemon List</h1>
      </header>
      <Pokemon page={page} types={types} />
    </div>
  );
}
