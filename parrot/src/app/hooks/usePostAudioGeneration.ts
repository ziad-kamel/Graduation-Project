import { audioGenerationInputs } from "@/lib/types/audioGenTypes";
import { useState } from "react";

const usePostAudioGeneration = () => {
    const [isLoading , setIsLoading] = useState(false);

    const audioGeneration = async (inputs: audioGenerationInputs) => {
        setIsLoading(true);

        return await fetch('/audiogeneration/api', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputs),
        })
        .then(async (generatedAudio) => {
            setIsLoading(false);
            return await generatedAudio.json();
        })
        .catch((error) => {
            setIsLoading(false);
            alert(`Error while fetch: ${error.message}`);
            return ""
        });
    };
    return {isLoading, audioGeneration};
};

export default usePostAudioGeneration;