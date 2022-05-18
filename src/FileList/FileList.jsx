import axios from 'axios'
import React from 'react'
import FileItem from './../FileItem/FileItem'
import { useSpeechSynthesis } from "react-speech-kit";

const FileList = ({ files, removeFile, res }) => {
    const deleteFileHandler = (_name, index) => {
        axios.delete(`http://localhost:8080/upload?index=${index}`)
            .then((res) => removeFile(_name))
            .catch((err) => console.error(err));
    }
    const { speak, cancel } = useSpeechSynthesis();
    const clearFiles = () => {
        cancel();
        axios.delete('http://localhost:8080/refresh')
        .then((res) => {
            document.location.reload();
        })
        .catch((err) => {
            document.location.reload();
        })
    }
    return (
        <ul className="file-list">
            {
                files &&
                files.map((f, index) => (<FileItem
                    key={f.name}
                    file={f}
                    index={index}
                    deleteFile={deleteFileHandler} 
                    res={res && res[index]}
                    speak={speak}
                    cancel={cancel} />))
            }
            { (res.length>0) && <button className={`results-button`} onClick={cancel}>Stop Speaking</button>}
            { (res.length>0) && <button className={`results-button`} onClick={clearFiles}>Clear All Files</button>}
        </ul>
    )
}

export default FileList
