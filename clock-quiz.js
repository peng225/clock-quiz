const inputTime = document.getElementById('inputTime');
const submitButton = document.getElementById('submitButton');
const showAnswerButton = document.getElementById('showAnswerButton');
const nextQuizButton = document.getElementById('nextQuizButton');
const resultMessage = document.getElementById('resultMessage');
const answerMessage = document.getElementById('answerMessage');
const levelSetting = document.getElementById('levelSetting');

let hour = 0
let minute = 0
let level = 1
let minDiff = 0

// アナログ時計の表示
function displayAnalogClock() {
    // ランダムな時刻を生成
    hour = Math.floor(Math.random() * 12) + 1; // 1から12までのランダムな時刻
    minute = Math.floor(Math.random() * 60); // 0から59までのランダムな分
    if (level === 1) {
        minute = Math.floor(minute / 5) * 5;
    }

    // 時針と分針の角度を計算
    const hourAngle = (hour % 12) * 30 + minute / 2; // 1時間あたり30度
    const minuteAngle = minute * 6; // 1分あたり6度

    // 針の回転を適用
    const hourHand = document.getElementById('hourHand');
    const minuteHand = document.getElementById('minuteHand');
    const halfClockContainerSize = 160;
    const diffHourAndMinHandHeight = 40;
    const diffHourAndMinHandWidth = 4;
    const yOffset = 40;
    hourHand.style.transform = `translateX(${halfClockContainerSize}px) translateY(` +
        String(diffHourAndMinHandHeight + yOffset) + `px) rotate(${hourAngle}deg)`;
    minuteHand.style.transform = "translateX(" + String(halfClockContainerSize + diffHourAndMinHandWidth/2) +
        `px) translateY(${yOffset}px) rotate(${minuteAngle}deg)`;

    // 目盛りを表示
    const marksContainer = document.getElementById('marksContainer');
    marksContainer.innerHTML = '';
    clockRadius = 130
    for (let i = 0; i < 60; i++) {
        const mark = document.createElement('div');
        let initialTranslate = 100 + yOffset
        const diffHourAndMinuteMark = 10;
        mark.className = 'minuteMark'
        if (i % 5 === 0) {
            mark.className = 'hourMark'
            initialTranslate -= diffHourAndMinuteMark;
            const numberOnMark = document.createElement('div');
            // 時計の数字を表示
            numberOnMark.className = 'numberOnMark'
            numberOnMark.innerHTML = String((i / 5) % 12 + 1)
            const numberAngle = Math.PI / 2.0 - Math.PI * (i + 5) * 6 / 180.0
            const numberWidth = 30
            const numberHeight = 20
            const xFromCenter = parseInt(1.15 * clockRadius * Math.cos(numberAngle) - numberWidth / 2)
            const yFromCenter = -parseInt(1.15 * clockRadius * Math.sin(numberAngle) + numberHeight / 2)
            numberOnMark.style.transform = "translateX(" + String(halfClockContainerSize + 4) +
                `px) translateY(` +
                String(106 + yOffset) + `px) translate(${xFromCenter}px, ${yFromCenter}px)`
            marksContainer.appendChild(numberOnMark);
        }
        const angle = i * 6;
        const halfHourHandWidth = 4;
        mark.style.transform = "translateX(" + String(halfClockContainerSize + halfHourHandWidth) +
            `px) translateY(${initialTranslate}px) rotate(${angle}deg) translate(0, ${clockRadius}px)`;
        marksContainer.appendChild(mark);
    }
}

function setQuestion() {
    const question = document.getElementById('question');
    if (level === 1 || level === 2) {
        minDiff = 0
        question.innerHTML = "いま なんじ・なんふん でしょう？"
        return
    }
    let maxMinDiff = 0
    if (level === 3) {
        maxMinDiff = 10
    }
    minDiff = Math.floor(Math.random() * maxMinDiff);
    question.innerHTML = `${minDiff}ふんご は なんじ・なんふん でしょう？`
}

function loadCookie() {
    if (document.cookie.split(";").some((item) => item.trim().startsWith("level="))) {
        level = Number(document.cookie
            .split("; ")
            .find((row) => row.startsWith("level"))
            .split("=")[1])
        levelSetting.value = String(level)
    }
}

// 初回表示
displayAnalogClock();
setQuestion();
loadCookie();

function getAnswerHour() {
    return ((hour + Math.floor((minute + minDiff) / 60) - 1) % 12) + 1
}

function getAnswerMinute() {
    return (minute + minDiff) % 60
}

submitButton.addEventListener('click', () => {
    const inputHourAndMinute = inputTime.value.split(":")
    const inputHour = Number(inputHourAndMinute[0])
    const inputMinute = Number(inputHourAndMinute[1])
    const isCorrect = (inputHour === getAnswerHour() && inputMinute === getAnswerMinute());
    resultMessage.textContent = isCorrect ? 'せいかい！' : 'ざんねん';
});

showAnswerButton.addEventListener('click', () => {
    answerMessage.textContent = `こたえ： ${getAnswerHour()}じ${getAnswerMinute()}ふん`;
})

nextQuizButton.addEventListener('click', () => {
    resultMessage.textContent = ""
    answerMessage.textContent = ""
    inputTime.value = "00:00"
    displayAnalogClock();
    setQuestion();
})

levelSetting.addEventListener('input', () => {
    level = Number(levelSetting.value);
    document.cookie = 'level=' + level;
})