import React, { useEffect, useState } from "react";
import classes from "./PlayingGame.module.css";
import Question from "../components/Question";
import questions from "../assets/questions";
import useSound from "use-sound";
import play from "../assets/sounds/play.mp3";

const PlayingGame = (props) => {
  const [currentQuestionNo, setCurrentQuestionNo] = useState(0);

  const [gameInProgress, setGameInProgress] = useState(true);

  const [playSound] = useSound(play);
  const [correctAnsCount,setCurrectAnsCount]=useState(0);

  useEffect(() => {
    playSound();
  }, [playSound]);

 

  const onWinningTheGame = () => {

    setGameInProgress(false);
  };

  const answerHandler = (isAnswerCorrect) => {
    if (!isAnswerCorrect) {
      // end the game
      setGameInProgress(false);
    }
    if (isAnswerCorrect) {
      if (currentQuestionNo !== questions.length - 1) {
        // proceed to next question
        setCurrectAnsCount((prev)=>prev+1);
        setCurrentQuestionNo((prev) => prev + 1);
      } else {
        // last question successfully answered
        onWinningTheGame();
      }
    }
  };

  const timeOverHandler = () => {
    setGameInProgress(false);
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
            {correctAnsCount>2 ? (<span className={classes.won}>
              You got {correctAnsCount} points 🎊🎊🎉
            </span>):(<span className={classes.won}>
              You got {correctAnsCount} points
            </span>)}
            <button onClick={props.onStartGame} className={classes.btn}>
              Play again
            </button>
          </>
        )}
      </div>

    </div>
  );
};

export default PlayingGame;
