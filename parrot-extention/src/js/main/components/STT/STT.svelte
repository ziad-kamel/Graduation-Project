<script>
  import Replicate from "replicate";
  import { uploadFile } from '../helpers/upload';
  import "./STT.scss";
  var file;
  var audioUrl;
  var outputText='';
  

  const setFile = async (inputFile) => {
    file = inputFile;
  };

  const onSubmitClicked = async () => {
    await uploadFile(file).then((res)=>{
      audioUrl = res.url
    })

    outputText = await STT();
  };

  const STT = async () => {
    try {
      const replicate = new Replicate({
        auth: "r8_V0orDpY9E6fpUDkUUYq1P3xPjn5kvud4MjDxq",
      });

      const output = await replicate.run(
        "openai/whisper:4d50797290df275329f202e48c76360b3f22b08d28c196cbc54600319435f8d2",
        {
          input: {
            audio: audioUrl,
          },
        }
      );
      alert(output.transcription);
      return output.transcription;
    } catch (error) {
      alert(error.message);
    }
  };

</script>

<div class="stt-main hidden">
  <h1>Speech To Text</h1>
  <input
    type="file"
    on:change={(e) => {
      setFile(e.target.files?.[0]);
    }}
  />

  <button class="sidebar-button" on:click={onSubmitClicked}>Generate</button>

  <p>{outputText}</p>
</div>
