import React from 'react';
import TourOverlayLayer from './TourOverlayLayer';
import TourHighlightLayer from './TourHighlightLayer';
import PropTypes from 'prop-types';

const Tour = props => {
  const {
    children,
    overlayStyles,
    highlightStyles,
    activeTour,
    currentStepElm,
    highlightDelay = 300,
  } = props;
  if (!activeTour) return null;
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
