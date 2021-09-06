import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Sucess(props) {
    const {
        movie,
        buyers,
        session
    } = props.confirmedBooking;

    return (
        <SucessContainer>
            <h2>Pedido feito com sucesso!</h2>
            <h3>Filme e sessão</h3>
            <p>{movie.title}</p>
            <p>{session.day.weekday} {session.time}</p>

            {buyers.map((buyer)=>(
                <>
                    <h3>Assento {buyer.seat}</h3>                
                    <p>Comprador: {buyer.name}</p>
                    <p>CPF: {buyer.cpf}</p>
                </>
            ))}

            <Link to= "/">
                <button className="home">
                    Voltar pra Home
                </button>
            </Link>
        </SucessContainer>
    );
}

const SucessContainer = styled.div`
    h2 {
        padding: 40px 100px 0;
        color: #247A6B;
        font-weight: bold;
        font-size: 24px;        
    }

    h3 {
        font-weight: bold;
        font-size: 24px;
        color: #293845;
        font-size: 24px;
        margin-top: 40px;
    }

    p {
        font-size: 22px;
        color: #293845
    }

    button {
        width: 225px;
        height: 42px;
        top: 688px;

        background: #E8833A;
        border-radius: 3px;
        border: none;

        font-size: 18px;
        color: #FFFFFF;

        position: fixed;
        
        left: calc((100vw - 225px)/2);
    }
    `