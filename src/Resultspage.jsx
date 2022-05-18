import { useSpeechSynthesis } from "react-speech-kit";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import './ResultsPage.scss';
import axios from "axios";

const ResultsPage = ({res}) => {
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
        <div>
            <div className="title">Results</div>
            {
                res.map((item, index) => {
                    return <div className="results-page-item" key={index}>
                        <div className="row">
                            <p>{item}</p>
                            <div className="play" onClick={async ()=>{
                                    await cancel();
                                    speak({text: item})
                                }}>
                                <FontAwesomeIcon icon={faPlay} />
                            </div>
                        </div>
                    </div>
                })
            }
            <button className={`results-button`} onClick={cancel}>Stop Speaking</button>
            <button className={`results-button`} onClick={clearFiles}>Clear All Files</button>
        </div>

    );
}

export default ResultsPage;