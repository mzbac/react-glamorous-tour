import React, { Component, Children } from 'react';
import { unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer } from 'react-dom'
import Tour from './tour/Tour';
import TourController from '../utils/TourController';

import { REACT_GLAMOROUS_TOUR } from './constants';
import PropTypes from 'prop-types';

const portalNodes = {};

class TourProvider extends Component {
  constructor() {
    super();
    this.steps = [];
    this.stepController = null;
    this.isConfigured = false;
    this.setSteps = this.setSteps.bind(this);
    this.getSteps = this.getSteps.bind(this);
    this.renderTour = this.renderTour.bind(this);
    this.goNext = this.goNext.bind(this);
    this.goPrevious = this.goPrevious.bind(this);
  }

  getChildContext() {
    return {
      [REACT_GLAMOROUS_TOUR]: {
        setSteps: this.setSteps,
        getSteps: this.getSteps,
      }
    };
  }

  componentDidMount() {
    const { active, steps, onConfigure, afterConfigured } = this.props;
    if (!active) {
      return
    }
    if (onConfigure) onConfigure.call(null, this);
    this.stepController = new TourController(steps);
    this.isConfigured = true;
    if (afterConfigured) afterConfigured.call(null, this);
  }

  goNext() {
    if (!this.stepController) return;
    this.stepController.goNext();
  }

  goPrevious() {
    if (!this.stepController) return;
    this.stepController.goPrevious();
  }

  setSteps = steps => {
    this.steps = steps;
  };
  getSteps = () => this.steps;

  createPortal() {
    portalNodes[this.props.group] = {
      node: document.createElement('div'),
    };
    document.body.appendChild(portalNodes[this.props.group].node)
  }

  renderTour() {
    if (!portalNodes[this.props.group]) {
      this.createPortal()
    }
    if (!this.stepController) return;
    const currentStep = this.stepController.getCurrentStep();
    if (!currentStep) return;
    let currentStepElm = this.steps.find((elm) => {
        return elm.selector === currentStep.selector;
      }) || {};
    if (!currentStepElm.node) {
      currentStepElm.node = document.querySelector(currentStep.selector);
    }
    if (!currentStepElm) return;
    const tourProps = {
      currentStep,
      currentStepElm: currentStepElm.node,
      goNext: this.goNext,
      goPrevious: this.goPrevious,
    };

    renderSubtreeIntoContainer(this, <Tour {...tourProps} />, portalNodes[this.props.group].node)
  }

  render() {
    return Children.only(this.props.children)
  }
}
TourProvider.propTypes = {};
TourProvider.defaultProps = {
  active: false,
  group: 'main',
};
TourProvider.childContextTypes = {
  [REACT_GLAMOROUS_TOUR]: PropTypes.shape({
    setSteps: PropTypes.func.isRequired,
    getSteps: PropTypes.func.isRequired,
  }),
};
export default TourProvider;
