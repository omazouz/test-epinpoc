import { useEffect, useState } from "react"
import { IQuiz } from "../data-interfaces/quiz.interfaces"
import { useParams,useNavigate } from "react-router-dom"
import { getQuiz } from "../services/quiz-service"

export const Quiz = () => {
    const { id } = useParams<{ id: string }>()

    const navigate = useNavigate()

    const [quiz, setQuiz] = useState<IQuiz | null>(null)

    useEffect(() => {
        if (!id){
            navigate('/')
            return
        }
        getQuiz(id).then((data) => {
            if (Object.keys(data).length === 0) {
                navigate('/')
                return
            }
            setQuiz(data)
        })
    }, [id,navigate])

    if (!quiz) return <div>Loading...</div>

    return (
        <div>
            <h2>{quiz.name}</h2>
            <ul>
                {quiz && quiz.questions && quiz.questions.map((question) => {
                    return (
                        <li key={question._id}>
                            {question.name}
                            {question.answers.map((answer) => (
                                <ul key={answer._id} style={{ opacity: answer.isCorrect ? 1 : 0.5 }}>
                                    <li>{answer.name}</li>
                                </ul>
                            ))}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}