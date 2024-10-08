import React, { useEffect, useState } from "react";
import classes from "./PlayingGame.module.css";
import Question from "../components/Question";
import questions from "../assets/questions";
import useSound from "use-sound";
import play from "../assets/sounds/play.mp3";


const PlayingGame = (props) => {
  const [currentQuestionNo, setCurrentQuestionNo] = useState(0);
  const [gameInProgress, setGameInProgress] = useState(true);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [playSound] = useSound(play);
  const [correctAnsCount, setCurrectAnsCount] = useState(0);
  const userName = props.userName;

  useEffect(() => {
    playSound();
  }, [playSound]);

  const onWinningTheGame = () => {

    setGameInProgress(false);
  };

  const answerHandler = (isAnswerCorrect) => {
    if (!isAnswerCorrect) {

      setGameInProgress(false);
      setShowErrorPopup(true);
    }
    if (isAnswerCorrect) {
      if (currentQuestionNo !== questions.length - 1) {
        setCurrectAnsCount((prev) => prev + 1);
        setCurrentQuestionNo((prev) => prev + 1);
      } else {
        setCurrectAnsCount((prev) => prev + 1);
        onWinningTheGame();
      }
    }
  };

  const timeOverHandler = () => {
    setGameInProgress(false);
  };

  const closeErrorPopup = () => {
    setShowErrorPopup(false);
  };

  return (
    <div className={classes.container}>
      <div className={classes.playing}>
        {gameInProgress ? (
          
            <Question
              currentQuestionNo={currentQuestionNo}
              isAnswerCorrect={answerHandler}
              onTimeOver={timeOverHandler}
            />
    
        ) : (
          <>
            {correctAnsCount === questions.length ? (
              <span className={classes.won}>
                Congratulations {userName}! You got {correctAnsCount} points 🎊🎊🎉
              </span>
            ) : (
              <span className={classes.won}>
                You got {correctAnsCount} points
              </span>
            )}
            <button onClick={props.onStartGame} className={classes.btn}>
              Play again
            </button>
          </>
        )}
      </div>

      {showErrorPopup && (
        <div className={classes.modalOverlay}>
          <div className={classes.modalContent}>
            <h2>Sorry, your answer is wrong!</h2>
            <button onClick={closeErrorPopup} className={classes.closeButton}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayingGame;
