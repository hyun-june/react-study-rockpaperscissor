import { useState } from "react";
import "./App.css";
import Box from "./component/Box";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHand, faHandBackFist, faHandScissors } from '@fortawesome/free-regular-svg-icons';
import {faRotateLeft} from '@fortawesome/free-solid-svg-icons';


// 1. 박스 2개(타이틀,사진,결과)
// 2. 가위 바위 보 버튼이 있다.
// 3. 버튼을 클릭하면 클릭한 값이 박스에 보인다.
// 4. 컴퓨터는 랜덤하게 아이템 선택이 된다.
// 5. 3,4의 결과를 가지고 누가 이겼는지 승패를 따진다.
// 6. 승패 결과에 따라 테두리 색이 바뀐다.(이기면-초록,지면-빨강,비기면-검은색)

const choice = {
  rock:{
    name:"Rock",
    icon: <FontAwesomeIcon icon={faHandBackFist} />,
  },
  scissors:{
    name:"Scissors",
    icon: <FontAwesomeIcon icon={faHandScissors} />,
  },
  paper:{
    name:"Paper",
    icon: <FontAwesomeIcon icon={faHand} />,
  }
}
function App() {
  const [userSelect,setUserSelect] = useState(null);
  const [computerSelect, setComputerSelect] = useState(null);
  const [result,setResult] = useState("");
  const [userScore,setUserScore] = useState(0);
  const [computerScore,setComputerScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const play=(userChoice)=>{
    if (gameOver) return;
    
    setUserSelect(choice[userChoice])
    let computerChoice = randomChoice()
    setComputerSelect(computerChoice);

    const gameResult = judgement(choice[userChoice],computerChoice)
    setResult(gameResult)

    setComputerScore(computerScore)
    updateScores(gameResult)
  }

  const reset = () =>{
    setComputerScore(0);
    setUserScore(0);
    setResult(null);
    setUserSelect(null);
    setComputerSelect(null);
    setGameOver(false)
  }

  const updateScores = (gameResult)=>{
    setUserScore(prevUserScore => {
      const newUserScore = gameResult === "win" ? prevUserScore + 1 : prevUserScore;
      if (newUserScore >= 2) setGameOver(true);
      return newUserScore;
    });
  
    setComputerScore(prevComputerScore => {
      const newComputerScore = gameResult === "lose" ? prevComputerScore + 1 : prevComputerScore;
      if (newComputerScore >= 2) setGameOver(true);
      return newComputerScore;
    });
  }

  const judgement = (user,computer) =>{
    // user === computer tie
    // user === "rock", computer === "scissors" user 이김
    // suer === "rock", computer === "paper" user 짐
    // user === "scissors", computer === "paper" user 이김
    // suer === "scissors", computer === "rock" user 짐
    // user === "paper", computer === "rock" user 이김
    // suer === "paper", computer === "scissors" user 짐

    if(user.name === computer.name){
      return "tie"
    } else if(user.name==="Rock") return computer.name === "Scissors" ?"win":"lose"
    else if(user.name ==="Scissors") return computer.name === "Paper" ? "win" : "lose"
    else if(user.name ==="Paper") return computer.name === "Rock" ? "win" : "lose"
  }

  const randomChoice = () =>{
    let itemArray = Object.keys(choice); //객체의 키 값만 뽑아서 어레이로 만들어 주는 함수 Object.keys
    console.log(itemArray)
    let randomItem = Math.floor(Math.random()*itemArray.length);
    let final = itemArray[randomItem];
    return choice[final]
  }

  return (
  <div className="container">
    <div className="gameSection">
      <div className="scoreBoard">
        <div className="score">{userScore} : {computerScore}</div>
        <div className="gameResult">{gameOver? "Game Over" : "" }</div>
      </div>
      <div className="main">
      <Box title="User" item={userSelect} result={result || "READY"} />
      <Box title="Computer" item={computerSelect} result={result === "tie" ? "tie" : result === "win" ? "lose" : result ? "win" : "READY"} />
      </div>
      <div className="main">
        <button className="btn scissors" onClick={()=>play("scissors")} disabled={gameOver}><FontAwesomeIcon icon={faHandScissors} /></button>
        <button className="btn rock" onClick={()=>play("rock")} disabled={gameOver}><FontAwesomeIcon icon={faHandBackFist} /></button>
        <button className="btn paper" onClick={()=>play("paper")} disabled={gameOver}><FontAwesomeIcon icon={faHand} /></button>
      </div>
      <button className="btn-reset" onClick={()=>reset()}><FontAwesomeIcon icon={faRotateLeft} /></button>
    </div>
  </div>
  );
}

export default App;
