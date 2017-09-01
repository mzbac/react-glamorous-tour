import React from 'react';
import Tooltip from 'react-glamorous-tooltip'
import glamorous from 'glamorous';
import PropTypes from 'prop-types';

const Card = glamorous.div(props => {
  const { width } = props;
  return {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    wordWrap: 'break-word',
    backgroundColor: '#fff',
    backgroundClip: 'border-box',
    width,
  }
});
const CardBody = glamorous.div({
  flex: '1 1 auto',
  padding: '.5rem',
});

const CardTitle = glamorous.h4({
  marginBottom: '.75rem'
});
const CardText = glamorous.p({
  marginTop: 0,
  marginBottom: '1rem',
});
const CardButtons = glamorous.div({
  textAlign: 'right',
  whiteSpace: 'nowrap',
});

const CardButton = glamorous.button({
  padding: '.3em .8em',
  border: '1px solid #d4d4d4',
  margin: 0,
  transition: 'all .15s ease-in-out',
  ':hover': {
    color: '#fff',
    backgroundColor: '#727b84',
    borderColor: '#6c757d',
  }
});

const CustomTourboxContainer = glamorous.div({
  position: 'relative'
});

const TourBox = props => {
  const {
    children,
    currentStepElm,
    currentStep,
    currentIdx,
    totalStepNum,
    goNext,
    goPrevious,
    dismiss,
    done
  } = props;
  if (!currentStepElm) return null;
  const {
    position,
    arrow,
    visible = true,
    positionMargin = 20,
    width = '20rem',
    title,
    text
  } = currentStep;
  return (
    <Tooltip
      visible={visible}
      targetElm={currentStepElm}
      positionMargin={positionMargin}
      position={position}
      arrow={arrow}
    >
      {children ? <CustomTourboxContainer>{children}</CustomTourboxContainer> : <Card width={width}>
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <CardText>
            {text}
          </CardText>
          <CardButtons>
            {currentIdx + 1 === totalStepNum ? <CardButton style={{ marginRight: 5 }} onClick={done}>Done</CardButton> :
              <CardButton style={{ marginRight: 5 }} onClick={dismiss}>Skip</CardButton>}
            <CardButton onClick={goPrevious}>Back</CardButton>
            <CardButton onClick={goNext}>Next</CardButton>
          </CardButtons>
        </CardBody>
      </Card>}
    </Tooltip>
  );
};

TourBox.propTypes = {};
export default TourBox;
