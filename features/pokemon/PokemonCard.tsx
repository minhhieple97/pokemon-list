'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

interface Pokemon {
  name: string;
  id: number;
  image: string;
}

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        {!imageError ? (
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            width={150}
            height={150}
            className="w-full h-40 object-contain bg-gray-100 dark:bg-gray-800"
            onError={handleImageError}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
          />
        ) : (
          <div className="w-full h-40 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <span className="text-gray-500 dark:text-gray-400">Image not available</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg capitalize">{pokemon.name}</CardTitle>
        <p className="text-sm text-gray-500">#{pokemon.id.toString().padStart(3, '0')}</p>
      </CardContent>
    </Card>
  );
}
