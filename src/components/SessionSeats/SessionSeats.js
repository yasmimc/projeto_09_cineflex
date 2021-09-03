
import { Link } from "react-router-dom"
import "./SessionSeats.css"


export default function SessionSeats() {
    const assento = "01"
    return (
        <div className="SessionSeats">
            <h2>Selecione o(s) assento(s)</h2>
            <div>
                <button> {assento} </button>
                <button> {assento} </button>
                <button> {assento} </button>
                <button> {assento} </button>
                <button> {assento} </button>
                <button> {assento} </button>
                <button> {assento} </button>
                <button> {assento} </button>
                <button> {assento} </button>
                <button> {assento} </button>
                <button> {assento} </button>
                <button> {assento} </button>
                <button> {assento} </button>
                <button> {assento} </button>
                <button> {assento} </button>
                <button> {assento} </button>
                <button> {assento} </button>
                <button> {assento} </button>
                <button> {assento} </button>
                <button> {assento} </button>
                <button> {assento} </button>
                <button> {assento} </button>
                <button> {assento} </button>
                <button> {assento} </button>
                <button> {assento} </button>
                <button> {assento} </button>
                <button> {assento} </button>
                <button> {assento} </button>
                <button> {assento} </button>
                <button> {assento} </button>
                <button> {assento} </button>
                <button> {assento} </button>
                <button> {assento} </button>
                <button> {assento} </button>
                <button> {assento} </button>
                <button> {assento} </button>
                <button> {assento} </button>
                <button> {assento} </button>
                <button> {assento} </button>
                <button> {assento} </button>
            </div>

            <ul className="labels">
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
            </ul>

            <div className="form">
                <h3>Nome do comprador:</h3>
                <input type="text" placeholder="Digite seu nome..." ></input>
                <h3>CPF do comprador:</h3>
                <input type="number" placeholder="Digite seu CPF..." ></input>
            </div>

            <Link to="/filme/sessao/:idSessao/sucesso">
                <button className="submit">
                    Reservar assento(s)
                </button>
            </Link>
        </div>
    );
}