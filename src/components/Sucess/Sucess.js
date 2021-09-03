import "../Sucess/Sucess.css"

export default function Sucess(){
    return(
        <div className="Sucess">
            <h2>Pedido feito com sucesso!</h2>
            <div>
                <h3>Filme e sessão</h3>
                <p>Enola Holmes</p>
                <p>24/06/2021 15:00</p>
            </div>

            <div>
                <h3>Ingressos</h3>
                <p>Assento 15</p>
                <p>Assento 16</p>
            </div>

            <div>
                <h3>Comprador</h3>
                <p>Nome: Yasmim</p>
                <p>CPF: 123.456.789-00</p>
            </div>

            <button className="home">
                Voltar pra Home
            </button>
        </div>
    );
}