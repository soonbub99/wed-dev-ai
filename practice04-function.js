// getTarget : 맞춰야 하는 랜덤 숫자
const getTarget = () => {
  return Math.floor(Math.random() * 100) + 1;
};

// setInput : 사용자한테 입력 받은 값
const setInput = () => {
  let input = prompt("1~100 사이의 숫자를 맞춰보세요");
  while (input === "" || isNaN(input)) {
    input = prompt("1~100 사이의 숫자를 맞춰보세요");
  }
  return input;
};

// judge : 판단 결과
const judge = (random, input) => {
  if (random > input) {
    return "up";
  } else if (random < input) {
    return "down";
  }
  if (random === Number(input)) {
    return "win";
  }
};

// showMessage : 메세지 표시
const showMessage = (result, count) => {
  if (result === "up") {
    alert("해당 숫자보다 큽니다");
  } else if (result === "down") {
    alert("해당 숫자보다 작습니다");
  } else if (result === "win") {
    alert(`정답입니다! ${count} 번 만에 맞추셨습니다`);
  }
};

// play : 게임 진행
const play = () => {
  const target = getTarget();
  let count = 0;

  while (true) {
    count++;
    const user = setInput();

    if (user === null) {
      alert("게임 종료!");
      break;
    }

    const result = judge(target, user);
    showMessage(result, count);

    if (result === "win") break;
  }
};

play();
