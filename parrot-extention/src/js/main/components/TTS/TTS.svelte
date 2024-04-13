<script>
  import {
    evalTS,
  } from "../../../lib/utils/bolt";
  import { TTS_MODELS } from "../../../lib/utils/types";
  import './TTS.scss';
  let prompt = "";
  let responseAudio="";
  let selectedModel;
  const path = require('path');
  const fs = require('fs');

  const importAudio = (filePath) => {
    // if(filePath)
    // alert(filePath);
      evalTS("importAudioClip", filePath).then((res) => {
      });
  };

  const POST_TTS = async () => {
    alert(`selectedModel: ${selectedModel}`)
    var ModelURL = selectedModel;
    alert(`ModelURL: ${ModelURL}`)
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
  <div class="selections">
    <textarea id="prompt" placeholder="Enter the prompt"></textarea>
    <div class="selections">
      <select bind:value={selectedModel}>
        <option value="" disabled selected hidden>select a model</option>
        {#each TTS_MODELS as model}
              <option value={model.url}>{model.name}</option>
        {/each}
      </select>
      <button class="sidebar-button"  on:click={POST_TTS}>Generate</button>
    </div>
  </div>

  <div class = "res">
    
  </div>
</div>
