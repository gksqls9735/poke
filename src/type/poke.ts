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
  front_default: string | null;
  other?: {
    'official-artwork'?: {
      front_default: string | null;
    };
  };
}

interface PokemonTypeInfo {
  name: string;
}

interface PokemonType {
  type: PokemonTypeInfo;
}

interface PokemonStatInfo {
  name: string;
  url: string;
}

interface PokemonStat {
  base_stat: number;
  stat: PokemonStatInfo;
}

export interface PokemonDetail {
  id: number;
  name: string;
  sprites: PokemonSprite;
  types: PokemonType[];
  height: number;
  weight: number;
  stats: PokemonStat[];
}