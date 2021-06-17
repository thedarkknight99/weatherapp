
import './App.css';
import Weather from './components/Weather'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'weather-icons/css/weather-icons.css'
import Input from './components/Input';




function App() {
  return (
    <div className="App">
      <h1 className="py-3">Weather App</h1>
      {/* <Input/> */}
      <Weather/>
    </div>
  );
}

export default App;
