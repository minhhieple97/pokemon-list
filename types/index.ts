export interface PokemonType {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonType[];
}

export interface PokemonTypeResponse {
  id: number;
  name: string;
  pokemon: {
    pokemon: PokemonType;
    slot: number;
  }[];
}

export interface FormattedPokemon extends PokemonType {
  id: number;
  image: string;
}

export interface PaginatedPokemonResponse {
  pokemon: FormattedPokemon[];
  totalCount: number;
  totalPages: number;
}
