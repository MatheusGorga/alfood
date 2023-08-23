import { useEffect, useState } from "react";
import IRestaurante from "../../interfaces/IRestaurante";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

function AdmRestaurantes() {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useEffect(() => {
    //obter restaurantes
    axios
      .get<IRestaurante[]>("http://localhost:8000/api/v2/restaurantes/")
      .then((response) => setRestaurantes(response.data))
      .catch((e) => console.error(e));
  }, []);

  function excluir(restauranteRecebido: IRestaurante) {
    axios
      .delete(`http://localhost:8000/api/v2/restaurantes/${restauranteRecebido.id}/`)
      .then(() => {
        const novosRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteRecebido.id )
        setRestaurantes([...novosRestaurante])
        alert("Restaurante deletado com sucesso")
      } );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Deletar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes?.map((restaurante) => {
            return (
              <TableRow key={restaurante.id}>
                <TableCell>{restaurante.nome}</TableCell>
                <TableCell >
                 [
                  <Link to={`/admin/restaurantes/${restaurante.id}`}> Editar</Link>
                 ]
                </TableCell>
                <TableCell>
                  <Button  
                    variant="outlined"
                    color="error"
                    onClick={() => excluir(restaurante)} 
                  >
                      Excluir  
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AdmRestaurantes;
