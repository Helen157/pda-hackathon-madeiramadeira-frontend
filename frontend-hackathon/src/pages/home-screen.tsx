import logo from '../assets/logo.png';
import Button from '../components/button';
import './home-screen.css'; 

function Home() {
  const handleButtonClick = () => {
    alert("Botão clicado!");
  };
  
  return (
    <div id="home-root">
        <img src={logo} alt="Logo" className="home-logo" />
        <Button 
          label="Entrar" 
          onClick={handleButtonClick} 
        />
        <p className='termos'>Termos e condições</p>
    </div>
  );
}

export default Home;
