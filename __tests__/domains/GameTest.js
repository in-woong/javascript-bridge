/* eslint no-use-before-define: 0 */
/* eslint no-undef: "off" */
/* eslint no-new: "off" */
/* eslint max-lines-per-function: "off" */

const BridgeGame = require('../../src/BridgeGame');
const Bridge = require('../../src/Model/Bridge');
const Selected = require('../../src/Model/Selected');
const TryCnt = require('../../src/Model/TryCnt');
const { ERROR_MESSAGE } = require('../../src/Utils/Constant');
const Validator = require('../../src/Utils/Validator');

describe('Game 진행 테스트', () => {
  test('이동 input 입력시 game의 level값에 반영', () => {
    const game = new BridgeGame(new Selected(Validator), new TryCnt(Validator));
    const inputArray = ['U', 'U', 'D'];

    inputArray.forEach((input) => game.move(input));

    expect(game.levelCnt).toBe(3);
  });

  test('재시작 시 이전보다 tryCnt 값 증가', () => {
    const game = new BridgeGame(new Selected(Validator), new TryCnt(Validator));

    const tryCnt = game.tryNumber;
    game.retry();

    expect(game.tryNumber).toBe(tryCnt + 1);
  });

  test('이동시 입력 값이 U또는 D가 아닐 시 예외 출력', () => {
    const game = new BridgeGame(new Selected(Validator), new TryCnt(Validator));

    const numberInput = 3;
    const exceptString = 'R';

    expect(() => {
      game.move(numberInput);
    }).toThrow(ERROR_MESSAGE.LEVEL_INPUT);

    expect(() => {
      game.move(exceptString);
    }).toThrow(ERROR_MESSAGE.LEVEL_INPUT);
  });

  test('게임 실패 및 성공여부 출력', () => {
    const randomNumbers = ['1', '0', '0'];
    const mockGenerator = randomNumbers.reduce((acc, number) => {
      return acc.mockReturnValueOnce(number);
    }, jest.fn());

    const game = new BridgeGame(new Selected(Validator), new TryCnt(Validator));
    const bridge = new Bridge(Validator, mockGenerator);
    const inputArray = ['U', 'D', 'U'];

    bridge.setBridge(3);
    inputArray.forEach((input) => game.move(input));

    expect(game.isWin(bridge)).toBe(false);
  });
});
