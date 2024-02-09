let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "purple", "green"];
let btns2 = ["a", "b", "c", "d"];

let started = false;
let level = 0;
let highScore = 0;
let h2 = document.querySelector("h2");
document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("Game Started");
        started = true;
        levelup();
    }
});

function gameFlash(btn) {
    // btn.classList.add("animation");
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
        // btn.classList.remove("animation");
    }, 250);
    document.querySelector("body").style.backgroundColor = "#2b2b2b";
}

function userFlash(btn) {
    // btn.classList.add("animation");
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
        // btn.classList.remove("animation");
    }, 100);
}
function levelup() {
    if (level == 1) {
        document.querySelector("#one").style.backgroundColor = "greenyellow";
        document.querySelector("#six").style.backgroundColor = "greenyellow";
    } else if (level == 2) {
        document.querySelector("#two").style.backgroundColor = "greenyellow";
        document.querySelector("#seven").style.backgroundColor = "greenyellow";
    } else if (level == 3) {
        document.querySelector("#three").style.backgroundColor = "greenyellow";
        document.querySelector("#eight").style.backgroundColor = "greenyellow";
    } else if (level == 4) {
        document.querySelector("#four").style.backgroundColor = "greenyellow";
        document.querySelector("#nine").style.backgroundColor = "greenyellow";
    } else if (level == 5) {
        document.querySelector("#five").style.backgroundColor = "greenyellow";
        document.querySelector("#ten").style.backgroundColor = "greenyellow";
    }

    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns2[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    if (randColor == "a") {
        randColor = "red";
    } else if (randColor == "b") {
        randColor = "yellow";
    } else if (randColor == "c") {
        randColor = "green";
    } else if (randColor == "d") {
        randColor = "purple";
    }
    gameSeq.push(randColor);
    gameFlash(randbtn);

    if (highScore < level) {
        highScore = level;
        h3.innerHTML = `Your High Score is : ${highScore}`;
        localStorage.setItem('highScore', highScore.toString());
    }
}

function checkAns(idx) {
    if (userSeq[idx] == gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelup, 2000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b><br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 250);

        reset();
        const audio = new Audio("wrongans.wav");
        audio.play();
    }
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;

}


const audio = new Audio("btn2.wav");

function btnPress() {
    audio.play();
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}
window.onload = function () {
    // Check if the high score exists in local storage
    if (localStorage.getItem('highScore')) {
        // Retrieve the high score and update the high score variable
        highScore = parseInt(localStorage.getItem('highScore'));
        // Update the high score display
        h3.innerHTML = `Your High Score is : ${highScore}`;
    }
};
let allBtn = document.querySelectorAll(".btn");
for (btn of allBtn) {
    btn.addEventListener("click", btnPress);
}

let h3 = document.querySelector("h3");
h3.innerHTML = `Your High Score is : ${highScore}`;

let re = document.querySelector(".re");

re.addEventListener("click", function () {
    highScore = 0;
    h3.innerHTML = `Your High Score is : ${highScore}`;
})