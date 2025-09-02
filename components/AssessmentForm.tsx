
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePatients } from '../context/PatientContext';
import { AssessmentType } from '../types';
import { ASSESSMENT_CONFIG } from '../constants';
import type { Question } from '../types';

const AssessmentForm: React.FC = () => {
    const { patientId, assessmentType } = useParams<{ patientId: string; assessmentType: AssessmentType }>();
    const navigate = useNavigate();
    const { addAssessment, getPatientById } = usePatients();

    const [answers, setAnswers] = useState<number[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const config = assessmentType ? ASSESSMENT_CONFIG[assessmentType] : null;
    const patient = patientId ? getPatientById(patientId) : null;

    useEffect(() => {
        if (!patientId || !assessmentType || !config) {
            navigate('/');
        } else {
            setAnswers(new Array(config.questions.length).fill(-1));
        }
    }, [patientId, assessmentType, config, navigate]);
    
    if (!config || !patient) {
        return <div className="text-center p-10">Loading assessment...</div>;
    }
    
    const { questions, title, getLevel } = config;

    const handleAnswer = (questionIndex: number, score: number) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = score;
        setAnswers(newAnswers);
        
        // Automatically move to the next question
        if (currentQuestionIndex < questions.length - 1) {
            setTimeout(() => {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }, 300);
        }
    };
    
    const handleSubmit = () => {
        if (answers.includes(-1)) {
            alert('Please answer all questions before submitting.');
            return;
        }

        const totalScore = answers.reduce((sum, score) => sum + score, 0);
        const level = getLevel(totalScore);

        addAssessment(patientId!, {
            type: assessmentType!,
            date: new Date().toISOString(),
            score: totalScore,
            answers: answers,
            level: level,
        });
        
        // Conditional Logic: If BDI score is moderate or higher, suggest BAI.
        if (assessmentType === AssessmentType.BDI && totalScore > 16) {
             alert(`Depression score is ${totalScore} (${level}). Proceeding to Anxiety assessment.`);
             navigate(`/assessment/${patientId}/${AssessmentType.BAI}`);
        } else {
             alert(`Assessment complete. Score: ${totalScore} (${level}).`);
             navigate(`/patient/${patientId}`);
        }
    };

    const currentQuestion: Question = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    
    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-2xl font-bold text-slate-800 text-center">{title}</h1>
                <p className="text-center text-slate-500 mb-2">For patient: {patient.name}</p>
                <p className="text-center text-sm text-slate-500 mb-6">Please choose the statement that best describes how you've been feeling for the past week, including today.</p>

                <div className="w-full bg-slate-200 rounded-full h-2.5 mb-8">
                    <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.3s ease-in-out' }}></div>
                </div>

                <div className="space-y-6">
                    <div key={currentQuestion.id} className="text-center">
                        <h2 className="text-xl font-semibold text-slate-700 mb-5">{currentQuestionIndex + 1}. {currentQuestion.text}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {currentQuestion.options.map((option, optionIndex) => (
                                <button
                                    key={optionIndex}
                                    onClick={() => handleAnswer(currentQuestionIndex, option.score)}
                                    className={`p-4 border rounded-lg text-left transition duration-200 ${answers[currentQuestionIndex] === option.score ? 'bg-indigo-600 text-white border-indigo-600 ring-2 ring-indigo-300' : 'bg-slate-50 hover:bg-indigo-100 hover:border-indigo-300 border-slate-200'}`}
                                >
                                    <span className="font-medium">{option.text}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                 <div className="mt-8 flex justify-between items-center">
                    <button
                        onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                        disabled={currentQuestionIndex === 0}
                        className="px-6 py-2 bg-white text-slate-700 border border-slate-300 font-semibold rounded-md hover:bg-slate-100 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    {currentQuestionIndex === questions.length - 1 ? (
                         <button
                            onClick={handleSubmit}
                            disabled={answers.includes(-1)}
                            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 disabled:opacity-50"
                        >
                            Submit
                        </button>
                    ) : (
                         <button
                            onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                            disabled={answers[currentQuestionIndex] === -1}
                            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 disabled:opacity-50"
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AssessmentForm;
