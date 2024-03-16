require('dotenv').config()
const express = require('express');
const cors = require('cors')
const multer = require('multer');
const {getXataClient} = require('./xata')
const {XataFile} = require('@xata.io/client')
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 5001;
const xata = getXataClient();

// Set up multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(bodyParser.json())
app.use(cors());

// Define a route to handle file uploads
app.post('/', upload.single('file'), async (req, res) => {
  // Access the file from req.file
  const file = req.file;
  console.log(`$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ ${file.originalname}`);
  // Convert file to Blob
  const blob = new Blob([file.buffer], { type: file.mimetype });

  var audioFIle = await XataFile.fromBlob(blob);
  audioFIle.name = file.originalname.split('.')[0]
  audioFIle.mediaType = 'audio/mpeg'
  
  const record = await xata.db.parrot.create({
    audio: audioFIle,
  })
  console.log(record);

  // Respond with some confirmation message or process the blob further
  res.send({id: record.id, url: record.audio.url});
});


app.get('/', async (req, res)=>{
  try {
    
    const records = await xata.db.parrot.getAll()
    console.log(records);
    
    res.send(records.map((r) => {
      return {id: r.id, name:r.audio.name ,audioURL: r.audio.url}
    }))
  } catch (error) {
    throw new Error(`error ${error.message}`)
  }
})

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
