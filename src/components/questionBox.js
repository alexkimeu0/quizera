import React, {useState} from "react";


//Typical functional component
const QuestionBox = ({question, options, selected}) => {

    //State in functional component
    const [answer, setAnswer] = useState(options);
    return(
        <div className="questionBox">
            <div className="question">
                {question}
            </div>
            {answer.map((text, index) => (
                    <button
                        key={index}
                        className="answerBtn"
                        onClick={() => {
                            setAnswer([text]);
                            selected(text);
                    }}>
                        {text}
                    </button>
                ))
            }
        </div>
    );
};

export default QuestionBox;