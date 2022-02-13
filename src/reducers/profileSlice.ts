import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { profile } from "console";
import { ItemsPerPage, Profile, Profiles } from "../models"
import { AppState } from "../store";

const initalState ={
    profiles: Array<Profile>(),
    savedProfiles : Array<Profile>(),
    removedProfiles: Array<Profile>(),
    pagedProfiles:  Array<Profile>(),
    nextPage: "",
    previousPage: "",
    totalRecords: 0,
    showPerPage: 5,
    hasData: false, 


}



const profileSlice = createSlice({
    name: "profiles",
    initialState: initalState,
    reducers:{
        addProfiles: (state, action: PayloadAction<Profiles | null > ) =>{   
            
              if(action.payload !=null){
                    var profiles = action.payload as Profiles
                    state.profiles.push(...profiles.items)
                    
                    state.previousPage = state.nextPage
                    state.nextPage =profiles.next

                    state.totalRecords =  state.totalRecords + profiles.items.length
                    state.hasData =true
              }             
              
        },
        changeShowPerPage: (state, action:PayloadAction<ItemsPerPage> ) => {
              var showPerPage = action.payload.value;
              if(showPerPage >  10){
                 showPerPage = 10
              }else{
                  state.showPerPage = showPerPage
              }
          

        }

    }
})

export  const {addProfiles,changeShowPerPage} = profileSlice.actions

export type ProfileType  = typeof initalState

export default profileSlice.reducer;