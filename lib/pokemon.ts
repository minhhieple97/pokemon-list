import { API_BASE_URL, ITEMS_PER_PAGE, POKEMON_IMAGE_URL } from '@/constants';
import {
  PokemonType,
  PokemonListResponse,
  FormattedPokemon,
  BasicPokemonInfo,
  PokemonTypeDetailResponse,
} from '@/types';

export async function getPokemonTypes(): Promise<PokemonType[]> {
  const response = await fetch(`${API_BASE_URL}/type`);
  const data: PokemonListResponse = await response.json();

  return data.results.map((type) => ({
    ...type,
    id: extractTypeId(type.url),
  }));
}

function extractTypeId(url: string): number {
  const parts = url.split('/');
  return parseInt(parts[parts.length - 2]);
}

export async function fetchPokemonData(page: number, types: number[]) {
  try {
    const { pokemonData, totalCount } = await fetchPokemonByTypesOrAll(page, types);
    const formattedPokemon = formatPokemonData(pokemonData);
    return {
      pokemon: formattedPokemon,
      totalCount,
      totalPages: Math.ceil(totalCount / ITEMS_PER_PAGE),
    };
  } catch (error) {
    console.error('Error fetching Pokemon data:', error);
    return { pokemon: [], totalCount: 0, totalPages: 0 };
  }
}

async function fetchPokemonByTypesOrAll(page: number, types: number[]) {
  if (types.length > 0) {
    return fetchPokemonByTypes(page, types);
  }
  return fetchAllPokemon(page);
}

async function fetchPokemonByTypes(
  page: number,
  types: number[],
): Promise<{ pokemonData: BasicPokemonInfo[]; totalCount: number }> {
  const typeResponses: PokemonTypeDetailResponse[] = await Promise.all(
    types.map((type) => fetch(`${API_BASE_URL}/type/${type}`).then((res) => res.json())),
  );

  const pokemonByType = typeResponses.map(
    (response) => new Set(response.pokemon.map((p) => p.pokemon.name)),
  );

  const commonPokemon = pokemonByType.reduce(
    (acc, curr) => new Set([...acc].filter((x) => curr.has(x))),
  );

  const uniquePokemon = typeResponses[0].pokemon
    .filter((p) => commonPokemon.has(p.pokemon.name))
    .map((p) => p.pokemon);

  const totalCount = uniquePokemon.length;
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const pokemonData = uniquePokemon.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return {
    pokemonData,
    totalCount,
  };
}

async function fetchAllPokemon(page: number) {
  const url = `${API_BASE_URL}/pokemon?limit=${ITEMS_PER_PAGE}&offset=${
    (page - 1) * ITEMS_PER_PAGE
  }`;
  const response = await fetch(url);
  const data: PokemonListResponse = await response.json();
  return { pokemonData: data.results, totalCount: data.count };
}

function formatPokemonData(pokemonData: BasicPokemonInfo[]): FormattedPokemon[] {
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
