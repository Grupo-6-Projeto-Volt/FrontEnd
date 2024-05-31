import './App.css';
import NavBar from './components/navbar/NavBar';
import Banner from './components/banner/Banner';
import { Servicos } from './components/servicos/Servicos';
function App() {
  return (
    <>
      <div className='header'>
        <Banner />
        <NavBar />
      </div>
      <Servicos />

    </>
  );
}

export default App;
