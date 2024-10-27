import { useNavigate } from 'react-router-dom';
import '../styles/successprompt.css';
// SuccessPrompt component is used to display a success message to the user
//Mostly after submitting application

//the state of overlay,message and url to which it will redirect is parsed
interface SuccessPromptProps {
  message: string;
  setSuccessPrompt: React.Dispatch<React.SetStateAction<boolean>>;
  url?: string | null;
}

const SuccessPrompt: React.FC<SuccessPromptProps> = ({
  message,
  setSuccessPrompt,
  url = null,
}) => {
  const navigate = useNavigate();
  return (
    <div className="success_prompt">
      <div className="success_prompt-message">
        <h2>Success!</h2>
        <p>{message}</p>
        <div
          className="success_prompt-btn"
          onClick={() => {
            setSuccessPrompt(prev => !prev);
            if (!url) {
              window.location.reload();
            } else {
              navigate(url);
            }
          }}
        >
          Close
        </div>
      </div>
    </div>
  );
};

export default SuccessPrompt;
