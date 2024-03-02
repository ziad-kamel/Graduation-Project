// import { customeInput } from "@/lib/types/AudioCleanuptypes";
// import { useState } from "react";

// const usePostAudioCleanup = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const AudioCleanup = async (FileUrl: string) => {
//     setIsLoading(true);
//     const inputs: customeInput = {
//       audioURL: FileUrl,
//     };
//     return await fetch("/audioCleanup/api", {
//       method: "POST",
//       body: JSON.stringify({ inputs }),
//       headers: { "Contemt-Type": "application/json" },
//     })
//       .then(async (res) => {
//         setIsLoading(false);
//         return await res.json();
//       })
//       .catch((error) => {
//         setIsLoading(false);
//         alert("Error in API Call : ${error.message}");
//       });
//   };
//   return { isLoading, AudioCleanup };
// };
// export default usePostAudioCleanup;

import { customeInput } from "@/lib/types/AudioCleanuptypes";
import { useState } from "react";

const usePostAudioCleanup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const AudioCleanup = async (FileUrl: string) => {
    setIsLoading(true);
    const inputs: customeInput = {
      audioURL: FileUrl,
    };
    try {
      const response = await fetch("/audioCleanup/api", {
        method: "POST",
        body: JSON.stringify({ inputs }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const responseData = await response.json();
      setIsLoading(false);
      return responseData;
    } catch (error: any) {
      // Explicitly specify the type as 'any'
      setIsLoading(false);
      alert(`Error in API Call: ${error.message}`);
    }
  };

  return { isLoading, AudioCleanup };
};

export default usePostAudioCleanup;
