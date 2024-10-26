import express from 'express'
import cors from 'cors'
import multer from 'multer'
import cp from 'child_process'

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '/uploads/')
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix+file.originalname)
    }
})

const upload = multer({ storage: storage })
const app = express()
app.use(express.json())
app.use(cors())

app.post('/api/image', upload.single('file'), (req, res) => {
    try {
        cp.exec(`tesseract /uploads/${req.file.filename} stdout`, (error, stdout, stderr) => {
            if(error){
                console.error(error);
                return;
            }
            console.log(stdout);
            res.status(200).json({ stdout })
        });

    } catch (error) {
        res.status(500).json({ error: error })
    }
})
app.post('/api/pdf', upload.single('file'), (req, res) => {
    try {
        cp.exec(`ocrmypdf --output-type=none /uploads/${req.file.filename} -`, (error, stdout, stderr) => {
            if(error){
                cp.exec(`pdftotext /uploads/${req.file.filename} -`, (error,stdout,stderr)=>{
                    if(error){
                        console.error(error);
                        return
                    }
                    console.log(stdout);
                    res.status(200).json({ stdout })
                });
                return
            }
            console.log(stdout);
            res.status(200).json({ stdout })
        });

    } catch (error) {
        res.status(500).json({ error: error })
    }
})
app.listen(3000, () => console.log('RUNNING ON PORT 3000'))
