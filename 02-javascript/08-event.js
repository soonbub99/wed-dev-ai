//script가  body보다 먼저(head) 있으면 아직 안 만들어진 요소를 찾다가 null
// DOWContetedLoaded를 사용하면 HTML 파싱이 끝난 뒤 실행되도록 감싸 줌
window.addEventListener("DOMContentLoaded", () => {});
const h1 = document.querySelector("h1");
console.log(h1);

//클릭 이벤트
const click = document.querySelector("#click");
click.addEventListener("click", () => {
  alert("클릭 이벤트 발생!");
  click.style.backgroundColor = "hotpink";
});

const double = document.querySelector("#double");
double.addEventListener("dblclick", () => {
  alert("더블 클릭 발생!");
});

const right = document.querySelector("#right");
right.addEventListener("contextmenu", (event) => {
  //alert("우클릭!");
  event.preventDefault();
});

//마우스 올리면 mouseenter
const hover = document.querySelector("#hover");
hover.addEventListener("mouseenter", () => {
  hover.style.backgroundColor = "lightblue";
  hover.textContent = "Mouse Enter!";
});
hover.addEventListener("mouseleave", () => {
  hover.style.backgroundColor = "navy";
  hover.textContent = "Mouse Leave";
});

const mouseDot = document.querySelector("#mouseDot");
document.addEventListener("mousemove", (e) => {
  mouseDot.style.left = `${e.clientX}px`;
  mouseDot.style.top = `${e.clientY}px`;
});

//스크롤 이벤트
const wheel = document.querySelector("#wheel");
const scroll = document.querySelector("#scroll");

document.addEventListener("wheel", () => {
  console.log(e.deltay); //위로 올라갈수록 - , 아래로 내릴수록 +
  if (e.deltay < 0) {
    wheel.textContent = "휠을 위로 올림!";
    wheel.textContent = "휠을 아래로 내림!";
  }
});
document.addEventListener("scroll", () => {
  const scrollHeight = document.documentElement.scrollHeight; //전체 높이
  const innerHeight = window.innerHeight; //화면에 보이는 높이
  const scrolly = window.scrolly; //스크롤 위치
  // scrolly + innerHeight === scrollHeight
  const totalHeight = scrollHeight - innerHeight;
  const width = (scrolly / totalHeight) * 100;
  scroll.style.width = `${width}%`;
});

// 키보드 이벤트
const key = document.querySelector("#key");
const keyResult = document.querySelector("#keyResult");
// keydown, keypress, keyup 세가지 있음
key.addEventListener("keydown", (e) => {
  keyResult.textContent = e.key;
});

const move = document.querySelector(".moveBox");
let y = 0;
let x = 0;
document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp") {
    y -= 50;
  } else if (e.key === "ArrowLeft") {
    x -= 50;
  } else if (e.key === "ArrowRight") {
    x += 50;
  }
  (move, (style.top = `${y}px`));
  move.style.left = `${x}px`;
});

// 품 이벤트
const form = document.querySelector("#form");
const input = document.querySelector("#input");
form.addEventListener("submit", (e) => {
  if (input.value === "") {
    e.preventDefault();
  }
});
input.addEventListener("input", () => {
  //inout이 입력될 때마다
  inputResult.textContent = input.value;
});

const select = document.querySelector("#select");
const selectResult = document.querySelector("#selectResult");
select.addEventListener("change", (e) => {
  selectResult.textContent = e.target.value;
});

const openModal = document.querySelector("#openModal");
const modalOverlay = document.querySelector("#modalOverlay");
openModal.addEventListener("click", () => {
  modalOverlay.classList.add("open");
});
closeModal.addEventListener("click", () => {
  modalOverlay.classList.remove("open");
});
modalOverlay.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    modalOverlay.classList.remove("open");
  }
});

//슬라이드 - swiper
new Swiper(".swiper", {
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
