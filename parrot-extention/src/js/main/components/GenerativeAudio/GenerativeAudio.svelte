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
      Prompt: <textarea></textarea>
    </div>

    <div class="audio-gen-options">
      <div>
          Version: 
          <select> 
              {#each audioGenModel as modelName}
                <option>{modelName}</option>
              {/each}
          </select>
      </div>

      <div>
          Strategy: 
          <select> 
            {#each audioGenStrategy as strategy}
              <option>{strategy}</option>
            {/each}
          </select>
      </div>
      <div>
        Duration: <input type="number" min=3 max=20 />
      </div>
    </div>
    <div class="generate-btn">
      <input type="submit" value="Generate">
    </div>
  </div>