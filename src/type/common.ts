export type Language = {
  code: string,
  name: string,
  flag: string,
}

// 타입 번역 데이터를 저장할 구조 (grass: { ko: '풀', en: 'Grass' })
export interface CommonTranslations {
  [engName: string]: {
    [langCode: string]: string;
  }
}