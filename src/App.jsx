import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faServer, faSpinner } from '@fortawesome/free-solid-svg-icons'
import './App.scss';
import FileUpload from './FileUpload/FileUpload';
import FileList from './FileList/FileList';
import ResultsPage from './Resultspage';
import axios from 'axios';

function App() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState([]);

  const removeFile = (filename) => {
    setFiles(files.filter(file => file.name !== filename))
  }

  const processFiles = () => {
    setLoading(true);
    axios.get('http://localhost:8080/process')
    .then((res) => {
      console.log(res);
      setRes(res.data.results);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    })
  }

  return (
    <div className="App">
      <div className="title">Caption-Bot For Assistive Vision</div>
      <FileUpload files={files} setFiles={setFiles} removeFile={removeFile} />
      <FileList files={files} removeFile={removeFile} />
      {
        (files.length !== 0) && (
        <button className={`submit-button ${loading?"loading":null}`} disabled={loading} onClick={processFiles}>
            <i>{loading ? <FontAwesomeIcon icon={faSpinner} className="fa-spin" /> : <FontAwesomeIcon icon={faServer} />}</i>
            Process Images
        </button>
        )
      }
      {
        (res.length > 0) && <ResultsPage res={res} />
      }
      
    </div>
  );
}

export default App;
