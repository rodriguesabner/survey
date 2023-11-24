import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
    }

    html, body, #root, .App {
        width: 100%;
        min-height: 100vh;
        height: 100%;
    }

    body {
        background-color: #000;
    }
    
    .App {
        position: relative;
    }
`;