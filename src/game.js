const MissionUtils = require('@woowacourse/mission-utils');
const { RANDOM_NUMBER, SCORE } = require('./constants');
const { MESSAGE } = require('./constants');

class Game {
  constructor() {
    this.started = false;
    this.randomNumbers;
  }

  init() {
    this.start(MESSAGE.START);
    this.generateRandomNumber(1, 9, 3);
    this.started = true;
  }

  start(startMessage) {
    MissionUtils.Console.print(startMessage);
  }

  generateRandomNumber(min, max, length) {
    this.randomNumbers = [];
    while (this.randomNumbers.length < length) {
      const number = MissionUtils.Random.pickNumberInRange(min, max);
      if (!this.randomNumbers.includes(number)) {
        this.randomNumbers.push(number);
      }
    }
    console.log(this.randomNumbers);

    return this.randomNumbers;
  }

  play() {
    MissionUtils.Console.readLine(MESSAGE.ENTER_NUMBER, (input) => {
      this.isValidInputNumber(input, RANDOM_NUMBER.RANGE);
      const inputNumbers = [...input].map(Number);
      const { ball, strike } = this.countScore(
        inputNumbers,
        this.randomNumbers
      );
      this.printScore(ball, strike);
    });
  }

  isValidInputNumber(numbers, validRange) {
    const diversityOfNum = [...new Set(numbers)].length;

    if (
      numbers.length !== 3 ||
      !validRange.test(numbers) ||
      diversityOfNum !== 3
    ) {
      throw new Error('1부터 9까지 서로 다른 숫자 3개를 입력해주세요');
    }
  }

  countScore(inputNumbers, randomNumbers) {
    let ball = 0;
    let strike = 0;

    inputNumbers.forEach((inputNum, inputIdx) => {
      if (inputNum === randomNumbers[inputIdx]) {
        strike++;
      } else if (randomNumbers.includes(inputNum)) {
        ball++;
      }
    });

    return { ball, strike };
  }

  printScore(ball, strike) {
    let score;

    if (ball > 0) {
      score = `${ball}${SCORE.BALL}`;
    }

    if (strike > 0) {
      score = `${strike}${SCORE.STRIKE}`;
    }

    if (ball > 0 && strike > 0) {
      score = `${ball}${SCORE.BALL} ${strike}${SCORE.STRIKE}`;
    }

    if (ball === 0 || strike === 0) {
      score = SCORE.NOTHING;
    }

    MissionUtils.Console.print(score);
  }
}

module.exports = Game;
