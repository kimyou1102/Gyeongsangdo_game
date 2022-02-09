const recordBtn = document.querySelector('.recordBtn');
const modalWrap = document.querySelector('.modal_wrap');
const modal = document.querySelector('.modal');
const time = document.querySelector('.time');
const playBtn = document.querySelector('.playBtn');
const submitBtn = document.querySelector('.submitBtn');
const stopBtn = document.querySelector('.stopBtn');
const stop_icon = document.querySelector('.stop_icon');
const audio = document.querySelector('audio');
const loading = document.querySelector('.loading');

// MediaRecorder 변수 생성 
let mediaRecorder = null; 
// 녹음 데이터 저장 배열 
const audioArray = []; 
let second = 0;

recordBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    modalWrap.style.display = 'block';
    recordStart();
});

stopBtn.addEventListener('click', stopBtnClick);

modalWrap.addEventListener('click', (e) => {
    if(e.target === modalWrap) {
        modal.style.display = 'none';
        modalWrap.style.display = 'none';
        timeAndBtnNone();
        // second = 0;
        loading.style.visibility = 'visible';
        stopBtn.classList.remove('recordEnd');
    }
})

function timeAndBtnNone() {
    time.style.display = 'none'
    playBtn.style.display = 'none';
    submitBtn.style.display = 'none';
    stop_icon.src = 'image/stop_icon.png';
}

function stopBtnClick(event) {
    let target = event.target;
    console.log(stopBtn.classList.length);
    if(stopBtn.classList.length === 2) {
        //녹음 끝 들어볼 수 있는, 재녹음 가능한 상태
        console.log('재녹음시작');
        timeAndBtnNone();
        recordStart();
        stopBtn.classList.remove('recordEnd');
        loading.style.visibility = 'visible';
    } else {
        stopBtn.classList.add('recordEnd');
        loading.style.visibility = 'hidden';
        recordStop();
        showTime();
        showBtn();
    }
}

function showTime() {
    time.style.display = 'block';
}

function showBtn() {
    const playBtn_icon = document.querySelector('.playBtn_icon');
    playBtn_icon.src = 'image/play_icon.png';
    playBtn.style.display = 'block';
    submitBtn.style.display = 'block';
    stop_icon.src = 'image/mic_orange_icon.png'; //재녹음버튼
}

playBtn.addEventListener('click', (event) => {
    let target = event.target;
    if(target.src.includes('play_icon.png')) {
        audio.play();
        target.src = 'image/pause_icon.png';
    } else {
        console.log('일시정지 누름');
        audio.pause();
        target.src = 'image/play_icon.png';
    }
})

submitBtn.addEventListener('click', () => {
    console.log("제출");
    
})

async function recordStart(event) {
    console.log('녹음시작');
    const mediaStream = await navigator.mediaDevices.getUserMedia({audio: true});
    mediaRecorder = new MediaRecorder(mediaStream);
    mediaRecorder.ondataavailable = (event) => { 
        audioArray.push(event.data); 
    }

    mediaRecorder.onstop = (event) => {
        const blob = new Blob(audioArray, {"type": "audio/ogg codecs=opus"}); 
        audioArray.splice(0);
        const blobURL = window.URL.createObjectURL(blob);
        audio.src = blobURL; 
    }

    mediaRecorder.start(); 
    x = setInterval(() => {
        ++second;
    },1000)
}

function recordStop() {
    mediaRecorder.stop(); 
    clearInterval(x);
    console.log('second: ' + second);
    timeCal(second);
    second = 0;
}

function timeCal(second) {
    let min = Math.floor(second/60);
    if(min === 0) {
        min = '00';
    } else if(min < 10) {
        min = `0${min}`;
    } else {
        min = min;
    }
    let sec = second % 60 < 10 ? `0${second % 60}` : second % 60;
    time.innerText = `${min}:${sec}`
}