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

  import axios from 'axios';

  async function a() {

        // use https post request with the data
        const data = {
          version: "b05b1dff1d8c6dc63d14b0cdb42135378dcb87f6373b0d3d341ede46e59e2b38",
          input: {
            prompt: prompt,
            duration: duration,
            model_version: version,
            normalization_strategy: strategy
          }
        };

        alert("a7a 1")


        const out =await axios.post('https://api.replicate.com/v1/predictions', data, {
          headers: {
            "Authorization":"Token r8_d1g6LBLBi8Xyg45nbWVhA0baM9Xtttw4KBEox",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }})
        .then(async (response) => {
          alert(`1 ${JSON.stringify(await response.data)}`)
          output= JSON.stringify(await response.data);
          alert(`2 ${output}`)
          return await response.data.output;
          
        })
        .catch(function (error) {
          // handle error
          alert(error);
        })
        .finally(function () {
          alert(`3 ${out}`)
        });

      // alert(out)
      // output = out.output;

      alert(`4 ${output}`)
      
    };

    async function b() {

      alert("b1")
      try{
        alert("b2")
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
        alert(JSON.stringify(out))
        output = out;
      }catch(e){
        alert(e.message);
      }
      alert("b3")
    }
      


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
      <button class= "sidebar-button" type="submit" on:click={() =>{b()}} >Generate</button>
    </div>
    <div class="audio-output">
      <p>Generated Audio: {output}</p>
      {#if output}
        <audio controls>
          <source src = {output} type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
      {/if}
    </div>  
  </div>