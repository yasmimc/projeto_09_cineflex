import { useParams } from 'react-router-dom';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import teste from "../Movies/teste.jpg"


import "../Sessions/Sessions.css"

export default function Sessions(){
    const params = useParams();
    console.log(params)
    return(
        <div className="Sessions">
            <h2>Selecione o horário</h2>
            <ul>
                <li>
                    <p>Quinta Feira - 24/06/2021</p>
                    <Link to="/filme/sessao/1">
                        <button>15:00</button>
                    </Link>
                    <Link to="/filme/sessao/1">
                        <button>19:00</button>
                    </Link>
                </li>
                <li>
                    <p>Sexta Feira - 25/06/2021</p>
                    <Link to="/filme/sessao/1">
                        <button>15:00</button>
                    </Link>
                    <Link to="/filme/sessao/1">
                        <button>19:00</button>
                    </Link>
                </li>
            </ul>
            
        </div>
    );
}

