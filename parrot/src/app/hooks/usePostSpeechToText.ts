import { customeInput } from "@/lib/types/STTStypes";
import { useState } from "react";



const usePostSpeechToText = () => {
    const [isloading , setIsLoading] = useState(false);
    const speechToText = async (FileURL: string) => {
        setIsLoading(true);
        const inputs: customeInput = {
            audioURL: FileURL,
        }

        return await fetch('/generation/speechToText/api', {
            method: 'POST',
            body: JSON.stringify({ inputs }),
            headers: {"Content-Type": "application/json"},
        })
        .then(async (res) => {
            setIsLoading(false);
            return await res.json();
        })
        .catch((error) => {
            setIsLoading(false);
            alert(`Error in API Call : ${error.message}`)
        })
    };
    return {isloading, speechToText}
}

export default usePostSpeechToText;