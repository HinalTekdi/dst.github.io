import React, {useState, useEffect} from 'react';
import './App.css';

export default function App() {
  const [trainee, setTrainee] = useState({});
  const [isEnrl, setEnrl] = useState(true);

  useEffect(() => {

    window.addEventListener('message', function (e) {
      const data = e.data;
      console.log('data', data);
      try {
        const decoded = JSON.parse(data);
        if(decoded.channel === 'enketo') {
          setTimeout( () => {
            setTrainee(decoded.message)
            setEnrl(false)
           }, 1000)
        }
      }
      catch (e) {
        // console.log(e)
      }
    });
  }, []);

  return (
    <div className="App">
      <header>
        <div className="row logo">
          <div className="shaksham-logo">
            <img className="haiyana-small-logo" src='../GoH-Transparent.png' alt="logo"/>
          </div>
          <div>
            <img className="iti-small-logo" src='../SDIT-Haryana.png' alt="logo"/>
          </div>
          <div className="hariyana-logo">
            <img className="shaksham-small-logo" src='../saksham-haryana-logo.png' alt="logo"/>
          </div>
        </div>
        <div className="header-text">
          <h2 className="header-text-color">DST Trainee Attendance</h2>
        </div>
      </header>
        {isEnrl ?
          <iframe
            frameBorder="0"
            src={`${process.env.REACT_APP_ENKETO}/preview?xform=${process.env.REACT_APP_GET_FORM}/getForm/enrollment&id=enrollmentD`}
            title="Enrollment"
            allow="geolocation"
            width={'100%'}
            height={'500px'}>
          </iframe>
           :
          <iframe
            frameBorder="0"
            src={`${process.env.REACT_APP_ENKETO}/preview?xform=${process.env.REACT_APP_GET_FORM}/getFormPrefilled/${trainee.id}&id=preFilled`}
            title="Test Geolocation"
            allow="geolocation"
            width={'100%'}
            height={'650px'}>
          </iframe>}
    </div>
  )
}
