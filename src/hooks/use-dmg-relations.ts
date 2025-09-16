import type { DmgDetail, PokemonType, PokemonTypeInfo } from "@/type/poke";
import axios from "axios";
import { useEffect, useState } from "react";

export const useDmgRelations = (types: PokemonType[] | undefined) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [weaknesses, setWeaknesses] = useState<PokemonTypeInfo[]>([]);  // 약점 (2x 또는 4x 데미지)
  const [resistances, setResistances] = useState<PokemonTypeInfo[]>([]);  // 저항 (0.5x 또는 0.25x 데미지)
  const [immunities, setImmunities] = useState<PokemonTypeInfo[]>([]);  // 무효 (0x 데미지)

  useEffect(() => {
    if (!types || types.length === 0) return;

    const fetchDmgData = async () => {
      setLoading(true);
      try {
        // 모든 타입의 상세 정보 URL로 동시에 API 요청
        const promises = types.map(typeInfo => axios.get<DmgDetail>(typeInfo.type.url));
        const responses = await Promise.all(promises);
        const allDmgRelations = responses.map(res => res.data.damage_relations);

        // 타입별 데미지 배율을 계산하고 합침
        const multipliers: { [key: string]: number } = {};

        // 모든 상성 관계를 순회하며 배율을 곱함
        allDmgRelations.forEach(relations => {
          relations.double_damage_from.forEach(type => { multipliers[type.name] = (multipliers[type.name] || 1) * 2; });
          relations.half_damage_from.forEach(type => { multipliers[type.name] = (multipliers[type.name] || 1) * 0.5; });
          relations.no_damage_from.forEach(type => { multipliers[type.name] = (multipliers[type.name] || 1) * 0; });
        });

        // 계산된 배율에 따라 약점, 저항, 무효를 분류
        const finalWeaknesses: PokemonTypeInfo[] = [];
        const finalResistances: PokemonTypeInfo[] = [];
        const finalImmunities: PokemonTypeInfo[] = [];

        // API 응답에는 모든 타입 정보가 없으므로, 캐시에서 url을 찾아 넣음
        const typeUrlMap = new Map<string, string>();
        allDmgRelations.forEach(rel => {
          [...rel.double_damage_from, ...rel.half_damage_from, ...rel.no_damage_from].forEach(t => {
            if (!typeUrlMap.has(t.name)) typeUrlMap.set(t.name, t.url);
          });
        });

        for (const typeName in multipliers) {
          const multiplier = multipliers[typeName];
          const typeInfo = { name: typeName, url: typeUrlMap.get(typeName) || '' };

          if (multiplier >= 2) finalWeaknesses.push(typeInfo);
          else if (multiplier > 0 && multiplier < 1) finalResistances.push(typeInfo);
          else if (multiplier === 0) finalImmunities.push(typeInfo);
        }

        setWeaknesses(finalWeaknesses);
        setResistances(finalResistances);
        setImmunities(finalImmunities);
      } catch (e) {
        console.error("Failed to fetch damage relations:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchDmgData();
  }, [types]);

  return { loading, weaknesses, resistances, immunities };
};