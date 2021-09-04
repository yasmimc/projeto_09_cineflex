
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"

import axios from 'axios';

import { Container, Labels, Buttom, Forms } from "./Style.js"
import Footer from "../Footer/Footer";

const API_CINEFLEX = "https://mock-api.bootcamp.respondeai.com.br/api/v3/cineflex"

export default function SessionSeats(props) {

    const { 
        finalBooking, 
        setFinalBooking 
    } = props;

    const params = useParams();
    const { idSession } = params;

    const [session, setSession] = useState({});

    const promise = axios.get(`${API_CINEFLEX}/showtimes/${idSession}/seats`);

    useEffect(()=>(
        promise.then((resp)=>setSession({...resp.data}))
    ), []);

    const booking = {...finalBooking};

    function book(){
        setFinalBooking({...booking});
    }
    
    return (
        <Container>
            <h2>Selecione o(s) assento(s)</h2>
            <div>
               {session.seats ? session.seats.map((seat, index)=>(
                   <Seat 
                        key = {seat.id}
                        seat = {seat} 
                        index = {index}
                        finalBooking = {finalBooking}
                        setFinalBooking = {setFinalBooking}
                   />
               )) : "Carregando assentos..."}
            </div>

            <Labels>
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
            </Labels>

            <Forms>
                <h3>Nome do comprador:</h3>
                <input onChange={(e)=>{booking.name = e.target.value}} type="text" placeholder="Digite seu nome..." ></input>
                <h3>CPF do comprador:</h3>
                <input onChange={(e)=>{booking.cpf = e.target.value}} type="number" placeholder="Digite seu CPF..." ></input>
            </Forms>

            <Link to={booking.name && booking.cpf && booking.ids.length > 0 ? "/filme/sessao/:idSessao/sucesso" : `/filme/assentos/${idSession}`}>
                <button onClick={book} className="submit">
                    Reservar assento(s)
                </button>
            </Link>

            <Footer 
                movie = {session.movie}
                day = {session.day}
                time = {session.name}
            />
        </Container>
    );
}

function Seat(props){
    const {
        seat,
        index,
        finalBooking,
        setFinalBooking
    } = props;

    const [isSelected, setIsSelected] = useState(false);

    const booking = {...finalBooking};

    function select(){
        if(seat.isAvailable) {
            setIsSelected(true);
            booking.ids.push(seat.id);
            setFinalBooking({...booking});
        }
        else alert("Esse assento não está disponível");
        if(isSelected) setIsSelected(false);
    }

    return(
        <Buttom
        isAvailable = {seat.isAvailable}
        onClick={select} 
        isSelected = {isSelected}
        >
            {index + 1}
        </Buttom>
    );
}