const quotes = [
  {
    en: "God doesn't require us to succeed: he only requires that you try.",
    ko: "신은 우리에게 성공을 요구하지 않는다. 우리가 노력할 것을 요구할 뿐이다.",
  },
  {
    en: "Hold faithfulness and sincerity as first principles.",
    ko: "충심과 성실을 첫 번째 원칙으로 삼아라.",
  },
  {
    en: "Only actions give life strength; only moderation gives it a charm.",
    ko: "행동만이 삶에 힘을 주고 절제만이 삶에 매력을 준다.",
  },
  {
    en: "No one has ever made a difference by being like everyone else.",
    ko: "그저 남들과 똑같이 살면서 차이를 만들어낸 사람은 없다.",
  },
];

//랜덤 배경
//랜덤 숫자 0~255:math.random 사용
const randomBg = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  document.body.style.backgroundColor = `rgb(${r},${g},${b},0.4)`;
};

//현재 시간
const current = document.querySelector("#current");
const h1 = document.querySelector("h1");
const weeks = ["일", "월", "화", "수", "목", "금", "토"];

const currentChange = () => {
  const now = new Date();

  const year = now.getFullYear(); //년
  const month = String(now.getMonth() + 1).padStart(2, "0"); //월
  const day = now.getDate(); //일
  const week = weeks[now.getDay()]; //요일
  current.textContent = `${year}-${month}-${day}(${week})`;

  const hour = String(now.getHours()).padStart(2, "0"); //시
  const minute = String(now.getMinutes()).padStart(2, "0"); //분
  const second = String(now.getSeconds()).padStart(2, "0"); //초
  h1.textContent = `${hour}:${minute}:${second}`;
};

//남은 시간
const count = document.querySelector("#count");
const countTime = () => {
  const now = new Date();
  const last = new Date(`${now.getFullYear() + 1}-01-01 00:00:00`);
  const second = Math.floor((last - now) / 1000); //1000ms=1초
  const minute = Math.floor(second / 60); //60초= 1분
  const hour = Math.floor(minute / 60); //60분 = 1시간
  const day = Math.floor(hour / 24); //24시간= 1일
  count.textContent = `올해 남은 시간: ${day}일 ${hour % 24}시간 ${minute % 60}분 
  ${second % 60}초`;
};

//랜덤 명언
const quoteE = document.querySelector("#quoteE");
const quoteK = document.querySelector("#quoteK");
const randomQuote = () => {
  //0~3(배열 길이가 4-1)까지 랜덤 숫자
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteE.textContent = quote.en;
  quoteK.textContent = quote.ko;
};

randomBg();
currentChange();
countTime();
randomQuote();

setInterval(() => {
  currentChange();
  countTime();
}, 3000);

setInterval(() => {
  currentChange();
  countTime();
}, 1000);
