import { request } from "../utils"
import {Profile,Profiles} from  "../models"
import { AnyAction, Dispatch, Store } from "redux";
import {addProfiles} from '../reducers/profileSlice'
import { ThunkAction } from "redux-thunk";
import { AppState } from "../store";
import { useAppSelector } from "../hooks";
import { useSelector } from "react-redux";



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

    static getProfiles = (pageNum: number): Array<Profile> => {
         var profiles = useAppSelector(  (state) => state.profileSlice.profiles )    
         var itemsPerPage = useAppSelector( (state) => state.profileSlice.showPerPage )
         var searchValue = useAppSelector( (state) => state.profileSlice.searchValue )

         //end of the nextPage Item 
         var itemEnd = ( pageNum * itemsPerPage);
       
    
         if(searchValue){
            console.log(searchValue)
              
             var data= [...(profiles.filter((x)  =>
                          x.preferred_job_title.toLowerCase().includes(searchValue.toLowerCase())
                          || x.country.toLowerCase().includes(searchValue.toLowerCase())
                          || x.city.toLowerCase().includes(searchValue.toLowerCase())
                          || x.edges.work_experiences.length >= parseInt(searchValue.toLowerCase())
                          ) )]
                          
            return data.filter( (x,i) => i < itemEnd)
         }
         return profiles.filter((x,i)  =>  i < itemEnd  )
        
    }

    
    static getNextProfiles = (pageNum: number): ThunkAction<void, AppState, unknown, AnyAction> =>  {   
              
        return async (dispatch, getCurrentState) => {
                 

        var currentTotalItems =getCurrentState().profileSlice.totalRecords;
        var itemsPerPage = getCurrentState().profileSlice.showPerPage;
        var nextPage = getCurrentState().profileSlice.nextPage;

        var itemEnd = ( pageNum * itemsPerPage); 
 
        var profileList: Profiles | null 
           
            //we need to fetch more data from the API
            console.log('endEnd',itemEnd)
            console.log('currentTotalItems',currentTotalItems)
            if( (itemEnd > currentTotalItems) ){
                profileList=await  this.fetchProfiles(nextPage)
                dispatch(addProfiles(profileList) );
            }
            
         }  
        
      
    }

}

export default ProfileService;