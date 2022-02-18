import  reducer from '../reducers'
import {AnyAction} from 'redux'
import thunk,{ThunkAction} from 'redux-thunk'
import ProfileService from '../services/profileService';
import { useAppDispatch } from '../hooks';
import { configureStore } from '@reduxjs/toolkit';


var store =  configureStore(
              {reducer, 
                 middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false})
               });


export  default store;

export type AppState  = ReturnType<typeof  reducer>
export type AppDispatch  = typeof  store.dispatch 


export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  AnyAction
>

if(!store.getState().profileSlice.hasData){
    store.dispatch(ProfileService.fetchAndSaveToStore())
}


function checkStoreData(){
    console.log(store.getState().profileSlice.profiles );
}


store.subscribe(checkStoreData);
