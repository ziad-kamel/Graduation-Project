import { customeInput } from "@/lib/types/AudioCleanuptypes";
import { useState } from "react";


const usePostAudioCleanup = () => {
    const[isLoading, setIsLoading] = useState(false);
    const AudioCleanup = async (FileUrl:string ) =>{
        setIsLoading(true);
        const inputs : customeInput = {
            audioURL : FileUrl,

        }
      return await fetch('/audioCleanup/api',{
        method:'POST' , 
        body: JSON.stringify({inputs}),
        headers:{"Contemt-Type"  : "application/json"},
      })  
      .then(async(res)=>{
        setIsLoading(false);
        return await res.json();
    
      })
      .catch((error)=>{
        setIsLoading(false);
        alert('Error in API Call : ${error.message}')

      })
    };
    return {isLoading, AudioCleanup}
}
export default usePostAudioCleanup;
