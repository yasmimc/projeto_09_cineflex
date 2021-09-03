import { BrowserRouter, Switch, Route, Link } from "react-router-dom";


import "../Movies/Movies.css"

export default function Movies(props) {
    const { 
        movies 
    } = props;

    console.log(movies)

    return (
        <div >
            <h2>Selecione o filme</h2>
            <div className="movies">
                {movies.map((movie)=>(
                    <Movie 
                        key={movie.id}
                        idFilme={movie.id}
                        posterURl={movie.posterURL}    
                    />
                ))}             
            </div>
        </div>
    );
}

function Movie(props) {
    console.log(props)
    const {
        idFilme,
        posterURl
    } = props;


    return (
        <Link to={`/filme/${idFilme}`}>
            <div className="movie">
                <img src={posterURl}></img>
            </div>
        </Link>        
    );
}