import { useEffect, useState } from "react";
import IRestaurante from "../../interfaces/IRestaurante";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";

function AdmRestaurantes() {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useEffect(() => {
    //obter restaurantes
    axios
      .get<IRestaurante[]>(
        "http://localhost:8000/api/v2/restaurantes/"
      )
      .then((response) => setRestaurantes(response.data))
      .catch((e) => console.error(e));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nome</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {restaurantes?.map((restaurante) => {
          return (
            <TableRow key={restaurante.id}>
              <TableCell>{restaurante.nome}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AdmRestaurantes;
