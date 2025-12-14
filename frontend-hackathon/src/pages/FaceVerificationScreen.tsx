import { useEffect, useRef, useState } from 'react';
import Button from './../components/button'; 

export default function FaceVerificationScreen() { 
  // O componente é tipado como JSX.Element (ou React.FC)
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState<boolean>(false); // Usando tipagem TypeScript

  // Lógica de inicialização da câmera (Inalterada, pois é lógica de JS)
  useEffect(() => {
    if (!started) return;

    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
          audio: false
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        alert('Não foi possível acessar a câmera. Verifique as permissões.');
        console.error(error);
      }
    }

    startCamera();
  }, [started]);


  /* Passo 1 — INSTRUÇÕES PARA VERIFICAÇÃO FACIAL */

  if (!started) {
    return (
      <div 
        style={{
          minHeight: '100vh',
          backgroundColor: '#F4FAF0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '24px'
        }}
      >
        <div style={{ padding: '16px' }}>
          <h1 
            className="tex" // Reutilizando sua classe global para estilo de título
            style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: '#000000ff', // Cor de texto escuro
              marginBottom: '16px' 
            }}
          >
            Antes, precisamos checar sua identidade.
          </h1>

          <ol 
            style={{
              listStyleType: 'disc', // Usando disc em vez de decimal
              paddingLeft: '20px',
              fontSize: '14px',
              color: '#3f3d3dff', 
              lineHeight: '1.5'
            }}
          >
            <li style={{ marginBottom: '2px' }}>
              Para garantir a segurança da sua conta, por favor, enquadre seu rosto no centro do círculo e aguarde a confirmação.
              Se certifique de estar em um local bem iluminado e retire óculos ou chapéus.
            </li>
          </ol>
        </div>

        {/* Reutilizando o componente Button */}
        <Button
          onClick={() => setStarted(true)}
          label="Iniciar verificação"
          fullWidth={true} 
        />

      </div>
    );
  }


  /* Passo 2 — ABERTURA DA CÂMERA (Liveness) */

  return (
    <div 
      style={{
        minHeight: '100vh',
        backgroundColor: '#000000', // Fundo preto para contraste
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      
      {/* 1. Vídeo (Câmera) */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />

      {/* 2. Máscara Circular/Oval (O Vazamento de Luz) */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          
          width: '300px', // Largura do círculo/oval
          height: '400px', // Altura do círculo/oval 
          borderRadius: '50%', // Forma oval/circular
          border: '4px solid white', // Borda visível do círculo
          zIndex: 10,
          
          // Efeito Mágico: Vazamento de luz (Sombra Externa Massiva)
          boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.7)',
        }}
      />

      {/* 3. Texto Auxiliar */}
      <div 
        style={{
          position: 'absolute',
          bottom: '40px',
          width: '100%',
          textAlign: 'center',
          color: 'white',
          fontSize: '16px',
          fontWeight: 'bold',
          zIndex: 20,
        }}
      >
        Posicione o rosto no centro do círculo.
      </div>

    </div>
  );
}