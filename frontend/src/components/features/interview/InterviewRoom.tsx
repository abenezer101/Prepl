"use client";

import React, { useState, useEffect, useCallback } from 'react';
import {
  LiveKitRoom,
  useLocalParticipant,
  useParticipants,
  RoomAudioRenderer,
  useTracks,
  TrackToggle,
  BarVisualizer,
} from '@livekit/components-react';
import '@livekit/components-styles';
import { Track } from 'livekit-client';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, PhoneOff, Wifi, WifiOff } from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

interface InterviewRoomProps {
  sessionId: string;
  token: string;
  serverUrl: string;
  sessionType: 'star_conversational' | 'behavioral_deep_dive';
  jobDescription?: string | null;
  onSessionEnd: () => void;
}

// ── Inner room UI (rendered after LiveKit connects) ───────────────────────────

function InterviewUI({
  sessionId,
  sessionType,
  onSessionEnd,
}: {
  sessionId: string;
  sessionType: string;
  onSessionEnd: () => void;
}) {
  const { localParticipant } = useLocalParticipant();
  const participants = useParticipants();
  const [isMuted, setIsMuted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [isEnding, setIsEnding] = useState(false);

  const agentConnected = participants.some(
    (p) => p.identity !== localParticipant.identity
  );

  const micTracks = useTracks([{ source: Track.Source.Microphone, withPlaceholder: true }]);

  // Timer
  useEffect(() => {
    const t = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const handleEndSession = useCallback(async () => {
    setIsEnding(true);
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sessions/${sessionId}/complete`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        }
      );
    } catch {
      // best-effort — don't block UI
    }
    onSessionEnd();
  }, [sessionId, onSessionEnd]);

  const toggleMute = useCallback(async () => {
    await localParticipant.setMicrophoneEnabled(isMuted);
    setIsMuted(!isMuted);
  }, [localParticipant, isMuted]);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-white">
      {/* Render remote audio (AI voice) */}
      <RoomAudioRenderer />

      {/* Header */}
      <div className="w-full max-w-2xl mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center">
            <span className="text-amber-400 text-xs font-bold">P</span>
          </div>
          <div>
            <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
              {sessionType === 'behavioral_deep_dive' ? 'Behavioral Deep Dive' : 'STAR Conversational'}
            </p>
            <p className="text-sm text-zinc-300 font-semibold">{formatTime(elapsed)}</p>
          </div>
        </div>

        {/* Connection status */}
        <div className="flex items-center gap-2 text-xs">
          {agentConnected ? (
            <>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 font-medium">AI Connected</span>
              <Wifi className="w-3 h-3 text-green-400" />
            </>
          ) : (
            <>
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-400 font-medium">Connecting AI…</span>
              <WifiOff className="w-3 h-3 text-amber-400" />
            </>
          )}
        </div>
      </div>

      {/* Main card */}
      <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
        
        {/* AI Avatar */}
        <div className="flex flex-col items-center gap-6 mb-10">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/20 flex items-center justify-center">
              <span className="text-4xl">🤖</span>
            </div>
            <AnimatePresence>
              {agentConnected && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-zinc-900"
                />
              )}
            </AnimatePresence>
          </div>
          <div className="text-center">
            <p className="text-white font-bold text-lg">
              {sessionType === 'behavioral_deep_dive' ? 'Morgan' : 'Alex'}
            </p>
            <p className="text-zinc-400 text-sm">
              AI Interviewer · Prepl
            </p>
          </div>
        </div>

        {/* Mic visualizer */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="h-14 w-full max-w-xs bg-zinc-800/60 rounded-2xl overflow-hidden flex items-center justify-center px-4">
            {micTracks.length > 0 && !isMuted ? (
              <BarVisualizer
                trackRef={micTracks[0]}
                barCount={32}
                style={{ width: '100%', height: '40px' }}
              />
            ) : (
              <div className="text-zinc-600 text-xs font-medium">
                {isMuted ? 'Microphone muted' : 'Waiting for mic…'}
              </div>
            )}
          </div>
          <p className="text-xs text-zinc-500">Your voice</p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          {/* Mute toggle */}
          <button
            onClick={toggleMute}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 border ${
              isMuted
                ? 'bg-red-500/10 border-red-500/40 text-red-400 hover:bg-red-500/20'
                : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700'
            }`}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* End session */}
          <button
            onClick={handleEndSession}
            disabled={isEnding}
            className="px-6 py-3 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold text-sm flex items-center gap-2 transition-all duration-200 active:scale-95 disabled:opacity-60"
          >
            <PhoneOff className="w-4 h-4" />
            {isEnding ? 'Ending…' : 'End Session'}
          </button>
        </div>
      </div>

      <p className="mt-6 text-xs text-zinc-600 text-center max-w-md">
        This session is powered by LiveKit + Gemini Live. Your audio is processed securely and never stored without your consent.
      </p>
    </div>
  );
}

// ── Outer component: wraps LiveKitRoom ────────────────────────────────────────

export default function InterviewRoom({
  sessionId,
  token,
  serverUrl,
  sessionType,
  onSessionEnd,
}: InterviewRoomProps) {
  const [disconnected, setDisconnected] = useState(false);

  if (disconnected) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white p-6">
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold">Session complete</h2>
          <p className="text-zinc-400">Your results are being processed. Check your dashboard shortly.</p>
          <button
            onClick={onSessionEnd}
            className="mt-4 px-6 py-3 bg-amber-400 text-zinc-900 font-bold rounded-full hover:bg-amber-300 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <LiveKitRoom
      token={token}
      serverUrl={serverUrl}
      connect={true}
      audio={true}
      video={false}
      onDisconnected={() => setDisconnected(true)}
      className="h-screen"
    >
      <InterviewUI
        sessionId={sessionId}
        sessionType={sessionType}
        onSessionEnd={() => setDisconnected(true)}
      />
    </LiveKitRoom>
  );
}
