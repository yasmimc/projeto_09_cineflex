import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from 'axios';


import "../Movies/Movies.css"

const API_CINEFLEX = "https://mock-api.bootcamp.respondeai.com.br/api/v3/cineflex"


export default function Movies() {
    const [moviesList, setMoviesList] = useState([]);

    const promise = axios.get(`${API_CINEFLEX}/movies`)
    useEffect(()=>{
        promise.then((resp)=>setMoviesList([...resp.data]))        
    }, []);

    return (
        <div >
            <h2>Selecione o filme</h2>
            <div className="movies">
                {moviesList.map((movie)=>(
                    <Movie 
                        key={movie.id}
                        idFilme={movie.id}
                        posterURl={movie.posterURL}    
                    />
                ))}             
            </div>
        </div>
    );
}

function Movie(props) {
    const {
        idFilme,
        posterURl
    } = props;


    return (
        <Link to={`/filme/${idFilme}`}>
            <div className="movie">
                <img src={posterURl}></img>
            </div>
        </Link>        
    );
}