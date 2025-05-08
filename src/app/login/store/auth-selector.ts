import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UserSession} from '../../model/session.model';

export const selectionState = createFeatureSelector<UserSession>('session')
export  const selectionSessionState = createSelector(
  selectionState,
  (state:any)=>state)

