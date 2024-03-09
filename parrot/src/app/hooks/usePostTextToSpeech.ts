import { useState } from "react";

const useTextToSpeech = () => {
    //define a loader state to display the loading component
    const [loading, setLoading] = useState(false);
    
    //call-back function  that will be called will do the api request
    const textToSpeech = (modelURL: string, textInput:string):Promise<string | any> => {
        
        //set the loader to be loading while API calling
        setLoading(true);

        //API calling with the user text and the selected model
        return fetch('/generation/TextToSpeech/api/generate', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                modelUrl: modelURL,
                input: textInput,
                })
            })
            .then(async (response) => {
                //create an audio blob string from the response
                const audioURL = URL.createObjectURL(new Blob([await response.arrayBuffer()], { type: "audio/mpeg" }));
                
                //turn off the loader
                setLoading(false);
                //return the audio blob to be displayed in the player
                return audioURL;
            })
            .catch((error:Error) =>  {
                console.log(`error from tts hook ${error.message}`);
                setLoading(false);
                return ;
            })
    };
    return {loading,textToSpeech}
}
export default useTextToSpeech;