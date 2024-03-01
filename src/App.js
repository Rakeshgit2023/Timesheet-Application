import { MsalProvider } from "@azure/msal-react";
import "./App.css";
import ParentRoute from "./Components/ParentRoute";
import ContextProvider from "./Context/ContextProvider";
 
function App({ instance }) {
  return (
    <MsalProvider instance={instance}>
      <ContextProvider>
        <ParentRoute />
      </ContextProvider>
    </MsalProvider>
  );
}
 
export default App;