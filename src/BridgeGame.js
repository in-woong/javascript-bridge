const { INPUT_MESSAGE } = require('./Utils/Constant');

/**
 * 다리 건너기 게임을 관리하는 클래스
 */
class BridgeGame {
  #selected;

  #tryCnt;

  #result;

  constructor(selected, tryCnt) {
    this.#selected = selected;
    this.#tryCnt = tryCnt;
    this.#result = Array.from({ length: 2 }, () => []);
  }

  get levelCnt() {
    return this.#selected.level;
  }

  get tryCnt() {
    return this.#tryCnt.cnt;
  }

  setInitialResultMap() {
    const length = this.levelCnt;
    this.#result = Array.from({ length: 2 }, () =>
      Array.from({ length }, () => undefined),
    );
  }

  isWin(bridge) {
    for (let level = 0; level < this.levelCnt; level += 1) {
      if (bridge.getElement(level) !== this.#selected.getElement(level))
        return false;
    }
    return true;
  }

  getResultMap(bridge) {
    this.setResultMap(bridge);
    return this.#result;
  }

  setResultMap(bridge) {
    this.setInitialResultMap();
    for (let level = 0; level < this.levelCnt; level += 1) {
      const selectedElement = this.#selected.getElement(level);
      const bridgeElement = bridge.getElement(level);
      this.setResultElement(selectedElement, bridgeElement, level);
    }
  }

  setResultElement(selectedElement, bridgeElement, level) {
    if (selectedElement === bridgeElement) {
      this.setBoolean(selectedElement, level, true);
    } else if (selectedElement !== bridgeElement) {
      this.setBoolean(selectedElement, level, false);
    }
  }

  setBoolean(element, level, bool) {
    if (element === INPUT_MESSAGE.UP) this.#result[0][level] = bool;
    else if (element === INPUT_MESSAGE.DOWN) this.#result[1][level] = bool;
  }

  /**
   * 사용자가 칸을 이동할 때 사용하는 메서드
   * <p>
   * 이동을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  move(input) {
    this.#selected.addElement(input);
  }

  /**
   * 사용자가 게임을 다시 시도할 때 사용하는 메서드
   * <p>
   * 재시작을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  retry() {
    this.#selected.reset();
    this.#tryCnt.add();
  }
}

module.exports = BridgeGame;
