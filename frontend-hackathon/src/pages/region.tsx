import Button from '../components/button';
import React, { useState, useEffect, } from 'react';
import './region.css'

interface LocationData {
  id: number;
  sigla: string;
  nome: string;
}

const IBGE_UF_API_URL = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome';


const Region = () => {
  const [ufs, setUfs] = useState<LocationData[]>([]);
  const [selectedUf, setSelectedUf] = useState('');
  const [municipios, setMunicipios] = useState<LocationData[]>([]);
  const [selectedMunicipio, setSelectedMunicipio] = useState('');
  const [loadingUfs, setLoadingUfs] = useState(true);
  const [loadingMunicipios, setLoadingMunicipios] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- 1. FUNÇÃO DE BUSCA DE ESTADOS (UFs ---
  useEffect(() => {
    const fetchUfs = async () => {
      setLoadingUfs(true);
      try {
        const response = await fetch(IBGE_UF_API_URL);
        if (!response.ok) throw new Error('Falha ao carregar os estados do IBGE.');
        const data: LocationData[] = await response.json();
        setUfs(data);
      } catch (err) {
        setError("Não foi possível carregar os estados.");
        console.error("Erro ao buscar UFs:", err);
      } finally {
        setLoadingUfs(false);
      }
    };
    fetchUfs();
  }, []); // Executa apenas uma vez na montagem

  // --- 2. FUNÇÃO DE BUSCA DE MUNICÍPIOS (Disparada pela seleção de estado) ---
  useEffect(() => {
    if (!selectedUf) {
      setMunicipios([]);
      setSelectedMunicipio('');
      return;
    }

    const ufId = ufs.find(uf => uf.sigla === selectedUf)?.id;
    if (!ufId) return;

    const fetchMunicipios = async () => {
      setLoadingMunicipios(true);
      setMunicipios([]);
      const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufId}/municipios?orderBy=nome`;
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Falha ao carregar os municípios.');
        const data: LocationData[] = await response.json();
        setMunicipios(data);
      } catch (err) {
        setError("Não foi possível carregar os municípios.");
        console.error("Erro ao buscar municípios:", err);
      } finally {
        setLoadingMunicipios(false);
      }
    };

    fetchMunicipios();
  }, [selectedUf, ufs]); // Dispara sempre que o estado selecionado mudar

  // --- HANDLERS ---
  const handleUfChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUf(e.target.value);
    setSelectedMunicipio(''); // Resetar município ao trocar estado
  };

  const handleMunicipioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMunicipio(e.target.value);
  };

  const handleButtonClick = () => {
    if (!selectedUf || !selectedMunicipio) {
      alert("Selecione o Estado e o Município antes de continuar!");
      return;
    }
    alert(`Região selecionada: ${selectedMunicipio} / ${selectedUf}`);
  };

  // --- RENDERIZAÇÃO ---
  return (
    <div id="home-root" style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      
      <h2>Seleção de Região (IBGE)</h2>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* 1. SELEÇÃO DE ESTADO */}
      <div className="state-select-container" style={{ marginBottom: '20px' }}>
        <label htmlFor="state-select" style={{ display: 'block', marginBottom: '5px' }}>
          Escolha o Estado:
        </label>
        <select
          id="state-select"
          value={selectedUf}
          onChange={handleUfChange}
          disabled={loadingUfs}
          style={{ width: '100%', padding: '10px', fontSize: '16px' }}
        >
          <option value="">
            {loadingUfs ? 'Carregando Estados...' : 'Selecione um estado'}
          </option>
          {ufs.map((uf) => (
            <option key={uf.id} value={uf.sigla}>
              {uf.nome}
            </option>
          ))}
        </select>
      </div>

      {/* 2. SELEÇÃO DE MUNICÍPIO */}
      <div className="municipio-select-container" style={{ marginBottom: '40px' }}>
        <label htmlFor="municipio-select" style={{ display: 'block', marginBottom: '5px' }}>
          Escolha o Município:
        </label>
        <select
          id="municipio-select"
          value={selectedMunicipio}
          onChange={handleMunicipioChange}
          disabled={!selectedUf || loadingMunicipios}
          style={{ width: '100%', padding: '10px', fontSize: '16px' }}
        >
          <option value="">
            {loadingMunicipios ? 'Carregando Municípios...' : 
             !selectedUf ? 'Selecione um estado primeiro' : 
             'Selecione um município'}
          </option>
          {municipios.map((municipio) => (
            <option key={municipio.id} value={municipio.nome}>
              {municipio.nome}
            </option>
          ))}
        </select>
      </div>

      {/* 3. BOTÃO */}
      <Button 
        label="Entrar" 
        onClick={handleButtonClick} 
        fullWidth={true}
        // Desabilita o botão se a seleção não estiver completa
      />
    </div>
  );
};

export default Region;
