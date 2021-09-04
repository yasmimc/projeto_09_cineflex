
import { Link } from "react-router-dom"
import "./SessionSeats.css"
import Footer from "../Footer/Footer";

import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import axios from 'axios';


import "../Sessions/Sessions.css"


const API_CINEFLEX = "https://mock-api.bootcamp.respondeai.com.br/api/v3/cineflex"

export default function SessionSeats() {

    const params = useParams();
    const { idSession } = params;

    const [session, setSession] = useState({});

    const promise = axios.get(`${API_CINEFLEX}/showtimes/${idSession}/seats`);

    useEffect(()=>(
        promise.then((resp)=>setSession({...resp.data}))
    ), [])

    console.log(session)
    
    return (
        <div className="SessionSeats">
            <h2>Selecione o(s) assento(s)</h2>
            <div>
               {session.seats ? session.seats.map((seat, index)=>(
                   <Seat 
                        key = {seat.id}
                        seat = {seat} 
                        index = {index}
                   />
               )) : "Carregando assentos..."}
            </div>

            <ul className="labels">
                <li>
                    <div className="circle selected"></div>
                    <p>Selecionado</p>
                </li>
                <li>
                    <div className="circle available"></div>
                    <p>Disponível</p>
                </li>
                <li>
                    <div className="circle unavailable"></div>
                    <p>Indisponível</p>
                </li>
            </ul>

            <div className="form">
                <h3>Nome do comprador:</h3>
                <input type="text" placeholder="Digite seu nome..." ></input>
                <h3>CPF do comprador:</h3>
                <input type="number" placeholder="Digite seu CPF..." ></input>
            </div>

            <Link to="/filme/sessao/:idSessao/sucesso">
                <button className="submit">
                    Reservar assento(s)
                </button>
            </Link>

            <Footer 
                movie = {session.movie}
                day = {session.day}
                time = {session.name}
            />

        </div>
    );
}

function Seat(props){
    const {
        seat,
        index
    } = props;
    return(
        <button className={seat.isAvailable ? "available" : "unavailable"}>
            {index + 1}
        </button>
    )
}