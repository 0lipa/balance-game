import { useState } from 'react'
import { questions } from '../data/questions.js'

export default function Quiz({ onFinish }) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answers, setAnswers] = useState([])

  const current = questions[index]
  const isLast = index === questions.length - 1

  function handleSelect(optionKey) {
    if (selected) return // 중복 클릭 방지
    setSelected(optionKey)

    const option = optionKey === 'A' ? current.optionA : current.optionB
    const nextAnswers = [
      ...answers,
      { qId: current.id, question: current.question, choice: optionKey, text: option.text },
    ]
    setAnswers(nextAnswers)

    setTimeout(() => {
      if (isLast) {
        onFinish(nextAnswers)
      } else {
        setIndex(index + 1)
        setSelected(null)
      }
    }, 350)
  }

  return (
    <div className="quiz-screen">
      <div className="progress-row">
        {questions.map((q, i) => (
          <div
            key={q.id}
            className={`progress-dot ${i === index ? 'active' : ''} ${i < index ? 'done' : ''}`}
          />
        ))}
      </div>

      <div className="question-wrap" key={current.id}>
        <h2 className="question-text">{current.question}</h2>

        <div className="vs-wrap">
          <div className="vs-badge">VS</div>

          <button
            className={`option-card optA ${selected === 'A' ? 'selected' : ''}`}
            onClick={() => handleSelect('A')}
          >
            {current.optionA.image ? (
              <img
                className="option-image"
                src={current.optionA.image}
                alt={current.optionA.text}
                style={{ objectPosition: current.optionA.imagePosition || 'center' }}
              />
            ) : (
              <span className="option-emoji">{current.optionA.emoji}</span>
            )}
            <span className="option-text">{current.optionA.text}</span>
          </button>

          <button
            className={`option-card optB ${selected === 'B' ? 'selected' : ''}`}
            onClick={() => handleSelect('B')}
          >
            {current.optionB.image ? (
              <img
                className="option-image"
                src={current.optionB.image}
                alt={current.optionB.text}
                style={{ objectPosition: current.optionB.imagePosition || 'center' }}
              />
            ) : (
              <span className="option-emoji">{current.optionB.emoji}</span>
            )}
            <span className="option-text">{current.optionB.text}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
