import React from 'react';
import TourOverlayLayer from './TourOverlayLayer';
import TourHighlightLayer from './TourHighlightLayer';
import TourBox from './TourBox';
import PropTypes from 'prop-types';

const Tour = props => {
  const {
    overlayStyles,
    highlightStyles,
    tourboxStyles,
    currentStep,
    currentStepElm,
    ...restProps
  } = props;
  return (
    <TourOverlayLayer overlayStyles={overlayStyles}>
      <TourHighlightLayer highlightStyles={highlightStyles} currentStepElm={currentStepElm}>
        <TourBox tourboxStyles={tourboxStyles} currentStepElm={currentStepElm}
                 currentStep={currentStep} {...restProps} />
      </TourHighlightLayer>
    </TourOverlayLayer>
  );
};

Tour.propTypes = {};
export default Tour;
