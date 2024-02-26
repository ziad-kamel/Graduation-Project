import { useState } from "react";


const usePostAudioGeneration = () => {

    const [isloading, setIsLoading] = useState(false);

    const audioGeneration = async (prompt: String) => {
        setIsLoading(true);

        const input = prompt

        return await fetch('/audiogeneration/api/', {
            method: 'POST',
            body: JSON.stringify({ input }),
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
    return {isloading, audioGeneration}
}

export default usePostAudioGeneration;
