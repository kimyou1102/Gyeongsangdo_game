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

let mediaRecorder = null; 
const audioArray = []; 
let second = 0;
let timer;

recordBtn.addEventListener('click', () => {
    recordStart();
});

stopBtn.addEventListener('click', stopBtnClick);

modalWrap.addEventListener('click', (e) => {
    if(e.target === modalWrap) {
        clearInterval(timer);
        second = 0;
        modal.style.display = 'none';
        modalWrap.style.display = 'none';
        timeAndBtnNone();
        loading.style.visibility = 'visible';
        stopBtn.classList.remove('recordEnd');
    }
})

function modalShow() {
    modal.style.display = 'block';
    modalWrap.style.display = 'block';
}

function timeAndBtnNone() {
    time.style.display = 'none'
    playBtn.style.display = 'none';
    submitBtn.style.display = 'none';
    stop_icon.src = 'image/stop_icon.png';
}

function stopBtnClick(event) {
    let target = event.target;
    if(stopBtn.classList.length === 2) {
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
    stop_icon.src = 'image/mic_orange_icon.png';
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
    try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({audio: true})
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

        timer = setInterval(() => {
            console.log(second);
            ++second;
        },1000)
        
        modalShow();
    } catch(e) {
        alert('마이크 권한이 승인되어있지 않습니다. 승인해주세요.');
    }
}

function recordStop() {
    mediaRecorder.stop();
    clearInterval(timer);
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