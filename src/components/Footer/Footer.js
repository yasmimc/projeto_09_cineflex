import teste from "../Movies/teste.jpg"

export default function Footer(){
    return(
        <div className="selected-movie">
            <div className="banner">
                <img src={teste}></img>
            </div>
            <p>Enola Holmes</p>
        </div>
    );
}