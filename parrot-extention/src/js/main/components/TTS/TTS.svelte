<script>
  import { csi, evalES } from '../../../lib/utils/bolt';
  import './TTS.scss';
  const jsxTest = () => {
    console.log(evalES(`helloWorld("${csi.getApplicationID()}")`));
  };
  let prompt = "";
  let res;
  const POST_TTS = async () => {
    prompt = document.getElementById('prompt').value
    alert(prompt)

    const ModelURL = 'https://api-inference.huggingface.co/models/facebook/fastspeech2-en-ljspeech';
    const HUGGING_FACE_TOKEN = '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';

    try {
        alert('starting')
        const response = await fetch(ModelURL, {
            headers: { Authorization: "Bearer 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" },
            method: "POST",
            body: JSON.stringify({ inputs: "hello world" }),
        });
        alert('updating res')
        
        alert(JSON.stringify(response.body))
        res = await response.arrayBuffer()
    } catch (error) {
        alert(`Error! code: ${error.message}`);
    }
    alert('done')
  }
</script>

<div class = "tts-main hidden">
  <h1>TTS</h1>
  <textarea id="prompt" placeholder="enter the prompt"></textarea>
  <button on:click={POST_TTS}>Generate</button>

  <div>
    <h1 style="color: white;"> {res}</h1>
  </div>
</div>
