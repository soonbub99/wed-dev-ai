const player = {
  choice: null,
  setChoice(choice) {
    this.choice = choice;
  },
};

const computer = {
  choice: null,
  setChoice() {
    const option = ["가위", "바위", "보"];
    this.choice = option[Math.floor(Math.random() * option.length)];
  },
};

const game = {
  win: 0,
  draw: 0,
  lose: 0,
  judge(computer, player) {
    const result = { 가위: "보", 바위: "가위", 보: "바위" };

    if (computer === player) return "draw";
    else if (result[player] === computer) return "win";
    return "lose";
  },
  play() {
    while (true) {
      computer.setChoice();
      const input = prompt("가위, 바위, 보 중 하나를 입력하세요 (취소하면 종료)",);
      if (input === null) {
        alert(`게임 종료 - 승 ${this.win} / 무 ${this.draw} / 패 ${this.lose}`);
        break;
      }
      if (!["가위", "바위", "보"].includes(input)) {
        alert("가위, 바위, 보 중 하나만 입력해주세요");
        continue;
      }
      player.setChoice(input);

      const result = this.judge(computer.choice, player.choice);

      if (result === "win") {
        this.win++;
        alert(`컴퓨터 : ${computer.choice} - 승리!`);
      } else if (result === "lose") {
        this.lose++;
        alert(`컴퓨터 : ${computer.choice} - 패배 ㅠㅠ`);
      } else {
        this.draw++;
        alert(`컴퓨터 : ${computer.choice} - 무승부~`);
      }
    }
  },
};
game.play();
