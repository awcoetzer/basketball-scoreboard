'use strict';

// required version
const homeScoreReqEl = document.getElementById('home-score-lcd--required');
const guestScoreReqEl = document.getElementById('guest-score-lcd--required');

let homeScore = 0;
let guestScore = 0;

homeScoreReqEl.textContent = homeScore;
guestScoreReqEl.textContent = guestScore;

// The onclick functions for the first scoreboard -- home
const homeAddOne = function () {
  homeScore += 1;
  homeScoreReqEl.textContent = homeScore;
}

const homeAddTwo = function () {
  homeScore += 2;
  homeScoreReqEl.textContent = homeScore;
}

const homeAddThree = function () {
  homeScore += 3;
  homeScoreReqEl.textContent = homeScore;
}

// The onclick functions for the first scoreboard -- guest
const guestAddOne = function () {
  guestScore += 1;
  guestScoreReqEl.textContent = guestScore;
}

const guestAddTwo = function () {
  guestScore += 2;
  guestScoreReqEl.textContent = guestScore;
}

const guestAddThree = function () {
  guestScore += 3;
  guestScoreReqEl.textContent = guestScore;
}