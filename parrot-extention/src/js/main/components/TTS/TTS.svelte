<script>
  import './TTS.scss';
  import {
    evalTS,
  } from "../../../lib/utils/bolt";

  let prompt = "";
  let responseAudio="";
  const path = require('path');
  const fs = require('fs');

  const importAudio = (filePath) => {
    // if(filePath)
    // alert(filePath);
      evalTS("importAudioClip", filePath).then((res) => {
      });
  };

  const POST_TTS = async () => {
    const ModelURL = 'https://api-inference.huggingface.co/models/facebook/fastspeech2-en-ljspeech';
    const HUGGING_FACE_TOKEN = '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';
    const resDiv = document.querySelector('.res');
    // remove the previous audio element if it exists 
    if (resDiv.firstChild) {
        resDiv.removeChild(resDiv.firstChild);
    }
    prompt = document.getElementById('prompt').value

    try {
        const response = await fetch(ModelURL, {
            headers: { Authorization: `Bearer ${HUGGING_FACE_TOKEN}` },
            method: "POST",
            body: JSON.stringify({ inputs: `${prompt}` }),
        });

        let myBlob = new Blob([await response.arrayBuffer()], { type: "audio/flac" });
        let audioURL = URL.createObjectURL(myBlob);
        responseAudio = audioURL

        // create a new audio element and append it to the div
        let audio = document.createElement("audio");
        audio.controls = true;
        audio.src = audioURL;
        resDiv.appendChild(audio);

        // download the response audio file to the directory "__dirname+"\\Downloaded Media\\""
        const downloadAndImport = async (url, prompt) => {
            // alert("Downloading")
            try{
              const downloadPathflac = path.join(__dirname, "Downloaded Media", prompt + ".flac");
              const downloadPathmp3 = path.join(__dirname, "Downloaded Media", prompt + ".mp3");
              const file = fs.writeFileSync(downloadPathflac, url);

              // convert the flac file to mp3
              const ffmpeg = require('fluent-ffmpeg');
              await ffmpeg(downloadPathflac)
                .toFormat('mp3')
                .on('end', function() {
                  importAudio([downloadPathmp3, prompt]);
                  //delete the flac file
                  fs.unlinkSync(downloadPathflac);
                  
                })
                .on('error', function(err) {
                  alert('an error happened: ' + err.message);
                })
                .save(downloadPathmp3);

              

            }catch(e){
              alert(e.message);
            }
        }
        downloadAndImport(Buffer.from(await myBlob.arrayBuffer()), prompt);

    } catch (error) {
        alert(`Error! code: ${error.message}`);
    }
  }

</script>

<div class = "tts-main hidden">
  <h1>TTS</h1>
  <textarea id="prompt" placeholder="enter the prompt"></textarea>
  <button on:click={POST_TTS}>Generate</button>

  <div class = "res">
    
  </div>
</div>
