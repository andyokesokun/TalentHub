import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { profile } from "console";
import { ItemsPerPage, Profile, Profiles, SearchItem,ProfileId } from "../models"
import { AppState } from "../store";

const initalState ={
    profiles: new Map<string,Profile>(),
    nextPage: "",
    previousPage: "",
    totalRecords: 0,
    showPerPage: 5,
    hasData: false, 
    searchValue :""


}



const profileSlice = createSlice({
    name: "profiles",
    initialState: initalState,
    reducers:{
        addProfiles: (state, action: PayloadAction<Profiles | null > ) =>{   
            
              if(action.payload !=null){
                    var profiles = action.payload as Profiles
                    
                    for(var p of profiles.items){  
                            state.profiles.set(p.uuid, p)
                            p.deleted  = false
                        }                 
                               
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
    
        },
       addSearchValue: (state, action:PayloadAction<SearchItem> ) => {
               state.searchValue =  action.payload.value;    
      },

       saveProfile: (state, action:PayloadAction<ProfileId> ) => {           
          var uuid = action.payload.profileId;
          var profile = state.profiles.get(uuid)        
          if(profile ){     
                profile.savedbyUser = true   
                profile.deleted = false     
                state.profiles.set(profile.uuid, profile)
           }
             
      },
      removeProfile: (state, action:PayloadAction<ProfileId> ) => {           
        var uuid = action.payload.profileId;
        var profile = state.profiles.get(uuid)
        console.log("inside");
        if(profile ){     
              profile.deleted = true  
              profile.savedbyUser = false        
              state.profiles.set(profile.uuid, profile)
         }
           
    }
        
    }
})

export  const {addProfiles,changeShowPerPage,addSearchValue, saveProfile,removeProfile } = profileSlice.actions

export type ProfileType  = typeof initalState

export default profileSlice.reducer;