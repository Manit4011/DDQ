// selectors.ts
import { RootState } from '../../types';
import { createSelector } from '@reduxjs/toolkit';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.auth || initialState;

export const selectAuth = createSelector([selectSlice], (state) => state);
