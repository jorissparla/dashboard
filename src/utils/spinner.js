import React from 'react';
import './Spinner.css';

const Spinner2 = () => {
  return (
    <div className="preloader-wrapper big active">
      <div className="spinner-layer spinner-blue-only">
        <div className="circle-clipper left">
          <div className="circle" />
        </div>
        <div className="gap-patch">
          <div className="circle" />
        </div>
        <div className="circle-clipper right">
          <div className="circle" />
        </div>
      </div>
    </div>
  );
};

const texts = ['Just a few seconds more...', 'working on it...', 'Almost there..'];

const Spinner = () => {
  const [counter, setCounter] = React.useState(0);
  const [msg, setMsg] = React.useState(texts[0]);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCounter(prev => counter + 1);
      setMsg(texts[counter % 3]);
    }, 1000);
  });

  return (
    <>
      <div className="spinner">
        <div className="rect1" />
        <div className="rect2" />
        <div className="rect3" />
        <div className="rect4" />
        <div className="rect5" />
      </div>
      {/* <div className="largeheader fade-in">
        {msg} {counter}
      </div> */}
    </>
  );
};
export default Spinner;
