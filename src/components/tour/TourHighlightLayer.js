import React from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';

const Highlight = glamorous.div(props => {
  const { highlightStyles } = props;
  return {
    position: 'absolute',
    boxSizing: 'content-box',
    zIndex: 999999,
    transition: 'all .3s ease-out',
    backgroundColor: 'rgba(255,255,255,.9)',
    border: '1px solid rgba(0,0,0,.5)',
    borderRadius: 4,
    boxShadow: '0 2px 15px rgba(0,0,0,.4)',
    width: 810,
    height: 70,
    top: 211,
    left: 515,
    ...highlightStyles
  }
});

const TourHighlightLayer = props => {
  const { children, highlightStyles } = props;

  return (
    <Highlight highlightStyles={highlightStyles}>
      {children}
    </Highlight>
  );
};

TourHighlightLayer.propTypes = {};
export default TourHighlightLayer;
