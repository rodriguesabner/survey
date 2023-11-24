interface SurveyProps {
    id: string;
    average: string;
    created_at: number;
    updated_at: number;
}

interface SurveyPortalProps {
    muitoSatisfeito: number;
    satisfeito: number;
    insatisfeito: number;
}

export type {
    SurveyProps,
    SurveyPortalProps
}