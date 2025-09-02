
import React from 'react';
import { HashRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import { PatientProvider, usePatients } from './context/PatientContext';
import PatientProfile from './components/PatientProfile';
import AssessmentForm from './components/AssessmentForm';

const Header: React.FC = () => (
    <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                <div className="flex-shrink-0">
                    <Link to="/" className="text-2xl font-bold text-indigo-600">
                        ClinicPlatform
                    </Link>
                </div>
                <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                        <NavLink to="/" className={({isActive}) => `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-indigo-100 text-indigo-700' : 'text-slate-500 hover:bg-slate-100'}`}>
                            Dashboard
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    </header>
);

const PatientSelectorPage: React.FC = () => {
    const { patients } = usePatients();
    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-6">Patient Dashboard</h1>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <ul className="divide-y divide-slate-200">
                    {patients.map(patient => (
                        <li key={patient.id}>
                            <Link to={`/patient/${patient.id}`} className="block hover:bg-slate-50 transition">
                                <div className="p-4 sm:p-6">
                                    <div className="flex items-center justify-between">
                                        <p className="text-lg font-medium text-indigo-600 truncate">{patient.name}</p>
                                        <div className="ml-2 flex-shrink-0 flex">
                                            <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                {patient.assessments.length} assessments
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-2 sm:flex sm:justify-between">
                                        <div className="sm:flex">
                                            <p className="flex items-center text-sm text-slate-500">
                                               Last activity: {patient.assessments.length > 0 || patient.notes.length > 0 ? new Date([...patient.assessments, ...patient.notes].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0].date).toLocaleDateString() : 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};


function App() {
    return (
        <PatientProvider>
            <Router>
                <div className="min-h-screen bg-slate-100">
                    <Routes>
                        <Route path="/assessment/:patientId/:assessmentType" element={<AssessmentForm />} />
                        <Route path="/*" element={
                            <>
                                <Header />
                                <main>
                                    <Routes>
                                        <Route path="/" element={<PatientSelectorPage />} />
                                        <Route path="/patient/:patientId" element={<PatientProfile />} />
                                    </Routes>
                                </main>
                            </>
                        } />
                    </Routes>
                </div>
            </Router>
        </PatientProvider>
    );
}

export default App;
