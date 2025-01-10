import { RootState } from '../../types';
import { createSelector } from '@reduxjs/toolkit';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.lastModified || initialState;

export const selectLastModified = createSelector([selectSlice], (state) => state);