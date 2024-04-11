    export const  uploadFile = async(myFile) => {
    var formdata = new FormData();
    formdata.append("file", myFile);
    formdata.append("upload_preset", "ji0n5p9u");
    var res = await fetch ('https://api.cloudinary.com/v1_1/dbekfnnem/video/upload',{
      method: 'POST',
      body:formdata
    }).then(async (r)=>{
      var x = await r.json()
      return x;
    })
    return res;
  }
