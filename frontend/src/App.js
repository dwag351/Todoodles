import { AppContext } from './AppContextProvider';
import { useContext } from 'react';
import axios from 'axios';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box'; 
import BasicTable from './components/BasicTable'
import Logo from "./images/Todoodles.png"
import Author from "./images/By David.png"
import './App.css';

let todos;

function App() {

  const Data = useContext(AppContext);

  todos = [];

  for (var i in Data.data) {
    todos.push(Data.data[i]);
  }

  document.body.style = 'background: #48C2F9';

  if (Data.isLoading) {
    return (
      <div>
        <img-container><img src={Logo} alt="" className="mainLogo" style={{ margin: 'auto' }}/></img-container><br /><br />
        
        <Box sx={{ width: '50%', margin: 'auto' }}>
          <LinearProgress />
        </Box>
        <img src={Author} alt="" style={{ position: "absolute", bottom: 10, alignSelf: "flex-end" }}/>
      </div>
    )
  }
  return (
    <div>
      <img-container><img src={Logo} alt="" className="mainLogo" style={{ margin: 'auto' }}/></img-container><br /><br />
      <BasicTable data={todos}/>
      <img src={Author} alt="" style={{ position: "absolute", bottom: 10, alignSelf: "flex-end" }}/>
    </div>
  );
}

export default App;