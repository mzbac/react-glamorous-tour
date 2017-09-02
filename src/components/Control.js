import React from 'react';
import { REACT_GLAMOROUS_TOUR } from './constants'
import PropTypes from 'prop-types';

export default WrappedComponent => {
  const connectedControl = (props, context) => {
    const {
      getIsConfigured,
      renderTour,
      unmountTour,
      goNext,
      goPrevious,
      dismiss,
      done,
    } = context[REACT_GLAMOROUS_TOUR];
    return <WrappedComponent
      {...props}
      tourIsConfigured ={getIsConfigured}
      renderTour={renderTour}
      unmountTour={unmountTour}
      tourGoNext={goNext}
      tourGoPrevious={goPrevious}
      tourDismiss={dismiss}
      tourDone={done}
    />;
  };

  connectedControl.contextTypes = {
    [REACT_GLAMOROUS_TOUR]: PropTypes.shape({
      setSteps: PropTypes.func.isRequired,
      getSteps: PropTypes.func.isRequired,
      getIsConfigured: PropTypes.func.isRequired,
      renderTour: PropTypes.func.isRequired,
      unmountTour: PropTypes.func.isRequired,
      goNext: PropTypes.func.isRequired,
      goPrevious: PropTypes.func.isRequired,
      dismiss: PropTypes.func.isRequired,
      done: PropTypes.func.isRequired,
    }),
  };
  return connectedControl;
};