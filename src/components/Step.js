import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { REACT_GLAMOROUS_TOUR } from './constants'

export default (WrappedComponent, selector) => {
  class connectedStep extends Component {
    componentDidMount() {
      const steps = this.context[REACT_GLAMOROUS_TOUR].getSteps();
      const node = findDOMNode(this);
      steps.push({
        selector,
        node,
      });
      this.context[REACT_GLAMOROUS_TOUR].setSteps(steps);
      if (node) node.setAttribute('react-glamorous-tour-step-id', selector);
    }

    componentWillUnmount() {
      const steps = this.context[REACT_GLAMOROUS_TOUR].getSteps();
      this.context[REACT_GLAMOROUS_TOUR].setSteps(steps.filter(item => item !== selector));
    }

    render() {
      return <WrappedComponent  {...this.props} />;
    }
  }

  connectedStep.contextTypes = {
    [REACT_GLAMOROUS_TOUR]: PropTypes.shape({
      setSteps: PropTypes.func.isRequired,
      getSteps: PropTypes.func.isRequired,
      getIsConfigured: PropTypes.func.isRequired,
      renderTour:PropTypes.func.isRequired,
      unmountTour: PropTypes.func.isRequired,
      goNext: PropTypes.func.isRequired,
      goPrevious: PropTypes.func.isRequired,
      dismiss: PropTypes.func.isRequired,
      done: PropTypes.func.isRequired,
    }),
  };
  return connectedStep;
};