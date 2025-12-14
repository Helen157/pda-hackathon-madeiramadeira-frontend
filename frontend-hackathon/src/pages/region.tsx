import React, { useEffect, useState } from 'react';
import Button from '../components/button';
import './region.css';

interface LocationData {
  id: number;
  sigla: string;
  nome: string;
}

const IBGE_UF_API_URL =
  'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome';

const Region = () => {
  const [ufs, setUfs] = useState<LocationData[]>([]);
  const [municipios, setMunicipios] = useState<LocationData[]>([]);
  const [selectedUf, setSelectedUf] = useState('');
  const [selectedMunicipio, setSelectedMunicipio] = useState('');
  const [loadingUfs, setLoadingUfs] = useState(true);
  const [loadingMunicipios, setLoadingMunicipios] = useState(false);

  useEffect(() => {
    const fetchUfs = async () => {
      try {
        const response = await fetch(IBGE_UF_API_URL);
        const data: LocationData[] = await response.json();
        setUfs(data);
      } catch {
        alert('Erro ao carregar estados');
      } finally {
        setLoadingUfs(false);
      }
    };

    fetchUfs();
  }, []);

  useEffect(() => {
    if (!selectedUf) return;

    const ufId = ufs.find((uf) => uf.sigla === selectedUf)?.id;
    if (!ufId) return;

    const fetchMunicipios = async () => {
      setLoadingMunicipios(true);
      try {
        const response = await fetch(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufId}/municipios?orderBy=nome`
        );
        const data: LocationData[] = await response.json();
        setMunicipios(data);
      } catch {
        alert('Erro ao carregar municípios');
      } finally {
        setLoadingMunicipios(false);
      }
    };

    fetchMunicipios();
  }, [selectedUf, ufs]);

  const handleNext = () => {
    if (!selectedUf || !selectedMunicipio) {
      alert('Selecione Estado e Cidade');
      return;
    }

    alert(`${selectedMunicipio} / ${selectedUf}`);
  };

  return (
    <div className="region-container">
      <div className="region-content">
        <h1 className="title">Selecione a região de interesse</h1>
        <p className="subtitle">
          Defina sua área de atuação para receber demandas próximas a você.
        </p>

        <div className="select-card">
          <span className="select-icon">≡</span>
          <select
            value={selectedUf}
            onChange={(e) => {
              setSelectedUf(e.target.value);
              setSelectedMunicipio('');
            }}
            disabled={loadingUfs}
          >
            <option value="">
              {loadingUfs ? 'Carregando...' : 'Escolha o Estado'}
            </option>
            {ufs.map((uf) => (
              <option key={uf.id} value={uf.sigla}>
                {uf.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="select-card">
          <span className="select-icon">≡</span>
          <select
            value={selectedMunicipio}
            onChange={(e) => setSelectedMunicipio(e.target.value)}
            disabled={!selectedUf || loadingMunicipios}
          >
            <option value="">
              {loadingMunicipios
                ? 'Carregando...'
                : 'Escolha a Cidade'}
            </option>
            {municipios.map((m) => (
              <option key={m.id} value={m.nome}>
                {m.nome}
              </option>
            ))}
          </select>
        </div>
        <Button label="PRÓXIMO" onClick={handleNext} fullWidth />
      </div>
    </div>
  );
};

export default Region;
