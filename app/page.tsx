import { Pokemon } from '@/features/pokemon';

export default function Home({ searchParams }: { searchParams: { page?: string; type?: string } }) {
  const page = Number(searchParams.page) || 1;
  const type = searchParams.type || null;

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Pokemon List</h1>
      </header>
      <Pokemon page={page} type={type} />
    </div>
  );
}
