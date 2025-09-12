import { useEffect, useState } from "react";
import axios from "axios";
import type { PokemonData } from "@/type/poke";

export const usePokemonData = () => {
  const [pokemons, setPokemons] = useState<PokemonData | null>(null);
  const url = 'https://pokeapi.co/api/v2/pokemon/?limit=100&offset=0';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<PokemonData>(url);
        
        setPokemons(response.data); 

      } catch (e) {
        console.log(e);
      }
    };
    
    fetchData();
  }, []);

  return pokemons;
};