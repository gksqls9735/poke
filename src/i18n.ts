import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi) // 번역 파일을 서버에서 불러오기 위한 백엔드 플러그인
  .use(initReactI18next) // i18next를 react-i18next에 연결
  .init({
    // 기본 언어 설정
    lng: 'ko',
    //lng 키에 해당하는 언어가 없을 경우 fallback 언어 사용
    fallbackLng: 'en',
    // 디버깅: 개발 중 콘솔에 로그 출력
    debug: true,
    
    // 번역 파일 경로 설정
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    
    interpolation: {
      escapeValue: false, // React는 이미 XSS 방어 기능이 있으므로 false로 설정
    },
  });

export default i18n;