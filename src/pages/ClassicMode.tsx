import { useEffect, useState } from "react";
import type { Question } from "../types/gameTypes";

function ClassicMode() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchQuestions();
    }, []);

    async function fetchQuestions() {
        try {
            const res = await fetch("https://lxgdmchjmdkpgkwczogl.supabase.co/functions/v1/get_questions");
            const data: Question[] = await res.json();
            setQuestions(data);
        } catch (error) {
            console.error("Error al obtener preguntas:", error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <p className="text-white">Cargando preguntas...</p>;

    return (
        <div>
            <h2 className="text-white">{questions[0].question}</h2>
        </div>
    );
}

export default ClassicMode;
