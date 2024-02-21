import { useEdgeStore } from "@/lib/edgestore";
import { UploadOptions } from "@edgestore/server/core";
import { useState } from "react";

// upload files to edgeStore
const useUpload = () => {
    const [loading, setIsLoading] = useState(false);
    const {edgestore} = useEdgeStore();

    const uploadFile = async (fileToUpload: File | undefined, customeOptions: UploadOptions)=> {
        //set the loader state and call edgestore.upload with a callback function that sets the audio url when successful
        setIsLoading(true);

        if(fileToUpload){
            return await edgestore.publicFiles.upload({file: fileToUpload, options: customeOptions})
            .then((res)=> {
                setIsLoading(false);
                return res.url
            })
            .catch((error) => {
                console.log(`Error when trying to upload the file ${error}`)
                setIsLoading(false);
                return error.message;
            })
        }
    };

    return {loading, uploadFile}
}

export default useUpload;