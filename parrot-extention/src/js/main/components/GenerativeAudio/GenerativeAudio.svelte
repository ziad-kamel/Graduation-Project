<script context="module">
  import { path } from "../../../lib/cep/node";
  import {
    Audio_Generation_Version,
    Normalization_Strategy,
  } from "../../../lib/utils/types";
  import './GenerativeAudio.scss';

  import {
    evalTS,
  } from "../../../lib/utils/bolt";

  import Replicate from "replicate";
  

  let prompt;
  let version;
  let strategy;
  let duration =1;
  let output = "";
  const replicate_token = import.meta.env.VITE_Replicate_TOKEN

  const generateAudio = async () => {
    const resDiv = document.querySelector('.audio-output');
    // remove the previous audio element if it exists 
    if (resDiv.firstChild) {
        resDiv.removeChild(resDiv.firstChild);
    }
    try{
        const replicate = new Replicate({
          auth: replicate_token,
        });

        const out = await replicate.run(
          "meta/musicgen:b05b1dff1d8c6dc63d14b0cdb42135378dcb87f6373b0d3d341ede46e59e2b38",
          {
            input: {
              prompt: prompt,
              duration: duration,
              model_version: version,
              normalization_strategy: strategy
            }
          }
        );
        output = out;

        // create a new audio element and append it to the div
        let audio = document.createElement("audio");
        audio.controls = true;
        audio.src = output;
        resDiv.appendChild(audio);
      }catch(e){
        alert(e.message);
      }

      // download and import that file
      try{
        downloadAndImport(output,prompt)
      }catch(e){
        alert(e.message);
      }
  };

  const https = require('https');
  const fs = require('fs');
  // const ProgressBar = require('svelte-progress-bar')

  // let progress = new ProgressBar({
  //   target: document.querySelector('body'),
  //   props: { color: '#01e9e9' }
  // })

  export const downloadAndImport = (url, name) => {
    alert("Downloading and Importing Audio");
    // download the url content and save it to the local storage using node
    try{
      var downloadDir = path.resolve(__dirname+"\\Downloaded Media\\",name+".wav");
      const file = fs.createWriteStream(downloadDir);
      https.get(url, function(response) {

        response.pipe(file);
        file.on('finish', function() {
          file.close(); 
          try{

            importAudio([downloadDir,name]);
          }catch (e){
            alert(e.message);
            output = e;
          }
        });
      }).on('error', function(err) { 
        fs.unlink(downloadDir); 
        output = err;
      });
    }catch(e){
      alert(e.message);
      output = e;
    }
    
  }

  const importAudio = (filePath) => {
    // if(filePath)
    // alert(filePath);
      evalTS("importAudioClip", filePath).then((res) => {
      });
  };


</script>



<div class="generative-content">
    <div >
      <textarea bind:value={prompt} placeholder="Enter the prompt"></textarea>
    </div>

    <div class="audio-gen-options">
      <div>
        <p style = "display: inline">Version: </p>
          <select bind:value={version}> 
              <option value="" disabled selected hidden>select a version</option>
              {#each Audio_Generation_Version as modelName}
                <option>{modelName.model_version}</option>
              {/each}
          </select>
      </div>

      <div>
        <p style = "display: inline"> Strategy: </p>
          <select bind:value={strategy}> 
            <option value="" disabled selected hidden>select a strategy</option>
            {#each Normalization_Strategy as strategy}
              <option>{strategy.strategy}</option>
            {/each}
          </select>
      </div>
      <div>
        <p style="display: inline">Duration: </p><input bind:value={duration} type="number" min=3 max=20 />
      </div>
    </div>
    <div class="generate-btn">
      <button class= "sidebar-button" type="submit" on:click={() =>{generateAudio()}} >Generate</button>
    </div>
    <div class="audio-output">
    </div>  
  </div>