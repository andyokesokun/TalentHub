import axios, {Method} from 'axios'


  const request = async <Type>({url,method,data}:{url:string, method?:Method, data?:{} }) : Promise<Type> => {
    
    try{
      const response = await axios({
          method: method,
          url: url,
          data: data || ""
        });
      console.log(response);
      return  response.data as Type;
    }catch(err: any){
        console.log('error',err.toJSON() );
        return Promise.reject("Error");
    }
   

  }

  function trimString(text: string, length: number): string{ 
          var trimedStr =text.substring(0,length);  
          return trimedStr.length < text.length ? trimedStr.concat("...") : text
   
     }
     
 



export {request, trimString};


