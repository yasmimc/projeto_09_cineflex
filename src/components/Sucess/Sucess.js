import { Link } from "react-router-dom";
import "../Sucess/Sucess.css"

export default function Sucess(props) {
    const {
        movie,
        buyers,
        session
    } = props.confirmedBooking;

    return (
        <div className="Sucess">
            <h2>Pedido feito com sucesso!</h2>
            <h3>Filme e sessão</h3>
            <p>{movie.title}</p>
            <p>{session.day.weekday} {session.time}</p>

            {buyers.map((buyer, index)=>(
                <>
                    <h3>Ingresso {index + 1}</h3>                
                    <p>Comprador: {buyer.name}</p>
                    <p>CPF: {buyer.cpf}</p>
                    <p>Assento: {buyer.seat}</p>

                </>
            ))}

            <Link to= "/">
                <button className="home">
                    Voltar pra Home
                </button>
            </Link>
        </div>
    );
}