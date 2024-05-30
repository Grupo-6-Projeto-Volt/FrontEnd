import './App.css';
import NavBar from './components/navbar/NavBar';
import FaleConosco from './components/faleconosco/FaleConosco';
import Competencias from './components/competencias/Competencias';
import Footer from './components/footer/Footer';

function App() {
  return (
    <>
      <NavBar />
      <Competencias />
      <FaleConosco />
      <Footer />
    </>
  );
}

export default App;
