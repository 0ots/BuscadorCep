import { useState } from 'react'
import { FiEye, FiEyeOff, FiLock, FiSearch, FiUser } from 'react-icons/fi'
import './style.css';
import api from './services/api'

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});
  async function handleSearch(){
    if(input === ""){
      alert("Preencha o campo CEP");
      return;
    }
    else{
      try{
        const response = await api.get(input + '/json/');
        setCep(response.data);
        setInput("");
        return;
      }
      catch{
        alert("Ops. Algo deu errado.");
        setInput("");
      }
    }
  }
  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>
        <div className="containerInput">
          <input type="text" placeholder="Digite seu CEP" value={input} onChange={(e) => setInput(e.target.value)}/>
          <button className="buttonSearch" onClick={handleSearch}> <FiSearch size={25} color='fff'/></button>
        </div>
      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep} </h2>
          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}
    </div>
  );
}
export default App;