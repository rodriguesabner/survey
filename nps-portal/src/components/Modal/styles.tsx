import styled from "styled-components";

const Layout = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    width: 100%;
    display: flex;
    background-color: rgba(0,0,0,.3);
    z-index: 1;

`;

const Backdrop = styled.div`
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    backdrop-filter: blur(2px);
    z-index: -1;
`;

const Container = styled.div`
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
    padding: 2em;
    gap: 20px;

    p {
        max-width: 300px;
        text-align: center;
    }

    button {
        background-color: #000;
        color: #fff;
        cursor: pointer;
        border: 0;
        padding: 10px;
    }
`;

export {
    Layout,
    Backdrop,
    Container
}