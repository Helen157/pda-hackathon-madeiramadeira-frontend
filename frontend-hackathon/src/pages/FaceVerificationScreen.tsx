import { useEffect, useRef, useState } from 'react'

export default function FaceVerificationScreen() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!started) return

    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
          audio: false
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (error) {
        alert('Não foi possível acessar a câmera')
        console.error(error)
      }
    }

    startCamera()
  }, [started])

                                               /*TELA 1 — INSTRUÇÕES PARA VERIFICAÇÃO FACIAL*/
  if (!started) {
    return (
      <div className="min-h-screen bg-[#F4FAF0] flex flex-col justify-between p-6">

        <div>
          <h1 className="text-xl font-bold text-gray-800 mb-4">
            Antes, precisamos checar sua identidade.
          </h1>

          <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2">
            <li>Posicione o rosto no centro do círculo.</li>
            <li>Mantenha o celular na altura dos olhos.</li>
            <li>Aguarde a confirmação.</li>
          </ol>
        </div>

        <button
          onClick={() => setStarted(true)}
          className="w-full bg-orange-500 text-white py-4 rounded-lg font-bold"
        >
          Iniciar verificação
        </button>

      </div>
    )
  }

                                                    /* TELA 2 — ABERTURA DA CÂMERA */
return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      
      {/* 1. Vídeo (Câmera) */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        // Ocupa a tela inteira e corta o excesso (object-cover)
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 2. Máscara Circular */}
      <div
        className="absolute top-1/2 left-1/2 w-[300px] h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white z-10"
        style={{
          // Fundamental: Aqui vai criar o efeito de vazamento usando uma sombra externa massiva
          boxShadow: '0 0 0 9999px rgba(0,0,0,0.7)',
        }}
      />

      {/* 3. Texto Auxiliar (Instrução Dinâmica) */}
      <div className="absolute bottom-10 w-full text-center text-white text-base font-bold z-20">
        Centralize seu rosto!
        {/* Aqui entrará o texto dinâmico (ex: "Olhe para a esquerda") após a validação */}
      </div>

    </div>
  );
}