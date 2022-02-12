import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { profile } from "console";
import { Profile, Profiles } from "../models"
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
    pageNum: 1,
    itemStart: 1,
    itemEnd:  5,
    hasData: false, 
    fetchedNew: false, 

}



const profileSlice = createSlice({
    name: "profiles",
    initialState: initalState,
    reducers:{
        addProfiles: (state, action: PayloadAction<Profiles | null > ) =>{   
            
              if(!state.hasData && action.payload !=null){
                    var profiles = action.payload as Profiles
                    state.profiles.push(...profiles.items)
                    state.nextPage =profiles.next
                    state.totalRecords =  state.totalRecords + profiles.items.length
                
                    state.pagedProfiles.push(...addNextProfilesToPagedList(state))
                    state.hasData = true
              }
              
              
        },
        nextProfiles:(state, action: PayloadAction<Profiles | null >) =>{
            //we fetched new data from the api
            if(action.payload !=null){
                var profiles = action.payload as Profiles
                state.profiles.push(...profiles.items)
                
                state.previousPage =  state.nextPage
                state.nextPage =profiles.next
                   
                state.hasData = true
            
            }
            
            var nextPage = (state.pageNum + 1);
            state.pageNum =  nextPage
            //begining of the next Page Item index + 1
            state.itemStart = state.itemEnd
            //end of the nextPage Item 
            state.itemEnd = nextPage * state.showPerPage  
            

            state.pagedProfiles.push(...addNextProfilesToPagedList(state)) 
            

        }
     
    }
})

export  const {addProfiles,nextProfiles} = profileSlice.actions

export type ProfileType  = typeof initalState

const addNextProfilesToPagedList = (state: ProfileType) => 
                    (state.profiles.filter((x,i)  =>  i > (state.itemStart - 1) && i < (state.itemEnd - 1)   ) )

export default profileSlice.reducer;