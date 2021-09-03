import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "../../reset.css";
import "../App/App.css";

import Header from "../Header/Header";
import Movies from "../Movies/Movies";
import Sessions from "../Sessions/Sessions";
import Session from "../Session/Session";
import Sucess from "../Sucess/Sucess";

import teste from "../Movies/teste.jpg"


export default function App() {
    
    return (
        <BrowserRouter>
            <Header></Header>
            <Switch>
                <Route path="/" exact>
                    <Movies></Movies>
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