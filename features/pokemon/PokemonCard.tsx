'use client';
import { Card, CardHeader } from '@/components/ui/card';
import { PokemonImage } from './PokemonImage';
import { PokemonInfo } from './PokemonInfo';

interface Pokemon {
  name: string;
  id: number;
  image: string;
}

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <PokemonImage src={pokemon.image} alt={pokemon.name} />
      </CardHeader>
      <PokemonInfo name={pokemon.name} id={pokemon.id} />
    </Card>
  );
}
