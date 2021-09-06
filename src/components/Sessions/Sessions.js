import { useParams } from 'react-router-dom';
import {  Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from 'axios';

import Footer from "../Footer/Footer"
import styled from 'styled-components';

const API_CINEFLEX = "https://mock-api.bootcamp.respondeai.com.br/api/v3/cineflex"

export default function Sessions() {
    const params = useParams();

    const { idMovie } = params;

    const [movieSessions, setMovieSessions] = useState([]);

    const promise = axios.get(`${API_CINEFLEX}/movies/${idMovie}/showtimes`)
    useEffect(() => {
        promise.then((resp) => setMovieSessions({...resp.data}))
    }, []);

    return (
        <SessionsContainer>
            <h2>Selecione o horário</h2>
            <ul>
                {movieSessions.days ? movieSessions.days.map((session) => (
                    <Session
                        key={session.id}
                        session={session}
                    />
                )) : ""}
            </ul>
            <Footer movie = {movieSessions}/>
        </SessionsContainer>
    );
}

function Session(props) {
    const { session } = props;
    return (
        <li>
            <p>{`${session.weekday} - ${session.date}`}</p>
            {session.showtimes.map((showtime)=>(                
                <Link key={session.id} to={`/filme/assentos/${showtime.id}`}>
                    <button>{showtime.name}</button>
                </Link>                
            ))}
        </li>
    );
}

const SessionsContainer = styled.div`
    ul {
        margin-top: 40px;
    }

    li p{
        font-size: 20px;    
    }

    li button {
        background-color: #E8833A;
        border: none;
        border-radius: 3px;
        width: 83px;
        height: 43px;

        color: #FFFFFF;
        font-size: 18px;

        margin: 22px 4px;
    }
`