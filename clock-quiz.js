// HTML要素の取得
const hourHand = document.getElementById('hourHand');
const minuteHand = document.getElementById('minuteHand');
const inputTime = document.getElementById('inputTime');
const marksContainer = document.getElementById('marksContainer');
const submitButton = document.getElementById('submitButton');
const nextQuizButton = document.getElementById('nextQuizButton');
const resultMessage = document.getElementById('resultMessage');
let hour = 0
let minute = 0

// アナログ時計の表示
function displayAnalogClock() {
    // ランダムな時刻を生成
    hour = Math.floor(Math.random() * 12) + 1; // 1から12までのランダムな時刻
    minute = Math.floor(Math.random() * 60); // 0から59までのランダムな分

    // 時針と分針の角度を計算
    const hourAngle = (hour % 12) * 30 + minute / 2; // 1時間あたり30度
    const minuteAngle = minute * 6; // 1分あたり6度

    // 針の回転を適用
    hourHand.style.transform = `translateY(40px) rotate(${hourAngle}deg)`;
    minuteHand.style.transform = `rotate(${minuteAngle}deg)`;

    // 目盛りを表示
    marksContainer.innerHTML = '';
    clockRadius = 150
    for (let i = 0; i < 60; i++) {
        const mark = document.createElement('div');
        let initialTransform = 110
        mark.className = 'minuteMark'
        if (i % 5 === 0) {
            mark.className = 'hourMark'
            initialTransform = 100
            const numberOnMark = document.createElement('div');
            // 時計の数字を表示
            numberOnMark.className = 'numberOnMark'
            numberOnMark.innerHTML = String((i / 5) % 12 + 1)
            const numberAngle = Math.PI / 2.0 - Math.PI * (i+5) * 6 / 180.0
            const xFromCenter = parseInt(1.1 * clockRadius * Math.cos(numberAngle)) - 10
            const yFromCenter = -parseInt(1.1 * clockRadius * Math.sin(numberAngle))
            numberOnMark.style.transform = `translateY(110px) translate(${xFromCenter}px, ${yFromCenter}px)`
            marksContainer.appendChild(numberOnMark);
        }
        const angle = i * 6;
        mark.style.transform = `translateY(${initialTransform}px) rotate(${angle}deg) translate(0, ${clockRadius}px)`;
        marksContainer.appendChild(mark);
    }
}

// 初回表示
displayAnalogClock();

// 提出ボタンのクリックイベント
submitButton.addEventListener('click', () => {
    const inputHourAndMinute = inputTime.value.split(":")
    const inputHour = Number(inputHourAndMinute[0])
    const inputMinute = Number(inputHourAndMinute[1])
    const isCorrect = (inputHour === hour && inputMinute == minute);
    resultMessage.textContent = isCorrect ? '正解' : `不正解 (${hour}じ${minute}ふん)`;
});

nextQuizButton.addEventListener('click', () => {
    resultMessage.textContent = ""
    inputTime.value = "00:00"
    displayAnalogClock();
})