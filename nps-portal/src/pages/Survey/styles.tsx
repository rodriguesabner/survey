import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

const Layout = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    padding: 2em;
`

const List = styled.ul`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const Item = styled.li`
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h2 {
        color: #ffffff;
        font-weight: 400;
        font-size: 18px;
        margin-top: 10px;
    }
`

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    bg: string;
}

const Button = styled.button<ButtonProps>`
    background-color: ${(props) => props.bg || 'transparent'};
    cursor: pointer;
    height: 300px;
    min-width: 100%;
    border: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    svg {
        margin-top: 10px;
    }
`

export {
    Layout,
    List,
    Item,
    Button
}