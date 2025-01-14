// selectors.ts
import { RootState } from '../../types';
import { createSelector } from '@reduxjs/toolkit';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.user || initialState;

export const selectUser = createSelector([selectSlice], (state) => state);
