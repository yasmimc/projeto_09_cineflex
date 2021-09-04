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

    const [confirmedBooking, setConfirmedBooking] = useState({
        movie: "",
        session: {
            day: "",
            time: ""
        },
        seats: [],
        buyer:{
            name: "",
            cpf: ""
        }
    });

    return (
        <BrowserRouter>
            <Header></Header>
            <Switch>
                <Route path="/" exact component={Movies}/>
                <Route path="/filme/:idMovie" exact component={Sessions}/>
                <Route path="/filme/assentos/:idSession" exact>
                    <SessionSeats confirmedBooking={confirmedBooking} setConfirmedBooking={setConfirmedBooking}/>
                </Route>
                <Route path="/filme/sessao/:idSession/sucesso" exact>
                    <Sucess confirmedBooking={confirmedBooking}/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}