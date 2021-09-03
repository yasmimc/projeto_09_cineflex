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

    return (
        <BrowserRouter>
            <Header></Header>
            <Switch>
                <Route path="/" exact>
                    <Movies></Movies>
                </Route>
                <Route path="/filme/:idMovie" exact>
                    <Sessions></Sessions>                    
                </Route>
                <Route path="/filme/assentos/:idSession" exact>
                    <SessionSeats></SessionSeats>
                </Route>
                <Route path="/filme/sessao/:idSession/sucesso" exact>
                    <Sucess></Sucess>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

