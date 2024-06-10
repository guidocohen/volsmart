import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { toggleColorTheme, toggleDarkSide } from '../../store/theme/slice';
import { RootState } from '../../store/reducers/types';

export const DarkSwitcher = () => {
  const dispatch = useDispatch();
  const { darkSide } = useSelector((state: RootState) => state.theme);

  const toggleTheme = () => {
    dispatch(toggleDarkSide());
    dispatch(toggleColorTheme());
  };

  return (
    <DarkModeSwitch
      className="m-3 flex items-center"
      checked={darkSide}
      onChange={toggleTheme}
      size={30}
    />
  );
};
