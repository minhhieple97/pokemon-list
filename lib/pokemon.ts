import { PokemonType, PokemonListResponse, PokemonTypeResponse, FormattedPokemon } from '@/types';

const API_BASE_URL = 'https://pokeapi.co/api/v2';
const ITEMS_PER_PAGE = 20;

export async function getPokemonTypes(): Promise<PokemonType[]> {
  const response = await fetch(`${API_BASE_URL}/type`);
  const data: PokemonListResponse = await response.json();
  return data.results;
}

export async function fetchPokemonData(page: number, type: string | null) {
  try {
    const { pokemonData, totalCount } = await fetchPokemonByTypeOrAll(page, type);
    const formattedPokemon = await formatPokemonData(pokemonData);

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

async function fetchPokemonByTypeOrAll(page: number, type: string | null) {
  if (type) {
    return fetchPokemonByType(page, type);
  }
  return fetchAllPokemon(page);
}

async function fetchPokemonByType(page: number, type: string) {
  const response = await fetch(`${API_BASE_URL}/type/${type}`);
  const data: PokemonTypeResponse = await response.json();
  const totalCount = data.pokemon.length;
  const pokemonData = data.pokemon
    .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
    .map((p) => p.pokemon);
  return { pokemonData, totalCount };
}

async function fetchAllPokemon(page: number) {
  const url = `${API_BASE_URL}/pokemon?limit=${ITEMS_PER_PAGE}&offset=${
    (page - 1) * ITEMS_PER_PAGE
  }`;
  const response = await fetch(url);
  const data: PokemonListResponse = await response.json();
  return { pokemonData: data.results, totalCount: data.count };
}

async function formatPokemonData(pokemonData: PokemonType[]): Promise<FormattedPokemon[]> {
  return Promise.all(
    pokemonData.map(async (p) => {
      const id = extractPokemonId(p.url);
      return {
        ...p,
        id,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      };
    }),
  );
}

function extractPokemonId(url: string): number {
  return parseInt(url.split('/').slice(-2, -1)[0]);
}
