import ProfileView from "../views/ProfileView";
import {ProfileViewProp} from '../models'
import { PageNameConst } from "../constants";


 const routes = [
        
      {
        path :"/",
        Component: ProfileView,
        prop : {pageName:  PageNameConst.HOMEPAGE} as ProfileViewProp

      },
      {
        path :"/saved-profiles",
        Component: ProfileView,
        prop : {pageName: PageNameConst.SAVEDPROFILE} as ProfileViewProp

      },
      {
        path :"/deleted-profiles",
        Component: ProfileView,
        prop : {pageName: PageNameConst.DELETEDPROFILE} as ProfileViewProp

      }

] 


 export default routes