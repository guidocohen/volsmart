import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeState } from './types';

const initialState: ThemeState = {
  colorTheme: (localStorage.getItem('colorTheme') as 'light' | 'dark') || 'light',
  darkSide: localStorage.getItem('darkSide') === 'true' || false,
};

const themeSlice = createSlice({
  name: 'themeSlice',
  initialState,
  reducers: {
    toggleDarkSide: (state) => {
      const newDarkSide = !state.darkSide;
      localStorage.setItem('darkSide', newDarkSide.toString());
      state.darkSide = newDarkSide;
    },
    toggleColorTheme: (state) => {
      const root = window.document.documentElement;
      root.classList.remove(state.colorTheme);

      const newColorTheme = state.colorTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('colorTheme', newColorTheme);
      state.colorTheme = newColorTheme;
      root.classList.add(newColorTheme);
    },
    setTheme: (state) => {
      const newDarkSide = localStorage.getItem('darkSide') === 'true' || false;
      const newColorTheme =
        (localStorage.getItem('colorTheme') as 'light' | 'dark') || 'light';

      const root = window.document.documentElement;
      root.classList.remove(state.colorTheme);

      localStorage.setItem('colorTheme', newColorTheme);
      localStorage.setItem('darkSide', newDarkSide.toString());
      state.colorTheme = newColorTheme;
      state.darkSide = newDarkSide;
      root.classList.add(newColorTheme);
    },
  },
});

export const { setTheme, toggleDarkSide, toggleColorTheme } = themeSlice.actions;

export const themeReducer = themeSlice.reducer;
