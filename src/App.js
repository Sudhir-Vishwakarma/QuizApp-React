import React, { useRef, useState } from "react";
import "../src/app.css";
import { data } from "./data";

const App = ()=>{

    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [lock, setLock] = useState(false);
    let [score, setScore] = useState(0);
    let [result, setResult] = useState(false)

    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);

    let option_Array = [Option1,Option2,Option3,Option4];

    let checkAns = (e, ans)=>{
        if(lock === false){
            if(question.ans === ans){
                e.target.classList.add("correct"); 
                setLock(true);
                setScore(prev => prev + 1);
            } else {
                e.target.classList.add("wrong");
                setLock(true);
                option_Array[question.ans-1].current.classList.add("correct");
            }
        }        
    }

    let next = ()=>{
        if(lock === true){
            if(index === data.length -1){
                setResult(true);
                return 0;
            }
            setIndex(++index);
            setQuestion(data[index]);
            setLock(false);
            option_Array.map((option) =>{
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
                return null;
            })
        }
    }

    const reset = ()=>{
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setLock(false);
        setResult(false);
    }

    return(
        <>
            <div className="main-quiz-container">
                <div className="quiz-container">
                    <h1>Start Quiz</h1>
                    <hr />
                    {result? <></> : <><div className="quiz-question">
                        <p>{index + 1}. {question.question}</p>
                    </div>
                    <div className="quiz-answers">
                        <p ref={Option1} onClick={(e) => {checkAns(e, 1)}}>{question.option1}</p>
                        <p ref={Option2} onClick={(e) => {checkAns(e, 2)}}>{question.option2}</p>
                        <p ref={Option3} onClick={(e) => {checkAns(e, 3)}}>{question.option3}</p>
                        <p ref={Option4} onClick={(e) => {checkAns(e, 4)}}>{question.option4}</p>
                    </div>
                    <button onClick={next}>Next</button>
                    <div className="question-list">
                        {index + 1} of {data.length} Questions
                    </div></>}
                    {result? <><h2>Your score is {score} out of {data.length} </h2>
                    <button onClick={reset}>Reset</button></>: <></>}
                </div>
            </div>
        </>
    )
};
export default App;