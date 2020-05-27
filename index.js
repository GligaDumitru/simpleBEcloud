
const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const cors = require('cors');
const uploadImage = require('./helpers/helpers')
const PORT = process.env.PORT || 9001;
const app = express()

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    // no larger than 5mb.
    fileSize: 5 * 1024 * 1024,
  },
});
app.use(cors());
app.disable('x-powered-by')
app.use(multerMid.single('file'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const router = express.Router();

app.post('/addproduct', async(req,res) => {
    console.log(req.body)
    res
      .status(200)
      .json({
        message: "Upload was successful",
      })
})

app.post('/uploads', async (req, res, next) => {
  try {
  //  console.log(req.body,req.file)
    const myFile = req.file
    const imageUrl = await uploadImage(myFile)

    res
      .status(200)
      .json({
        message: "Upload was successful",
        url: imageUrl
      })
  } catch (error) {
      console.log(error)
    next(error)
  }
})

app.get('/',(req,res) => {
  res.status(200).json({msg:'ok'})
})
app.use((err, req, res, next) => {
    console.log(err)
  res.status(500).json({
    error: err,
    message: 'Internal server error!',
  })
  next()
})

app.listen(PORT, () => {
  console.log('app now listening for requests!!!')
})