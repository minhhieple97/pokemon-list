import { CardContent, CardTitle } from '@/components/ui/card';

interface PokemonInfoProps {
  name: string;
  id: number;
}

export function PokemonInfo({ name, id }: PokemonInfoProps) {
  return (
    <CardContent className="p-4">
      <CardTitle className="text-lg capitalize">{name}</CardTitle>
      <p className="text-sm text-gray-500">#{id.toString().padStart(3, '0')}</p>
    </CardContent>
  );
}
