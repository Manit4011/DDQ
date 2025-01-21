// selectors.ts
import { RootState } from '../../types';
import { createSelector } from '@reduxjs/toolkit';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.chat || initialState;

export const selectpage = createSelector([selectSlice], (state) => state);
