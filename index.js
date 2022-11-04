const express = require('express');
const cors = require('cors');
const test = require('./youtube.service.js');
const mail = require('./mail.service.js');
const app = express();
const multer = require('multer');
app.use(cors());
const csv = require('fast-csv');
const fs = require('fs')
const upload = multer({ dest: './tmp/' });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


app.get('/test', async(req,res)=>{
    let id = test.youtube_parser('https://www.youtube.com/watch?v=sV_E4YM9wgw&list=RDsV_E4YM9wgw&start_radio=1')
    let data = await test.youtubeVideoDeatils('https://www.youtube.com/watch?v=sV_E4YM9wgw&list=RDsV_E4YM9wgw&start_radio=1')
    res.send(data);
});


app.post('/yotubedata',upload.single('file'),async(req,res) =>{
    const data = []
    const data1 =[]
 const file = req.file;
fs.createReadStream(file.path)
        .pipe(csv.parse({ headers: false }))
        .on('error', error => console.error(error))
        .on('data', row => data.push(row[0]))
        .on('end',async () =>{
           await Promise.all(data.map(async (row) =>{
            const res = await test.youtubeVideoDeatils(row);
            data1.push(res)
           }))
           fs.unlinkSync(file.path);
           mail.sendmail(data1 ,res);
        });
  
})