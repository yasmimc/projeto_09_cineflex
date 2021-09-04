
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"

import axios from 'axios';

import { Container, Labels, Buttom, Forms } from "./Style.js"
import Footer from "../Footer/Footer";

const API_CINEFLEX = "https://mock-api.bootcamp.respondeai.com.br/api/v3/cineflex"

export default function SessionSeats(props) {

    const { 
        confirmedBooking, 
        setConfirmedBooking 
    } = props;

    const [finalBooking, setFinalBooking] = useState({
        ids: [],
        name: "",
        cpf: ""
    });

    const params = useParams();
    const { idSession } = params;

    const [session, setSession] = useState({});

    const promise = axios.get(`${API_CINEFLEX}/showtimes/${idSession}/seats`);

    useEffect(()=>(
        promise.then((resp)=>setSession({...resp.data}))
    ), []);

    const booking = {...finalBooking};

    function saveName(name){
        booking.name = name; 
        setFinalBooking({...booking});
    }

    function saveCPF(cpf){
        booking.cpf = cpf; 
        setFinalBooking({...booking});
    }

    function book(){
        const bookingInfos = {...confirmedBooking};
        bookingInfos.movie = session.movie;
        bookingInfos.session.day = session.day;
        bookingInfos.session.time = session.name;
        bookingInfos.buyer.name = finalBooking.name;
        bookingInfos.buyer.cpf = finalBooking.cpf;
        setConfirmedBooking({...bookingInfos});
        // axios.post(`${API_CINEFLEX}/seats/book-many`, finalBooking);
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
                        confirmedBooking = {confirmedBooking} 
                        setConfirmedBooking = {setConfirmedBooking}
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
                <input onChange={(e)=>{saveName(e.target.value)}} type="text" placeholder="Digite seu nome..." ></input>
                <h3>CPF do comprador:</h3>
                <input onChange={(e)=>{saveCPF(e.target.value)}} type="number" placeholder="Digite seu CPF..." ></input>
            </Forms>

            <Link to={booking.name && booking.cpf && booking.ids.length > 0 ? `/filme/sessao/${idSession}/sucesso` : `/filme/assentos/${idSession}`}>
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
        setFinalBooking,
        confirmedBooking,
        setConfirmedBooking
    } = props;

    const [isSelected, setIsSelected] = useState(false);

    const booking = {...finalBooking};

    function unselect(seatNumber, seatsList){
        setIsSelected(false);

        const indexUnselectedSeat = seatsList.indexOf(seatsList.find((seat) => seat === seatNumber));
        seatsList.splice(indexUnselectedSeat, 1);        
    }

    function select(){
        const bookingInfos = {...confirmedBooking};
        if(isSelected) unselect(index+1, bookingInfos.seats);
        else{
            if(seat.isAvailable) {
                setIsSelected(true);
                booking.ids.push(seat.id);
                setFinalBooking({...booking});            
                bookingInfos.seats.push(index + 1);
            }
            else alert("Esse assento não está disponível");
        }        
        setConfirmedBooking({...bookingInfos});
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