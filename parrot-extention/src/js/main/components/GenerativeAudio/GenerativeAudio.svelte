<script>
  import './GenerativeAudio.scss';

  const audioGenModel = [
    'model 1',
    'model 2',
    'model 3',
    'model 4',
  ]
  const audioGenStrategy = [
    'strategy 1',
    'strategy 2',
    'strategy 3',
    'strategy 4',
  ]
</script>



<div class="generative-content">
    <div >
      <p style = "display: inline">Prompt: </p><textarea></textarea>
    </div>

    <div class="audio-gen-options">
      <div>
        <p style = "display: inline">Version: </p>
          <select> 
              {#each audioGenModel as modelName}
                <option>{modelName}</option>
              {/each}
          </select>
      </div>

      <div>
        <p style = "display: inline"> Strategy: </p>
          <select> 
            {#each audioGenStrategy as strategy}
              <option>{strategy}</option>
            {/each}
          </select>
      </div>
      <div>
        <p style = "display: inline">Duration: </p><input type="number" min=3 max=20 />
      </div>
    </div>
    <div class="generate-btn">
      <button class= "sidebar-button" type="submit" >Generate</button>
    </div>
  </div>