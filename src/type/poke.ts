export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonData {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

interface PokemonSprite {
  front_default: string;
}
interface PokemonTypeInfo {
  name: string;
}
interface PokemonType {
  type: PokemonTypeInfo;
}
export interface PokemonDetail {
  id: number;
  name: string;
  sprites: PokemonSprite;
  types: PokemonType[];
  height: number;
  weight: number;
}