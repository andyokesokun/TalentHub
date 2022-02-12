import './index.css'
import { Profiles } from "../../models";
import ProfileService from "../../services/profileService";
import ProfileComponent from "../Profile";
import {Button} from 'react-bootstrap'


const ProfileList = () => {
   
    var profiles = ProfileService.getProfiles();

    return(
        <div>
            <div className="d-flex flex-row flex-wrap">
                
                {profiles.length > 0 ?
                profiles.map(x => <div className ="profile"> <ProfileComponent  {...x} /></div> )
                :<p className="centered m-4 text-danger">No Data</p>
                }

            </div>
            
            {profiles.length > 0 && <Button className='centered' >Show More</Button> }
        </div>
     
     
    )
}

export default ProfileList