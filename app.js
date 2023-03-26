let randomIndexArray;
let playerPlayCount = 0;

// sleep 함수 정의
const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

// audio context 시작
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

const audioArray = [];
audioArray.push(document.querySelector("#C2"));
audioArray.push(document.querySelector("#Cs2"));
audioArray.push(document.querySelector("#D2"));
audioArray.push(document.querySelector("#Ds2"));
audioArray.push(document.querySelector("#E2"));
audioArray.push(document.querySelector("#F2"));
audioArray.push(document.querySelector("#Fs2"));
audioArray.push(document.querySelector("#G2"));
audioArray.push(document.querySelector("#Gs2"));
audioArray.push(document.querySelector("#A2"));
audioArray.push(document.querySelector("#As2"));
audioArray.push(document.querySelector("#B2"));
audioArray.push(document.querySelector("#C3"));
audioArray.forEach((item, index) => {
  audioContext.createMediaElementSource(item).connect(audioContext.destination);
});

buttonArray = [];
buttonArray.push(document.querySelector("#C2-button"));
buttonArray.push(document.querySelector("#Cs2-button"));
buttonArray.push(document.querySelector("#D2-button"));
buttonArray.push(document.querySelector("#Ds2-button"));
buttonArray.push(document.querySelector("#E2-button"));
buttonArray.push(document.querySelector("#F2-button"));
buttonArray.push(document.querySelector("#Fs2-button"));
buttonArray.push(document.querySelector("#G2-button"));
buttonArray.push(document.querySelector("#Gs2-button"));
buttonArray.push(document.querySelector("#A2-button"));
buttonArray.push(document.querySelector("#As2-button"));
buttonArray.push(document.querySelector("#B2-button"));
buttonArray.push(document.querySelector("#C3-button"));
buttonArray.forEach((item, index) =>
  item.addEventListener(
    "click",
    function () {
      if (audioContext.state === "suspended") {
        audioContext.resume();
      }
      audioArray
    [index].pause();
      audioArray
    [index].currentTime = 0;
      audioArray
    [index].play();
      isCorrectNote(index);
    },
    false
  )
);

btnPlay = document.querySelector("#play-random-seq-button");
btnPlay.addEventListener(
  "click",
  function () {
    audioContext.resume();
    randomIndexArr = generateRandomSequence()
  
  ;
    playSequence(randomIndexArr)
  
  ;
  },
  false
);

btnReplay = document.querySelector("#replay-button");
btnReplay.addEventListener(
  "click",
  function () {
    audioContext.resume();
    playSequence(randomIndexArr)
  
  ;
  },
  false
);

let currentLevel = 1;
stageLevelLabel = document.querySelector("#stage-level");
stageLevelLabel.innerText = currentLevel;

function setLevel() {}

function generateRandomSequence() {
  const indexArr = [];
  for (let index = 0; index < currentLevel + 2; index++) {
    indexArr.push(Math.floor(Math.random() * buttonArray.length));
  }
  return indexArr;
}

async function playSequence(indexArr) {
  console.log("play : ", indexArr);

  for (const index of indexArr) {
    audioArray
  [index].pause();
    audioArray
  [index].currentTime = 0;
    audioArray
  [index].play();
    await sleep(700);
  }
}

// 건반을 누르는 시점부터 count해가지고 randomIndexArr의 size에 도달하면 sequnce에 맞게 쳤는지 평가 <- 별로네
// 건반을 누를때마다 count 올려서 randomIndexArr[count]와 내가 누른 게 동일하면 계속 진행, count가 randomIndexArr의 size에 도달하면 성ay공
// -> level += 1
// ->
feedbackLabel = document.querySelector("#is-correct");

function isCorrectNote(index) {
  if (randomIndexArr[playerPlayCount] == index)
  {
    const li = document.querySelector(
      `#sequence-list li:nth-child(${playerPlayCount + 1})`
    );
    li.id = "square-blue";

    // changeSquareColor(li, "square-blue")

    playerPlayCount += 1;
    feedbackLabel.innerText = "맞았음";

    // 전부 성공
    if (playerPlayCount >= randomIndexArr.length) {
      currentLevel += 1;
      stageLevelLabel.innerText = currentLevel;
      playerPlayCount = 0;
      addNewSequenceSquare();
      for (index = 1; index < currentLevel + 2 + 1; index++) {
        const li = document.querySelector(
          `#sequence-list li:nth-child(${index})`
        );
        li.id = "square-red";
      }
    }

    // 실패
  } else {
    playerPlayCount = 0;
    feedbackLabel.innerText = "틀렸음";
    for (index = 1; index < currentLevel + 2 + 1; index++) {
      const li = document.querySelector(
        `#sequence-list li:nth-child(${index})`
      );
      li.id = "square-red";
    }
  }
}

// 시퀀스 숫자만큼 무슨 점등 효과 같은거 줘서 몇 개 쳤는지 표시 시키는 UI 있어야 될 듯.
function addNewSequenceSquare() {
  const ul = document.getElementById("sequence-list");
  const li = document.createElement("li");
  const div = document.createElement("div");

  li.setAttribute("id", "square-red");
  li.appendChild(div);
  ul.appendChild(li);
}

function changeSquareColor(li, squareColorCssId) {}

for (let index = 0; index < currentLevel + 2; index++) {
  addNewSequenceSquare();
}

// 틀리면 player 시도를 0으로 옮겨야 됨
