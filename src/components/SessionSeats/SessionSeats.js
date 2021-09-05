
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

    const [confirmedBookinReq, setConfirmedBookinReq] = useState({
        ids: [],
        name: "",
        cpf: ""
    });    

    const promise = axios.get(`${API_CINEFLEX}/showtimes/${idSession}/seats`);

    useEffect(()=>(
        promise.then((resp)=>setSession({...resp.data}))
    ), []);

    const tmpConfirmedBookinReq = {...confirmedBookinReq};

    function saveName(name){
        tmpConfirmedBookinReq.name = name; 
        setConfirmedBookinReq({...tmpConfirmedBookinReq});
    }

    function saveCPF(cpf){
        tmpConfirmedBookinReq.cpf = cpf; 
        setConfirmedBookinReq({...tmpConfirmedBookinReq});
    }

    function book(){
        const tmpConfirmedBooking = {...confirmedBooking};
        tmpConfirmedBooking.movie = session.movie;
        tmpConfirmedBooking.session.day = session.day;
        tmpConfirmedBooking.session.time = session.name;
        tmpConfirmedBooking.buyer.name = confirmedBookinReq.name;
        tmpConfirmedBooking.buyer.cpf = confirmedBookinReq.cpf;
        setConfirmedBooking({...tmpConfirmedBooking});
        // axios.post(`${API_CINEFLEX}/seats/book-many`, confirmedBookinReq);
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
                        confirmedBookinReq = {confirmedBookinReq}
                        setConfirmedBookinReq = {setConfirmedBookinReq}
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

            <Link to={tmpConfirmedBookinReq.name && tmpConfirmedBookinReq.cpf && tmpConfirmedBookinReq.ids.length > 0 ? `/filme/sessao/${idSession}/sucesso` : `/filme/assentos/${idSession}`}>
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
        confirmedBookinReq,
        setConfirmedBookinReq,
        confirmedBooking,
        setConfirmedBooking
    } = props;

    const [isSelected, setIsSelected] = useState(false);

    const tmpConfirmedBookinReq = {...confirmedBookinReq};

    function unselect(seatNumber, seatsList){
        setIsSelected(false);

        const indexUnselectedSeat = seatsList.indexOf(seatsList.find((seat) => seat === seatNumber));
        seatsList.splice(indexUnselectedSeat, 1);        
    }

    function select(){
        const tmpConfirmedBooking = {...confirmedBooking};
        if(isSelected) unselect(index+1, tmpConfirmedBooking.seats);
        else{
            if(seat.isAvailable) {
                setIsSelected(true);
                tmpConfirmedBookinReq.ids.push(seat.id);
                setConfirmedBookinReq({...tmpConfirmedBookinReq});            
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