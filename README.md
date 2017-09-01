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
2 . Using Step component to wrap up your target step component
```jsx
import { TourProvider, Step } from "react-glamorous-tour";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const BootsrapCard = () => (<div className="card" >
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
const Step2 = Step(BootsrapCard,'step2');
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
