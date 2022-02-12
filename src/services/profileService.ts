import { request } from "../utils"
import {Profile,Profiles} from  "../models"
import { AnyAction, Dispatch, Store } from "redux";
import {addProfiles,nextProfiles} from '../reducers/profileSlice'
import { ThunkAction } from "redux-thunk";
import { AppState } from "../store";
import { useAppSelector } from "../hooks";



class ProfileService{

    static  async fetchProfiles(nextPage?: string) : Promise<Profiles>{
         
         type queryParameters={
              next? : string         
          };

         var queryObject : queryParameters = {};
         queryObject.next =nextPage
         var url = process.env.REACT_APP_GET_PROFILES as string

         var queryStr = new URLSearchParams(queryObject).toString();

         if(this.length >  0){
             url = url + queryStr;
         }
         
         var profileList: Profiles  = await request<Profiles>({url})
         return profileList;

    }

    static fetchAndSaveToStore  =  (): ThunkAction<void, AppState, unknown, AnyAction> =>  {    
        return async dispatch => {
           var profiles=await  this.fetchProfiles()
           dispatch(addProfiles(profiles));
        } 
    }

    static getProfiles = (): Array<Profile> => {
          return useAppSelector(  (state) => state.profileSlice.pagedProfiles )
        
    }

    
    static getNextProfiles = (): ThunkAction<void, AppState, unknown, AnyAction> =>  {   
      
        return async dispatch => {
            
            var lastItemIndex = useAppSelector(  (state) => state.profileSlice.itemEnd )
            var currentTotalItems = useAppSelector(  (state) => state.profileSlice.totalRecords )
            var nextpage = useAppSelector(  (state) => state.profileSlice.nextPage )

            var profileList: Profiles | null 
           
            //we need to fetch more data from the API
            if(lastItemIndex == currentTotalItems){
                profileList=await  this.fetchProfiles(nextpage)
                dispatch(nextProfiles(profileList) );
            }
            
         }  
        
      
    }

}

export default ProfileService;