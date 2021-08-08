import './App.css';
import Landing from './Components/Landing/Landing';
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
