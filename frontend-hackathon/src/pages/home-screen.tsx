import logo from '../assets/logo.png';
import Button from '../components/button';

function Home() {
  const handleButtonClick = () => {
    alert("Botão clicado!");
  };
  
  return (
    <div id="home-root">
        <img src={logo} alt="Logo" className="home" />
        <Button 
          label="Entrar" 
          onClick={handleButtonClick} 
        />
        <p className='termos'>Termos e condições</p>
    </div>
  );
}

export default Home;
