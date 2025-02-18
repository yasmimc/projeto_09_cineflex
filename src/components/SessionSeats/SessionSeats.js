import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import axios from 'axios';

import { Container, Seats, SubmitButton, Labels, SelectedSeat, AvailableSeat, UnavailableSeat, Buttom, Forms } from "./Style.js"
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

    const [confirmedBookingReq, setConfirmedBookingReq] = useState({
        ids: [],
        compradores: []
    });

   useEffect(()=>{
        if(confirmedBooking.isConfirmed || confirmedBookingReq.ids.length === 0){
            setConfirmedBooking({
                movie: "",
                session: {
                    day: "",
                    time: ""
                },
                buyers:[],
                isConfirmed: false
            });
        }
   }, [])

    const promise = axios.get(`${API_CINEFLEX}/showtimes/${idSession}/seats`);

    useEffect(()=>(
        promise.then((resp)=>setSession({...resp.data}))
    ), []);

    const tmpConfirmedBookingReq = {...confirmedBookingReq};
    const tmpConfirmedBooking = {...confirmedBooking};

    function saveName(name, index){
        tmpConfirmedBookingReq.compradores[index].nome = name;
        setConfirmedBookingReq({...tmpConfirmedBookingReq});

        tmpConfirmedBooking.buyers[index].name = name;
    }

    function saveCPF(cpf, index){
        tmpConfirmedBookingReq.compradores[index].cpf = cpf;
        setConfirmedBookingReq({...tmpConfirmedBookingReq});

        tmpConfirmedBooking.buyers[index].cpf = cpf;
    }

    function book(){
        tmpConfirmedBooking.movie = session.movie;
        tmpConfirmedBooking.session.day = session.day;
        tmpConfirmedBooking.session.time = session.name;
        tmpConfirmedBooking.isConfirmed = true;
        setConfirmedBooking({...tmpConfirmedBooking});
        axios.post(`${API_CINEFLEX}/seats/book-many`, confirmedBookingReq);
    }

    function canBook(){
        const invalidInputs = confirmedBookingReq.compradores.filter(
            comprador => (!comprador.idAseento || !comprador.nome || ! comprador.cpf)
        );

        if (confirmedBookingReq.ids.length === 0 || invalidInputs.length > 0) return false;
        else return true;
    }
    
    const scrollBehavior = {
        behavior: "smooth",
        block: "start"
    }

    return (
        <Container>
            <h2>Selecione o(s) assento(s)</h2>
            <Seats>
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
            </Seats>

            <Labels>
                <li>
                    <SelectedSeat/>
                    <p>Selecionado</p>
                </li>
                <li>
                    <AvailableSeat />
                    <p>Disponível</p>
                </li>
                <li>
                    <UnavailableSeat/>
                    <p>Indisponível</p>
                </li>
            </Labels>

            {confirmedBooking.buyers.length > 0 ? confirmedBooking.buyers.map((buyer, index)=>(
                <Forms>
                    <h3>Assento {buyer.seat}</h3>
                    <h4>Nome do comprador:</h4>
                    <input 
                        onChange={(e)=>{saveName(e.target.value, index)}} 
                        onFocus={(e)=>(e.target.scrollIntoView(scrollBehavior))}
                        type="text" placeholder="Digite seu nome..."                        
                    />
                    <h4>CPF do comprador:</h4>
                    <input 
                        onChange={(e)=>{saveCPF(e.target.value, index)}}
                        onFocus={(e)=>(e.target.scrollIntoView(scrollBehavior))}
                        type="number" placeholder="Digite seu CPF..." 
                    />
                </Forms>
            )) : ""}

            {canBook() ? 
            <Link to={`/filme/sessao/${idSession}/sucesso`}>
                <SubmitButton onClick={book}>
                    Reservar assento(s)
                </SubmitButton> 
            </Link>
            : ""}

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

    function unselect(seatNumber, booking){
        setIsSelected(false);

        const indexUnselectedSeat = booking.buyers.indexOf(booking.buyers.find((buyer) => buyer.seat === seatNumber));
        
        booking.buyers.splice(indexUnselectedSeat, 1);
        tmpConfirmedBookingReq.ids.splice(indexUnselectedSeat, 1);
        tmpConfirmedBookingReq.compradores.splice(indexUnselectedSeat, 1);
    }

    function select(){
        const tmpConfirmedBooking = {...confirmedBooking};
        
        if(isSelected) unselect(index+1, tmpConfirmedBooking);
        else{
            if(seat.isAvailable) {
                tmpConfirmedBooking.buyers.push({
                    name: "",
                    cpf: "",
                    seat: ""
                })
                setIsSelected(true);
                tmpConfirmedBookingReq.ids.push(seat.id);
                tmpConfirmedBookingReq.compradores.push({
                    idAseento: seat.id,
                    nome: "",
                    cpf: ""
                })
                setConfirmedBookingReq({...tmpConfirmedBookingReq});    
                const lastAddedSeat = tmpConfirmedBooking.buyers.length-1;
                tmpConfirmedBooking.buyers[lastAddedSeat].seat = index + 1;
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