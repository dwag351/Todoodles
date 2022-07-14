import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from 'axios';
import './BasicTable.css';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#0086D4',
      color: '#B1E4FC',
      fontSize: 18,
    },
    [`&.${tableCellClasses.body}`]: {
        backgroundColor: '#B1E4FC',
        color: '#0086D4',
        fontSize: 16,
    },
}));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));

function DeleteData (props) {
    async function fetchData() {
        try {
            const response = await axios.delete("/api/todos/" + props);
            console.log(response.data);
        }  catch (err) {
            alert("Oof! There was an error: " + err.message);
        }
        window.location.reload(false);
    }
    fetchData();
}

function CreateData(Description, CompletedStatus, DueDate, Id) {
    return { Description, CompletedStatus, DueDate, Id };
}

function UpdateData (props) {

    const newTodo = {
        "Description": props.Description,
        "CompletedStatus": !props.CompletedStatus,
        "DueDate": props.DueDate
    };

    async function fetchData() {
      try {
        const response = await axios.put('/api/todos/' + props.Id, newTodo);
        console.log(response.data);
      } catch (err) {
        alert("Oof! There was an error: " + err.message);
      }
      window.location.reload(false);
    }
    fetchData();
}

function SendData (props) {
    async function fetchData() {
      try {
        const response = await axios.post('/api/todos/', props);
        console.log(response.data);
      } catch (err) {
        alert("Oof! There was an error: " + err.message);
      }
      window.location.reload(false);
    }
    fetchData();
}

let todos;

export default function BasicTable(props) {
    
    const [value, setValue] = React.useState(null);

    todos = [];

    for (var i in props.data) {
        todos.push(CreateData(props.data[i].Description, props.data[i].CompletedStatus, props.data[i].DueDate, props.data[i]._id));
    }

    const [newDescription, setDescription] = React.useState("");
    const [newCompletedStatus, setCompletedStatus] = React.useState(false);
    const [newDueDate, setDueDate] = React.useState("000-00-00");

    const newTodo = {
        "Description": newDescription,
        "CompletedStatus": newCompletedStatus,
        "DueDate": newDueDate
    };
  
    return (
    <TableContainer component={Paper} sx={{ maxWidth: '50%', margin: 'auto', backgroundColor: '#B1E4FC' }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: '#0086D4' }}>
          <TableRow>
            <StyledTableCell>Description</StyledTableCell>
            <StyledTableCell>Completed Status</StyledTableCell>
            <StyledTableCell>Due Date</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.map((row) => (
            <StyledTableRow key={row.Id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <StyledTableCell component="th" scope="row">{row.Description}</StyledTableCell>
              <StyledTableCell><Button variant="outlined" onClick={() => {UpdateData(row)}}>{row.CompletedStatus.toString()}</Button></StyledTableCell>
              <StyledTableCell>{row.DueDate}</StyledTableCell>
              <StyledTableCell align="right"><Button variant="outlined" onClick={() => {DeleteData(row.Id)}}>Delete</Button></StyledTableCell>
            </StyledTableRow>
          ))}
          <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <StyledTableCell component="th" scope="row"><input onChange={(e) => setDescription(e.target.value)}></input></StyledTableCell>
              <StyledTableCell><Button variant="outlined" onClick={() => {setCompletedStatus(!newTodo.CompletedStatus)}}>{newTodo.CompletedStatus.toString()}</Button></StyledTableCell>
              <StyledTableCell><input type="date" onChange={(e) => setDueDate(e.target.value)}></input></StyledTableCell>
              <StyledTableCell align="right"><Button variant="outlined" onClick={() => {SendData(newTodo)}}>Submit</Button></StyledTableCell>
            </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
    );
}