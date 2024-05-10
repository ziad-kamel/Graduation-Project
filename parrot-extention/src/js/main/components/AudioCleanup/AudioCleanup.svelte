<script>
  import Replicate from "replicate";
  import { uploadFile } from "../helpers/upload";
  import "./AudioCleanup.scss";

  var file;
  var audioUrl;
  var denoisedAudio;
  var enhancedAudio;
  const replicate_token = import.meta.env.VITE_Replicate_TOKEN

  const setFile = async (inputFile) => {
    file = inputFile;
  };

  const audioCleanup = async (audioFileURL) => {
    try {
      const replicate = new Replicate({
        auth: replicate_token,
      });

      const input = {
        input_audio: audioFileURL
      };

      const output = await replicate.run(
        "lucataco/resemble-enhance:93266a7e7f5805fb79bcf213b1a4e0ef2e45aff3c06eefd96c59e850c87fd6a2",
        { input }
      );
      return output;
    } catch (error) {
      alert(`error: ${error}`);
      alert(`error: ${error.message}`);
    }
  };

  const handelCLick = async () => {
    await uploadFile(file).then((res)=>{
      audioUrl = res.url
    })
    var [denoisedResult, enhancedResult] = await audioCleanup(audioUrl);
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
  />
  <button class="sidebar-button" on:click={handelCLick}>Generate</button>

  <div>
    {#if denoisedAudio && enhancedAudio}
      <audio controls>
        <source src={denoisedAudio} type="audio/mpeg" />
      </audio>

      <audio controls>
        <source src={enhancedAudio} type="audio/mpeg" />
      </audio>
    {/if}
  </div>
</div>
