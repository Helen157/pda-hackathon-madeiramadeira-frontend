import Button from '../components/button';
import check from '../assets/check.png'

function Identity(){
    const handleButtonClick = () => {
        alert("Botão clicado!");
  };
    
    return(
        <div id="home-root">
            <img src={check} alt="check" className="home" />
            <h1 className='tex'> Identidade Confirmada </h1>

            <Button 
                label="Entrar" 
                onClick={handleButtonClick} 
             />
    </div>
    )
}

export default Identity;