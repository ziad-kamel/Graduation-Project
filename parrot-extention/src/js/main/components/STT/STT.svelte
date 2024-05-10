<script>
  import Replicate from "replicate";
  import {
    evalTS,
  } from "../../../lib/utils/bolt";
  import { uploadFile } from '../helpers/upload';
  import "./STT.scss";
  var file;
  var audioUrl;
  var outputText='';
  var retval = "";
  const replicate_token = import.meta.env.VITE_Replicate_TOKEN


  const setFile = async (inputFile) => {
    file = inputFile;
  };

  const onSubmitClicked = async () => {
    await uploadFile(file).then((res)=>{
      audioUrl = res.url
    })

    outputText = await STT();

    for(let i = 0; i < retval.length; i++) {

        var startTime = retval[i].start;
        var endTime = retval[i].end;

        var text = retval[i].text

        // alert(text + startTime + endTime)

        evalTS("importSubtitle", [startTime.toString(), endTime.toString(), text]).then((res) => {
      });

    }
    
  };

  const STT = async () => {
    try {
      const replicate = new Replicate({
        auth: replicate_token,
      });

      const output = await replicate.run(
        "openai/whisper:4d50797290df275329f202e48c76360b3f22b08d28c196cbc54600319435f8d2",
        {
          input: {
            audio: audioUrl,
            transcription: "srt",
          },
        }
      );
      alert(JSON.stringify(output));
      retval = output.segments;
      return JSON.stringify(output.segments);
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

  {#each retval as seg}
  <p>{seg.start} : {seg.end}</p>
  <p>{seg.text}</p>
  {/each}
  <br>
  <p>{retval}</p>
</div>
