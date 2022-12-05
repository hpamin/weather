import { ToastContainer } from 'react-toastify';
import './App.css';
  import 'react-toastify/dist/ReactToastify.css';
import Screen from './components/Screen';
import WeatherProvider from './context/WeatherProvider';
import IrCity from './components/IrCity';

function App() {
  return (
    <WeatherProvider>
      <Screen />
      <ToastContainer />
      <IrCity />
    </WeatherProvider>
  );
}

export default App;
