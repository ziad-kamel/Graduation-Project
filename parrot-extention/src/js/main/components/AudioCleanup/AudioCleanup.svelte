<script>
  import Replicate from "replicate";
  import { uploadFile } from "../helpers/xataUpload";
  import "./AudioCleanup.scss";

  var file;
  var audioUrl;
  var denoisedAudio;
  var enhancedAudio;

  const setFile = async (inputFile) => {
    file = inputFile;
  };

  const audioCleanup = async (audioFileURL) => {
    try {
      const replicate = new Replicate({
        auth: "r8_V0orDpY9E6fpUDkUUYq1P3xPjn5kvud4MjDxq",
      });

      alert(`url: ${audioFileURL}`)
      const input = {
        input_audio: audioFileURL
      };

      const output = await replicate.run(
        "lucataco/resemble-enhance:93266a7e7f5805fb79bcf213b1a4e0ef2e45aff3c06eefd96c59e850c87fd6a2",
        { input }
      );
      alert(output);
    } catch (error) {
      alert(`error: ${error}`);
      alert(`error: ${error.message}`);
    }
  };

  const handelCLick = async () => {
    audioUrl = await uploadFile(file);
    var { denoisedResult, enhancedResult } = await audioCleanup(audioUrl);
    denoisedAudio = denoisedResult;
    enhancedAudio = enhancedResult;
  };
</script>

<div class="cleanup-main hidden">
  <h1>Audio Cleanup</h1>
  <input
    type="file"
    on:change={(e) => {
      setFile(e.target.files?.[0]);
    }}
  /> <textarea></textarea>
  <button class="sidebar-button" on:click={handelCLick}>CLEAN</button>

  <div>
    {#if denoisedAudio && enhancedAudio}
      <audio controls>
        <source src={denoisedAudio} type="audio/mpeg" />
      </audio>

      <audio controls>
        <source src={enhancedAudio} type="audio/mpeg" />
      </audio>
    {/if}
    <h1>hii</h1>
  </div>
</div>
