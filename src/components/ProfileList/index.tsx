import './index.css'
import { Profile } from "../../models";
import ProfileComponent from "../Profile";
import { useStore } from 'react-redux';
import { useState } from 'react';
import { JsxElement } from 'typescript';


 interface ProfileListProp{
     profiles: Array<Profile>
}
const ProfileListComponent: React.FC<ProfileListProp> = ({profiles}) => {
   
    

    return(
        <div>
            <div className="d-flex flex-row flex-wrap">
                
                {profiles.length > 0 ?
                profiles.map(x => <div className ="profile" key={x.uuid} > <ProfileComponent  profile={x}  /></div> )
                :<p className="centered m-4 text-danger" >No Data</p>
                }

            </div>
        </div>
     
     
    )
}

export default ProfileListComponent