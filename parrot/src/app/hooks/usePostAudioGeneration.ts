import { useState } from "react";

const usePostAudioGeneration=() => {
    const [isLoading,setIsLoading]=useState(false);
    const audioGeneration=async(prompt:String) =>{
        setIsLoading(true);
        const inputs={
            inputPrompt:prompt
        }

        return await fetch('/audiogeneration/api', {
            method:'POST',
            body:JSON.stringify({inputs}),
            headers:{"Content-Type":"application/json"}
        })
        .then(async (res) => {
            setIsLoading(false);
            return await res.json();
        })
        .catch((error) =>{ 
            setIsLoading(false);
            alert(`Error in API call: ${error.massage}`)
        })
    };
    return {isLoading, audioGeneration}
}

export default usePostAudioGeneration;
