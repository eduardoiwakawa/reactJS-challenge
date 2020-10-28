import React , {useState, useEffect}from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repository , setRepository] = useState([]);

  useEffect(() => {
    api.get('repositories').then( response => {
      setRepository(response.data);
    });
  },[]);

  async function handleAddRepository() {
 
     let dataInput ={
             "url": `https://github.com/Rocketseat/${Date.now()}`,
            "title": `Nome ${Date.now()}`,
            "techs": ["Node", "Express", "TypeScript"]
    }

   const response = await api.post('repositories', dataInput);
   setRepository([...repository , response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete('repositories/'+id);
    if(response){
      const repositoryIndex = repository.findIndex( item => item.id === id);
      const newRepository = [...repository];
      newRepository.splice(repositoryIndex,1);
      setRepository(newRepository);  
    }
  }

  return (
    <div>
      <button onClick={handleAddRepository}>Adicionar</button>
      <ul data-testid="repository-list">
       {repository.map(item => 
          <li key={item.id}>{item.title}
            <button onClick={() => handleRemoveRepository(item.id)}>
            Remover
          </button>
          </li>)}
       </ul>
    </div>
  );
}

export default App;
