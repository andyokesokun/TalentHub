import {Profile} from '../../models'
import  male  from '../../icons/male.svg'
import  female  from '../../icons/female.svg'
import {MdEmail,MdLocationPin,MdPhone} from 'react-icons/md'
import {Card, Button, CloseButton} from 'react-bootstrap';
import './index.css'
import { trimString } from '../../utils';

interface  ProfileProp{
     profile: Profile
}

const ProfileComponent: React.FC<ProfileProp> = ({profile}) => {

 
   return (<Card>
           <div  className='pr-2'>
               <CloseButton className='close-btn float-right'/>
            </div>
            <div className='round centered m-auto'>
               <Card.Img className="img" variant="top" src={profile.pronoun =='he' ? male : female } />
            </div>
            <Card.Body>
          
                <Card.Title className="centered">{profile.first_name} {profile.last_name}</Card.Title>
                <Card.Text>
                <div className ="centered m-2"><b>{profile.preferred_job_title}</b></div>
                <div className='d-flex centered m-2'>
                    <div className='social-Link'>                  
                        <a  className='link'  href={'mailto:'+ profile.email}><MdEmail  className ='icon'/></a>
                    </div>
                    <div className='social-Link'>
                        <a className='link' href={'tel:'+profile.phone }> <MdPhone className ='icon'/> </a>
                    </div>
                        
                </div>
                    <p className='m-2 w-fit'><MdLocationPin className ='icon'/> {trimString(profile.country + profile.city, 15) } </p>
                </Card.Text>
                <div className='d-flex flex-row flex-nowrap'>
                    <Button className='flex-grow-1 m-2' >Save</Button>
                    <Button className ='flex-grow-1 m-2'>View </Button>
                </div>
            </Card.Body>
       </Card>
  )

}

export default ProfileComponent
  
