import { langCodeApiMap } from "@/constants/languages";
import type { CommonTranslations } from "@/type/common";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

interface NameEntry {
  name: string;
  language: { name: string };
}

let nameTranslations: CommonTranslations | null = null;
let isFetching = false;

export const usePokemonNames = () => {
  const [isLoading, setIsLoading] = useState<boolean>(!nameTranslations);

  useEffect(() => {
    if (nameTranslations || isFetching) {
      setIsLoading(false);
      return;
    }

    const fetchAllNames = async () => {
      isFetching = true;
      setIsLoading(true);

      try {
        const listResponse = await axios.get('https://pokeapi.co/api/v2/pokemon-species?limit=1302');
        const speciesUrls = listResponse.data.results.map((s: { url: string }) => s.url);

        const detailResponses = await Promise.all(speciesUrls.map((url: string) => axios.get(url)));

        const newTranslations: CommonTranslations = {};
        detailResponses.forEach(res => {
          const { name, names } = res.data;
          newTranslations[name] = {};
          names.forEach((nameEntry: NameEntry) => {
            newTranslations[name][nameEntry.language.name] = nameEntry.name;
          });
        });
        nameTranslations = newTranslations;
      } catch (e) {
        console.error("Failed to fetch pokemon names", e);
      } finally {
        isFetching = false;
        setIsLoading(false);
      }
    };

    fetchAllNames();
  }, []);

  const getLocalizedName = useCallback((engName: string, langCode: string): string => {
    const apiLangCode = langCodeApiMap[langCode] || langCode;
    return nameTranslations?.[engName]?.[apiLangCode] || engName;
  }, []);

  return { getLocalizedName, isLoading };
};