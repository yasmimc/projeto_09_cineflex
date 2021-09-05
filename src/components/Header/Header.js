import styled from "styled-components";
import {MdKeyboardBackspace} from 'react-icons/md';
import { Link, useHistory } from 'react-router-dom';

export default function Header(){
    let history = useHistory();
    return(
        <Container>
            <button onClick={()=>history.goBack()}>
                <MdKeyboardBackspace/>
            </button>

            <Link to ="/">
                <h1>CINEFLEX</h1>
            </Link>
        </Container>
    );
}

const Container = styled.div`
    height: 67px;
    background-color: #C3CFD9;

    font-size: 34px;
    color:#E8833A;

    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;

    button {
        color: #fffFFF;
        position: absolute;
        left: 0;
        margin-left: 10px;
        background-color: #E8833A;
        border: none;
        border-radius: 3px;
        height: 25px;
        font-size: 20px;
    }
`

