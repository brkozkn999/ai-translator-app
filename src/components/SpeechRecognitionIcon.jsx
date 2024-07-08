import { IconMicrophone } from "@tabler/icons-react";
import { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeechRecognitionIcon = ({ setSourceText }) => {
    const { transcript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();

    useEffect(() => {
        setSourceText(transcript);
    }, [transcript, setSourceText]);

    const handleVoiceRecording = () => {
        if (listening) {
            SpeechRecognition.stopListening();
        } else {
            SpeechRecognition.startListening({ continuous: true });
        }
    };

    return (
        <div>
            <IconMicrophone size={22} className="text-gray-400" onClick={handleVoiceRecording} />
        </div>
    );
};

export default SpeechRecognitionIcon;
