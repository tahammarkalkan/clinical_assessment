
export enum AssessmentType {
  BDI = 'bdi',
  BAI = 'bai',
}

export interface Answer {
  text: string;
  score: number;
}

export interface Question {
  id: number;
  text: string;
  options: Answer[];
}

export interface Assessment {
  id: string;
  patientId: string;
  type: AssessmentType;
  date: string;
  score: number;
  answers: number[];
  level: string;
}

export interface SessionNote {
  id: string;
  patientId: string;
  date: string;
  text: string;
}

export interface Patient {
  id: string;
  name: string;
  assessments: Assessment[];
  notes: SessionNote[];
}
