import React from 'react';
import TourOverlayLayer from './TourOverlayLayer';
import TourHighlightLayer from './TourHighlightLayer';
import TourBox from './TourBox';
import PropTypes from 'prop-types';

const Tour = props => {
  const { overlayStyles, highlightStyles, tourboxStyles, steps } = props;

  return (
    <TourOverlayLayer overlayStyles={overlayStyles}>
      <TourHighlightLayer highlightStyles={highlightStyles}>
        <TourBox tourboxStyles={tourboxStyles} />
      </TourHighlightLayer>
    </TourOverlayLayer>
  );
};

Tour.propTypes = {};
export default Tour;
