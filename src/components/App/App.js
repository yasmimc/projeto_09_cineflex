import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from 'axios';

import "../../reset.css";
import "../App/App.css";

import Header from "../Header/Header";
import Movies from "../Movies/Movies";
import Sessions from "../Sessions/Sessions";
import Session from "../Session/Session";
import Sucess from "../Sucess/Sucess";

import teste from "../Movies/teste.jpg"

const API_CINEFLEX = "https://mock-api.bootcamp.respondeai.com.br/api/v3/cineflex"

export default function App() {

    const [moviesList, setMoviesList] = useState([]);

    const promise = axios.get(`${API_CINEFLEX}/movies`)
    useEffect(()=>{
        promise.then((resp)=>setMoviesList([...resp.data]))
        console.log(moviesList)
        
    }, []);

    return (
        <BrowserRouter>
            <Header></Header>
            <Switch>
                <Route path="/" exact>
                    <Movies movies={moviesList}></Movies>
                </Route>
                <Route path="/filme/:idFilme" exact>
                    <Sessions></Sessions>
                    
                </Route>
                <Route path="/filme/sessao/:idSessao" exact>
                    <Session></Session>
                </Route>
                <Route path="/filme/sessao/:idSessao/sucesso" exact>
                    <Sucess></Sucess>
                </Route>
            </Switch>
            <Footer/>
        </BrowserRouter>
    );
}

function Footer(){
    return(
        <div className="selected-movie">
            <div className="banner">
                <img src={teste}></img>
            </div>
            <p>Enola Holmes</p>
        </div>
    );
}