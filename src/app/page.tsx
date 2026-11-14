"use client";

import { useState } from "react";
import { PlayIcon } from "@phosphor-icons/react";
import DecisionBar from "@/components/DecisionBar";
import FeedbackPopup from "@/components/FeedbackPopup";
import GameHeader from "@/components/GameHeader";
import IntroScreen from "@/components/IntroScreen";
import MaterialScreen from "@/components/MaterialScreen";
import ResultScreen from "@/components/ResultScreen";
import ThemeToggle from "@/components/ThemeToggle";
import VideoPlayer from "@/components/VideoPlayer";
import ZoomModal from "@/components/ZoomModal";
import { UNLOCK_STEPS, pickRandomSession } from "@/lib/questions";
import { calcScore } from "@/lib/score";
import type { Answer, FeedbackState, GamePhase, Question } from "@/lib/types";

const BEST_SCORE_KEY = "vid-dle-best-score";

export default function Home() {
  const [phase, setPhase] = useState<GamePhase>("intro");
  const [session, setSession] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [unlockIndex, setUnlockIndex] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(() => {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem(BEST_SCORE_KEY);
    return raw !== null ? Number(raw) : null;
  });

  const question = session[currentIndex];
  const unlockedFraction = UNLOCK_STEPS[unlockIndex] ?? 1;
  const soundOn = unlockIndex >= 1;
  const score = calcScore(correctCount);

  const startGame = () => {
    setSession(pickRandomSession());
    setCurrentIndex(0);
    setUnlockIndex(0);
    setFeedback(null);
    setCorrectCount(0);
    setZoomOpen(false);
    setPhase("playing");
  };

  const handleUnsure = () => {
    setUnlockIndex((index) => Math.min(index + 1, UNLOCK_STEPS.length - 1));
  };

  const handleChoose = (answer: Answer) => {
    if (!question || feedback) return;
    const correct = answer === question.answer;
    if (correct) setCorrectCount((count) => count + 1);
    setFeedback({ correct, correctAnswer: question.answer, hint: question.hint });
  };

  const handleNext = () => {
    setFeedback(null);
    setUnlockIndex(0);
    setZoomOpen(false);

    const isLast = currentIndex + 1 >= session.length;
    if (isLast) {
      const finalScore = calcScore(correctCount);
      setBestScore((prev) => {
        const best = prev === null ? finalScore : Math.max(prev, finalScore);
        window.localStorage.setItem(BEST_SCORE_KEY, String(best));
        return best;
      });
      setPhase("result");
    } else {
      setCurrentIndex((index) => index + 1);
    }
  };

  if (phase === "intro") return <IntroScreen onStart={startGame} />;

  if (phase === "result")
    return (
      <ResultScreen
        score={score}
        correctCount={correctCount}
        bestScore={bestScore}
        onRestart={startGame}
        onOpenMaterial={() => setPhase("material")}
        onHome={() => setPhase("intro")}
      />
    );

  if (phase === "material")
    return <MaterialScreen onRestart={startGame} onHome={() => setPhase("intro")} />;

  if (!question) return null;

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 lg:py-8">
      <header className="mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-primary">
            <PlayIcon size={18} weight="fill" className="text-white" />
          </span>
          <h1 className="text-xl font-extrabold tracking-tight text-ink">Vid-dle</h1>
          <p className="hidden text-xs text-ink-soft sm:block">
            AI atau buatan manusia? Tebak dengan teliti.
          </p>
        </div>
        <ThemeToggle />
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <VideoPlayer
          key={question.id}
          src={question.src}
          unlockedFraction={unlockedFraction}
          soundOn={soundOn}
          onOpenZoom={() => setZoomOpen(true)}
        />

        <aside className="flex flex-col gap-5 rounded-2xl border border-stone-300 p-5 dark:border-white/10">
          <GameHeader currentIndex={currentIndex} score={score} />
          <DecisionBar
            canUnsure={unlockIndex < UNLOCK_STEPS.length - 1}
            locked={feedback !== null}
            onChoose={handleChoose}
            onUnsure={handleUnsure}
          />
          <p className="text-center text-[11px] leading-relaxed text-ink-soft">
            {soundOn
              ? "Suara sudah aktif — gunakan tombol Periksa Detail untuk zoom."
              : "Tonton 20% dulu. Kurang yakin? Buka lebih banyak — skor tidak berpengaruh."}
          </p>
        </aside>
      </div>

      {zoomOpen ? (
        <ZoomModal
          src={question.src}
          unlockedFraction={unlockedFraction}
          soundOn={soundOn}
          onClose={() => setZoomOpen(false)}
        />
      ) : null}

      {feedback ? (
        <FeedbackPopup
          correct={feedback.correct}
          correctAnswer={feedback.correctAnswer}
          hint={feedback.hint}
          onNext={handleNext}
        />
      ) : null}
    </main>
  );
}
