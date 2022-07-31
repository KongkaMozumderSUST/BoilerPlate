import { useAuth } from "./context/AuthProvider";
function App() {
  const { user } = useAuth();
  const name = user.name;
  return (
    <div className='App'>
      <header className='App-header'>your App</header>
    </div>
  );
}

export default App;
