import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

import './FileItem.scss'

const FileItem = ({ file, deleteFile, index, res, speak, cancel }) => {
    return (
        <li
            className="file-item"
            key={file.name}>
            <div className='column'>
                <img alt="img" src={URL.createObjectURL(file)}/>
                <div className="row" style={{justifyContent: "space-between"}}>
                    <div className="row">
                        <FontAwesomeIcon icon={faFileAlt} className="file-icon"/>
                        <p>{file.name}</p>
                    </div>
                    {file.isUploading ? (
                        <FontAwesomeIcon
                        icon={faSpinner} className="fa-spin" 
                        />
                    ) : (
                        <FontAwesomeIcon icon={faTrash}
                        onClick={() => deleteFile(file.name, index)} className="delete-icon"/>
                    )}
                </div>
                {res && <div className="results-page-item">
                    <p>{res}</p>
                    <div className="play" onClick={async ()=>{
                            await cancel();
                            speak({text: res})
                        }}>
                        <FontAwesomeIcon icon={faPlay} />
                    </div>
                </div>}
            </div>
        </li>
    )
}

export default FileItem
