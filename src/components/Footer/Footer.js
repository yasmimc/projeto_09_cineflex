import "../Footer/Footer.css"

export default function Footer(props){
    const {
        movie,
        day,
        time
    } = props;

    return(
        <div className="selected-movie">
            <div className="banner">
                <img src={movie ? movie.posterURL : ""}></img>
            </div>
            <div className="session-info">
                <p>{movie ? movie.title : ""}</p>
                <p>{day && time ? `${day.weekday} - ${time}` : ""}</p>
            </div>
        </div>
    );
}