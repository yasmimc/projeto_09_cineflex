import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "../../reset.css";
import "../App/App.css";

import Header from "../Header/Header";
import Movies from "../Movies/Movies";
import Sessions from "../Sessions/Sessions";
import SessionSeats from "../SessionSeats/SessionSeats";
import Sucess from "../Sucess/Sucess";

export default function App() {   

    const [finalBooking, setFinalBooking] = useState({
        ids: [],
        name: "",
        cpf: ""
    });

    return (
        <BrowserRouter>
            <Header></Header>
            <Switch>
                <Route path="/" exact component={Movies}/>
                <Route path="/filme/:idMovie" exact component= {Sessions}/>
                <Route path="/filme/assentos/:idSession" exact>
                    <SessionSeats finalBooking={finalBooking} setFinalBooking = {setFinalBooking}/>
                </Route>
                <Route path="/filme/sessao/:idSession/sucesso" exact>
                    <Sucess finalBooking={finalBooking} setFinalBooking = {setFinalBooking}/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}