"use client";

import React, { useState, useEffect, useCallback } from 'react';
import {
  LiveKitRoom,
  RoomAudioRenderer,
  LayoutContextProvider,
  useTracks,
  useLocalParticipant,
  BarVisualizer,
  VideoTrack,
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import { getInterview, completeInterview, Interview } from '@/lib/api';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  LogOut, 
  User, 
  Sparkles, 
  ShieldAlert,
  Terminal,
  Activity,
  PhoneOff
} from 'lucide-react';
import Image from 'next/image';

import '@livekit/components-styles';

const TOKEN_SERVER = process.env.NEXT_PUBLIC_TOKEN_SERVER_URL || 'http://localhost:8000';
const LIVEKIT_URL = process.env.NEXT_PUBLIC_LIVEKIT_URL || '';

export default function InterviewClient() {
  const [token, setToken] = useState<string | null>(null);
  const [url, setUrl] = useState(LIVEKIT_URL);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [joined, setJoined] = useState(false);
  const [interviewInfo, setInterviewInfo] = useState<Interview | null>(null);

  useEffect(() => {
    const initSession = async () => {
      try {
        const interviewId = localStorage.getItem('currentInterviewId');
        let interviewData: Record<string, any> = {};
        let agentName = 'Sarah';

        if (interviewId) {
          console.log(`📋 Fetching interview #${interviewId} details...`);
          try {
            const interview = await getInterview(interviewId);
            console.log('📋 Interview details:', interview);
            setInterviewInfo(interview);

            // Extract questions from qa_pairs
            const questions = (interview.qa_pairs || [])
              .sort((a, b) => (a.order || 0) - (b.order || 0))
              .map(qa => {
                if (typeof qa.question === 'object' && qa.question !== null) {
                  return qa.question.text;
                }
                return qa.question;
              })
              .filter(Boolean);

            agentName = interview.agent?.name || 'Sarah';

            interviewData = {
              job_description: interview.job_description || '',
              questions: questions,
              number_of_questions: interview.number_of_questions || 5,
              agent_name: agentName,
              agent_prompt: interview.agent?.prompt || '',
            };

            console.log(`📋 Sending ${questions.length} questions to agent:`, questions);
          } catch (err) {
            console.warn('⚠️ Could not fetch interview details, using defaults:', err);
          }
        }

        // Request token from token server
        const roomName = `interview-${interviewId || Date.now()}`;
        const res = await fetch(`${TOKEN_SERVER}/token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            room: roomName,
            interview_data: interviewData,
          }),
        });

        if (!res.ok) throw new Error(`Token server responded with ${res.status}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);

        setToken(data.token);
        if (data.url) setUrl(data.url);
        console.log(`✅ Token received for room: ${data.room}`);
      } catch (err: any) {
        console.error('Token fetch failed:', err);
        setError(err.message || 'Failed to request token from token server.');
      } finally {
        setLoading(false);
      }
    };
    initSession();
  }, []);

  const handleJoin = useCallback(() => {
    setJoined(true);
  }, []);

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white gap-6">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-zinc-800 border-t-blue-500 animate-spin" />
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest animate-pulse">Preparing your session…</span>
        </div>
      </div>
    );
  }

  // ── Error state ────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white p-6 selection:bg-stone-500/50">
        <div className="max-w-md w-full p-8 rounded-3xl border border-rose-500/10 bg-zinc-950/80 backdrop-blur-xl text-center shadow-2xl relative">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold mb-2 text-rose-500">Could not connect</h2>
          <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
            Failed to reach the token server at <code className="text-blue-400 font-bold">{TOKEN_SERVER}</code>.<br />
            Make sure <code className="text-zinc-200">token_server.py</code> is running.
          </p>
          <p className="text-xs text-zinc-500 font-mono bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 mb-6 text-left break-all">{error}</p>
          <button
            onClick={() => { setLoading(true); setError(null); window.location.reload(); }}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/10 cursor-pointer"
          >
            Retry Connection
          </button>
          <div className="mt-6 text-[10px] text-zinc-600 uppercase tracking-widest font-bold">
            Run: <code>python agent/token_server.py</code>
          </div>
        </div>
      </div>
    );
  }

  // ── Pre-lobby: Autoplay gesture ──────────────────────────────────────────
  if (!joined) {
    const agentName = interviewInfo?.agent?.name || 'Sarah';
    const jobDesc = interviewInfo?.job_description;
    const questionCount = interviewInfo?.number_of_questions || interviewInfo?.qa_pairs?.length;

    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white p-6 selection:bg-stone-500/50">
        <div className="max-w-md w-full text-center bg-zinc-950/80 border border-zinc-900 rounded-3xl p-8 shadow-2xl backdrop-blur-xl flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Ready to start?</h1>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
            Your technical interview session is prepared with AI Agent <strong>{agentName}</strong>.
          </p>
          {jobDesc && (
            <div className="text-left w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4 mb-6 text-xs text-zinc-400 leading-relaxed font-medium">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Target Position</p>
              <p className="line-clamp-3">{jobDesc}</p>
            </div>
          )}
          {questionCount && (
            <p className="text-xs text-zinc-500 font-bold mb-6 uppercase tracking-wider">{questionCount} interview questions queued</p>
          )}

          <button
            onClick={handleJoin}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white text-base font-bold rounded-xl transition-all shadow-lg shadow-blue-500/10 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
          >
            Join Interview Session
          </button>

          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-zinc-500 font-bold uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
              <Mic className="w-4 h-4" />
              Mic Checked
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-800"></div>
            <div className="flex items-center gap-1.5">
              <Video className="w-4 h-4" />
              Cam Checked
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Main LiveKit Room ───────────────────────────────────────────────────
  const agentDisplayName = interviewInfo?.agent?.name || 'Sarah';

  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token ?? undefined}
      serverUrl={url ?? undefined}
      connectOptions={{ autoSubscribe: true }}
      data-lk-theme="default"
      className="!h-screen !max-h-screen bg-black flex flex-col overflow-hidden text-white font-sans"
      style={{ height: '100vh', maxHeight: '100vh' }}
    >
      <LayoutContextProvider>
        {/* Header */}
        <header className="h-16 shrink-0 px-6 border-b border-zinc-900 flex items-center justify-between bg-zinc-950/80 sticky top-0 z-10 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 flex items-center justify-center overflow-hidden">
                <Image src="/images/square-logo.png" width={24} height={24} alt="logo" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">Prepl</span>
            </div>
            <div className="h-4 w-px bg-zinc-800"></div>
            <span className="text-zinc-400 text-xs font-bold tracking-wider uppercase">Autonomous Interview Sandbox</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Connected</span>
            </div>
            <button
              onClick={async () => {
                const interviewId = localStorage.getItem('currentInterviewId');
                if (interviewId) {
                  try {
                    await completeInterview(interviewId);
                    console.log('✅ Interview completed on backend');
                  } catch (err) {
                    console.warn('⚠️ Could not mark interview complete:', err);
                  }
                  localStorage.removeItem('currentInterviewId');
                }
                window.close();
              }}
              className="flex items-center gap-2 text-zinc-500 hover:text-rose-400 transition-colors border border-transparent hover:border-rose-500/10 rounded-xl px-3 py-1.5 hover:bg-rose-500/5 cursor-pointer font-bold uppercase tracking-wider text-xs"
            >
              <PhoneOff className="w-4 h-4" />
              <span>End Screener</span>
            </button>
          </div>
        </header>

        {/* Video Workspace */}
        <main className="flex-1 flex flex-col md:flex-row overflow-hidden p-6 gap-6 min-h-0 relative z-10">
          {/* Candidate feed */}
          <section className="flex-1 relative rounded-2xl overflow-hidden bg-zinc-900/40 border border-zinc-800/80 shadow-2xl group flex items-center justify-center">
            <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-zinc-950/80 backdrop-blur-md rounded-lg border border-zinc-800 flex items-center gap-2 font-bold uppercase tracking-wider text-[10px] text-zinc-400">
              <User className="w-3.5 h-3.5 text-blue-400" />
              <span>Candidate Feed</span>
            </div>

            <div className="h-full w-full flex items-center justify-center bg-zinc-950/20">
              <MyVideoRenderer />
            </div>

            {/* Mic/Cam Controls */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-20">
              <MicCamControls />
            </div>
          </section>

          {/* AI Agent feed */}
          <section className="flex-1 relative rounded-2xl overflow-hidden bg-zinc-900/40 border border-zinc-800/80 shadow-2xl flex flex-col items-center justify-center">
            <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-zinc-950/80 backdrop-blur-md rounded-lg border border-zinc-800 flex items-center gap-2 font-bold uppercase tracking-wider text-[10px] text-zinc-400">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>{agentDisplayName} (Agent)</span>
            </div>

            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center relative z-[1]">
              <AgentVisualizer />

              <div className="mt-8 max-w-sm">
                <h3 className="text-xl font-bold text-white mb-2">{agentDisplayName}</h3>
                <div className="h-0.5 w-8 bg-blue-500 mx-auto mb-3 rounded-full"></div>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider leading-relaxed">
                  Autonomous Evaluator
                </p>
              </div>
            </div>

            {/* Radial glow background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_70%)] pointer-events-none"></div>
          </section>
        </main>

        <RoomAudioRenderer />
      </LayoutContextProvider>
    </LiveKitRoom>
  );
}

const MyVideoRenderer = () => {
  const tracks = useTracks(
    [Track.Source.Camera],
    { onlySubscribed: false },
  );

  const localTrack = tracks.find(t => t.participant.isLocal);

  if (!localTrack) {
    return <div className="text-zinc-600 font-bold text-xs uppercase tracking-wider animate-pulse">Initializing webcam...</div>;
  }

  return (
    <VideoTrack
      trackRef={localTrack}
      className="w-full h-full object-cover"
    />
  );
};

const AgentVisualizer = () => {
  const tracks = useTracks(
    [Track.Source.Microphone],
    { onlySubscribed: true },
  );

  const agentTrack = tracks.find(t => !t.participant.isLocal);

  return (
    <div className="relative w-56 h-56 flex items-center justify-center">
      <div className="absolute inset-0 bg-blue-600/5 blur-[80px] rounded-full animate-pulse"></div>
      <div className="absolute inset-0 border border-zinc-800 rounded-full"></div>
      <div className="w-40 h-40 rounded-full bg-zinc-950 border border-zinc-900 flex items-center justify-center overflow-hidden shadow-inner">
        {agentTrack ? (
          <BarVisualizer
            trackRef={agentTrack}
            barCount={24}
            className="w-full h-full p-6 text-blue-500"
          />
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-zinc-850 border-t-blue-500 animate-spin"></div>
            <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Awaiting Audio</span>
          </div>
        )}
      </div>
    </div>
  );
};

const MicCamControls = () => {
  const { isMicrophoneEnabled, isCameraEnabled, localParticipant } = useLocalParticipant();

  return (
    <div className="flex gap-3 bg-zinc-950/90 border border-zinc-800 rounded-full px-4 py-2 shadow-2xl backdrop-blur-md">
      <button
        onClick={() => localParticipant.setMicrophoneEnabled(!isMicrophoneEnabled)}
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer border ${
          isMicrophoneEnabled 
            ? 'bg-zinc-900 border-zinc-850 text-zinc-400 hover:text-white' 
            : 'bg-rose-650 border-transparent text-white hover:bg-rose-700'
        }`}
      >
        {isMicrophoneEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
      </button>
      <button
        onClick={() => localParticipant.setCameraEnabled(!isCameraEnabled)}
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer border ${
          isCameraEnabled 
            ? 'bg-zinc-900 border-zinc-850 text-zinc-400 hover:text-white' 
            : 'bg-rose-650 border-transparent text-white hover:bg-rose-700'
        }`}
      >
        {isCameraEnabled ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
      </button>
    </div>
  );
};
