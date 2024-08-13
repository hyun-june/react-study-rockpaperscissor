import React, { Component } from "react";
import "./App.css";
import BoxClass from "./component/BoxClass";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHand, faHandBackFist, faHandScissors } from '@fortawesome/free-regular-svg-icons';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';

// 1. 박스 2개(타이틀,사진,결과)
// 2. 가위 바위 보 버튼이 있다.
// 3. 버튼을 클릭하면 클릭한 값이 박스에 보인다.
// 4. 컴퓨터는 랜덤하게 아이템 선택이 된다.
// 5. 3,4의 결과를 가지고 누가 이겼는지 승패를 따진다.
// 6. 승패 결과에 따라 테두리 색이 바뀐다.(이기면-초록,지면-빨강,비기면-검은색)

const choice = {
  rock: {
    name: "Rock",
    icon: <FontAwesomeIcon icon={faHandBackFist} />,
  },
  scissors: {
    name: "Scissors",
    icon: <FontAwesomeIcon icon={faHandScissors} />,
  },
  paper: {
    name: "Paper",
    icon: <FontAwesomeIcon icon={faHand} />,
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSelect: null,
      computerSelect: null,
      result: "",
      userScore: 0,
      computerScore: 0,
      gameOver: false
    };
  }

  play = (userChoice) => {
    const { gameOver } = this.state;
    if (gameOver) return;

    const userSelection = choice[userChoice];
    const computerChoice = this.randomChoice();
    const gameResult = this.judgement(userSelection, computerChoice);

    this.setState({
      userSelect: userSelection,
      computerSelect: computerChoice,
      result: gameResult,
    }, () => {
      this.updateScores(gameResult);
    });
  }

  reset = () => {
    this.setState({
      computerScore: 0,
      userScore: 0,
      result: null,
      userSelect: null,
      computerSelect: null,
      gameOver: false
    });
  }

  updateScores = (gameResult) => {
    this.setState(prevState => {
      const newUserScore = gameResult === "win" ? prevState.userScore + 1 : prevState.userScore;
      const newComputerScore = gameResult === "lose" ? prevState.computerScore + 1 : prevState.computerScore;

      const gameOver = newUserScore >= 2 || newComputerScore >= 2;

      return {
        userScore: newUserScore,
        computerScore: newComputerScore,
        gameOver
      };
    });
  }

  judgement = (user, computer) => {
    if (user.name === computer.name) {
      return "tie";
    } else if (user.name === "Rock") return computer.name === "Scissors" ? "win" : "lose";
    else if (user.name === "Scissors") return computer.name === "Paper" ? "win" : "lose";
    else if (user.name === "Paper") return computer.name === "Rock" ? "win" : "lose";
  }

  randomChoice = () => {
    const itemArray = Object.keys(choice);
    const randomItem = Math.floor(Math.random() * itemArray.length);
    const final = itemArray[randomItem];
    return choice[final];
  }

  render() {
    const { userSelect, computerSelect, result, userScore, computerScore, gameOver } = this.state;

    return (
      <div className="container">
        <div className="gameSection">
          <div className="scoreBoard">
            <div className="score">{userScore} : {computerScore}</div>
            <div className="gameResult">{gameOver ? "Game Over" : ""}</div>
          </div>
          <div className="main">
            <BoxClass title="User" item={userSelect} result={result || "READY"} />
            <BoxClass title="Computer" item={computerSelect} result={result === "tie" ? "tie" : result === "win" ? "lose" : result ? "win" : "READY"} />
          </div>
          <div className="main">
            <button className="btn scissors" onClick={() => this.play("scissors")} disabled={gameOver}><FontAwesomeIcon icon={faHandScissors} /></button>
            <button className="btn rock" onClick={() => this.play("rock")} disabled={gameOver}><FontAwesomeIcon icon={faHandBackFist} /></button>
            <button className="btn paper" onClick={() => this.play("paper")} disabled={gameOver}><FontAwesomeIcon icon={faHand} /></button>
          </div>
          <button className="btn-reset" onClick={this.reset}><FontAwesomeIcon icon={faRotateLeft} /></button>
        </div>
      </div>
    );
  }
}

export default App;
