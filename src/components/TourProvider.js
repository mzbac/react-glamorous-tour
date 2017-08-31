import React, { Component, Children } from 'react';
import { unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer } from 'react-dom'
import Tour from './tour/Tour';
import { REACT_GLAMOROUS_TOUR } from './constants';
import PropTypes from 'prop-types';

const portalNodes = {};

class TourProvider extends Component {
  constructor() {
    super();
    this.steps = [];
    this.setSteps = this.setSteps.bind(this);
    this.getSteps = this.getSteps.bind(this);
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
    if (!this.props.active) {
      return
    }

    this.renderTour(this.props)
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

  renderTour(props) {
    if (!portalNodes[this.props.group]) {
      this.createPortal()
    }

    renderSubtreeIntoContainer(this, <Tour steps={this.steps} />, portalNodes[this.props.group].node)
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
