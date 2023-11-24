import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import api from "../../services/api";
import { Layout, List, Item, Button } from "./styles"
import { SurveyProps, SurveyPortalProps } from "../../interfaces/survey.interface";
import {Smiley, SmileyMeh, SmileySad} from  "phosphor-react";

const Survey = () => {
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [survey, setSurvey] = useState<SurveyPortalProps>({ muitoSatisfeito: 0, satisfeito: 0, insatisfeito: 0 });

    useEffect(() => {
        async function getSurvey() {
            const { data } = await api.get('/survey');

            console.log(data);

            const values = data.map((value: SurveyProps) => ({
                average: value.average
            }))

            const muitoSatisfeitoGroup = values
                .filter((value: SurveyProps) => value.average === "1")
                .length;

            const satisfeitoGroup = values
                .filter((value: SurveyProps) => value.average === "2")
                .length;

            const insatisfeitoGroup = values
                .filter((value: SurveyProps) => value.average === "3")
                .length;

            setSurvey({
                muitoSatisfeito: muitoSatisfeitoGroup,
                satisfeito: satisfeitoGroup,
                insatisfeito: insatisfeitoGroup
            });

            setLoading(false);
        }

        void getSurvey();
    }, [])

    async function handleChangeNPS(value: string) {
        if (value === "0") {
            alert("Responda a pesquisa");
            return;
        }

        await api.post("/survey", { average: value });
        setOpenModal(true);

        let type = "";

        switch (value.toString()) {
            case "1":
                type = "muitoSatisfeito";
                break;
            case "2":
                type = "satisfeito";
                break;
            case "3":
                type = "insatisfeito";
                break;
            default:
                type = "";
                return
        }

        setSurvey((prevValue: SurveyPortalProps) => {
            return {
                ...prevValue,
                [type]: prevValue[type as keyof SurveyPortalProps] += 1
            }
        })
    }

    return (
        <Layout>
            <Modal
                open={openModal}
                handleClose={() => setOpenModal(false)}
            />

            {
                loading ? (
                    <div>
                        <h1 style={{color: "#fff"}}>
                            Carregando...
                        </h1>
                    </div>
                ) : (
                    <List>
                        <Item>
                            <Button
                                bg={"#7bcf7d"}
                                onClick={() => handleChangeNPS("1")}
                            >
                                <Smiley color="#000" size={94} />
                                Muito Satisfeito
                            </Button>
                            <h2>{survey.muitoSatisfeito}</h2>
                        </Item>
                        <Item>
                            <Button
                                bg={"#f1c232"}
                                onClick={() => handleChangeNPS("2")}
                            >
                                <SmileyMeh color="#000" size={94} />
                                Satisfeito
                            </Button>
                            <h2>{survey.satisfeito}</h2>
                        </Item>
                        <Item>
                            <Button
                                bg={"#cf7d7b"}
                                onClick={() => handleChangeNPS("3")}
                            >
                                <SmileySad color="#000" size={94} />
                                Insatisfeito
                            </Button>
                            <h2>{survey.insatisfeito}</h2>
                        </Item>
                    </List>
                )
            }
        </Layout>
    )
}

export default Survey;