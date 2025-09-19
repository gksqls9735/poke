/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pokedex-red': '#f25f5c',

        // 기본 테마 색상
        primary: "#ffcb05",
        second: "#3d7dca",
        third: "#003a70",

        // 포켓몬 타입별 light, DEFAULT, dark 색상 세트
        normal: {
          light: '#D1D0B1',
          DEFAULT: '#A8A77A',
          dark: '#7c7b59',
        },
        fire: {
          light: '#F5B37D',
          DEFAULT: '#EE8130',
          dark: '#b16124',
        },
        water: {
          light: '#A0BBF6',
          DEFAULT: '#6390F0',
          dark: '#4a6cb1',
        },
        electric: {
          light: '#F3D97C',
          DEFAULT: '#DFBC30',
          dark: '#a78d24',
        },
        grass: {
          light: '#AEDB8A',
          DEFAULT: '#7AC74C',
          dark: '#5b9539',
        },
        ice: {
          light: '#C2E6E5',
          DEFAULT: '#97D4D2',
          dark: '#719e9d',
        },
        fighting: {
          light: '#D88583',
          DEFAULT: '#B83E3A',
          dark: '#8a2f2c',
        },
        poison: {
          light: '#C984C8',
          DEFAULT: '#A33EA1',
          dark: '#7a2f79',
        },
        ground: {
          light: '#F0D8A1',
          DEFAULT: '#E2BF65',
          dark: '#a98f4c',
        },
        flying: {
          light: '#CEC0F8',
          DEFAULT: '#A98FF3',
          dark: '#7e6bbd',
        },
        psychic: {
          light: '#FCA9C1',
          DEFAULT: '#F95587',
          dark: '#ba4065',
        },
        bug: {
          light: '#D0DA70',
          DEFAULT: '#A6B91A',
          dark: '#7c8a13',
        },
        rock: {
          light: '#D6C881',
          DEFAULT: '#B6A136',
          dark: '#887928',
        },
        ghost: {
          light: '#AB9AC4',
          DEFAULT: '#735797',
          dark: '#564171',
        },
        dragon: {
          light: '#A888FD',
          DEFAULT: '#6F35FC',
          dark: '#5328bc',
        },
        dark: {
          light: '#A99285',
          DEFAULT: '#705746',
          dark: '#544134',
        },
        steel: {
          light: '#D7D7E2',
          DEFAULT: '#B7B7CE',
          dark: '#89899a',
        },
        fairy: {
          light: '#E7B5CF',
          DEFAULT: '#D685AD',
          dark: '#a16482',
        },
        none: {
          light: '#D9D9D9',
          DEFAULT: '#BFBFBF',
          dark: '#8f8f8f',
        },
      },
    },
  },
  plugins: [],
}