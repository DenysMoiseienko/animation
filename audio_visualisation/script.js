let body, num, array, context, item, elements, analyser, src, height;
let AudioContext = window.AudioContext || window.webkitAudioContext;

body = document.getElementById('scene');
num = 32;
array = new Uint8Array(num * 2);

function start() {
    if(context) return;
    removeContainer('toolbar');
    createElements();
    getAudio();
}

function getAudio() {
    context = new AudioContext;
    analyser = context.createAnalyser();
    navigator.mediaDevices.getUserMedia({
        audio: true
    }).then(stream => {
        src = context.createMediaStreamSource(stream);
        src.connect(analyser);
        loop()
    }).catch(error => {
        alert(error + '\r\n Something went wrong(')
        location.reload();
    });
}

function loop() {
    window.requestAnimationFrame(loop);
    analyser.getByteFrequencyData(array);
    setElements();
}

function createElements() {
    for(let i = 0; i < num; i++) {
        item = document.createElement('div');
        item.className = 'item';
        body.appendChild(item);
    }
    elements = document.getElementsByClassName('item');
}

function setElements(){
    for(let i = 0; i < num; i++) {
        height = array[i + num];
        elements[i].style.minHeight = height + 'px';
        elements[i].style.opacity = 0.008 * height;
    }
}

function removeContainer(id) {
    document.getElementById(id).remove();
}