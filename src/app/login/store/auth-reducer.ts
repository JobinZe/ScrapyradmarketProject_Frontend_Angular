import {createReducer, on} from '@ngrx/store';
import {removeSession, setSession} from './auth-action';

export interface userData{
  sessionData:any | null
}
const initialState:userData = {
  sessionData:null
}

export const sessionReducer = createReducer(
initialState,
  on(setSession,(state,{sessionData})=>sessionData),
  on(removeSession,state=>initialState)
)
