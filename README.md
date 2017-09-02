# React-glamorous-tour

## Installation
```sh
npm install --save react-glamorous-tour
```
## Usage
**Using NPM**

1 . Require react-glamorous-tour after installation

```js
import { TourProvider, Step } from "react-glamorous-tour";
```
2 . Using Step component to wrap up your target component
```jsx
import { TourProvider, Step } from "react-glamorous-tour";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const BootstrapCard = () => (<div className="card" >
    <img className="card-img-top" src="..." alt="Card image cap" />
    <div className="card-body">
      <h4 className="card-title">Card title</h4>
      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's
        content.</p>
      <a href="#" className="btn btn-primary">Go somewhere</a>
    </div>
  </div>
);
const Step1 = Step('h2', 'step1');
const Step2 = Step(BootstrapCard,'step2');
const App = () =>
  <div style={styles}>
    <Step1>
      Start editing to see some magic happen {"\u2728"}
    </Step1>
    <Step2 />
  </div>;
```
3 . Using TourProvider wrap up your root component
```jsx
<TourProvider
    active
    steps={[
      {
        selector: "step1",
        title: "Hello world!",
        text: "welcome to the first step of react-glamorous-tour"
      },
      {
        selector: "step2",
        title: "Second step!",
        text: "welcome to the first step of react-glamorous-tour"
      }
    ]}
    afterConfigured={tourProvider => {
      tourProvider.renderTour();
    }}
  >
    <App />
  </TourProvider>
  ```
## Props

| Name | Description | Type | Required |
| --- | --- | :---: | :---: |
| `active` | Defines if the tour are visible or not.| Boolean |  |
| `steps` | All the steps. | [Step[]](#step) | ✅ |
| `onConfigure` | Callback called before the steps are loaded to TourProvider | Function |  |
| `afterConfigured` | Callback called after the steps loaded, tour is isConfigured. | Function  |  |
| `tourBox` | Callback if it's set, provider will call it and use the returned component to replace default tour 

# step
```js
step = {
    selector,
    title, 
    text
    position, 
    arrow, 
    visible = true, 
    positionMargin = 20,
    width = '20rem',
}
```
# using custom tour content box
```jsx
  <TourProvider
    active
    steps={[
      {
        selector: "step1",
        title: "Hello world!",
        text: "welcome to the first step of react-glamorous-tour"
      },
      {
        selector: "step2",
        title: "Second step!",
        text: "welcome to the second step of react-glamorous-tour"
      }
    ]}
    afterConfigured={tourProvider => {
      tourProvider.renderTour();
    }}
    tourBox={(props) => {
      const {
        currentStepElm,
        currentStep,
        currentIdx,
        totalStepNum,
        goNext,
        goPrevious,
        dismiss,
        done
      } = props;
      return <div className="card">
        <img className="card-img-top"
             src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22318%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20318%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15e3d931427%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A16pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15e3d931427%22%3E%3Crect%20width%3D%22318%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22118.0546875%22%20y%3D%2297.2%22%3E318x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
             alt="Card image cap" />
        <div className="card-body">
          <h4 className="card-title">Card title</h4>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's
            content.</p>
          <button className="btn btn-primary" onClick={goPrevious}>Back</button>
          <button className="btn btn-primary" onClick={goNext} >Next</button>
        </div>
      </div>
    }}
  >
    <App />
  </TourProvider>
  ```
# Using Control to get control methods of tour.
```jsx
import { TourProvider, Step, Control } from "react-glamorous-tour";

const ControlButton = Control((props) => {
  const {
    tourIsConfigured,
    renderTour,
    unmountTour,
    goNext,
    goPrevious,
    dismiss,
    done,
  } = props;
  return <button onClick={() => {
    if (tourIsConfigured()) renderTour()
  }}>tour start</button>;
});
class App extends Component {
  render() {
    return (
      <TourProvider
        active
        steps={
          [
            {
              selector: "step1",
              title: "Hello world!",
              text: "welcome to the first step of react-glamorous-tour"
            },
            {
              selector: "step2",
              title: "Second step!",
              text: "welcome to the second step of react-glamorous-tour"
            }
          ]
        }
      >
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Step1>Welcome to React</Step1>
          </div>

          <Step2 className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </Step2>
          <ControlButton />
        </div>
      </TourProvider>
    );
  }
}

export default App;
```