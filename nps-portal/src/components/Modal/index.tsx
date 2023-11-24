import { ReactNode, useEffect } from "react";
import { Layout, Backdrop, Container } from "./styles";

interface ModalProps {
    open: boolean;
    handleClose: () => void;
}

const Modal = (props: ModalProps): ReactNode => {
    useEffect(() => {
        const timeout = setTimeout(() => props.handleClose(), 5000);

        return () => {
            clearTimeout(timeout);
        }
    }, [props, props.open]);

    return props.open ? (
        <Layout>
            <Backdrop onClick={() => props.handleClose()} />
            <Container>
                <h1>
                    Obrigado pelo feedback
                </h1>
                <p>
                    O seu feedback é muito importante pra nós, nossa equipe agradece ❤️
                </p>
                <button onClick={() => props.handleClose()}>
                    Fechar
                </button>
            </Container>
        </Layout>
    ) : undefined
}

export default Modal;