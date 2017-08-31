import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { REACT_GLAMOROUS_TOUR } from './constants'

export default (WrappedComponent, selector) => {
  class connectedStep extends Component {
    componentDidMount() {
      const steps = this.context[REACT_GLAMOROUS_TOUR].getSteps();
      steps.push({
        selector,
        node: this.self,
      });
      this.context[REACT_GLAMOROUS_TOUR].setSteps(steps);
      if (this.self) this.self.setAttribute('react-glamorous-tour-step-id', selector);
    }

    componentWillUnmount() {
      const steps = this.context[REACT_GLAMOROUS_TOUR].getSteps();
      this.context[REACT_GLAMOROUS_TOUR].setSteps(steps.filter(item => item !== selector));
    }

    render() {
      return <WrappedComponent ref={(self) => {
        this.self = self;
      }} {...this.props} />;
    }
  }

  connectedStep.contextTypes = {
    [REACT_GLAMOROUS_TOUR]: PropTypes.shape({
      setSteps: PropTypes.func.isRequired,
      getSteps: PropTypes.func.isRequired,
    }),
  };
  return connectedStep;
};