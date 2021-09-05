
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import axios from 'axios';

import { Container, Labels, Buttom, Forms } from "./Style.js"
import Footer from "../Footer/Footer";

const API_CINEFLEX = "https://mock-api.bootcamp.respondeai.com.br/api/v3/cineflex"

export default function SessionSeats(props) {

    const params = useParams();
    const { 
        idSession 
    } = params;
    const [session, setSession] = useState({});

    const { 
        confirmedBooking, 
        setConfirmedBooking 
    } = props;

    if(confirmedBooking.isConfirmed){
        setConfirmedBooking({
            movie: "",
            session: {
                day: "",
                time: ""
            },
            seats: [],
            buyer:{
                name: "",
                cpf: ""
            },
            isConfirmed: false
        });
    }

    const [confirmedBookingReq, setConfirmedBookingReq] = useState({
        ids: [],
        name: "",
        cpf: ""
    });

    const promise = axios.get(`${API_CINEFLEX}/showtimes/${idSession}/seats`);

    useEffect(()=>(
        promise.then((resp)=>setSession({...resp.data}))
    ), []);

    const tmpConfirmedBookingReq = {...confirmedBookingReq};

    function saveName(name){
        tmpConfirmedBookingReq.name = name; 
        setConfirmedBookingReq({...tmpConfirmedBookingReq});
    }

    function saveCPF(cpf){
        tmpConfirmedBookingReq.cpf = cpf; 
        setConfirmedBookingReq({...tmpConfirmedBookingReq});
    }

    function book(){
        const tmpConfirmedBooking = {...confirmedBooking};
        tmpConfirmedBooking.movie = session.movie;
        tmpConfirmedBooking.session.day = session.day;
        tmpConfirmedBooking.session.time = session.name;
        tmpConfirmedBooking.buyer.name = confirmedBookingReq.name;
        tmpConfirmedBooking.buyer.cpf = confirmedBookingReq.cpf;
        tmpConfirmedBooking.isConfirmed = true;
        setConfirmedBooking({...tmpConfirmedBooking});
        // axios.post(`${API_CINEFLEX}/seats/book-many`, confirmedBookingReq);
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
                        confirmedBookingReq = {confirmedBookingReq}
                        setConfirmedBookingReq = {setConfirmedBookingReq}
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

            <Link to={tmpConfirmedBookingReq.name && tmpConfirmedBookingReq.cpf && tmpConfirmedBookingReq.ids.length > 0 ? `/filme/sessao/${idSession}/sucesso` : `/filme/assentos/${idSession}`}>
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
        confirmedBookingReq,
        setConfirmedBookingReq,
        confirmedBooking,
        setConfirmedBooking
    } = props;

    const [isSelected, setIsSelected] = useState(false);

    const tmpConfirmedBookingReq = {...confirmedBookingReq};

    function unselect(seatNumber, seatsList){
        setIsSelected(false);

        const indexUnselectedSeat = seatsList.indexOf(seatsList.find((seat) => seat === seatNumber));
        seatsList.splice(indexUnselectedSeat, 1);
        tmpConfirmedBookingReq.ids.splice(indexUnselectedSeat, 1);  
    }

    function select(){
        const tmpConfirmedBooking = {...confirmedBooking};
        if(isSelected) unselect(index+1, tmpConfirmedBooking.seats);
        else{
            if(seat.isAvailable) {
                setIsSelected(true);
                tmpConfirmedBookingReq.ids.push(seat.id);
                setConfirmedBookingReq({...tmpConfirmedBookingReq});            
                tmpConfirmedBooking.seats.push(index + 1);
            }
            else alert("Esse assento não está disponível");
        }        
        setConfirmedBooking({...tmpConfirmedBooking});
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