import { useEffect, useState } from "react";
import "./App.css";
import Box from "./component/Box";

// 1. 박스 2개(타이틀,사진,결과)
// 2. 가위 바위 보 버튼이 있다.
// 3. 버튼을 클릭하면 클릭한 값이 박스에 보인다.
// 4. 컴퓨터는 랜덤하게 아이템 선택이 된다.
// 5. 3,4의 결과를 가지고 누가 이겼는지 승패를 따진다.
// 6. 승패 결과에 따라 테두리 색이 바뀐다.(이기면-초록,지면-빨강,비기면-검은색)

const choice = {
  rock:{
    name:"Rock",
    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKD8Pcj9WM4A021HqWmGxL4A1fHMhRWnG8rw&s"
  },
  scissors:{
    name:"Scissors",
    img:"https://i.pinimg.com/474x/a6/1d/ea/a61dea1843cae2edbf0ec2e71d16d1eb.jpg"
  },
  paper:{
    name:"Paper",
    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjYPezyjxkXNy5GCgV4jA4DmaMaJOPO1dJKQ&s"
  }
}
function App() {
  const [userSelect,setUserSelect] = useState(null);
  const [computerSelect, setComputerSelect] = useState(null);
  const [result,setResult] = useState("");
  const [userScore,setUserScore] = useState(0);
  const [computerScore,setComputerScore] = useState(0);

  const play=(userChoice)=>{
    setUserSelect(choice[userChoice])
    let computerChoice = randomChoice()
    setComputerSelect(computerChoice);

    const gameResult = judgement(choice[userChoice],computerChoice)
    setResult(gameResult)

    setComputerScore(computerScore)
    updateScores(gameResult)
  }

  const updateScores = (gameResult)=>{
    if(gameResult ==="win"){
      setUserScore(()=>userScore+1)
    } else if(gameResult ==="lose"){
      setComputerScore(()=>computerScore+1)
    }
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
    <div>
      <div>{userScore} : {computerScore}</div>
      <div className="main">
        <Box title="You" item={userSelect} result={result}/>
        <Box title="Computer" item={computerSelect} result={result === "tie"? "tie" : result ==="win"?"lose":"win"} />
      </div>
      <div className="main">
        <button onClick={()=>play("scissors")}>가위</button>
        <button onClick={()=>play("rock")}>바위</button>
        <button onClick={()=>play("paper")}>보</button>
      </div>
    </div>
  );
}

export default App;
