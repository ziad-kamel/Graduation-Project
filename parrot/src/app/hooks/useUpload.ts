import { useEdgeStore } from "@/lib/edgestore";
import { UploadOptions } from "@edgestore/server/core";
import { useState } from "react";

// upload files to edgeStore
const useUpload = () => {
    const [uploading, setIsUpLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const {edgestore} = useEdgeStore();

    const uploadFile = async (fileToUpload: File | undefined, customeOptions: UploadOptions)=> {
        //set the loader state and call edgestore.upload with a callback function that sets the audio url when successful
        setIsUpLoading(true);

        if(fileToUpload){
            return await edgestore.publicFiles.upload({file: fileToUpload, options: customeOptions, onProgressChange: (progress) => {
                setUploadProgress(progress)
            }})
            .then((res)=> {
                setIsUpLoading(false);
                return res.url
            })
            .catch((error) => {
                console.log(`Error when trying to upload the file ${error}`)
                setIsUpLoading(false);
                return error.message;
            })
        }
    };

    return {uploading, uploadProgress, uploadFile}
}

export default useUpload;