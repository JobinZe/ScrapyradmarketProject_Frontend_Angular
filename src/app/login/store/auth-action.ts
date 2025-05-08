import {createAction, props} from '@ngrx/store';

export const setSession = createAction(
  "[Set Session] Set Session",
  props<{sessionData:any}>()
  )

export const removeSession = createAction(
  "[Remove Session] Remove Session",
)
