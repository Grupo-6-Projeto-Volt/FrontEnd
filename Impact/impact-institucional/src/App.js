import './App.css';
import NavBar from './components/navbar/NavBar';
import Banner from './components/banner/Banner';
import { Servicos } from './components/servicos/Servicos';
import Squad from './components/squad/Squad';
function App() {
  return (
    <>
      <div className='header'>
        <Banner />
        <NavBar />
      </div>
      <Servicos />
      <Squad />

    </>
  );
}

export default App;
