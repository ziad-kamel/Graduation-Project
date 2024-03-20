<script>
  import Replicate from "replicate";
  import "./STT.scss";
  
  var file;
  var audioUrl;
  var outputText;
  var id;
  const token = `xau_YROeQdb49l7txgQtbsNb9IEWKRfevfXq1`
  const baseURL = `https://ziad-kamel-s-workspace-febjut.us-west-2.xata.sh/db/parrot-store:main`

  const setFile = async (inputFile) => {
    file = inputFile;
  };

  const onSubmitClicked = async () => {
    audioUrl = await uploadFile()
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

  const createRecord = async () => {
    const createRecordURL = `${baseURL}/tables/parrot/data`
    
    var recordRes = await fetch(createRecordURL, {
      method:"POST",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    recordRes = await recordRes.json()
    id = recordRes.id
  }

  const insertAudio = async() => {
    const insertAudioURL = `${baseURL}/tables/parrot/data/${id}/column/audio/file`
      await fetch(insertAudioURL, {
        method:'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type":"audio/mpeg"
        },
        body: file
      })
  }

  const getURL = async () => {
    const getURL = `${baseURL}/tables/parrot/data/${id}`
    var response = await fetch(getURL,{
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    response = await response.json()

    const URL = response.audio.url
    outputText = URL
    return URL
  }

  const  uploadFile = async() => {
    await createRecord();
    await insertAudio();
    return await getURL();
  }
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
