
import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { Patient, Assessment, SessionNote } from '../types';
import { AssessmentType } from '../types';

const MOCK_PATIENTS: Patient[] = [
    {
        id: '1',
        name: 'John Doe',
        assessments: [
            { id: 'a1', patientId: '1', type: AssessmentType.BDI, date: '2023-10-01T10:00:00Z', score: 12, answers: [], level: 'Mild mood disturbance' },
            { id: 'a2', patientId: '1', type: AssessmentType.BAI, date: '2023-10-01T10:05:00Z', score: 8, answers: [], level: 'Mild anxiety' },
            { id: 'a3', patientId: '1', type: AssessmentType.BDI, date: '2023-10-15T11:00:00Z', score: 9, answers: [], level: 'These ups and downs are considered normal' },
        ],
        notes: [
            { id: 'n1', patientId: '1', date: '2023-10-01T10:10:00Z', text: 'Patient reports feeling overwhelmed at work. Discussed coping strategies.' },
            { id: 'n2', patientId: '1', date: '2023-10-15T11:05:00Z', text: 'Patient seems more optimistic. Reports improvement in sleep patterns.' },
        ],
    },
    {
        id: '2',
        name: 'Jane Smith',
        assessments: [
             { id: 'b1', patientId: '2', type: AssessmentType.BDI, date: '2023-11-05T14:00:00Z', score: 22, answers: [], level: 'Moderate depression' },
             { id: 'b2', patientId: '2', type: AssessmentType.BAI, date: '2023-11-05T14:05:00Z', score: 18, answers: [], level: 'Moderate anxiety' },
        ],
        notes: [
            { id: 'n3', patientId: '2', date: '2023-11-05T14:10:00Z', text: 'Initial consultation. Patient is experiencing significant distress.' },
        ],
    }
];

interface PatientContextType {
    patients: Patient[];
    getPatientById: (id: string) => Patient | undefined;
    addAssessment: (patientId: string, assessment: Omit<Assessment, 'id' | 'patientId'>) => void;
    addSessionNote: (patientId: string, note: Omit<SessionNote, 'id' | 'patientId'>) => void;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export const PatientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [patients, setPatients] = useState<Patient[]>(MOCK_PATIENTS);

    const getPatientById = (id: string) => patients.find(p => p.id === id);

    const addAssessment = (patientId: string, assessmentData: Omit<Assessment, 'id'| 'patientId'>) => {
        setPatients(prevPatients => prevPatients.map(p => {
            if (p.id === patientId) {
                const newAssessment: Assessment = {
                    ...assessmentData,
                    id: `a${Date.now()}`,
                    patientId,
                };
                return { ...p, assessments: [...p.assessments, newAssessment] };
            }
            return p;
        }));
    };

    const addSessionNote = (patientId: string, noteData: Omit<SessionNote, 'id'| 'patientId'>) => {
        setPatients(prevPatients => prevPatients.map(p => {
            if (p.id === patientId) {
                 const newNote: SessionNote = {
                    ...noteData,
                    id: `n${Date.now()}`,
                    patientId,
                };
                return { ...p, notes: [...p.notes, newNote] };
            }
            return p;
        }));
    };

    return (
        <PatientContext.Provider value={{ patients, getPatientById, addAssessment, addSessionNote }}>
            {children}
        </PatientContext.Provider>
    );
};

export const usePatients = () => {
    const context = useContext(PatientContext);
    if (context === undefined) {
        throw new Error('usePatients must be used within a PatientProvider');
    }
    return context;
};
