let randomIndexArray;
let playerPlayCount = 0;
let currentLevel = 1;
stageLevelLabel = document.querySelector("#stage-level");
stageLevelLabel.innerText = currentLevel;

// scale들 정의
const cMajorScale = [0, 2, 4, 5, 7, 9, 11, 12];
const cMinorScale = [0, 2, 3, 5, 7, 9, 10, 12];
const chromaticScale = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, , 10, 11, 12];
scales = [cMajorScale, cMinorScale, chromaticScale];

// sleep 함수 정의
const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};


// random 함수 정의
function randomChoice(lst) {
  return lst[Math.floor(Math.random() * lst.length)];
}

// audio context
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();


// 오디오 로딩
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


// 버튼에 클릭 이벤트 추가
pianoButtonArray = [];
pianoButtonArray.push(document.querySelector("#C2-button"));
pianoButtonArray.push(document.querySelector("#Cs2-button"));
pianoButtonArray.push(document.querySelector("#D2-button"));
pianoButtonArray.push(document.querySelector("#Ds2-button"));
pianoButtonArray.push(document.querySelector("#E2-button"));
pianoButtonArray.push(document.querySelector("#F2-button"));
pianoButtonArray.push(document.querySelector("#Fs2-button"));
pianoButtonArray.push(document.querySelector("#G2-button"));
pianoButtonArray.push(document.querySelector("#Gs2-button"));
pianoButtonArray.push(document.querySelector("#A2-button"));
pianoButtonArray.push(document.querySelector("#As2-button"));
pianoButtonArray.push(document.querySelector("#B2-button"));
pianoButtonArray.push(document.querySelector("#C3-button"));
pianoButtonArray.forEach((item, index) =>
  item.addEventListener(
    "click",
    function () {
      if (audioContext.state === "suspended") {
        audioContext.resume();
      }
      audioArray[index].pause();
      audioArray[index].currentTime = 0;
      audioArray[index].play();
      isCorrectNote(index);
    },
    false
  )
);

buttonPlay = document.querySelector("#play-random-seq-button");
buttonPlay.addEventListener(
  "click",
  function () {
    audioContext.resume();
    randomIndexArr = generateRandomSequence();
    playSequence(randomIndexArr);
  },
  false
);

buttonReplay = document.querySelector("#replay-button");
buttonReplay.addEventListener(
  "click",
  function () {
    audioContext.resume();
    playSequence(randomIndexArr);
  },
  false
);


function generateRandomSequence() {
  randomScale = randomChoice(scales)
  const randomNotes  = [];
  for (let index = 0; index < currentLevel + 2; index++) {
    const randomIndex = Math.floor(Math.random() * randomScale.length);
    randomNotes.push(randomScale[randomIndex]);
  }
  return randomNotes ;
}

async function playSequence(indexArr) {
  console.log("play : ", indexArr);
  for (const index of indexArr) {
    audioArray[index].pause();
    audioArray[index].currentTime = 0;
    audioArray[index].play();
    await sleep(700);
  }
}

// 건반을 누르는 시점부터 count해가지고 randomIndexArr의 size에 도달하면 sequnce에 맞게 쳤는지 평가 <- 별로네
// 건반을 누를때마다 count 올려서 randomIndexArr[count]와 내가 누른 게 동일하면 계속 진행, count가 randomIndexArr의 size에 도달하면 성공
// -> level += 1
feedbackLabel = document.querySelector("#is-correct");

function isCorrectNote(index) {
  if (randomIndexArr[playerPlayCount] == index) {
    const li = document.querySelector(
      `#sequence-list li:nth-child(${playerPlayCount + 1})`
    );
    li.id = "square-blue";
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

for (let index = 0; index < currentLevel + 2; index++) {
  addNewSequenceSquare();
}



