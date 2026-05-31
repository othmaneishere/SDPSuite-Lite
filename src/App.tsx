import { useState, useEffect, useRef, Component, ErrorInfo, ReactNode } from 'react';
import React from 'react';
import {
  FileText,
  Settings2,
  Network,
  Files,
  LogOut,
  Trash,
  Trash2,
  Bomb,
  BookOpen,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { toPng, toJpeg } from 'html-to-image';
import { cn } from './lib/utils';
import {
  MetaData,
  PESTELData,
  PESTELRow,
  McKinsey7SData,
  VRIORow,
  TOWSRow,
  PorterRow,
  GroupData,
  PortersFiveForcesData,
} from './types';

import {
  PESTELWorksheet,
  McKinseyWorksheet,
  VRIOFramework,
  VRIOAnalysisTable,
  TOWSWorksheet,
  PortersFiveForces,
  ConfrontationMatrixGuide,
} from './components/Worksheets';

// Error Boundary Component for stability
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">Something went wrong.</h1>
          <p className="mb-8 text-gray-600">
            We've encountered an unexpected error. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-brand-blue hover:bg-brand-blue/90 cursor-pointer rounded-xl px-6 py-3 font-bold text-white shadow-lg transition-all"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const CorporateHeader = ({
  meta,
  setMeta,
  hideMeta = false,
}: {
  meta: MetaData;
  setMeta: (m: MetaData) => void;
  hideMeta?: boolean;
}) => {
  return (
    <div
      className={cn(
        'mb-8 flex flex-col items-start justify-between gap-4 border-b-2 border-gray-100 pb-8 md:flex-row',
        hideMeta && 'mb-4 border-none',
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex items-center">
          <img
            src="https://i.ibb.co/WWxYzvmx/pbs-logo.png"
            alt="Business School Logo"
            className="h-24 object-contain md:h-48"
            crossOrigin="anonymous"
          />
        </div>
      </div>

      {!hideMeta && (
        <div className="grid w-full max-w-xl grid-cols-1 gap-x-12 gap-y-2 text-sm sm:grid-cols-2">
          <div className="col-span-1 flex flex-col border-b border-gray-200 sm:col-span-2">
            <span className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase">
              Module
            </span>
            <span className="font-semibold text-black">Strategic Development Project (SDP)</span>
          </div>
          <div className="flex flex-col border-b border-gray-200">
            <span className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase">
              Cohort
            </span>
            <span className="font-semibold text-black">MA27</span>
          </div>
          <div className="flex flex-col border-b border-gray-200">
            <span className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase">
              Date
            </span>
            <span className="font-semibold text-black">05 - 06 June 2026</span>
          </div>
          <div className="col-span-2 flex flex-col border-b border-gray-200">
            <span className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase">
              Company Name
            </span>
            <input
              className="w-full border-b border-dashed border-gray-300 bg-transparent font-semibold text-gray-700 outline-hidden"
              placeholder="Enter company name..."
              type="text"
              value={meta.companyName}
              onChange={(e) => setMeta({ ...meta, companyName: e.target.value })}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const AccessPage = ({
  onSelectGroup,
}: {
  onSelectGroup: (group: string) => void;
}) => {
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans selection:bg-blue-50 lg:flex-row">
      <div className="flex w-full flex-col justify-center border-b border-slate-100 bg-slate-50/50 p-8 md:p-16 lg:w-[45%] lg:border-r lg:border-b-0 lg:p-24">
        <div className="animate-in fade-in slide-in-from-left-4 flex flex-col items-start gap-12 duration-1000 lg:gap-20">
          <img
            alt="SDP Suite Logo"
            className="h-56 w-56 object-contain md:h-72 md:w-72"
            src="https://i.ibb.co/WWxYzvmx/pbs-logo.png"
          />
          <div className="space-y-6">
            <h1 className="text-4xl leading-[1.1] font-black tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
              Strategic Suite <br /> Access
            </h1>
            <div className="h-2 w-20 rounded-full bg-blue-600"></div>
          </div>
        </div>
        <div className="mt-16 opacity-60 lg:mt-32">
          <p className="text-[10px] font-black tracking-widest text-slate-900 uppercase">
            © Africa Campus – École des Ponts Business School
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-center bg-white p-8 md:p-16 lg:p-24">
        <div className="animate-in fade-in slide-in-from-right-4 mx-auto w-full max-w-[440px] space-y-12 delay-200 duration-1000">
          <div className="space-y-4 text-left">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 uppercase md:text-4xl">
              Workspace Access
            </h2>
            <p className="text-lg leading-relaxed font-medium text-slate-400">
              Initialize your team assignment.
            </p>
          </div>
          <div className="w-full">
            <div className="space-y-6">
              <div className="mb-8 space-y-3">
                <label className="block pl-1 text-[11px] font-black tracking-[0.2em] text-slate-900 uppercase">
                  Assigned Group
                </label>
                <div className="group relative">
                  <select
                    className="w-full cursor-pointer appearance-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-5 text-base font-bold text-slate-800 transition-all outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-50/50"
                    value={selectedValue}
                    onChange={(e) => setSelectedValue(e.target.value)}
                  >
                    <option value="">Choose your team...</option>
                    {Array.from({ length: 11 }, (_, i) => (
                      <option key={i + 1} value={`Group ${i + 1}`}>
                        Group {i + 1}
                      </option>
                    ))}
                  </select>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-down pointer-events-none absolute top-1/2 right-5 -translate-y-1/2 text-slate-300 transition-colors group-hover:text-slate-600"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                </div>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => selectedValue && onSelectGroup(selectedValue)}
                  disabled={!selectedValue}
                  className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl py-5 text-xs font-black tracking-[0.2em] uppercase transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 bg-slate-900 text-white hover:bg-black shadow-xl shadow-slate-200 hover:shadow-slate-300"
                >
                  Enter Workspace
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-right"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(() => {
    return localStorage.getItem('sdp_selected_group');
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (selectedGroup) {
      localStorage.setItem('sdp_selected_group', selectedGroup);
    } else {
      localStorage.removeItem('sdp_selected_group');
    }
  }, [selectedGroup]);

  return (
    <ErrorBoundary>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/access"
            element={
              <AccessPage
                onSelectGroup={(group) => {
                  setSelectedGroup(group);
                  navigate('/workspace');
                }}
              />
            }
          />
          <Route
            path="/workspace"
            element={
              selectedGroup ? (
                <AppContent />
              ) : (
                <Navigate to="/access" replace />
              )
            }
          />
          <Route path="*" element={<Navigate to={selectedGroup ? "/workspace" : "/access"} replace />} />
        </Routes>
      </AnimatePresence>
    </ErrorBoundary>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'PESTEL' | 'McKinsey' | 'VRIO' | 'TOWS' | 'PORTER'>(
    () => {
      const saved = localStorage.getItem(`sdp_tab`);
      const validTabs = ['PESTEL', 'McKinsey', 'VRIO', 'TOWS', 'PORTER'];
      return (validTabs.includes(saved || '') ? saved : 'PESTEL') as
        | 'PESTEL'
        | 'McKinsey'
        | 'VRIO'
        | 'TOWS'
        | 'PORTER';
    },
  );

  useEffect(() => {
    localStorage.setItem(`sdp_tab`, activeTab);
  }, [activeTab]);

  const [activeForce, setActiveForce] = useState<keyof PortersFiveForcesData>('suppliers');
  const [isExporting, setIsExporting] = useState(false);
  const [isExportingAll, setIsExportingAll] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Core Worksheet State
  const [pestelData, setPestelData] = useState<PESTELData[]>([]);
  const [mckinseyData, setMckinseyData] = useState<McKinsey7SData>({});
  const [vrioAnalysisData, setVrioAnalysisData] = useState<VRIORow[]>([]);
  const [vrioNotes, setVrioNotes] = useState('');
  const [towsData, setTowsData] = useState<TOWSRow[]>([]);
  const [portersData, setPortersData] = useState<PorterRow[]>([]);
  const [meta, setMeta] = useState<MetaData>({
    module: '',
    cohort: '',
    date: '',
    companyName: '',
  });

  const [isInitialized, setIsInitialized] = useState(false);

  // Initial Load from LocalStorage
  useEffect(() => {
    const loadData = () => {
      const saved = localStorage.getItem(`sdp_data_local`);
      if (saved) {
        try {
          const local = JSON.parse(saved);
          if (local.pestel) setPestelData(local.pestel);
          if (local.mckinsey) setMckinseyData(local.mckinsey);
          if (local.vrio) setVrioAnalysisData(local.vrio);
          if (local.vrioNotes) setVrioNotes(local.vrioNotes || '');
          if (local.tows) setTowsData(local.tows);
          if (local.porters) setPortersData(local.porters);
          if (local.meta) setMeta(local.meta);
        } catch (e) {
          console.error('Failed to parse local data', e);
        }
      } else {
        // Initialize defaults
        setPestelData(['Political', 'Economic', 'Social', 'Technological', 'Environmental', 'Legal'].map((cat) => ({
          id: cat,
          category: cat as PESTELData['category'],
          description: '',
          impact: '',
          probability: '',
          potential: '',
        })));
        setVrioAnalysisData(Array.from({ length: 8 }, (_, i) => ({
          id: `res-${i}`,
          resource: '',
          type: '',
          detail: '',
          v: '',
          r: '',
          i: '',
          o: '',
        })));
        setTowsData([
          { id: 'opportunities', section: 'opportunities', data: ['', '', ''], scores: {}, notes: {} },
          { id: 'threats', section: 'threats', data: ['', '', ''], scores: {}, notes: {} },
          { id: 'strengths', section: 'strengths', data: ['', '', ''], scores: {}, notes: {} },
          { id: 'weaknesses', section: 'weaknesses', data: ['', '', ''], scores: {}, notes: {} }
        ]);
        setPortersData([
          { id: 'newEntrants', force: 'newEntrants', analysis: '', impact: 'Medium', scorecard: {}, further: Array.from({ length: 3 }, () => ({ col1: '', col2: '', col3: '' })) },
          { id: 'buyers', force: 'buyers', analysis: '', impact: 'Medium', scorecard: {}, further: Array.from({ length: 5 }, () => ({ col1: '', col2: '', col3: '' })) },
          { id: 'suppliers', force: 'suppliers', analysis: '', impact: 'Medium', scorecard: {}, further: Array.from({ length: 3 }, () => ({ col1: '', col2: '', col3: '' })) },
          { id: 'substitutes', force: 'substitutes', analysis: '', impact: 'Medium', scorecard: {}, further: Array.from({ length: 3 }, () => ({ col1: '', col2: '', col3: '' })) },
          { id: 'rivalry', force: 'rivalry', analysis: '', impact: 'Medium', scorecard: {}, further: Array.from({ length: 3 }, () => ({ col1: '', col2: '', col3: '' })) }
        ]);
      }
      setIsInitialized(true);
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Auto-save to LocalStorage
  useEffect(() => {
    if (isLoading || !isInitialized) return;

    localStorage.setItem(`sdp_data_local`, JSON.stringify({
      pestel: pestelData,
      mckinsey: mckinseyData,
      vrio: vrioAnalysisData,
      vrioNotes,
      tows: towsData,
      porters: portersData,
      meta,
    }));
    setLastSaved(new Date());
  }, [
    pestelData,
    mckinseyData,
    vrioAnalysisData,
    vrioNotes,
    towsData,
    portersData,
    meta,
    isLoading,
    isInitialized,
  ]);

  const forceSave = () => {}; 


  const exportPDF = async () => {
    setIsExporting(true);
    try {
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      const printRef = document.getElementById('full-report-print-container');
      if (!printRef) throw new Error('Print container not found');
      const originalPrintDisplay = printRef.style.display;
      printRef.style.display = 'block';

      if (activeTab === 'PORTER') {
        const forces = ['suppliers', 'buyers', 'newEntrants', 'substitutes', 'rivalry'] as const;
        let isFirstPage = true;
        for (const force of forces) {
          const section = Array.from(printRef.querySelectorAll('.print-section')).find((s) =>
            s
              .querySelector('h2')
              ?.textContent?.toUpperCase()
              .includes(`PORTER'S 5 FORCES: ${force.toUpperCase()}`),
          ) as HTMLElement;
          if (section) {
            section.style.display = 'block';
            const imgData = await toJpeg(section, {
              quality: 0.95,
              pixelRatio: 2,
              backgroundColor: '#ffffff',
              cacheBust: true,
            });
            if (!isFirstPage) pdf.addPage();
            isFirstPage = false;
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const imgProps = pdf.getImageProperties(imgData);
            const imgRatio = imgProps.width / imgProps.height;
            const pageRatio = pageWidth / pageHeight;
            let finalWidth, finalHeight;
            if (imgRatio > pageRatio) {
              finalWidth = pageWidth;
              finalHeight = pageWidth / imgRatio;
            } else {
              finalHeight = pageHeight;
              finalWidth = pageHeight * imgRatio;
            }
            const x = (pageWidth - finalWidth) / 2;
            const y = (pageHeight - finalHeight) / 2;
            pdf.addImage(imgData, 'JPEG', x, y, finalWidth, finalHeight);
            section.style.display = 'none';
          }
        }
        pdf.save(`Porters_Five_Forces_Full_${meta.companyName || 'Export'}.pdf`);
      } else {
        const section = Array.from(printRef.querySelectorAll('.print-section')).find((s) => {
          const h2Text = s.querySelector('h2')?.textContent?.toUpperCase() || '';
          if (activeTab === 'PESTEL') return h2Text.includes('PESTEL ANALYSIS');
          if (activeTab === 'McKinsey') return h2Text.includes('MCKINSEY 7-S FRAMEWORK');
          if (activeTab === 'VRIO') return h2Text.includes('VRIO FRAMEWORK');
          if (activeTab === 'TOWS') return h2Text.includes('CONFRONTATION MATRIX');
          return false;
        }) as HTMLElement;

        if (section) {
          section.style.display = 'block';
          const imgData = await toPng(section, {
            quality: 1.0,
            pixelRatio: 2,
            backgroundColor: '#ffffff',
            cacheBust: true,
          });
          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();
          const imgProps = pdf.getImageProperties(imgData);
          const imgRatio = imgProps.width / imgProps.height;
          const pageRatio = pageWidth / pageHeight;
          let finalWidth, finalHeight;
          if (imgRatio > pageRatio) {
            finalWidth = pageWidth;
            finalHeight = pageWidth / imgRatio;
          } else {
            finalHeight = pageHeight;
            finalWidth = pageHeight * imgRatio;
          }
          const x = (pageWidth - finalWidth) / 2;
          const y = (pageHeight - finalHeight) / 2;
          pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);
          pdf.save(`${activeTab}_Worksheet_${meta.companyName || 'Export'}.pdf`);
          section.style.display = 'none';
        }
      }
      printRef.style.display = originalPrintDisplay;
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportAllPDF = async () => {
    setIsExporting(true);
    setIsExportingAll(true);
    try {
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      const printRef = document.getElementById('full-report-print-container');
      if (!printRef) throw new Error('Print container not found');
      const originalPrintDisplay = printRef.style.display;
      printRef.style.display = 'block';
      const sections = printRef.querySelectorAll('.print-section');
      let isFirstPage = true;
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i] as HTMLElement;
        section.style.display = 'block';
        const imgData = await toJpeg(section, {
          quality: 0.92,
          pixelRatio: 2,
          backgroundColor: '#ffffff',
          cacheBust: true,
        });
        if (!isFirstPage) pdf.addPage();
        isFirstPage = false;
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgProps = pdf.getImageProperties(imgData);
        const imgRatio = imgProps.width / imgProps.height;
        const pageRatio = pageWidth / pageHeight;
        let finalWidth, finalHeight;
        if (imgRatio > pageRatio) {
          finalWidth = pageWidth;
          finalHeight = pageWidth / imgRatio;
        } else {
          finalHeight = pageHeight;
          finalWidth = pageHeight * imgRatio;
        }
        const x = (pageWidth - finalWidth) / 2;
        const y = (pageHeight - finalHeight) / 2;
        pdf.addImage(imgData, 'JPEG', x, y, finalWidth, finalHeight);
        section.style.display = 'none';
      }
      pdf.save(`Full_Strategy_Report_${meta.companyName || 'Export'}.pdf`);
      printRef.style.display = originalPrintDisplay;
    } catch (error) {
      console.error('Export all failed:', error);
    } finally {
      setIsExporting(false);
      setIsExportingAll(false);
    }
  };

  const clearData = () => {
    if (confirm('Clear all data for this worksheet?')) {
      if (activeTab === 'PESTEL') {
        setPestelData(
          ['Political', 'Economic', 'Social', 'Technological', 'Environmental', 'Legal'].map(
            (cat) => ({
              id: cat,
              category: cat as PESTELData['category'],
              description: '',
              impact: '',
              probability: '',
              potential: '',
            }),
          ),
        );
      } else if (activeTab === 'McKinsey') {
        setMckinseyData({});
      } else if (activeTab === 'VRIO') {
        setVrioAnalysisData(
          Array.from({ length: 8 }, (_, i) => ({
            id: `res-${i}`,
            resource: '',
            type: '',
            detail: '',
            v: '',
            r: '',
            i: '',
            o: '',
          })),
        );
        setVrioNotes('');
      } else if (activeTab === 'TOWS') {
        setTowsData([
          {
            id: 'opportunities',
            section: 'opportunities',
            data: Array(3).fill(''),
            scores: {},
            notes: {},
          },
          { id: 'threats', section: 'threats', data: Array(3).fill(''), scores: {}, notes: {} },
          { id: 'strengths', section: 'strengths', data: Array(3).fill(''), scores: {}, notes: {} },
          {
            id: 'weaknesses',
            section: 'weaknesses',
            data: Array(3).fill(''),
            scores: {},
            notes: {},
          },
        ]);
      } else if (activeTab === 'PORTER') {
        setPortersData([
          {
            id: 'newEntrants',
            force: 'newEntrants',
            analysis: '',
            impact: 'Medium',
            scorecard: {},
            further: Array.from({ length: 3 }, () => ({ col1: '', col2: '', col3: '' })),
          },
          {
            id: 'buyers',
            force: 'buyers',
            analysis: '',
            impact: 'Medium',
            scorecard: {},
            further: Array.from({ length: 5 }, () => ({ col1: '', col2: '', col3: '' })),
          },
          {
            id: 'suppliers',
            force: 'suppliers',
            analysis: '',
            impact: 'Medium',
            scorecard: {},
            further: Array.from({ length: 5 }, () => ({ col1: '', col2: '', col3: '' })),
          },
          {
            id: 'substitutes',
            force: 'substitutes',
            analysis: '',
            impact: 'Medium',
            scorecard: {},
            further: Array.from({ length: 5 }, () => ({ col1: '', col2: '', col3: '' })),
          },
          {
            id: 'rivalry',
            force: 'rivalry',
            analysis: '',
            impact: 'Medium',
            scorecard: {},
            further: Array.from({ length: 8 }, () => ({ col1: '', col2: '', col3: '', col4: '' })),
          },
        ]);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="space-y-4 text-center">
          <div className="border-brand-blue mx-auto h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
          <p className="text-xs font-bold tracking-widest text-gray-900 uppercase">
            Loading Strategy Workspace...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="selection:bg-brand-blue/10 min-h-screen bg-gray-50/50 p-2 font-sans md:p-8">
      <div className="mx-auto flex min-h-[90vh] max-w-[1400px] flex-col overflow-hidden rounded-[20px] border border-gray-100 bg-white shadow-2xl shadow-gray-200/50 md:rounded-[32px]">
        <div className="flex flex-col items-center justify-between gap-4 border-b border-gray-100 bg-white p-4 md:flex-row md:p-6">
          <div className="flex w-full items-center justify-between gap-4 md:w-auto md:justify-start">
            <img
              src="https://i.ibb.co/WWxYzvmx/pbs-logo.png"
              alt="SDP Suite Logo"
              className="h-24 w-auto object-contain md:h-48"
              crossOrigin="anonymous"
            />
            <div className="mx-2 hidden h-8 w-px bg-gray-100 md:block" />
            <div className="flex items-center gap-3">
              {lastSaved && (
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-2 py-1 text-[9px] font-black tracking-tighter text-blue-600 uppercase">
                    Auto-Saved Locally
                  </div>
                  <span className="mt-0.5 ml-1 text-[8px] font-bold text-gray-400">
                    {lastSaved.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex w-full items-center justify-end gap-2 md:w-auto md:gap-3">
            <div className="flex items-center gap-0.5 md:gap-1">
              <button
                onClick={() => navigate('/access')}
                className="flex cursor-pointer items-center gap-2 rounded-xl px-2 py-2 text-[9px] font-extrabold tracking-[0.1em] text-gray-500 uppercase transition-all hover:text-blue-600 md:px-4 md:text-[10px] md:tracking-[0.2em]"
                title="Exit to access page"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Exit</span>
              </button>
              <button
                onClick={clearData}
                className="cursor-pointer p-1 text-gray-400 transition-all hover:text-red-500 md:p-2"
                title="Clear current worksheet"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <button
                onClick={exportPDF}
                disabled={isExporting}
                className="flex cursor-pointer items-center gap-2 rounded-xl bg-gray-900 px-3 py-2 text-[9px] font-extrabold tracking-[0.1em] text-white uppercase shadow-md shadow-black/10 transition-all hover:bg-black disabled:opacity-50 md:px-4 md:text-[10px] md:tracking-[0.2em]"
              >
                {isExporting && !isExportingAll ? (
                  <div className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <FileText size={16} />
                )}
                <span className="hidden sm:inline">Page PDF</span>
                <span className="sm:hidden">PDF</span>
              </button>
              <button
                onClick={exportAllPDF}
                disabled={isExportingAll}
                className="flex cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-[9px] font-extrabold tracking-[0.1em] text-white uppercase shadow-md shadow-blue-600/10 transition-all hover:bg-blue-700 disabled:opacity-50 md:px-5 md:text-[10px] md:tracking-[0.2em]"
              >
                {isExportingAll ? (
                  <span className="flex items-center gap-2">
                    <div className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    <span className="hidden sm:inline">Generating...</span>
                  </span>
                ) : (
                  <>
                    <BookOpen size={16} />
                    <span className="hidden sm:inline">Full Report</span>
                    <span className="sm:hidden">Full</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-2 md:p-4">
          <div className="no-scrollbar flex max-w-full overflow-x-auto rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
            <button
              onClick={() => setActiveTab('PESTEL')}
              className={cn(
                'flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all md:px-6',
                activeTab === 'PESTEL'
                  ? 'bg-brand-blue text-white shadow-md'
                  : 'bg-transparent text-gray-500 hover:text-gray-800',
              )}
            >
              <FileText size={18} /> PESTEL Analysis
            </button>
            <button
              onClick={() => setActiveTab('McKinsey')}
              className={cn(
                'flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all md:px-6',
                activeTab === 'McKinsey'
                  ? 'bg-brand-peach text-gray-900 shadow-md'
                  : 'bg-transparent text-gray-500 hover:text-gray-800',
              )}
            >
              <Settings2 size={18} /> McKinsey 7-S
            </button>
            <button
              onClick={() => setActiveTab('VRIO')}
              className={cn(
                'flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all md:px-6',
                activeTab === 'VRIO'
                  ? 'bg-[#1f2937] text-white shadow-md'
                  : 'bg-transparent text-gray-500 hover:text-gray-800',
              )}
            >
              <FileText size={18} /> VRIO Framework
            </button>
            <button
              onClick={() => setActiveTab('TOWS')}
              className={cn(
                'flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all md:px-6',
                activeTab === 'TOWS'
                  ? 'bg-yellow-200 text-gray-900 shadow-md'
                  : 'bg-transparent text-gray-500 hover:text-gray-800',
              )}
            >
              <Network size={18} /> Confrontation Matrix
            </button>
            <button
              onClick={() => setActiveTab('PORTER')}
              className={cn(
                'flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all md:px-6',
                activeTab === 'PORTER'
                  ? 'bg-[#4f39f6] text-white shadow-md'
                  : 'bg-transparent text-gray-500 hover:text-gray-800',
              )}
            >
              <Files size={18} /> Porter's 5 Forces
            </button>
          </div>
        </div>

        <div className="relative flex-1 overflow-y-auto bg-white p-4 md:p-8 lg:p-12">
          <div className="mx-auto max-w-6xl">
            <div
              ref={containerRef}
              className="worksheet-container relative overflow-hidden bg-white"
            >
              <CorporateHeader
                meta={meta}
                setMeta={setMeta}
              />
              {activeTab === 'TOWS' && <ConfrontationMatrixGuide />}
              <div className="mb-12">
                <div className="flex items-end justify-between border-b-2 border-gray-50 pb-6">
                  <h2
                    className={cn(
                      'inline-block text-4xl font-black tracking-tighter text-gray-900 uppercase',
                      activeTab === 'VRIO'
                        ? 'border-b-[12px] border-black pb-2'
                        : activeTab === 'TOWS'
                          ? 'border-b-[12px] border-[#FFD666] pb-2'
                          : activeTab === 'PORTER'
                            ? 'border-b-[12px] border-indigo-600 pb-2'
                            : '',
                    )}
                  >
                    {activeTab === 'PESTEL'
                      ? 'PESTEL Analysis'
                      : activeTab === 'McKinsey'
                        ? 'McKinsey 7-S Framework'
                        : activeTab === 'VRIO'
                          ? 'VRIO Framework'
                          : activeTab === 'TOWS'
                            ? 'Confrontation Matrix'
                            : "Porter's Five Forces"}
                  </h2>
                  <div className="rounded-full bg-gray-50 px-3 py-1 font-sans text-[10px] font-bold tracking-widest text-gray-400">
                    FRAMEWORK_ID:{' '}
                    {activeTab === 'PESTEL'
                      ? 'ENV_MACRO_01'
                      : activeTab === 'McKinsey'
                        ? 'ORG_ALIG_02'
                        : activeTab === 'VRIO'
                          ? 'COMP_ADV_03'
                          : activeTab === 'TOWS'
                            ? 'STRAT_MAT_04'
                            : 'IND_COMP_05'}
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  {activeTab === 'PESTEL' ? (
                    <PESTELWorksheet data={pestelData} setData={setPestelData} />
                  ) : activeTab === 'McKinsey' ? (
                    <McKinseyWorksheet data={mckinseyData} setData={setMckinseyData} />
                  ) : activeTab === 'VRIO' ? (
                    <div className="space-y-12">
                      <VRIOFramework />
                      <VRIOAnalysisTable
                        data={vrioAnalysisData}
                        setData={setVrioAnalysisData}
                        notes={vrioNotes}
                        setNotes={setVrioNotes}
                      />
                    </div>
                  ) : activeTab === 'TOWS' ? (
                    <div className="space-y-12">
                      <TOWSWorksheet data={towsData} setData={setTowsData} />
                    </div>
                  ) : (
                    <PortersFiveForces
                      data={portersData}
                      setData={setPortersData}
                      activeForce={activeForce}
                      setActiveForce={setActiveForce}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <div id="full-report-print-container" className="hidden" aria-hidden="true">
        <div className="print-section w-[297mm] bg-white p-12">
          <CorporateHeader
            meta={meta}
            setMeta={setMeta}
          />
          <h2 className="mb-8 border-b-8 border-gray-100 pb-2 text-4xl font-bold tracking-tight text-gray-900 uppercase">
            PESTEL Analysis
          </h2>
          <PESTELWorksheet data={pestelData} setData={() => {}} />
        </div>
        <div className="print-section w-[297mm] bg-white p-12">
          <CorporateHeader
            meta={meta}
            setMeta={setMeta}
          />
          <h2 className="mb-8 border-b-8 border-gray-100 pb-2 text-4xl font-bold tracking-tight text-gray-900 uppercase">
            McKinsey 7-S Framework
          </h2>
          <McKinseyWorksheet data={mckinseyData} setData={() => {}} />
        </div>
        <div className="print-section w-[297mm] bg-white p-12">
          <CorporateHeader
            meta={meta}
            setMeta={setMeta}
          />
          <h2 className="mb-8 border-b-8 border-gray-100 pb-2 text-4xl font-bold tracking-tight text-gray-900 uppercase">
            VRIO Framework
          </h2>
          <VRIOFramework />
          <div className="mt-8">
            <VRIOAnalysisTable
              data={vrioAnalysisData}
              setData={() => {}}
              notes={vrioNotes}
              setNotes={() => {}}
            />
          </div>
        </div>
        {(['suppliers', 'buyers', 'newEntrants', 'substitutes', 'rivalry'] as const).map(
          (force) => (
            <div key={force} className="print-section w-[297mm] bg-white p-12">
              <CorporateHeader
                meta={meta}
                setMeta={setMeta}
              />
              <h2 className="mb-8 border-b-8 border-indigo-600 pb-2 text-4xl font-bold tracking-tight text-gray-900 uppercase">
                Porter's 5 Forces: {force.toUpperCase()}
              </h2>
              <PortersFiveForces
                data={portersData}
                setData={() => {}}
                activeForce={force}
                setActiveForce={() => {}}
              />
            </div>
          ),
        )}
        <div className="print-section w-[297mm] bg-white p-12">
          <CorporateHeader
            meta={meta}
            setMeta={setMeta}
          />
          <ConfrontationMatrixGuide />
          <div className="mt-8">
            <h2 className="mb-8 border-b-[12px] border-[#FFD666] pb-2 text-4xl font-bold tracking-tight text-gray-900 uppercase">
              Confrontation Matrix
            </h2>
            <TOWSWorksheet data={towsData} setData={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
}
