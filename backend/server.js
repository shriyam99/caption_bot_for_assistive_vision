const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const app = express();

let allFiles = [];
app.use(cors());
app.use(fileUpload());

app.post("/upload", (req, res) => {
    allFiles.push(req.files.newFile);
    console.log(allFiles);
    setTimeout(() => {
        console.log('file uploaded')
        return res.status(200).json({ result: true, msg: 'file uploaded' });
    }, 1000);
});

app.get("/process", async (req, res) => {
    // add all the backend logic here.
    // allFiles is the list of images to process.
    const fakePromises = allFiles.map((file)=> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({result: file.name});
            }, 1000);
        })
    })
    try {
        const results = await Promise.all(fakePromises);
        if(results.length === 0) return res.status(400).json({results: false, msg: "Files didn't get processed"});
        return res.status(200).json({results, msg: "Files processed"});
    } catch (error) {
        return res.status(400).json({results: false, msg: "Files didn't get processed"});
    }
})

app.delete("/upload", (req, res) => {
    allFiles = allFiles.filter((file) => (file.name !== req.query.name));
    return res.status(200).json({ result: true, msg: 'file deleted' });
});

app.delete("/refresh", (req, res) => {
    allFiles = [];
    return res.status(200).json({ result: true, msg: 'files deleted' });
})

app.listen(8080, () => {
    console.log(`Server running on port 8080`)
});