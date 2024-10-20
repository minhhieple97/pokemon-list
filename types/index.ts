export interface PokemonType {
  id: number;
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonType[];
}
export interface BasicPokemonInfo {
  name: string;
  url: string;
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

export interface PokemonTypeResponse {
  pokemon: BasicPokemonInfo;
  slot: number;
}

export interface DamageRelation {
  double_damage_from: BasicPokemonInfo[];
  double_damage_to: BasicPokemonInfo[];
  half_damage_from: BasicPokemonInfo[];
  half_damage_to: BasicPokemonInfo[];
  no_damage_from: BasicPokemonInfo[];
  no_damage_to: BasicPokemonInfo[];
}

export interface GameIndex {
  game_index: number;
  generation: BasicPokemonInfo;
}

export interface PokemonMove {
  name: string;
  url: string;
}

export interface Language {
  name: string;
  url: string;
}

export interface Name {
  language: Language;
  name: string;
}

export interface PastDamageRelation {
  damage_relations: DamageRelation;
  generation: BasicPokemonInfo;
}

export interface PokemonInType {
  pokemon: BasicPokemonInfo;
  slot: number;
}

export interface TypeSprites {
  'generation-iii': GenerationSprites;
  'generation-iv': GenerationSprites;
  'generation-v': GenerationSprites;
  'generation-vi': GenerationSprites;
  'generation-vii': GenerationSprites;
  'generation-viii': GenerationSprites;
  'generation-ix': GenerationSprites;
}

export interface GenerationSprites {
  [key: string]: {
    name_icon: string;
  };
}

export interface PokemonTypeDetailResponse {
  damage_relations: DamageRelation;
  game_indices: GameIndex[];
  generation: BasicPokemonInfo;
  id: number;
  move_damage_class: BasicPokemonInfo;
  moves: PokemonMove[];
  name: string;
  names: Name[];
  past_damage_relations: PastDamageRelation[];
  pokemon: PokemonInType[];
  sprites: TypeSprites;
}
