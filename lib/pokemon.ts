export async function getPokemonTypes() {
  const response = await fetch('https://pokeapi.co/api/v2/type');
  const data = await response.json();
  return data.results;
}

export async function fetchPokemonData(page: number, type: string | null) {
  const itemsPerPage = 20;
  let url: string;
  let totalCount: number;
  let pokemonData: any[];

  if (type) {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await response.json();
    totalCount = data.pokemon.length;
    pokemonData = data.pokemon
      .slice((page - 1) * itemsPerPage, page * itemsPerPage)
      .map((p: { pokemon: any }) => p.pokemon);
  } else {
    url = `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${
      (page - 1) * itemsPerPage
    }`;
    const response = await fetch(url);
    const data = await response.json();
    totalCount = data.count;
    pokemonData = data.results;
  }

  const formattedPokemon = await Promise.all(
    pokemonData.map(async (p: any) => {
      const id = parseInt(p.url.split('/').slice(-2, -1)[0]);
      return {
        ...p,
        id,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      };
    }),
  );

  return {
    pokemon: formattedPokemon,
    totalCount,
    totalPages: Math.ceil(totalCount / itemsPerPage),
  };
}
