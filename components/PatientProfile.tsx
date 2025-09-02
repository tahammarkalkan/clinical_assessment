
import React, { useState, useMemo, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { usePatients } from '../context/PatientContext';
import { AssessmentType } from '../types';
import type { Assessment, SessionNote } from '../types';
import { ChartBarIcon, DocumentTextIcon, ArrowDownTrayIcon, ShareIcon, PlusIcon } from './Icons';

const SessionNotes: React.FC<{ patientId: string }> = ({ patientId }) => {
    const { getPatientById, addSessionNote } = usePatients();
    const patient = getPatientById(patientId);
    const [noteText, setNoteText] = useState('');

    const handleAddNote = () => {
        if (noteText.trim()) {
            addSessionNote(patientId, {
                date: new Date().toISOString(),
                text: noteText,
            });
            setNoteText('');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Session Notes</h3>
            <div className="space-y-4">
                <textarea
                    className="w-full h-24 p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="Enter new session note..."
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                />
                <div className="flex justify-end">
                    <button
                        onClick={handleAddNote}
                        className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition flex items-center gap-2"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Add Note
                    </button>
                </div>
            </div>
        </div>
    );
};

const HistoryItem: React.FC<{ item: Assessment | SessionNote }> = ({ item }) => {
    const isAssessment = 'type' in item;
    const itemDate = new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="flex items-start space-x-4 p-4 border-b border-slate-200 last:border-b-0">
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${isAssessment ? 'bg-indigo-100' : 'bg-sky-100'}`}>
                {isAssessment ? <DocumentTextIcon className="w-5 h-5 text-indigo-600" /> : <ChartBarIcon className="w-5 h-5 text-sky-600" />}
            </div>
            <div className="flex-grow">
                <div className="flex justify-between items-center">
                    <p className="font-semibold text-slate-800">
                        {isAssessment ? `${item.type.toUpperCase()} Assessment Completed` : 'Session Note'}
                    </p>
                    <p className="text-sm text-slate-500">{itemDate}</p>
                </div>
                {isAssessment ? (
                    <p className="text-sm text-slate-600 mt-1">Score: <span className="font-bold">{item.score}</span> ({item.level})</p>
                ) : (
                    <p className="text-sm text-slate-600 mt-1">{item.text}</p>
                )}
            </div>
        </div>
    );
};


const PatientProfile: React.FC = () => {
    const { patientId } = useParams<{ patientId: string }>();
    const { getPatientById } = usePatients();
    const [isLoadingPDF, setIsLoadingPDF] = useState(false);
    const reportRef = useRef<HTMLDivElement>(null);
    
    const patient = patientId ? getPatientById(patientId) : undefined;

    const combinedHistory = useMemo(() => {
        if (!patient) return [];
        return [...patient.assessments, ...patient.notes].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [patient]);

    const chartData = useMemo(() => {
        if (!patient) return [];
        const bdiData: { date: string, BDI?: number }[] = patient.assessments
            .filter(a => a.type === AssessmentType.BDI)
            .map(a => ({ date: new Date(a.date).toLocaleDateString('en-CA'), BDI: a.score }));

        const baiData: { date: string, BAI?: number }[] = patient.assessments
            .filter(a => a.type === AssessmentType.BAI)
            .map(a => ({ date: new Date(a.date).toLocaleDateString('en-CA'), BAI: a.score }));

        const allDates = [...new Set([...bdiData.map(d => d.date), ...baiData.map(d => d.date)])].sort();
        
        return allDates.map(date => {
            const bdiEntry = bdiData.find(d => d.date === date);
            const baiEntry = baiData.find(d => d.date === date);
            return {
                date,
                BDI: bdiEntry?.BDI,
                BAI: baiEntry?.BAI,
            };
        });
    }, [patient]);

    const handleExportPDF = async () => {
        if (!reportRef.current) return;
        setIsLoadingPDF(true);
        try {
            const canvas = await html2canvas(reportRef.current, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${patient?.name}_report_${new Date().toISOString().split('T')[0]}.pdf`);
        } catch (error) {
            console.error("Failed to generate PDF", error);
        } finally {
            setIsLoadingPDF(false);
        }
    };
    
    if (!patient) {
        return <div className="text-center p-10">Patient not found. <Link to="/" className="text-indigo-600 hover:underline">Go back</Link></div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">{patient.name}</h2>
                    <p className="text-slate-500 mt-1">Patient Profile & History</p>
                </div>
                <div className="flex items-center gap-2">
                     <Link
                        to={`/assessment/${patient.id}/${AssessmentType.BDI}`}
                        className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition flex items-center gap-2"
                    >
                        <PlusIcon className="w-5 h-5"/>
                        New Assessment
                    </Link>
                    <button
                        onClick={handleExportPDF}
                        disabled={isLoadingPDF}
                        className="px-4 py-2 bg-white text-slate-700 border border-slate-300 font-semibold rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition flex items-center gap-2 disabled:opacity-50"
                    >
                       <ArrowDownTrayIcon className="w-5 h-5" />
                        {isLoadingPDF ? 'Exporting...' : 'Export PDF'}
                    </button>
                    <button
                        onClick={() => alert('Sharing functionality to be implemented. You can share email, social media, etc.')}
                        className="px-4 py-2 bg-white text-slate-700 border border-slate-300 font-semibold rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition flex items-center gap-2"
                    >
                        <ShareIcon className="w-5 h-5" />
                        Share
                    </button>
                </div>
            </div>
            
            <div ref={reportRef} className="p-4 bg-white rounded-lg">
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Score Timeline</h3>
                    {chartData.length > 1 ? (
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer>
                                <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                    <XAxis dataKey="date" tick={{ fill: '#64748b' }} />
                                    <YAxis tick={{ fill: '#64748b' }} />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="BDI" stroke="#4f46e5" strokeWidth={2} connectNulls />
                                    <Line type="monotone" dataKey="BAI" stroke="#0ea5e9" strokeWidth={2} connectNulls />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="text-center text-slate-500 py-12">
                            <p>Not enough data for a timeline graph. Complete at least two assessments.</p>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold text-slate-800 p-6 border-b border-slate-200">Patient History</h3>
                        <div className="max-h-[600px] overflow-y-auto">
                            {combinedHistory.length > 0 ? (
                                combinedHistory.map(item => <HistoryItem key={item.id} item={item} />)
                            ) : (
                                <p className="text-slate-500 p-6 text-center">No history found for this patient.</p>
                            )}
                        </div>
                    </div>
                    <div className="lg:col-span-1">
                        <SessionNotes patientId={patient.id} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientProfile;
