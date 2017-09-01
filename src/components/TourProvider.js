import React, { Component, Children } from 'react';
import { unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer } from 'react-dom'
import Tour from './tour/Tour';
import DefaultTourBox from './tour/TourBox';
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
    this.unmountTour = this.unmountTour.bind(this);
    this.goNext = this.goNext.bind(this);
    this.goPrevious = this.goPrevious.bind(this);
    this.dismiss = this.dismiss.bind(this);
    this.done = this.done.bind(this);
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
    if (this.stepController.goNext() !== undefined) this.renderTour();
  }

  goPrevious() {
    if (!this.stepController) return;
    if (this.stepController.goPrevious() !== undefined) this.renderTour();
  }

  dismiss() {
    const { onDismiss } = this.props;
    if (onDismiss) onDismiss(this.stepController.getCurrentStep());
    this.unmountTour();
  }

  done() {
    const { onDone } = this.props;
    if (onDone) onDone({
      currentIdx: this.stepController.getCurrentIdx(),
      totalStepNum: this.stepController.getTotalStepNum(),
      currentStep: this.stepController.getCurrentStep(),
    });
    this.unmountTour();
  }

  setSteps(steps) {
    this.steps = steps;
  };

  getSteps() {
    return this.steps;
  }

  createPortal() {
    portalNodes[this.props.group] = {
      node: document.createElement('div'),
    };
    document.body.appendChild(portalNodes[this.props.group].node)
  }

  renderTour() {
    const { group, tourBox } = this.props;
    if (!portalNodes[group]) {
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
    if (!currentStepElm.node) return;
    let tourContent = null;
    const tourBoxProps = {
      currentStep,
      currentStepElm: currentStepElm.node,
      goNext: this.goNext,
      goPrevious: this.goPrevious,
      currentIdx: this.stepController.getCurrentIdx(),
      totalStepNum: this.stepController.getTotalStepNum(),
      dismiss: this.dismiss,
      done: this.done,
    };
    if (tourBox) tourContent = tourBox(tourBoxProps);
    const tourProps = {
      currentStep,
      currentStepElm: currentStepElm.node,
      goNext: this.goNext,
      goPrevious: this.goPrevious,
    };

    renderSubtreeIntoContainer(this,
      <Tour {...tourProps}>
        <DefaultTourBox {...tourBoxProps}>
          {tourContent}
        </DefaultTourBox>
      </Tour>, portalNodes[group].node)
  }

  unmountTour() {
    const { group } = this.props;
    renderSubtreeIntoContainer(this,
      <div />, portalNodes[group].node)
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
