'use strict';

const homeScoreStrEl = document.getElementById('home-score-lcd--stretch');
const guestScoreStrEl = document.getElementById('guest-score-lcd--stretch');
const homeFoulStrEl = document.getElementById('home-foul-lcd--stretch');
const guestFoulStrEl = document.getElementById('guest-foul-lcd--stretch');
const homeBtnEl = document.querySelectorAll('.add-btn--home');
const guestBtnEl = document.querySelectorAll('.add-btn--guest');
const foulBtnEl = document.querySelectorAll('.foul-btn');
const checkWinnerBtnEl = document.querySelector('#btn-check-winner');
const newGameBtnEl = document.querySelector('#btn-new-game');
const timerEl = document.querySelector('.timer-text');
const periodEl = document.querySelector('.period-text');

// This is the for the cause foul button,
// so that it can pick between the 2 teams, 
// while using 1 event listener
const teamArray = ['home', 'guest'];

// This is to help with setting a range of 
// random numbers found in the addPoint func
// and to be used with the randomNum func()
const foulPointsArr = [0, 3, 4];

let homeScoreStr, guestScoreStr, homeFoulStr, guestFoulStr, isGameOver, timer;

// Basic init function
const init = function () {
  homeScoreStr = 0;
  guestScoreStr = 0;
  homeFoulStr = 0;
  guestFoulStr = 0;
  isGameOver = false;

  homeScoreStrEl.textContent = homeScoreStr;
  guestScoreStrEl.textContent = guestScoreStr;
  homeFoulStrEl.textContent = homeFoulStr;
  guestFoulStrEl.textContent = guestFoulStr;


  timerEl.textContent = '40:00';
  periodEl.textContent = 1;
}

init();

// This is what adds points to the scoreboard, 
// the func has certain params that help in with 
// the event listeners below 
const addPoint = function (btnNum, team, point) {
  // This line of code Guil helped me with,
  // credit to Guil here. Thank you Guil!
  if (isGameOver) return;

  if (point === 'point') {
    if (team === 'home') {
      homeScoreStr += btnNum;
      homeScoreStrEl.textContent = homeScoreStr;
    } else if (team === 'guest') {
      guestScoreStr += btnNum;
      guestScoreStrEl.textContent = guestScoreStr;
    }
  } else if (point === 'foul') {
    if (team === 'home') {
      homeFoulStr += btnNum;
      homeFoulStrEl.textContent = homeFoulStr;

      // These 3 lines, is what simulates the random 
      // foul during a match
      let randNum = randomNum();
      guestScoreStr += foulPointsArr[randNum];
      guestScoreStrEl.textContent = guestScoreStr;
    } else if (team === 'guest') {
      guestFoulStr += btnNum;
      guestFoulStrEl.textContent = guestFoulStr;

      // same as here
      let randNum = randomNum();
      homeScoreStr += foulPointsArr[randNum];
      homeScoreStrEl.textContent = homeScoreStr;
    }
  }
}

// Normal random function
const randomNum = function () {
  return Math.trunc(Math.random() * 3);
}


// The event listeners for the buttons
// all home buttons
for (let i = 0; i < homeBtnEl.length; i++) {
  homeBtnEl[i].addEventListener('click', function () {
    addPoint(i + 1, 'home', 'point')
  })
};

// all guest buttons
for (let i = 0; i < guestBtnEl.length; i++) {
  guestBtnEl[i].addEventListener('click', function () {
    addPoint(i + 1, 'guest', 'point')
  })
};

// both foul buttons
for (let i = 0; i < foulBtnEl.length; i++) {
  foulBtnEl[i].addEventListener('click', function () {
    addPoint(1, teamArray[i], 'foul')
  })
}

// This allows for the game to be reset and to start
// the timer countdown.
newGameBtnEl.addEventListener('click', function () {
  init();

  const startingMinutes = 40;
  let time = startingMinutes * 60;

  const countdown = function () {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    timerEl.textContent = `${minutes}:${seconds}`;
    time--;

    // This little block of code, especially the clearInterval
    // took me forever to figure out, not that this is important
    // but the immense amount of joy I felt, was incredible.
    if (timerEl.textContent === '20:00') {
      timerEl.style.color = 'var(--project-clr-accent-v2)'
      periodEl.textContent = 2;
    } else if (timerEl.textContent === '5:00') {
      timerEl.style.color = 'var(--project-clr-accent)'
    } else if (timerEl.textContent === '0:00') {
      isGameOver = true

      if (homeScoreStr > guestScoreStr) {
        homeScoreStrEl.textContent = '👍';
        guestScoreStrEl.textContent = '👎';
      } else if (homeScoreStr < guestScoreStr) {
        guestScoreStrEl.textContent = '👍';
        homeScoreStrEl.textContent = '👎';
      } else {
        homeScoreStrEl.textContent = '👍';
        guestScoreStrEl.textContent = '👍';
      }

      clearInterval(timer);
    }
  }

  // below is how to run this at 40 mins, setting it
  // to 1000, however, I am sure you do not want to
  // wait, so I set it to 1, if you want, set to 10
  // if its too fast, Pick which you like:

  // const timer = setInterval(countdown, 1000)
  // const timer = setInterval(countdown, 100)
  // const timer = setInterval(countdown, 10)
  const timer = setInterval(countdown, 1)
})
