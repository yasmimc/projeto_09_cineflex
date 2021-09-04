import { Link } from "react-router-dom";
import "../Sucess/Sucess.css"

export default function Sucess(props) {
    const {
        movie,
        buyer,
        session,
        seats
    } = props.confirmedBooking;

    return (
        <div className="Sucess">
            <h2>Pedido feito com sucesso!</h2>

            <h3>Filme e sessão</h3>
            <p>{movie.title}</p>
            <p>{session.day.weekday} {session.time}</p>

            <h3>Ingressos</h3>
            {seats.map(seat => (
                <p>Assento {seat}</p>
            ))}

            <h3>Comprador</h3>
            <p>Nome: {buyer.name}</p>
            <p>CPF: {buyer.cpf}</p>

            <Link to= "/">
                <button className="home">
                    Voltar pra Home
                </button>
            </Link>
        </div>
    );
}