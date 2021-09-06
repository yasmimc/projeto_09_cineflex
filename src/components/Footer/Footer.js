import styled from "styled-components";

export default function Footer(props){
    const {
        movie,
        day,
        time
    } = props;

    return(
        <SelectedMovie>
            <Banner>
                <img src={movie ? movie.posterURL : ""}></img>
            </Banner>
            <div>
                <p>{movie ? movie.title : ""}</p>
                <p>{day && time ? `${day.weekday} - ${time}` : ""}</p>
            </div>
        </SelectedMovie>
    );
}

const SelectedMovie = styled.div`

    height: 117px;
    background-color: #DFE6ED;

    font-size: 34px;
    color: #293845;

    display: flex;
    align-items: center;

    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;

    p {
        font-size: 24px;
        padding-bottom: 7px;
    }`

const Banner = styled.div`

    width: 64px;
    height: 89px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    margin: 15px 15px;
    background-color: #FFFFFF;
    display: flex;

    align-items: center;
    justify-content: center;

    img {
        width: 48px;
        height: 72px;
    }
`