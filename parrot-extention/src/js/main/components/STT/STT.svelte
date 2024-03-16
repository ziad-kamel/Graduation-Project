<script>
  import Replicate from "replicate";
  import "./STT.scss";
  var file;
  var language;
  var audioUrl;
  var outputText;

  const setFile = async (inputFile) => {
    file = inputFile;
  };

  const onSubmitClicked = async () => {
    language = document.getElementById("select-language").value;
    const result = await xataUpload();
    alert(JSON.stringify(result.url));
    audioUrl = result.url;
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

  const xataUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    const BaseURL = "http://localhost:5000/";
    const response = await fetch(BaseURL, {
      method: "POST",
      body: formData,
    });
    alert("done");
    const data = await response.json();
    alert(data);
    return data;


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

  <button on:click={onSubmitClicked}>Generate</button>

  <p>{outputText}</p>
</div>
