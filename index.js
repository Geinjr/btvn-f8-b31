// var progressBar = document.querySelector(".progress-bar");
// var progress = progressBar.querySelector(".progress");
// var progressSpan = progress.querySelector("span");
// var progressBarWidth = progressBar.clientWidth;
// var isDrag = false;
// var rate = 0;
// var timeupdate = document.querySelector(".timeupdate");
// progressBar.addEventListener("mousedown", function (e) {
//     if (e.which === 1) {
//         var offsetX = e.offsetX;
//         rate = (offsetX / progressBarWidth) * 100;
//         progress.style.width = `${rate}%`;
//         clientXSpan = e.clientX;
//         offsetLeft = offsetX;
//         document.addEventListener("mousemove", handleDrag);

//         isDrag = true;

//         var currentTime = (audio.duration / 100) * rate;
//         currentTimeEl = getTimeFormat(currentTime);
//         audio.currentTime = currentTime;
//         timeupdate.innerText = getTimeFormat(currentTime);
//     }
// });
// progressSpan.addEventListener("mousedown", function (e) {
//     e.stopPropagation();
//     if (e.which === 1) {
//         document.addEventListener("mousemove", handleDrag);
//         clientXSpan = e.clientX;
//         offsetLeft = e.target.offsetLeft;
//         isDrag = true;
//     }
// });

// document.addEventListener("mouseup", function () {
//     document.removeEventListener("mousemove", handleDrag);
//     isDrag = false;
//     audio.currentTime = currentTime;
//     timeupdate.innerText = getTimeFormat(currentTime);
// });

// var clientXSpan = 0;
// var offsetLeft = 0;
// function handleDrag(e) {
//     var spaceMove = e.clientX - clientXSpan + offsetLeft;
//     rate = (spaceMove / progressBarWidth) * 100;
//     if (rate < 0) {
//         rate = 0;
//     }
//     if (rate > 100) {
//         rate = 100;
//     }
//     progress.style.width = `${rate}%`;

//     currentTime = (audio.duration / 100) * rate;
//     audio.currentTime = currentTime;
//     timeupdate.innerText = getTimeFormat(currentTime);
// }

// //Xây dựng player
// var audio = document.querySelector("audio");
// var playAction = document.querySelector(".player .play-action i");
// var currentTimeEl = progressBar.previousElementSibling;
// var durationEl = progressBar.nextElementSibling;
// var getTimeFormat = function (seconds) {
//     var mins = Math.floor(seconds / 60);
//     seconds = Math.floor(seconds - mins * 60);
//     return `${mins < 10 ? "0" + mins : mins}:${
//         seconds < 10 ? "0" + seconds : seconds
//     }`;
// };
// audio.addEventListener("canplay", function () {
//     durationEl.innerText = getTimeFormat(audio.duration);
// });
// playAction.addEventListener("click", function () {
//     if (audio.paused) {
//         audio.play();
//     } else {
//         audio.pause();
//     }
// });
// audio.addEventListener("play", function () {
//     playAction.classList.replace("fa-play", "fa-pause");
// });
// audio.addEventListener("pause", function () {
//     playAction.classList.replace("fa-pause", "fa-play");
// });
// audio.addEventListener("timeupdate", function () {
//     currentTimeEl.innerText = getTimeFormat(audio.currentTime);
//     rate = (audio.currentTime / audio.duration) * 100;
//     progress.style.width = `${rate}%`;
// });
// var timer = document.querySelector(".timer");

// progressBar.addEventListener("mousemove", function (e) {
//     timer.style.display = "block";
//     timer.style.left = `${e.offsetX}px`;
//     rate = (e.offsetX / this.clientWidth) * 100;
//     var currentTime = (audio.duration / 100) * rate;
//     timer.innerText = getTimeFormat(currentTime);
// });

// progressBar.addEventListener("mouseout", function () {
//     timer.style.display = "none";
// });

// progressSpan.addEventListener("mousemove", function (e) {
//     e.stopPropagation();
// });

var progressBar = document.querySelector(".progress-bar");
var progress = progressBar.querySelector(".progress");
var progressSpan = progress.querySelector("span");
var progressBarWidth = progressBar.clientWidth;
var isDrag = false;
var rate = 0;
var timeupdate = document.querySelector(".timeupdate");

var clientXSpan = 0;
var offsetLeft = 0;

progressBar.addEventListener("mousedown", function (e) {
    if (e.which === 1) {
        var offsetX = e.offsetX;
        rate = (offsetX / progressBarWidth) * 100;
        progress.style.width = `${rate}%`; // Corrected string interpolation
        clientXSpan = e.clientX;
        offsetLeft = offsetX;
        document.addEventListener("mousemove", handleDrag);
        isDrag = true;
    }
});

progressSpan.addEventListener("mousedown", function (e) {
    e.stopPropagation();
    if (e.which === 1) {
        document.addEventListener("mousemove", handleDrag);
        clientXSpan = e.clientX;
        offsetLeft = e.target.offsetLeft;
        isDrag = true;
    }
});

document.addEventListener("mouseup", function () {
    document.removeEventListener("mousemove", handleDrag);
    if (isDrag) {
        isDrag = false;
        var currentTime = (audio.duration / 100) * rate;
        audio.currentTime = currentTime;
        timeupdate.innerText = getTimeFormat(currentTime);
    }
});

function handleDrag(e) {
    var spaceMove = e.clientX - clientXSpan + offsetLeft;
    rate = (spaceMove / progressBarWidth) * 100;
    if (rate < 0) {
        rate = 0;
    }
    if (rate > 100) {
        rate = 100;
    }
    progress.style.width = `${rate}%`;
}

// Xây dựng player
var audio = document.querySelector("audio");
var playAction = document.querySelector(".player .play-action i");
var currentTimeEl = progressBar.previousElementSibling;
var durationEl = progressBar.nextElementSibling;
var getTimeFormat = function (seconds) {
    var mins = Math.floor(seconds / 60);
    seconds = Math.floor(seconds - mins * 60);
    return `${mins < 10 ? "0" + mins : mins}:${
        seconds < 10 ? "0" + seconds : seconds
    }`;
};

audio.addEventListener("canplay", function () {
    durationEl.innerText = getTimeFormat(audio.duration);
});

playAction.addEventListener("click", function () {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});

audio.addEventListener("play", function () {
    playAction.classList.replace("fa-play", "fa-pause");
});

audio.addEventListener("pause", function () {
    playAction.classList.replace("fa-pause", "fa-play");
});

audio.addEventListener("timeupdate", function () {
    if (!isDrag) {
        currentTimeEl.innerText = getTimeFormat(audio.currentTime);
        rate = (audio.currentTime / audio.duration) * 100;
        progress.style.width = `${rate}%`;
    }
});

var timer = document.querySelector(".timer");

progressBar.addEventListener("mousemove", function (e) {
    timer.style.display = "block";
    timer.style.left = `${e.offsetX}px`; // Corrected string interpolation
    rate = (e.offsetX / this.clientWidth) * 100;
    var currentTime = (audio.duration / 100) * rate;
    timer.innerText = getTimeFormat(currentTime);
});

progressBar.addEventListener("mouseout", function () {
    timer.style.display = "none";
});

progressSpan.addEventListener("mousemove", function (e) {
    e.stopPropagation();
});
