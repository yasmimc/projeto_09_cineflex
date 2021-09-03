import { BrowserRouter, Switch, Route, Link } from "react-router-dom";


import "../Movies/Movies.css"
import teste from "../Movies/teste.jpg"

export default function Movies() {
    return (
        <div >
            <h2>Selecione o filme</h2>
            <div className="movies">
                <Movie idFilme="10"></Movie>
                <Movie idFilme="10"></Movie>
                <Movie idFilme="10"></Movie>
                <Movie idFilme="10"></Movie>
                <Movie idFilme="10"></Movie>
                <Movie idFilme="10"></Movie>               
            </div>
        </div>
    );
}

function Movie(props) {
    const {
        idFilme,
    } = props;

    return (
        <Link to={`/filme/${idFilme}`}>
            <div className="movie">
                <img src={teste}></img>
            </div>
        </Link>        
    );
}