import { useState } from "react";

const useReadFile = () => {
    const [fileContent, setFileContent] = useState('');

    const readAudioFile = (filePath: string) => {
        
        return fileContent
    }

    return {readAudioFile}
}

export default useReadFile