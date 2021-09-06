import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import styled from "styled-components";

const API_CINEFLEX = "https://mock-api.bootcamp.respondeai.com.br/api/v3/cineflex"

export default function Movies() {
    const [moviesList, setMoviesList] = useState([]);

    const promise = axios.get(`${API_CINEFLEX}/movies`)
    useEffect(()=>{
        promise.then((resp)=>setMoviesList([...resp.data]))        
    }, []);

    return (
        <MoviesContainer>
            <h2>Selecione o filme</h2>
            <MoviesList>
                {moviesList.map((movie)=>(
                    <Movie 
                        key={movie.id}
                        idFilme={movie.id}
                        posterURl={movie.posterURL}    
                    />
                ))}             
            </MoviesList>
        </MoviesContainer>
    );
}

function Movie(props) {
    const {
        idFilme,
        posterURl
    } = props;


    return (
        <Link to={`/filme/${idFilme}`}>
            <Poster>
                <img alt= "" src={posterURl}></img>
            </Poster>
        </Link>        
    );
}

const MoviesContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
`

const MoviesList = styled.div`

    display: flex;
    justify-content: space-around;
    align-items: space-;
    flex-wrap: wrap;

    margin-top: 20px;
    
`

const Poster = styled.div`

    width: 145px;
    height: 209px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    margin: 15px 15px;
    background-color: #FFFFFF;
    display: flex;

    align-items: center;
    justify-content: center;

    img {
        width: 129px;
        height: 193px;
        object-fit: cover;
    }
`