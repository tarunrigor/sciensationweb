import { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, RotateCcw, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from '@/src/components/Navbar';
import { Footer } from '@/src/components/Footer';
import { FadeIn } from '@/src/components/ui/FadeIn';
import type { Option, Question, QuestionRubric, QuizLocale } from '@/src/components/identity/types';

type ScoreLabels = QuizLocale['ui']['scoreLabels'];
type Insights = QuizLocale['ui']['insights'];

function getScoreLabel(pct: number, labels: ScoreLabels): { label: string; color: string; bg: string } {
  if (pct >= 80) return { label: labels.exceptional, color: '#2D6A4F', bg: '#E8F5E9' };
  if (pct >= 60) return { label: labels.strong, color: '#0033CC', bg: '#E4ECF9' };
  if (pct >= 40) return { label: labels.developing, color: '#C8952E', bg: '#FFF8E1' };
  return { label: labels.emerging, color: '#7B1E3A', bg: '#F2E4E9' };
}

function getOverallInsight(pct: number, insights: Insights): string {
  if (pct >= 80) return insights.exceptional;
  if (pct >= 60) return insights.strong;
  if (pct >= 40) return insights.developing;
  return insights.emerging;
}

function ProgressBar({
  current,
  total,
  questionOfLabel,
}: {
  current: number;
  total: number;
  questionOfLabel: (c: number, t: number) => string;
}) {
  const pct = ((current + 1) / total) * 100;
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-black uppercase tracking-widest font-mono text-[#8A8A8A]">
          {questionOfLabel(current + 1, total)}
        </span>
        <span className="text-[10px] font-black uppercase tracking-widest font-mono text-[#8A8A8A]">
          {Math.round(pct)}%
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-[#E8E4E0] overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-[#0033CC]"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </div>
  );
}

function OptionButton({
  option,
  selected,
  onSelect,
  index,
}: {
  option: Option;
  selected: boolean;
  onSelect: () => void;
  index: number;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      onClick={onSelect}
      className={`w-full text-left rounded-xl border-2 p-5 cursor-pointer transition-all duration-200 ${
        selected
          ? 'border-[#0033CC] bg-[#E4ECF9] shadow-[0_0_0_1px_#0033CC]'
          : 'border-[#E8E4E0] bg-white hover:border-[#0033CC]/30 hover:shadow-md'
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-black font-mono transition-colors ${
            selected
              ? 'bg-[#0033CC] text-white'
              : 'bg-[#FAF8F5] text-[#8A8A8A] border border-[#E8E4E0]'
          }`}
        >
          {String.fromCharCode(65 + index)}
        </div>
        <p className={`text-sm leading-relaxed ${selected ? 'text-[#1A1A1A] font-semibold' : 'text-[#4A4A4A]'}`}>
          {option.text}
        </p>
      </div>
    </motion.button>
  );
}

function ScoreRing({
  score,
  max,
  size = 120,
  labels,
}: {
  score: number;
  max: number;
  size?: number;
  labels: ScoreLabels;
}) {
  const pct = (score / max) * 100;
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;
  const { color } = getScoreLabel(pct, labels);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#E8E4E0" strokeWidth="6" fill="none" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
          strokeDasharray={circumference}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-black" style={{ color }}>{score}</span>
        <span className="text-[10px] font-mono text-[#8A8A8A]">/ {max}</span>
      </div>
    </div>
  );
}

function QuestionResult({
  question,
  selectedOptionId,
  rubricEntry,
  index,
  labels,
  questionLabel,
  yourAnswerLabel,
  feedbackLabel,
}: {
  question: Question;
  selectedOptionId: string;
  rubricEntry: QuestionRubric;
  index: number;
  labels: ScoreLabels;
  questionLabel: (n: number) => string;
  yourAnswerLabel: string;
  feedbackLabel: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const score = rubricEntry.scoring[selectedOptionId] ?? 0;
  const feedback = rubricEntry.feedback[selectedOptionId] ?? '';
  const maxScore = Math.max(...Object.values(rubricEntry.scoring));
  const pct = (score / maxScore) * 100;
  const { label, color, bg } = getScoreLabel(pct, labels);
  const selectedOption = question.options.find((o) => o.id === selectedOptionId);

  return (
    <FadeIn delay={index * 100}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="card-lift w-full text-left rounded-2xl border border-[#E8E4E0] bg-white p-6 md:p-8 cursor-pointer transition-all"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] font-black uppercase tracking-widest font-mono text-[#8A8A8A]">
                {questionLabel(index + 1)}
              </span>
              <span
                className="text-[10px] font-black uppercase tracking-widest font-mono px-2.5 py-1 rounded-full"
                style={{ color, backgroundColor: bg }}
              >
                {label} — {score}/{maxScore}
              </span>
            </div>
            <p className="text-sm md:text-base font-semibold text-[#1A1A1A] leading-relaxed">{question.text}</p>
          </div>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0 mt-1"
          >
            <ChevronDown className="w-5 h-5 text-[#8A8A8A]" />
          </motion.div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-6 pt-6 border-t border-[#E8E4E0]">
                <div className="mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest font-mono text-[#8A8A8A]">
                    {yourAnswerLabel}
                  </span>
                  <p className="text-sm text-[#1A1A1A] mt-1 font-medium">{selectedOption?.text}</p>
                </div>
                <div className="rounded-xl p-5" style={{ backgroundColor: bg }}>
                  <span className="text-[10px] font-black uppercase tracking-widest font-mono" style={{ color }}>
                    {feedbackLabel}
                  </span>
                  <p className="text-sm leading-relaxed mt-2" style={{ color: '#1A1A1A' }}>
                    {feedback}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </FadeIn>
  );
}

export function Identity({ locale }: { locale: QuizLocale }) {
  const { ui, data } = locale;
  const { questions, rubric, maxScorePerQuestion } = data;
  const totalQuestions = questions.length;

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = Object.keys(answers).length === totalQuestions;

  function selectOption(questionId: number, optionId: string) {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  }

  function goNext() {
    if (currentQ < totalQuestions - 1) {
      setCurrentQ((p) => p + 1);
    }
  }

  function goPrev() {
    if (currentQ > 0) {
      setCurrentQ((p) => p - 1);
    }
  }

  function handleSubmit() {
    if (allAnswered) {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handleRetake() {
    setAnswers({});
    setCurrentQ(0);
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const questionScores = questions.map((q) => {
    const r = rubric.find((rb) => rb.questionId === q.id);
    if (!r || !answers[q.id]) return 0;
    return r.scoring[answers[q.id]] ?? 0;
  });
  const totalScore = questionScores.reduce((a, b) => a + b, 0);
  const maxTotal = maxScorePerQuestion * totalQuestions;
  const totalPct = (totalScore / maxTotal) * 100;

  const currentQuestion = questions[currentQ];
  const currentAnswer = answers[currentQuestion.id];

  return (
    <div className="min-h-screen bg-[#FAF8F5] font-sans text-[#1A1A1A]">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 bg-gradient-to-b from-[#000A1F] via-[#001133] to-[#001A4D] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]" style={{ background: 'radial-gradient(ellipse, rgba(0,51,204,0.15) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 right-0 w-[500px] h-[300px]" style={{ background: 'radial-gradient(ellipse, rgba(255,215,0,0.08) 0%, transparent 70%)' }} />
        </div>
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(white 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="hero-eyebrow eyebrow text-[#FFD700]/70 mb-6">{ui.eyebrow}</p>
          <h1 className="hero-title text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[1.08] mb-6 tracking-tight">
            {ui.heroLine1}<br />
            <span className="text-[#FFD700]">{ui.heroLine2}</span>
          </h1>
          <p className="hero-sub text-base md:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed mb-10">
            {ui.subtitle}
          </p>
          {!submitted && (
            <div className="hero-cta flex flex-wrap items-center justify-center gap-4">
              <a href="#quiz" className="btn-yellow !py-3 !px-8 gap-2">
                <span>{ui.startButton}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </section>

      {!submitted ? (
        <section id="quiz" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
          <div className="max-w-3xl mx-auto">
            <ProgressBar current={currentQ} total={totalQuestions} questionOfLabel={ui.questionOf} />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="mb-8">
                  <h2 className="text-xl md:text-2xl font-black text-[#1A1A1A] leading-tight mb-3">
                    {currentQuestion.text}
                  </h2>
                  {currentQuestion.context && (
                    <p className="text-sm text-[#4A4A4A] leading-relaxed">{currentQuestion.context}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {currentQuestion.options.map((opt, i) => (
                    <OptionButton
                      key={opt.id}
                      option={opt}
                      selected={currentAnswer === opt.id}
                      onSelect={() => selectOption(currentQuestion.id, opt.id)}
                      index={i}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between mt-10">
              <button
                onClick={goPrev}
                disabled={currentQ === 0}
                className={`flex items-center gap-2 text-sm font-bold px-5 py-3 rounded-xl border-2 transition-all cursor-pointer ${
                  currentQ === 0
                    ? 'border-[#E8E4E0] text-[#C4C0BC] cursor-not-allowed'
                    : 'border-[#E8E4E0] text-[#4A4A4A] hover:border-[#0033CC]/30 hover:text-[#0033CC]'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                {ui.previous}
              </button>

              <div className="flex gap-2">
                {questions.map((q, i) => (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQ(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                      i === currentQ
                        ? 'bg-[#0033CC] scale-125'
                        : answers[q.id]
                          ? 'bg-[#0033CC]/40'
                          : 'bg-[#E8E4E0]'
                    }`}
                  />
                ))}
              </div>

              {currentQ < totalQuestions - 1 ? (
                <button
                  onClick={goNext}
                  disabled={!currentAnswer}
                  className={`flex items-center gap-2 text-sm font-bold px-5 py-3 rounded-xl border-2 transition-all cursor-pointer ${
                    !currentAnswer
                      ? 'border-[#E8E4E0] text-[#C4C0BC] cursor-not-allowed'
                      : 'border-[#0033CC] text-[#0033CC] hover:bg-[#0033CC] hover:text-white'
                  }`}
                >
                  {ui.next}
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!allAnswered}
                  className={`flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-xl transition-all cursor-pointer ${
                    allAnswered
                      ? 'bg-[#0033CC] text-white hover:bg-[#002299] shadow-lg'
                      : 'bg-[#E8E4E0] text-[#C4C0BC] cursor-not-allowed'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  {ui.seeResults}
                </button>
              )}
            </div>

            <p className="text-center text-[10px] font-black uppercase tracking-widest font-mono text-[#8A8A8A] mt-6">
              {ui.answeredOf(Object.keys(answers).length, totalQuestions)}
            </p>
          </div>
        </section>
      ) : (
        <>
          <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
            <div className="max-w-3xl mx-auto">
              <FadeIn>
                <div className="rounded-2xl bg-white border border-[#E8E4E0] p-8 md:p-12 text-center">
                  <p className="eyebrow text-[#0033CC] mb-8">{ui.yourResult}</p>

                  <ScoreRing score={totalScore} max={maxTotal} size={140} labels={ui.scoreLabels} />

                  <div className="mt-6">
                    <span
                      className="inline-block text-sm font-black uppercase tracking-widest font-mono px-4 py-2 rounded-full"
                      style={{
                        color: getScoreLabel(totalPct, ui.scoreLabels).color,
                        backgroundColor: getScoreLabel(totalPct, ui.scoreLabels).bg,
                      }}
                    >
                      {getScoreLabel(totalPct, ui.scoreLabels).label}
                    </span>
                  </div>

                  <p className="text-base md:text-lg text-[#4A4A4A] leading-relaxed max-w-xl mx-auto mt-6">
                    {getOverallInsight(totalPct, ui.insights)}
                  </p>
                </div>
              </FadeIn>
            </div>
          </section>

          <section className="pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
            <div className="max-w-3xl mx-auto">
              <FadeIn>
                <p className="eyebrow text-[#0033CC] mb-6">{ui.breakdownEyebrow}</p>
                <h2 className="text-2xl md:text-4xl font-black text-[#1A1A1A] leading-tight mb-10">
                  {ui.breakdownHeading}
                </h2>
              </FadeIn>

              <div className="space-y-4">
                {questions.map((q, i) => {
                  const r = rubric.find((rb) => rb.questionId === q.id)!;
                  return (
                    <QuestionResult
                      key={q.id}
                      question={q}
                      selectedOptionId={answers[q.id]}
                      rubricEntry={r}
                      index={i}
                      labels={ui.scoreLabels}
                      questionLabel={ui.question}
                      yourAnswerLabel={ui.yourAnswer}
                      feedbackLabel={ui.feedback}
                    />
                  );
                })}
              </div>

              <FadeIn delay={600}>
                <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
                  <button
                    onClick={handleRetake}
                    className="btn-blue-outline inline-flex items-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{ui.retake}</span>
                  </button>
                  <a href="/fellowship" className="btn-yellow !py-3 !px-8 gap-2">
                    <span>{ui.exploreFellowship}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </FadeIn>
            </div>
          </section>
        </>
      )}

      <section className="pb-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto text-center">
          <a href="/" className="btn-blue-outline inline-flex items-center gap-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{ui.backToHome}</span>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
