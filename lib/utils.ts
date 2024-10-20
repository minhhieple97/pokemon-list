import { POKEMON_IMAGE_URL } from '@/constants';
import { BasicPokemonInfo, FormattedPokemon } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPokemonData(pokemonData: BasicPokemonInfo[]): FormattedPokemon[] {
  return pokemonData.map((p) => {
    const id = extractPokemonId(p.url);
    return {
      ...p,
      id,
      image: `${POKEMON_IMAGE_URL}/${id}.png`,
    };
  });
}

function extractPokemonId(url: string): number {
  return parseInt(url.split('/').slice(-2, -1)[0]);
}

export function extractTypeId(url: string): number {
  const parts = url.split('/');
  return parseInt(parts[parts.length - 2]);
}
