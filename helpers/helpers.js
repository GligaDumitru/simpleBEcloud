const util = require('util')
const gc = require('../config/')
const bucket = gc.bucket('example_bucket_222')

const { format } = util


const uploadImage = (file) => new Promise((resolve, reject) => {
  let { originalname, buffer } = file
 
  const blob = bucket.file(originalname.replace(/ /g, "_"))
  const blobStream = blob.createWriteStream({
    resumable: false
  })

  blobStream.on('finish', () => {
    let randomStr = Math.random().toString(36).substring(7);
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    )
    resolve(publicUrl)
  })
  .on('error', (err) => {
      console.log(err)
    reject(`Unable to upload image, something went wrong`)
  })
  .end(buffer)

})

module.exports = uploadImage