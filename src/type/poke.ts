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

export interface PokemonTypeInfo {
  name: string;
  url: string;
}

export interface PokemonType {
  type: PokemonTypeInfo;
}

interface PokemonStatInfo {
  name: string;
  url: string;
}

export interface PokemonStat {
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
  localizedName?: string;
  flavorText?: string;
  species: {
    name: string;
    url: string;
  };
}

export interface DmgDetail {
  damage_relations: {
    double_damage_from: PokemonTypeInfo[],
    double_damage_to: PokemonTypeInfo[],
    half_damage_from: PokemonTypeInfo[],
    half_damage_to: PokemonTypeInfo[],
    no_damage_from: PokemonTypeInfo[],
    no_damage_to: PokemonTypeInfo[],
  }
}

// 도감 설명 타입
interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
}

// 언어별 이름 타입
interface NameEntry {
  name: string;
  language: {
    name: string;
    url: string;
  };
}

// pokemon-species API의 응답 타입
export interface PokemonSpecies {
  id: number;
  names: NameEntry[];
  flavor_text_entries: FlavorTextEntry[];
  evolution_chain: {
    url: string;
  };
}