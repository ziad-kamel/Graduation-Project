<script >
  import './GenerativeAudio.scss';
  import { path } from "../../../lib/cep/node";
  import {
    Audio_Generation_Version,
    Normalization_Strategy,
  } from "../../../lib/utils/types";

  import {
    csi,
    evalES,
    evalTS,
    subscribeBackgroundColor
  } from "../../../lib/utils/bolt";

  import Replicate from "replicate";
  

  let prompt;
  let version;
  let strategy;
  let duration =1;
  let output = "";
  // alert(process.env.REPLICATE_API_TOKEN)

  const generateAudio = async () => {
    try{
        const replicate = new Replicate({
          auth: "r8_d1g6LBLBi8Xyg45nbWVhA0baM9Xtttw4KBEox",
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

  const downloadAndImport = (url, name) => {
    alert("Downloading and Importing Audio");
    // download the url content and save it to the local storage using node
    try{
      var downloadDir = path.resolve(__dirname+"\\Downloaded Media\\",name+".wav");
      const file = fs.createWriteStream(downloadDir);
      https.get(url, function(response) {

        response.pipe(file);
        file.on('finish', function() {
          file.close(); 
          alert("done")
          alert("importing")
          try{

            importAudio([downloadDir,name]);
          }catch (e){
            alert(e.message);
            output = e;
          }
          alert("imported")
        });
      }).on('error', function(err) { // Handle errors
        fs.unlink(downloadDir); // Delete the file async. (But we don't check the result)
        // if (cb) cb(err.message);
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
      <p style = "display: inline">Prompt: </p><textarea bind:value={prompt}></textarea>
    </div>

    <div class="audio-gen-options">
      <div>
        <p style = "display: inline">Version: </p>
          <select bind:value={version}> 
              {#each Audio_Generation_Version as modelName}
                <option>{modelName.model_version}</option>
              {/each}
          </select>
      </div>

      <div>
        <p style = "display: inline"> Strategy: </p>
          <select bind:value={strategy}> 
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
      <p>output:  {output}</p>
      {#if output}
        <audio controls>
          <source src = {output} type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
      {/if}
    </div>  
  </div>