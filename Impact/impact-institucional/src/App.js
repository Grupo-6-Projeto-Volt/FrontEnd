import './App.css';
import NavBar from './components/navbar/NavBar';
import FaleConosco from './components/faleconosco/FaleConosco';
import Competencias from './components/competencias/Competencias';
import Footer from './components/footer/Footer';
import SobreNos from './components/sobrenos/Sobrenos';

function App() {
  return (
    <>
      <NavBar />
      <Competencias />
      <SobreNos />
      <FaleConosco />
      <Footer />
    </>
  );
}

export default App;
