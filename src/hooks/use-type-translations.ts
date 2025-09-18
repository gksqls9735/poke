import { langCodeApiMap } from "@/constants/languages";
import type { CommonTranslations } from "@/type/common";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// 한 번만 실행되도록 상태 관리
let translations: CommonTranslations | null = null;
let isFetching = false;
let subscribers: React.Dispatch<React.SetStateAction<boolean>>[] = [];

export const useTypeTranslations = () => {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(!translations);

  useEffect(() => {
    // 구독자 목록에 현재 컴포넌트의 state 세터 추가
    subscribers.push(setIsLoading);

    if (translations) {
      setIsLoading(false);
    } else if (!isFetching) {
      const fetchAllTypeNames = async () => {
        isFetching = true;
        subscribers.forEach(setter => setter(true));  // 모든 구독자에게 로딩 시작 알림

        try {
          const listResponse = await axios.get('https://pokeapi.co/api/v2/type');
          const typeUrls = listResponse.data.results.map((type: { url: string }) => type.url);
          const detailResponses = await Promise.all(typeUrls.map((url: any) => axios.get(url)));

          const newTranslations: CommonTranslations = {};
          detailResponses.forEach(res => {
            const names = res.data.names;
            const engName = names.find((n: any) => n.language.name === 'en')?.name;
            if (!engName) return;

            newTranslations[engName.toLowerCase()] = {};
            names.forEach((nameInfo: any) => {
              newTranslations[engName.toLowerCase()][nameInfo.language.name] = nameInfo.name;
            });
          });

          translations = newTranslations;
        } catch (e) {
          console.error("Failed to fetch type translations:", e);
        } finally {
          isFetching = false;
          subscribers.forEach(setter => setter(false));
        }
      };

      fetchAllTypeNames();
    }

    return () => {
      // 컴포넌트 언마운트 시 구독자 목록에서 제거
      subscribers = subscribers.filter(setter => setter !== setIsLoading);
    }
  }, []);

  // 영어 이름과 현재 언어를 받아 번역된 이름 반환
  const getTranslatedTypeName = (engName: string): string => {
    const lowerCaseName = engName.toLowerCase();
    const currentLangCode = i18n.language;
    const apiLangCode = langCodeApiMap[currentLangCode] || currentLangCode;
    return translations?.[lowerCaseName]?.[apiLangCode] || engName;
  };

  return { getTranslatedTypeName, isLoading };
};