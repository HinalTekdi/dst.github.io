import React, {useState, useEffect} from 'react';
import './App.css';

export default function App() {
  const [trainee, setTrainee] = useState({});
  const [isEnrl, setEnrl] = useState(true);

  useEffect(() => {

    window.addEventListener('message', function (e) {
      const data = e.data;
      try {
        const decoded = JSON.parse(data);
        if(decoded.channel === 'enketo') {
          console.log('data', decoded);
          setTimeout( () => {
            setTrainee(decoded.message)
            setEnrl(false)
          }, 1000)
        }
      }
      catch (e) {
        console.log(e)
      }
    });
  }, []);

  return (
    <div className="App">
      <header>
        <img src='../saksham-haryana-logo.png' alt="logo" width={'10%'}/>
        <h1>DST-PWA</h1>
        {isEnrl ?
          <iframe
          frameBorder="0"
          src="http://localhost:8005/preview?xform=http://localhost:8000/enrollment.xml"
          title="Enrollment"
          width={'100%'}
          height={'806px'}>
        </iframe> :
          <iframe
            frameBorder="0"
            src={`http://localhost:8005/preview?xform=http://localhost:8080/getFormPrefilled/${trainee.id}`}
            title="Test Geolocation"
            allow="geolocation"
            width={'100%'}
            height={'806px'}>
          </iframe>}
      </header>
    </div>
  )
}
