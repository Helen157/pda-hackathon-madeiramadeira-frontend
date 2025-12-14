import React, { useState, useRef } from 'react';
import Button from '../components/button'; 

// Definindo o tipo para o status de upload
type FileStatus = 'Pendente' | 'Enviando' | 'Enviado';

// Usando React.FC para tipagem completa
const ExperienceProofScreen: React.FC = () => {
  
  // Estado para rastrear o status do upload principal
  const [fileStatus, setFileStatus] = useState<FileStatus>('Pendente');
  
  // Referência para o input de arquivo
  const fileInputRef = useRef<HTMLInputElement>(null);

  // O botão 'Próximo' só fica ativo se o arquivo for enviado.
  const isReadyToProceed: boolean = fileStatus === 'Enviado';

  // 1. Função que dispara o input de arquivo
  const triggerFileInput = () => {
    if (fileStatus !== 'Enviando' && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 2. Função que lida com a seleção do arquivo
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      setFileStatus('Enviando'); 
      // Simulação de Upload:
      setTimeout(() => {
        setFileStatus('Enviado');
        console.log(`Arquivo ${file!.name} enviado com sucesso.`);
      }, 1500);
    }
    
    // Limpa o valor do input após a seleção
    if (event.target) {
        (event.target as HTMLInputElement).value = '';
    }
  };
  
  // 3. Função para o botão "Próximo"
  const handleNext = () => {
    if (isReadyToProceed) {
      alert("Comprovante de experiência enviado. Prosseguindo...");
      // Implementar props.onNext();
    }
  };
  
  // Ícone SVG para a Área de Upload
  const renderAreaIcon = () => {
    if (fileStatus === 'Enviado') {
        return (
            <svg style={{ width: '40px', height: '40px', color: '#10B981' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        );
    } 
    if (fileStatus === 'Enviando') {
        // Spinner (requer CSS no seu app.css)
        return (
            <div className="spinner" style={{ border: '4px solid #f3f3f3', borderTop: '4px solid #F97316', borderRadius: '50%', width: '30px', height: '30px', animation: 'spin 1s linear infinite' }} />
        );
    }
    // Pendente
    return (
        <svg style={{ width: '40px', height: '40px', color: '#6B7280' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
    );
  };


  return (
    // Estilos inline para o layout 
    <div 
      id="home-root" 
      style={{ 
        minHeight: '100vh', 
        backgroundColor: '#FFFFFF', 
        padding: '24px', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center' 
      }}
    >
      
      <header style={{ marginBottom: '32px', width: '100%', maxWidth: '400px' }}>
        {/* Título Novo */}
        <h1 className='tex' style={{ fontSize: '24px', fontWeight: 'bold', color: '#1F2937', marginBottom: '8px' }}> 
          Comprove sua experiência
        </h1>
        {/* Descrição Nova */}
        <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '16px' }}>
          Comprove sua experiência profissional como eletricista.
        </p>
        <p style={{ fontSize: '14px', color: '#6B7280' }}>
          Você pode enviar registros da carteira de trabalho, contratos firmados e certificados.
        </p>
      </header>

      <main style={{ flex: 1, width: '100%', maxWidth: '400px' }}>
        
        {/* Área de Upload Principal (Substitui o campo Nome e o antigo Upload) */}
        <div 
            onClick={triggerFileInput}
            style={{ 
                width: '100%', 
                height: '200px', 
                backgroundColor: '#F9FAFB', 
                borderRadius: '12px',
                border: `2px dashed ${fileStatus === 'Enviado' ? '#10B981' : '#D1D5DB'}`,
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center',
                textAlign: 'center',
                marginBottom: '32px',
                cursor: 'pointer' 
            }}
        >
            {renderAreaIcon()}
            <p style={{ marginTop: '8px', fontSize: '16px', fontWeight: 'bold', color: fileStatus === 'Enviado' ? '#10B981' : (fileStatus === 'Enviando' ? '#F97316' : '#6B7280') }}>
                {fileStatus === 'Enviado' ? 'Upload Concluído!' : (fileStatus === 'Enviando' ? 'Enviando Documento...' : 'Clique para selecionar o arquivo')}
            </p>
        </div>
      </main>

      {/* Input File Invisível */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }} 
        accept="image/*,.pdf" 
        multiple // Permite múltiplos arquivos (se for o caso de enviar vários registros)
      />

      {/* FOOTER com os DOIS Botões */}
      <footer style={{ width: '160%', maxWidth: '400px' }}>
        {/* BOTÃO ADICIONAR (Dispara o Upload) */}
        <Button 
          onClick={triggerFileInput} 
          disabled={fileStatus === 'Enviando'}
          label={fileStatus === 'Enviado' ? 'DOCUMENTO ENVIADO' : 'ADICIONAR'} 
        />
        
        <div style={{ height: '12px' }} />

        {/* BOTÃO PRÓXIMO (Avança o Fluxo) */}
        <Button 
          onClick={handleNext} 
          disabled={!isReadyToProceed} // Desabilitado se o arquivo não foi enviado
          label='PRÓXIMO' 
        />
      </footer>
    </div>
  );
}

export default ExperienceProofScreen;