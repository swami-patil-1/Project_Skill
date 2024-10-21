import React, { useState } from 'react';
import '../SkillAssessment.css';

const SkillTest = () => {
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0); // Track score

  const domains = [
    { name: 'Web Development', description: 'HTML, CSS, JavaScript, React' },
    { name: 'Data Science', description: 'Python, Machine Learning, Data Analysis' },
    { name: 'Cybersecurity', description: 'Network Security, Ethical Hacking' },
    { name: 'DevOps', description: 'CI/CD, Jenkins, Kubernetes' },
  ];

  const quizData = {
    'Web Development': {
      Beginner: [
        { question: 'What does HTML stand for?', options: ['HyperText Markup Language', 'Home Tool Markup Language', 'Hyperlinks Text Markup Language'], correct: 'HyperText Markup Language' },
        { question: 'Which tag is used to insert an image in HTML?', options: ['<img>', '<image>', '<src>'], correct: '<img>' },
      ],
      Intermediate: [
        { question: 'Which of these is a JavaScript framework?', options: ['Angular', 'CSS', 'HTML'], correct: 'Angular' },
        { question: 'What does React use to handle dynamic data changes?', options: ['State', 'Props', 'Node.js'], correct: 'State' },
      ],
      Advanced: [
        { question: 'What is the Virtual DOM in React?', options: ['A copy of the actual DOM', 'A representation of UI changes', 'An advanced form of DOM'], correct: 'A representation of UI changes' },
        { question: 'Which hook is used to manage side effects in React?', options: ['useEffect', 'useState', 'useContext'], correct: 'useEffect' },
      ],
    },
    'Data Science': {
      Beginner: [
        { question: 'Which language is primarily used for data analysis?', options: ['Python', 'JavaScript', 'C++'], correct: 'Python' },
        { question: 'What is a DataFrame in Pandas?', options: ['2D labeled data structure', 'A type of graph', 'An algorithm'], correct: '2D labeled data structure' },
      ],
      Intermediate: [
        { question: 'Which algorithm is used for classification?', options: ['Logistic Regression', 'K-Means Clustering', 'Linear Regression'], correct: 'Logistic Regression' },
        { question: 'What is overfitting in machine learning?', options: ['Model fits the training data too well', 'Model cannot learn from the data', 'Model performs well on both training and test data'], correct: 'Model fits the training data too well' },
      ],
      Advanced: [
        { question: 'What is Gradient Descent?', options: ['An optimization algorithm', 'A loss function', 'A regularization technique'], correct: 'An optimization algorithm' },
        { question: 'Which library is commonly used for deep learning?', options: ['TensorFlow', 'NumPy', 'Matplotlib'], correct: 'TensorFlow' },
      ],
    },
    // Add more questions for other domains and levels
  };

  const courseRecommendations = {
    'Web Development': {
      Beginner: ['Introduction to HTML', 'CSS Basics', 'JavaScript for Beginners'],
      Intermediate: ['Intermediate JavaScript', 'React Essentials', 'JavaScript Algorithms'],
      Advanced: ['Advanced React', 'Next.js & Server-Side Rendering', 'React Performance Optimization'],
    },
    'Data Science': {
      Beginner: ['Python for Data Science', 'Introduction to Pandas', 'Basic Data Analysis'],
      Intermediate: ['Intermediate Machine Learning', 'Data Science with Python', 'K-Means and Clustering'],
      Advanced: ['Deep Learning with TensorFlow', 'Advanced Machine Learning', 'AI and Big Data'],
    },
    // Add recommendations for other domains
  };

  const handleDomainSelect = (domain) => {
    setSelectedDomain(domain);
    setShowQuiz(false);
    setShowResult(false);
    setSelectedLevel('');
    setCurrentQuestion(0);
    setAnswers([]);
    setScore(0);
  };

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setShowQuiz(true);
    setShowResult(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setScore(0); // Reset score when restarting
  };

  const handleAnswerSelect = (answer) => {
    const currentQuiz = quizData[selectedDomain][selectedLevel];
    const correctAnswer = currentQuiz[currentQuestion].correct;

    if (answer === correctAnswer) {
      setScore(score + 1); // Increment score if answer is correct
    }

    setAnswers([...answers, answer]);
    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < currentQuiz.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowQuiz(false);
      setShowResult(true);
    }
  };

  const renderQuiz = () => {
    const currentQuiz = quizData[selectedDomain][selectedLevel];
    return (
      <div className="quiz-container">
        <h2>{selectedDomain} Quiz - {selectedLevel}</h2>
        <p>{currentQuiz[currentQuestion].question}</p>
        <div className="quiz-options">
          {currentQuiz[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className="quiz-button"
              onClick={() => handleAnswerSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderResult = () => {
    const totalQuestions = quizData[selectedDomain][selectedLevel].length;
    const percentage = (score / totalQuestions) * 100;

    let recommendationLevel;
    if (percentage >= 80) {
      recommendationLevel = 'Advanced';
    } else if (percentage >= 50) {
      recommendationLevel = 'Intermediate';
    } else {
      recommendationLevel = 'Beginner';
    }

    return (
      <div className="result-container">
        <h2>Congratulations! You've completed the {selectedDomain} quiz at {selectedLevel} level.</h2>
        <p>Your Score: {score} / {totalQuestions} ({percentage.toFixed(2)}%)</p>
        <p>Recommended Courses for You:</p>
        <ul>
          {courseRecommendations[selectedDomain][recommendationLevel].map((course, index) => (
            <li key={index}>{course}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="skill-assessment-page">
      <header className="assessment-header">
        <h1>Skill Assessment</h1>
        <p>Select a domain to assess your skills and receive personalized training recommendations.</p>
      </header>

      {!showQuiz && !showResult && (
        <section className="domain-selection">
          <h2>Select a Domain</h2>
          <div className="domain-cards">
            {domains.map((domain) => (
              <div key={domain.name} className="domain-card" onClick={() => handleDomainSelect(domain.name)}>
                <h3>{domain.name}</h3>
                <p>{domain.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {selectedDomain && !showQuiz && !showResult && (
        <section className="level-selection">
          <h2>Select your skill level in {selectedDomain}</h2>
          <div className="quiz-options">
            <button className="quiz-button" onClick={() => handleLevelSelect('Beginner')}>Beginner</button>
            <button className="quiz-button" onClick={() => handleLevelSelect('Intermediate')}>Intermediate</button>
            <button className="quiz-button" onClick={() => handleLevelSelect('Advanced')}>Advanced</button>
          </div>
        </section>
      )}

      {showQuiz && renderQuiz()}

      {showResult && renderResult()}
    </div>
  );
};

export default SkillTest;
