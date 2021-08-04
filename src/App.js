import './App.css';
import Landing from './Components/Landing/Landing';
import CurrencyDialog from './Components/Landing/Modal';
import CurrencyList from './Components/Landing/List';
import { CurrencyProvider } from './Components/Landing/Context';

function App() {
  return (
    <CurrencyProvider>
    <div className="App">            
      <Landing />
    </div>
    </CurrencyProvider>
  );
}

export default App;
