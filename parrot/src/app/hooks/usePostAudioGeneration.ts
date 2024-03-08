import { audioGenerationInputs } from "@/lib/types/audioGenTypes";
import { useState } from "react";

const usePostAudioGeneration = () => {
    const [isloading, setIsLoading] = useState(false);

    const audioGeneration = async (inputs: audioGenerationInputs) => {
        setIsLoading(true);

        return await fetch('/generation/audiogeneration/api/', {
            method: 'POST',
            body: JSON.stringify(inputs),
            headers: {"Content-Type": "application/json"},
        })
        .then(async (generatedAudio) => {
            setIsLoading(false);
            return await generatedAudio.json();
        })
        .catch((error) => {
            setIsLoading(false);
            alert(`Error while fetch: ${error.message}`);
            return ""
        })
    };
    return {isloading, audioGeneration}
}

export default usePostAudioGeneration;