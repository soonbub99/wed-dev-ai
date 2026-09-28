//콜백- 순서를 지키려면 중첩->콜백 지옥
document.querySelector("#callback").addEventListener("click", () => {
  const result = document.querySelector("#callResult");
  result.textContent = "콜백 시작!";
  setTimeout(() => {
    result.textContent = "1초 후 실행";

    setTimeout(() => {
      result.textContent = "2초 후 실행";

      setTimeout(() => {
        result.textContent = "3초 후 실행";
      }, 1000);
    }, 1000);
  }, 1000);
});

//Promise-"나중에 결과를 줄게"라는 약속 객체
document.querySelector("#promise").addEventListener("click", () => {
  const result = document.querySelector("#promiseResult");
  result.textContent = "콜백 시작!";

  // resolve 성공, reject : 실패
  // resolve (값)- then오로 받음/ reject(에러)- catdh로 받음
  new Promise((resolve, reject) => {
    setTimeout(() => resolve("1초 후 실행"), 1000);
  }).then((data) => {
    result.textContent = data;
    return new Promise((resolve) => {
      setTimeout(() => resolve("2초 후 실행"), 1000);
    });
  });
});

// async / await - then 없이 위에서 아래로
// async 함수 안에서만 await 사용가능
document.querySelector("#async").addEventListener("click", async () => {
  const delay = (message) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(message), 1000);
    });
  };
  const result = document.querySelector("#asyAwaResult");
  result.textContent = "awync 시작";
  // await - promise 끝날 때까지 기다려 !
  const response = await delay("1초 후 실행");
  console.log(response);
  result.textContent = response;
  const response2 = await delay("2초 후 실행");
  result.textContent = response2;
});

// fetch - 서버에서 데이터 하나 가져오기
// 자바스크립트에서 서버로 요청을 보내ㅣ고 응답을 받을 수 있도록 해주는 함수
document.querySelector("#fetch").addEventListener("click", async () => {
  const result = document.querySelector("#fetchResult");
  const response = await fetch("https://api.tvmaze.com/shows/1");
  const data = await response.json();
  console.log(data.image.medium);
  result.innerHTML = `<img src ="${data.image.medium}"/>
    <h3>${data.name}</h3>
    <p>${data.summary}</p>
    `;
});

document.querySelector("#fetchList").addEventListener("click", async () => {
  const result = document.querySelector("#userList");
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  data.forEach((user) => {
    userList.innerHTML += `<li>
    <h3>${user.name}</h3>
    <p>${user.name}</p>
    <p>${user.address.city}</p>
    </li>`;
  });
});

//Chart.js
// 외부 라이브러리 사용법 -> API문서 Getting started/Installation
// ->CDN -> 예제 그대로 복사 ->내 데이터로

  const ctx = document.getElementById('myChart');

  const spending = [
    {category : "식비", amount: 320000 },
    {category : "교통", amount: 85000 },
    {category : "카페", amount: 64000 },
  ];

  new Chart(ctx, {
    type: "doughnut", //bar, line, pie, ....
    data: {
      labels: spending.map((item) => item.category),
      datasets: [
        {
        label: "이번달 지출(원)",
        data: spending.map((item)=>item.amount),
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
 
  const KAKAO_KEY = "272fc4350ddd243d2d9224bfce7da6b7";

		var container = document.getElementById('map');
		var options = {
			center: new kakao.maps.LatLng(33.450701, 126.570667),
			level: 3
		};

		var map = new kakao.maps.Map(container, options);
