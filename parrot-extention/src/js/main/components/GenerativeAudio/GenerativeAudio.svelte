<script >
  import './GenerativeAudio.scss';

  import {
    Audio_Generation_Version,
    Normalization_Strategy,
  } from "../../../lib/utils/types";

  import Replicate from "replicate";
  

  let prompt;
  let version;
  let strategy;
  let duration =1;
  let output = "";
  // alert(process.env.REPLICATE_API_TOKEN)

  const generateAudio = async () => {
    alert(`Prompt: ${prompt}\nVersion: ${version}\nStrategy: ${strategy}\nDuration: ${duration}`);
    try {
      const replicate = new Replicate({
        auth: "r8_d1g6LBLBi8Xyg45nbWVhA0baM9Xtttw4KBEox",
      });
      const res = await replicate.run(
        "meta/musicgen:b05b1dff1d8c6dc63d14b0cdb42135378dcb87f6373b0d3d341ede46e59e2b38",
        {
          input: {
            prompt: prompt,
            duration: duration,
            model_version: version,
            normalization_strategy: strategy,
          }
        }
      );
      output = res.output;
    } catch (e) {
      alert(e.message);
    }
  };

 

  async function a() {
//     const express = require('express');
// const cors = require('cors');

// const app = express();

// // Enable CORS for all routes
// app.use(cors());

// // Your other middleware and routes
// // ...

// // Start the server
// const PORT = 3030;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
        // use https post request with the data
        const data = JSON.stringify({
          version: "b05b1dff1d8c6dc63d14b0cdb42135378dcb87f6373b0d3d341ede46e59e2b38",
          input: {
            prompt: prompt,
            duration: duration,
            model_version: version,
            normalization_strategy: strategy
          }
        });
        const options = {
          hostname: 'api.replicate.com',
          port: 443,
          path: '/v1/predictions',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
            'Authorization': 'Token r8_d1g6LBLBi8Xyg45nbWVhA0baM9Xtttw4KBEox',
          },
          body: data
        };

        alert("a7a 1")
        try {
          const replicate = new Replicate({
    auth: "r8_d1g6LBLBi8Xyg45nbWVhA0baM9Xtttw4KBEox",
  });
          const output = await fetch('https://api.replicate.com/v1/predictions', {
            method:"POST",
            headers:{
              "Authorization":"Token r8_d1g6LBLBi8Xyg45nbWVhA0baM9Xtttw4KBEox",
              "Content-Type": "application/json",
            },
            body: data
          })
        } catch (error) {
          alert(`Error! ${error.stack}`)
        }
        alert("a7a 2")

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
      <button class= "sidebar-button" type="submit" on:click={() =>{a()}} >Generate</button>
    </div>
    <div class="audio-output">
      <p>Output:</p> <p>{output}</p>
      <audio controls>
        <source src={output} type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>
    </div>  
  </div>