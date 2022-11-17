const {
  ERROR_MESSAGE,
  INPUT_MESSAGE,
  BRIDGE_ELEMENT,
} = require('./utils/Constant');

/**
 * 다리 건너기 게임을 관리하는 클래스
 */
class BridgeGame {
  #selected;

  constructor() {
    this.#selected = '';
    this.tryCnt = 1;
  }

  static validate(input) {
    if (input !== INPUT_MESSAGE.UP && input !== INPUT_MESSAGE.DOWN) {
      throw new Error(ERROR_MESSAGE.LEVEL_INPUT);
    }
  }

  getSelected(i) {
    return this.#selected[i];
  }

  getLength() {
    return this.#selected.length;
  }

  getResult(bridge) {
    for (let i = 0; i < this.getLength(); i += 1) {
      if (bridge.getBridge(i) !== this.getSelected(i)) return false;
    }
    return true;
  }

  getTryCnt() {
    return this.tryCnt;
  }

  /**
   * 사용자가 칸을 이동할 때 사용하는 메서드
   * <p>
   * 이동을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  move(input) {
    this.constructor.validate(input);
    if (input === INPUT_MESSAGE.UP) {
      this.#selected += BRIDGE_ELEMENT.UP;
    } else if (input === INPUT_MESSAGE.DOWN) {
      this.#selected += BRIDGE_ELEMENT.DOWN;
    }
  }

  /**
   * 사용자가 게임을 다시 시도할 때 사용하는 메서드
   * <p>
   * 재시작을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  retry() {}
}

module.exports = BridgeGame;
