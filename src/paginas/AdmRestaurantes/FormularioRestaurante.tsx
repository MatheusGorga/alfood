import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

function FormularioRestaurante() {

    const [restaurante, setRestaurante] = useState('')

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement> ) => {
        evento.preventDefault()

        axios.post('http://localhost:8000/api/v2/restaurantes/', {nome: restaurante})
        .then(()=> {
            alert("Restaurante cadastrado com sucesso")
        })
    }



    return ( 
        <form action="" onSubmit={aoSubmeterForm}>
            <TextField
                label="Nome do restaurante"
                variant="standard"
                value={restaurante}
                onChange={ event => setRestaurante(event.target.value)}
            />
            <Button 
                type="submit"
                variant="outlined">
                    Salvar
            </Button>
        </form>
     );
}

export default FormularioRestaurante;