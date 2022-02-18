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
        path :"/savedProfiles",
        Component: ProfileView,
        prop : {pageName: PageNameConst.SAVEPROFILE} as ProfileViewProp

      },

] 


 export default routes