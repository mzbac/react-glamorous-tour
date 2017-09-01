import React from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';

const Overlay = glamorous.div(props => {
  const { overlayStyles } = props;
  return {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    boxSizing: 'content-box',
    zIndex: 1000,
    transition: 'all .3s ease-out',
    background: 'radial-gradient(center,ellipse cover,rgba(0,0,0,0.4) 0,rgba(0,0,0,0.8) 100%)',
    ...overlayStyles
  }
});

const TourOverlayLayer = props => {
  const { children, overlayStyles } = props;

  return (
    <Overlay overlayStyles={overlayStyles}>
      {children}
    </Overlay>
  );
};

TourOverlayLayer.propTypes = {};
export default TourOverlayLayer;
