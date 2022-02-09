const recordBtn = document.querySelector('.recordBtn');
const modalWrap = document.querySelector('.modal_wrap');
const modal = document.querySelector('.modal');

recordBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    modalWrap.style.display = 'block';
});

modalWrap.addEventListener('click', (e) => {
    if(e.target === modalWrap) {
        modal.style.display = 'none';
        modalWrap.style.display = 'none';
    }
    const stopBtn = document.querySelector('.stopBtn');
    stopBtn.addEventListener('click', stopBtnClick);
})

function stopBtnClick() {
    //애니메이션 슈루룩
    //타이머 등장
    //재생아이콘 등장
    //제출버튼 등장
    console.log('녹음시작');
}

