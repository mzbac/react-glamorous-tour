class TourController {
  constructor(steps = []) {
    this.steps = steps;
    this.idx = 0;
  }

  getCurrentStep() {
    return this.steps[this.idx];
  }

  goNext() {
    if (this.idx + 2 > this.steps.length) return;
    this.idx = this.idx + 1;
  }

  goPrevious() {
    if (this.idx < 1) return;
    this.idx = this.idx - 1;
  }

  getCurrentIdx() {
    return this.idx;
  }

  getTotalStepNum() {
    return this.steps.length;
  }
}

export default TourController;