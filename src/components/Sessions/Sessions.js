import { useParams } from 'react-router-dom';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from 'axios';


import "../Sessions/Sessions.css"

import Footer from "../Footer/Footer"

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
        <div className="Sessions">
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
        </div>
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