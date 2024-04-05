  const token = `xau_YROeQdb49l7txgQtbsNb9IEWKRfevfXq1`;
  const baseURL = `https://ziad-kamel-s-workspace-febjut.us-west-2.xata.sh/db/parrot-store:main`;

  const createRecord = async () => {
    try {
        const createRecordURL = `${baseURL}/tables/parrot/data`;
    
        var recordRes = await fetch(createRecordURL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        recordRes = await recordRes.json();
        return recordRes.id;
    } catch (error) {
        throw new Error(error)
    }
  };

  const insertAudio = async(filedId, fileToUpload) => {
    try {
        const insertAudioURL = `${baseURL}/tables/parrot/data/${filedId}/column/audio/file`
          await fetch(insertAudioURL, {
            method:'PUT',
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type":"audio/mpeg"
            },
            body: fileToUpload
          })
    } catch (error) {
        throw new Error(error)
    }
  }

  const getURL = async (recordId) => {
    try {
        const getURL = `${baseURL}/tables/parrot/data/${recordId}`
        var response = await fetch(getURL,{
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        response = await response.json()
    
        var URL = response.audio.url
        return URL
    } catch (error) {
        throw new Error(error)
    }
  }

  export const uploadFile = async (file) => {
    try {
        var id = await createRecord();
        await insertAudio(id, file);
        return await getURL(id);
    } catch (error) {
        throw new Error(error)
    }
  };
