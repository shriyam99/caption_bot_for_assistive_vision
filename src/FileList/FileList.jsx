import axios from 'axios'
import React from 'react'
import FileItem from './../FileItem/FileItem'

const FileList = ({ files, removeFile }) => {
    const deleteFileHandler = (_name, index) => {
        axios.delete(`http://localhost:8080/upload?index=${index}`)
            .then((res) => removeFile(_name))
            .catch((err) => console.error(err));
    }
    return (
        <ul className="file-list">
            {
                files &&
                files.map((f, index) => (<FileItem
                    key={f.name}
                    file={f}
                    index={index}
                    deleteFile={deleteFileHandler} />))
            }
        </ul>
    )
}

export default FileList
