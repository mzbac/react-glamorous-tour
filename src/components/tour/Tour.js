import React from 'react';
import TourOverlayLayer from './TourOverlayLayer';
import TourHighlightLayer from './TourHighlightLayer';
import PropTypes from 'prop-types';

const Tour = props => {
  const {
    children,
    overlayStyles,
    highlightStyles,
    currentStepElm,
    highlightDelay = 300,
  } = props;
  return (
    <TourOverlayLayer overlayStyles={overlayStyles}>
      {children}
      <TourHighlightLayer
        highlightStyles={highlightStyles}
        currentStepElm={currentStepElm}
        highlightDelay={highlightDelay}
      />
    </TourOverlayLayer>
  );
};

Tour.propTypes = {};
export default Tour;
