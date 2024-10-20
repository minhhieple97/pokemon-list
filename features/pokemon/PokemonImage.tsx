'use client';
import { useState } from 'react';
import Image from 'next/image';

interface PokemonImageProps {
  src: string;
  alt: string;
}

export function PokemonImage({ src, alt }: PokemonImageProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  if (imageError) {
    return (
      <div className="w-full h-40 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
        <span className="text-gray-500 dark:text-gray-400">Image not available</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={150}
      height={150}
      className="w-full h-40 object-contain bg-gray-100 dark:bg-gray-800"
      onError={handleImageError}
      loading="lazy"
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
    />
  );
}
