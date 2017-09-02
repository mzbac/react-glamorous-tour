import React, { Component } from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';

const getElmPosition = (element) => {
  const elementPosition = {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  };
  if (!element) return elementPosition;
  const body = document.body;
  const docEl = document.documentElement;

  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  if (element instanceof SVGElement) {
    const x = element.getBoundingClientRect();
    elementPosition.top = x.top + scrollTop;
    elementPosition.width = x.width;
    elementPosition.height = x.height;
    elementPosition.left = x.left + scrollLeft;
  } else {
    //set width
    elementPosition.width = element.offsetWidth;

    //set height
    elementPosition.height = element.offsetHeight;

    //calculate element top and left
    let _x = 0;
    let _y = 0;
    while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
      _x += element.offsetLeft;
      _y += element.offsetTop;
      element = element.offsetParent;
    }
    //set top
    elementPosition.top = _y;
    //set left
    elementPosition.left = _x;
  }

  return elementPosition;
};

const Highlight = glamorous.div(props => {
  const { highlightStyles, currentStepElm } = props;
  const elementPosition = getElmPosition(currentStepElm);
  const widthHeightPadding = 10;
  const HighlightElementStyle = {
    top: elementPosition.top - (widthHeightPadding / 2),
    left: elementPosition.left - (widthHeightPadding / 2),
    width: elementPosition.width + widthHeightPadding,
    height: elementPosition.height + widthHeightPadding,
  };
  return {
    position: 'absolute',
    boxSizing: 'content-box',
    zIndex: 1001,
    transition: 'all .3s ease-out',
    backgroundColor: 'rgba(255,255,255,.9)',
    border: '1px solid rgba(0,0,0,.5)',
    borderRadius: 4,
    boxShadow: '0 2px 15px rgba(0,0,0,.4)',
    ...HighlightElementStyle
  }
});

class TourHighlightLayer extends Component {
  constructor() {
    super();
    this.originalElmStyle = null;
  }

  componentDidMount() {
    const { currentStepElm, highlightDelay } = this.props;
    this.originalElmStyle = { ...currentStepElm.style };
    //hacky need to fix
    this.timer = setTimeout(() => {
      currentStepElm.style.position = 'relative';
      currentStepElm.style.zIndex = '1002';
    }, highlightDelay);

  }

  componentWillReceiveProps(nextProps) {
    const { currentStepElm } = this.props;
    currentStepElm.style = { ...this.originalElmStyle };
    this.originalElmStyle = { ...nextProps.currentStepElm.style };
    //hacky need to fix
    this.timer = setTimeout(() => {
      nextProps.currentStepElm.style.position = 'relative';
      nextProps.currentStepElm.style.zIndex = '1002';
    }, nextProps.highlightDelay);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    const { currentStepElm } = this.props;
    currentStepElm.style = { ...this.originalElmStyle };
  }

  render() {
    const { highlightStyles, currentStepElm } = this.props;

    return <Highlight highlightStyles={highlightStyles} currentStepElm={currentStepElm} />;
  }
}


TourHighlightLayer.propTypes = {};
export default TourHighlightLayer;
