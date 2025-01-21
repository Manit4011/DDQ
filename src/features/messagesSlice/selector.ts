// selectors.ts
import { RootState } from '../../types';
import { createSelector } from '@reduxjs/toolkit';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.messages || initialState;

export const selectMessages = createSelector([selectSlice], (state) => state);
