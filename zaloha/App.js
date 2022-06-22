import { useRef, useState } from 'react';
import './App.css';
import { FormSection, Formular, MainTitle, PageContainer, SectionTitle } from './AppStyles';

function App() {
  const bioKvalita = useRef(false);
  const premiumKvalita = useRef(false);
  const chudiKvalite = useRef(false);
  const darkoveBaleni = useRef(false);
  const [zakladniCena, setZakladniCena] = useState(0);
  const [finalniCena, setFinalniCena] = useState(0);
  const [objednavka, setObjednavka] = useState({
    typ: 0,
    hmotnost: 0,
    doprava: 0,
    rozpocet: 0,
    email: ''
  });

  const handleChange = (e) => {
    setObjednavka({ ...objednavka, [e.target.name]: e.target.value });
    console.log(JSON.stringify(objednavka));
    handleFinalniCena();
  };
  const handleZakladniCena = () => {
    let novaZakladniCena = objednavka.typ * objednavka.hmotnost;
    setZakladniCena(novaZakladniCena);
    return novaZakladniCena;
  };
  const handleFinalniCena = () => {
    let thisZakladniCena = handleZakladniCena();
    let novaFinalniCena = thisZakladniCena;
    //DOPRAVA
    if (objednavka.doprava === 0.10) {
      novaFinalniCena += (thisZakladniCena * 0.10);
    }
    else if (objednavka.doprava === 250) {
      novaFinalniCena += 250;
    }
    //VLASTNOSTI
    if (bioKvalita) { novaFinalniCena += (thisZakladniCena * 0.30); }
    if (premiumKvalita) { novaFinalniCena += (thisZakladniCena * 0.50); }
    if (chudiKvalite) { novaFinalniCena -= (thisZakladniCena * 0.15); }
    if (darkoveBaleni) { novaFinalniCena += 500; }
    //SET FINAL
    setFinalniCena(novaFinalniCena);
  };

  return (
    <PageContainer>
      <Formular>
        <FormSection name="nadpis">
          <MainTitle>Vaše objednávka</MainTitle>
        </FormSection>
        <FormSection name="vyber">
          <SectionTitle>Výběr krmiva</SectionTitle>
          <label for="typ">Výběr typu krmiva:</label>
          <select name="typ" id='typ' onChange={handleChange}>
            <option value={0}>nevybráno</option>
            <option value={150}>psí žrádlo 150kč/kg</option>
            <option value={120}>kočičí žrádlo 120kč/kg</option>
            <option value={50}>žrádlo pro rybičky 50kč/kg</option>
            <option value={800}>žrádlo pro tygra 800kč/kg</option>
          </select>

          <label for="hmotnost">Hmotnost krmiva (kg):</label>
          <input type="text" name="hmotnost" id="hmotnost" value={objednavka.hmotnost} onChange={handleChange} />

          <label for="zakladniCena">Základní cena:</label>
          <input type="zakladniCena" id="zakladniCena" value={zakladniCena} disabled />
        </FormSection>
        <FormSection name="vlastnosti">
          <SectionTitle>Vlastnosti krmiva</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <input type="checkbox" name="vlastnosti" id="bioKvalita" onChange={() => {
              let novaBioKvalita = !bioKvalita.current;
              bioKvalita.current = novaBioKvalita;

            }} />
            <label for="bioKvalita">Bio kvalita (+30%)</label>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <input type="checkbox" name="vlastnosti" id="premiumKvalita" onChange={() => {
              let novaPremiumKvalita = !premiumKvalita.current;
              premiumKvalita.current = novaPremiumKvalita;

            }} />
            <label for="premiumKvalita">Extra prémium kvalita (+50%)</label>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <input type="checkbox" name="vlastnosti" id="chudaKvalita" onChange={() => {
              let novaChudaKvalita = !chudiKvalite.current;
              chudiKvalite.current = novaChudaKvalita;

            }} />
            <label for="chudaKvalita">Extra nekvalitní pro chudé (-15%)</label>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <input type="checkbox" name="vlastnosti" id="darkoveBaleni" onChange={() => {
              let noveDarkoveBaleni = !darkoveBaleni.current;
              darkoveBaleni.current = noveDarkoveBaleni;

            }} />
            <label for="darkoveBaleni">Dárkové balení (+500kč)</label>
          </div>
        </FormSection>
        <FormSection name="doprava">
          <SectionTitle>Doprava</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <input type="radio" name="doprava" id="dopravaOdber" value={0} onChange={handleChange} />
            <label for="dopravaodber">osobní odběr (zdarma)</label>
            <input type="radio" name="doprava" id="dopravaFiremniKuryr" value={0.10} onChange={handleChange} />
            <label for="dopravaFiremniKuryr">firemní kurýr (+10%)</label>
            <input type="radio" name="doprava" id="dopravaCeskaPosta" value={250} onChange={handleChange} />
            <label for="dopravaCeskaPosta">Česká Pošta (+250kč)</label>
          </div>
        </FormSection>
        <FormSection name="kalkulace">
          <SectionTitle>Konečná kalkulace</SectionTitle>
          <label for="rozpocet">Zadejte váš rozpočet:</label>
          <input type="text" name="rozpocet" id="rozpocet" value={objednavka.rozpocet} onChange={handleChange} />
          <label for="rozpocet">Finální cena:</label>
          <input type="text" name="finalniCena" id="finalniCena" value={finalniCena} disabled />
          <button style={{ marginTop: '20px' }} onClick={() => {
            console.log(JSON.stringify(objednavka));
          }}>
            Kontrola
          </button>
          <p style={{ alignSelf: 'center' }}>Kontrola jeste neprobehla!</p>
        </FormSection>
        <FormSection name="email">
          <SectionTitle>Kontaktní údaje</SectionTitle>
          <label for="email">Zadejte vaši emailovou adresu</label>
          <input type="text" name="email" id="email" value={objednavka.email} onChange={handleChange} />
        </FormSection>
      </Formular>
    </PageContainer>
  );
}

export default App;
