import './App.css';
import ParentRoute from './Components/ParentRoute';
import ContextProvider from './Context/ContextProvider';
function App() {
  return (
    <ContextProvider>
    <ParentRoute/>
    </ContextProvider>
  );
}

export default App;
