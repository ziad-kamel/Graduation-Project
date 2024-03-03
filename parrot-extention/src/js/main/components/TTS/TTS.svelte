<script>
  import './TTS.scss';

  let prompt = "";
  let responseAudio="";

  const POST_TTS = async () => {
    const ModelURL = 'https://api-inference.huggingface.co/models/facebook/fastspeech2-en-ljspeech';
    const HUGGING_FACE_TOKEN = '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';

    prompt = document.getElementById('prompt').value

    try {
        const response = await fetch(ModelURL, {
            headers: { Authorization: `Bearer ${HUGGING_FACE_TOKEN}` },
            method: "POST",
            body: JSON.stringify({ inputs: `${prompt}` }),
        });

        let myBlob = new Blob([await response.arrayBuffer()], { type: "audio/mpeg" });
        let audioURL = URL.createObjectURL(myBlob);
        responseAudio = audioURL

    } catch (error) {
        alert(`Error! code: ${error.message}`);
    }
  }
</script>

<div class = "tts-main hidden">
  <h1>TTS</h1>
  <textarea id="prompt" placeholder="enter the prompt"></textarea>
  <button on:click={POST_TTS}>Generate</button>

  <div >
    {#if responseAudio}
    <audio controls>
      <source type="audio/flac" src={responseAudio} />
    </audio>
    {/if}
  </div>
</div>
