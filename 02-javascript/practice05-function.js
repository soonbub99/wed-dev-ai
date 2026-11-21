//1부터 100까지의 랜덤 숫자를 생성하고
// Math.floor(Math.random() * 100) + 1
const random = Math.floor(Math.random() * 100) + 1;
let count = 0;

while(true){
    count++;
  //사용자가 정답을 맞출 때까지 숫자를 입력하게 하며
const input = prompt("1~100 사이의 숫자를 맞춰보세요");
console.log(input);

// 힌트: 입력창에서 취소를 누르면 null이 들어옴
//취소를 누르면 null -> 게임 종료!
if (input === null) {
    alert("게임 종료!");
    break;
}

//잘못 입력하였다면 "제대로 입력해주세요" 알림창으로 알려주고
//힌트: 숫자가 아닌 값이면 isNaN()으로 체크할 수 있음
// 빈 값을 넣었더니 false, 문자는 true, 숫자를 입력하니 false
// 빈 값은 input === "" true
if (input === "" || isNaN(input)){
    alert("제대로 입력해주세요");
}

//입력한 숫자가 크면 "해당 숫자보다 작습니다", 
// 작으면 "해당 숫자보다 큽니다"를 알림창으로 알려주고
if(random>input){
    alert("해당 숫자보다 큽니다");
} else if(random<input){
    alert("해당 숫자보다 작습니다");
}

//정답을 맞추면 시도 횟수와 함께 종료 메시지를 출력 
// (정답입니다! 몇 번 만에 맞추셨습니다)
if(random === Number(input)){
    alert(`정답입니다! ${count} 번 만에 맞추셨습니다`);
    break
}
}


