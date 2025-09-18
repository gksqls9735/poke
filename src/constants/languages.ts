import type { Language } from "@/type/common";

export const languages: Language[] = [
  { code: 'ko', name: '한국어', flag: '/flags/kr.png' },
  { code: 'en', name: 'English', flag: '/flags/us.png' },
  { code: 'ja', name: '日本語', flag: '/flags/ja.png' },
  { code: 'ja-Hrkt', name: '日本語 (かな)', flag: '/flags/ja.png' },
  { code: 'zh-CN', name: '简体中文', flag: '/flags/cn.png' }, // 간체 중국어 (중국 본토)
  { code: 'zh-TW', name: '繁體中文', flag: '/flags/tw.png' }, // 번체 중국어 (대만)
  { code: 'es', name: 'Español', flag: '/flags/es.png' }, // 스페인어
  { code: 'fr', name: 'Français', flag: '/flags/fr.png' }, // 프랑스어
  { code: 'de', name: 'Deutsch', flag: '/flags/de.png' }, // 독일어
  { code: 'it', name: 'Italiano', flag: '/flags/it.png' }, // 이탈리아어
];

export const langCodeApiMap: { [key: string]: string } = {
  'zh-CN': 'zh-Hans', // 간체자
  'zh-TW': 'zh-Hant', // 번체자
};