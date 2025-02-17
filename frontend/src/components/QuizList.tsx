import { useQuizzes } from '../hooks/quiz-hook';
import { exportDatabase } from '../services/quiz-service';

export const QuizList = () => {
  const { quizzes, deleteQuiz, createQuiz } = useQuizzes();
  return (
    <>
      <div style={{ display: 'flex' }}>
        Create a quizz :
        <button
          style={{
            marginLeft: 5,
          }}
          onClick={() => {
            // TODO add dummy quiz here
            createQuiz();
          }}
        >
          Add
        </button>
      </div>
      <div style={{ display: 'flex' }}>
        Export Quizzes :
        <button
          style={{
            marginLeft: 5,
          }}
          onClick={() => {
            exportDatabase();
          }}
        >
          Save
        </button>
      </div>
      <h2>Quizzes</h2>
      <div className='list'>
        {/* // TODO : display multiple quizzes here */}
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <div
              key={quiz._id}
              style={{
                backgroundColor: 'white',
                borderRadius: 5,
                margin: 10,
                padding: 10,
                color: 'black',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              {`${quiz.name} (${quiz.questions.length} questions)`}
              <button
                onClick={() => {
                  window.location.href = `/quiz/${quiz._id}`;
                }}
              >
                View
              </button>
              <button
                onClick={() => {
                  deleteQuiz(quiz._id);
                }}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <div
            style={{
              backgroundColor: '#FFF5',
              borderRadius: 5,
              margin: 10,
              padding: 10,
              color: 'black',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {"Looks like you don't have any quiz yet :/"}
          </div>
        )}
      </div>
    </>
  );
};
