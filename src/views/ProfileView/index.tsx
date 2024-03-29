import ProfileService from "../../services/profileService";
import {Button} from 'react-bootstrap'
import { useAppDispatch, usePagination } from '../../hooks';
import ProfileListComponent from '../../components/ProfileList';
import { ProfileViewProp } from "../../models";



const ProfileView: React.FC<ProfileViewProp> = ({pageName}) => {
   
    var {currentPageNum, nextPage} = usePagination(1);
    var profiles = ProfileService.getProfileHandler(pageName, currentPageNum)
   
    console.log('pageType',pageName)
    var dispatch = useAppDispatch()
    


    const showMore = () => {
        var nextValue = currentPageNum  + 1
        dispatch(ProfileService.getNextProfiles(nextValue))
        nextPage()    
         
    }

    return(
        <div>
            <div className="d-flex flex-row flex-wrap">
                <ProfileListComponent  profiles={profiles} />
            </div>
        
        {profiles.length > 0 && <Button className='centered' onClick={showMore} >Show More</Button> }
    </div>
  
    )
}

export default ProfileView