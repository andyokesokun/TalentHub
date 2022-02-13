interface BaseField{
   uuid: string,
   created_at: Date,
   updated_at: Date,
   deleted_at?: Date

}

interface  Portfoliolink extends BaseField{
   url: string,
   name: string
}


interface  Skill extends BaseField{
    name: string,
    year_of_experience: number,
    note: string
 }

 
interface  WorkExperience extends BaseField{
    company_name: string,
    location: number,
    job_title: string,
    description: string,
    start_date: Date,
    end_date: Date,
    primary_technologies: []

 }


 interface  Education extends BaseField{
    institution_name: string,
    location: number,
    job_title: string,
    degree: string,
    program: Date,
    overview: string,
    start_date: Date,
    end_date: Date,

 }


 interface Edge{
    portfoliolinks: Array<Portfoliolink>,
    skills: Array<Skill>,
    work_experiences: Array<WorkExperience>,
    education: Array<Education>,


 }

 export interface Profile extends BaseField{
    first_name: string,
    last_name: string,
    preferred_name: string,
    pronoun: string,
    preferred_job_title: string,
    professional_start_date: string,
    email: string,
    phone: string,
    country: string,
    city: string,
    edges: Edge

 }

 export interface Profiles{
     total: number,
     next: string,
     items: Array<Profile>
     fetchedNew? : boolean

 }

 export interface ItemsPerPage{
    value : number
 }








