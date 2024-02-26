import { useState } from "react";


const usePostAudioGeneration = () => {
    console.log("usePostAudioGeneration")
    const [isloading, setIsLoading] = useState(false);
    // prompt: String
    const audioGeneration = async (prompt: String) => {
        setIsLoading(true);
        // const input = {
        //     inputPrompt: prompt
        // }

        const input = "A man is speaking under the water."
        console.log(input)
        return await fetch('/audiogeneration/api/', {
            method: 'POST',
            body: JSON.stringify({ input }),
            headers: {"Content-Type": "application/json"},
        })
        .then(async (res) => {
            setIsLoading(false);
            console.log("res")
            console.log(res)
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
