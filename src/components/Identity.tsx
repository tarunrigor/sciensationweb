import { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, RotateCcw, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from '@/src/components/Navbar';
import { Footer } from '@/src/components/Footer';
import { FadeIn } from '@/src/components/ui/FadeIn';

/* ═══════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════ */

interface Option {
  id: string;
  text: string;
}

interface Question {
  id: number;
  text: string;
  context?: string;
  options: Option[];
}

interface QuestionRubric {
  questionId: number;
  scoring: Record<string, number>;
  feedback: Record<string, string>;
}

interface QuizData {
  title: string;
  subtitle: string;
  questions: Question[];
  rubric: QuestionRubric[];
  maxScorePerQuestion: number;
}

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const QUIZ_DATA: QuizData = {
  title: 'Identity Assessment',
  subtitle: 'Five questions. Eight choices each. No right answers — only revealing ones.',
  maxScorePerQuestion: 8,
  questions: [
    {
      id: 1,
      text: 'You\'re at a social gathering. Someone from a completely different industry asks, "What do you do? How\'s work going?"',
      options: [
        { id: '1a', text: 'I say my company name and role. The conversation ends there because I can\'t explain what I actually do, and I don\'t ask anything about their work.' },
        { id: '1b', text: 'I say I\'m in consulting and tech and it\'s been a good learning experience. We swap job descriptions and move on. If someone asked me what makes my skills different from anyone else at my level, I wouldn\'t have an answer.' },
        { id: '1c', text: 'I explain what pulled me into this work and what I\'m learning. I\'m genuinely curious about their field, but the conversation stays polite and separate. It doesn\'t cross my mind to ask whether their problems look like mine.' },
        { id: '1d', text: 'I have a story that connects my career moves and it comes out well in relaxed settings like this. But if a recruiter pressed me or my parents asked the same question at dinner, I\'d drop the story and fall back on job title and salary. The conversation is friendly but we each stay in our own worlds.' },
        { id: '1e', text: 'I can explain why I chose this path, what specific skill I\'m building, and why that skill is getting more valuable. I ask them what problems they deal with, not what their title is, because I\'ve noticed different industries run into the same problems and I want to check if theirs connects to something I\'m working on.' },
        { id: '1f', text: 'I talk about the direction my career is headed, not a list of things I\'ve done. I know what I\'m good at and why that combination is hard to hire for. I steer the conversation into their field because I want to hear something that contradicts how I currently think.' },
        { id: '1g', text: 'I talk about where I\'m headed, not where I\'ve been. I can show the math on my career bet: what I gave up, what I built, what it\'s worth now. I bring specific problems from my work into the conversation because I\'ve gotten usable ideas from people in different industries before.' },
        { id: '1h', text: 'I don\'t describe my role. I describe the specific problem I solve, and it\'s a problem most people recognize the moment I say it. I ask them what\'s broken in their industry, because the answer has changed my work more than once.' },
      ],
    },
    {
      id: 2,
      text: 'You just finished a piece of work. Your manager reviews it and says, "Looks good, let\'s send it to the client." Something about it bothers you.',
      options: [
        { id: '2a', text: 'My manager said it\'s good. I send it. If the task is complete and the person above me approved it, that\'s the end of the process for me.' },
        { id: '2b', text: 'I check it against a similar deliverable from last time. Same format, same structure. It matches, so I send it. Something nags at me but I can\'t place it, and the template check passed.' },
        { id: '2c', text: 'I feel something is off but I can\'t name exactly what. I send it because my manager approved it. Later, when I see the client\'s reaction, I realize what was wrong. I could sense the gap but couldn\'t diagnose it in time.' },
        { id: '2d', text: 'After I\'m done, I can point to what\'s weak. The analysis is right but the framing won\'t land with this audience. I mention it to my manager but don\'t push hard. If they say send it, I send it.' },
        { id: '2e', text: 'I know what good looks like for this type of work. I can name exactly where this one falls short and why. One section adds confusion without adding value. I tell my manager: this part should be cut or rewritten before we send it.' },
        { id: '2f', text: 'I caught the weak section while I was still building it and tried to fix it before showing anyone. When my manager says ship it, I point to the specific part and say: "This section tries to cover too much. Can I cut it in half? It\'ll be shorter but it\'ll actually land."' },
        { id: '2g', text: 'I see something nobody else has flagged. Not a formatting problem. The recommendation won\'t survive contact with the client\'s actual situation because we\'re assuming something about their operations that we haven\'t verified. I raise it even though my manager thinks it\'s ready.' },
        { id: '2h', text: 'I\'ve already hunted for the weakest part before showing anyone. I also know when to stop. One section needs rework and I can say exactly why. The rest is right and more polishing won\'t improve it. I fix the weak part, leave the rest alone, and send it.' },
      ],
    },
    {
      id: 3,
      text: 'A friend who graduated with you just got a 40% raise by moving to a large company. Over coffee, they tell you: "You\'re smart enough to do the same. Why stay where you are?"',
      options: [
        { id: '3a', text: 'They\'re probably right. I\'d earn more. My current place is smaller, pays less, and nobody recognizes the name. Maybe I should start applying.' },
        { id: '3b', text: 'I know I\'m doing more here than I would there. But I can\'t explain exactly why that matters. When they push on salary, I don\'t have a good answer.' },
        { id: '3c', text: 'I\'m starting to notice that I get to do things here that my friend would never be allowed to touch at their company. I can see my profile is becoming unusual. But I can\'t fully explain it yet, and the salary difference still bothers me.' },
        { id: '3d', text: 'After a good week, I know exactly why I\'m here. The freedom, the experiments, the unusual profile. After a bad week, I look at my friend\'s salary and think maybe they\'re right. I keep my options open just in case.' },
        { id: '3e', text: 'I know why I\'m here and I can explain it. I get to diagnose, design, and own outcomes end to end. Nobody at a large company at my level gets that. My profile sits at an intersection that almost nobody else occupies. The salary gap is real today, but what I\'m building closes it and then passes it.' },
        { id: '3f', text: 'I\'ve stopped thinking about whether to stay. I\'m using this environment to run experiments I designed myself. Every tough project teaches me something I couldn\'t get elsewhere. I\'ve deliberately dropped the parts of my profile that look like everyone else\'s and doubled down on what\'s unique.' },
        { id: '3g', text: 'Each project I take builds on what the last one taught me. I\'m developing an approach that didn\'t exist before I started testing it. I can trace the chain: project 1 taught me X, which made project 2 possible, which produced Y. My friend\'s raises are linear. My career is compounding. I\'ve started explaining this niche to others because it doesn\'t have a name yet.' },
        { id: '3h', text: 'I built something that didn\'t exist before. The experiments I ran, the methodology I developed, the category I created. None of this was here when I started. My friend is comparing salaries. I\'m not on the same axis anymore. If someone offered me double to move, I\'d calculate what it costs in momentum, and the answer would have to be very convincing.' },
      ],
    },
    {
      id: 4,
      text: 'You\'re in a meeting with a client\'s CEO. They start describing a business problem that has nothing to do with your assigned work.',
      options: [
        { id: '4a', text: 'I note it but it\'s not my work. I\'m here for a specific task. The CEO\'s problem is a business issue and I\'m the tech person. I wait for the conversation to come back to my scope.' },
        { id: '4b', text: 'I listen because it\'s interesting to hear the CEO talk about the business. After the meeting I go back to my assigned work. I might mention the CEO\'s problem to my manager in passing.' },
        { id: '4c', text: 'I realize this business problem might connect to my technical work. Maybe the data from this problem should show up in what I\'m building. I note it down and think about it later.' },
        { id: '4d', text: 'I ask the CEO one follow-up question about the problem. Back at my desk, I wonder if I should factor it into my work. But I\'m not sure if spending time outside my assigned scope is expected or overstepping.' },
        { id: '4e', text: 'I ask the CEO to walk me through the problem in detail. "What actually happens step by step?" I realize my technical work should start from this business workflow, not from the data I was given. The business context changes my design.' },
        { id: '4f', text: 'I ask questions the CEO doesn\'t expect from someone in my role. "What does your team check before they release an order? Where do they wait for someone else?" I realize the CEO\'s problem and my assigned work are the same problem seen from different angles. I propose a change to both.' },
        { id: '4g', text: 'I ask to spend time with the team that has the problem. I watch what they actually do, not what the CEO thinks they do. The real bottleneck is different from what the CEO described. My solution uses my tech, business understanding, and process knowledge together. A specialist in just one of those wouldn\'t have found it.' },
        { id: '4h', text: 'I\'ve been doing this at every client meeting for months. Every time the CEO mentions a business problem, I use it as the starting point for my work. The solutions I build don\'t just fix the technical issue. They change how teams work together. The CEO didn\'t ask for that. But they recognize it when they see it.' },
      ],
    },
    {
      id: 5,
      text: 'A problem at your client keeps coming back every quarter. You\'ve been asked to fix it again.',
      options: [
        { id: '5a', text: 'I fix it the same way I fixed it last time. Each time it comes back, I treat it as a new task. I don\'t ask why it keeps happening.' },
        { id: '5b', text: 'I fix it, but I notice this is the third time. I mention to my manager that it keeps happening. I don\'t dig into why because I\'m focused on completing the fix.' },
        { id: '5c', text: 'I notice the pattern. This problem comes back every quarter under similar conditions. I wonder whether something structural is causing it. But I fix the symptom again because that\'s what I was asked to do.' },
        { id: '5d', text: 'I map out what\'s connected to the problem. It\'s not a one-off. It\'s connected to how two teams hand off work to each other. I propose a structural fix. But when my manager says "just fix it the usual way," I don\'t push.' },
        { id: '5e', text: 'I trace the recurring problem to the feedback loop that causes it. The real issue isn\'t the quarterly symptom. It\'s how information flows between two parts of the system. I present the root cause and propose fixing the structure, not the symptom. I also recognize that this kind of diagnosis is the specific skill I\'m getting better at through each of these interactions.' },
        { id: '5f', text: 'I find the leverage point: the one place in the system where a small change prevents the problem from recurring. I also see that the problem exists because two groups that should be talking to each other aren\'t. I position myself at that gap.' },
        { id: '5g', text: 'I see that the recurring problem isn\'t just this client\'s issue. It reflects how businesses at this growth stage work. I\'ve seen the same pattern at multiple clients. I\'m building an approach to diagnose and fix this class of problem. I also see that the ability to fix this is becoming more valuable because more companies are hitting this stage.' },
        { id: '5h', text: 'I don\'t just fix the recurring problem. I change how the client thinks about this type of problem. I show them the mental model that keeps producing it. Each time I do this at a different client, I get better at recognizing the pattern faster. I\'m building a practice around a class of problem that most people treat as one-offs.' },
      ],
    },
  ],
  rubric: [
    {
      questionId: 1,
      scoring: { '1a': 1, '1b': 2, '1c': 3, '1d': 4, '1e': 5, '1f': 6, '1g': 7, '1h': 8 },
      feedback: {
        '1a': 'You describe yourself by title and move on. Professional conversations don\'t register as opportunities yet. That\'s where most people start. The next shift: notice that the person across from you solves problems too. Their problems might teach you something about yours.',
        '1b': 'You swap descriptions and find common ground in the familiar. You know there\'s more to your work than the label, but you haven\'t found the words for it yet. The next shift: instead of describing your role, try explaining what pulled you into this work and what you\'re learning from it.',
        '1c': 'You bring genuine curiosity and can explain your work clearly. The conversations are good but stay in safe territory. The next shift: start asking what problems the other person deals with, not just what their role is. Different industries often face the same problems in disguise.',
        '1d': 'You carry a real story about your career in relaxed settings. When the stakes rise, the story drops and the title takes over. The next shift: test the story in harder rooms. When a recruiter pushes or a family member questions, hold the narrative. If it breaks, the weak point shows you what needs strengthening.',
        '1e': 'You know what you\'re building, why it\'s valuable, and you actively look for connections across industries. Your story is stable and specific. The next shift: start seeking people who think differently from you, not just people in different industries. Look for perspectives that challenge your current frame, not just expand it.',
        '1f': 'You use conversations to challenge your own thinking, not just learn about others. You know what makes your profile rare and you say it plainly. The next shift: start tracking which conversations actually changed your work. Build a small set of people across different fields that you return to regularly, not just meet once.',
        '1g': 'You carry proof. You can trace the math on your career bet and show the returns. Your conversations across industries produce ideas you use the next week. The next shift: start describing the problem you solve in terms any listener recognizes instantly, without industry jargon. When you do that, the conversation becomes about the pattern, not about you.',
        '1h': 'You describe the problem you solve, not the role you hold, and the problem is one most people recognize immediately. Conversations with people in unrelated fields have changed your work more than once. You\'re operating at the highest level on these dimensions. Your growth now comes from helping others develop the same clarity you carry.',
      },
    },
    {
      questionId: 2,
      scoring: { '2a': 1, '2b': 2, '2c': 3, '2d': 4, '2e': 5, '2f': 6, '2g': 7, '2h': 8 },
      feedback: {
        '2a': 'You check for completion. If someone above you approved it, the process ends there. That\'s where most people start. The next shift: after your next deliverable, before anyone reviews it, ask yourself one question. "Does this look like the best version I\'ve seen of this type of work?" Just the comparison starts building the eye.',
        '2b': 'You check against past examples and templates. If it matches, it feels right. The next shift: templates capture the format, not the thinking. Next time something nags you, pause and try to name what\'s off. Even if you can\'t fix it yet, naming it is the first step.',
        '2c': 'You sense when something is off but can\'t always name it. The instinct is developing faster than the vocabulary. The next shift: when that feeling hits, stop and ask three things. Who is the audience? What do they need to decide after reading this? Does the weakest section help them decide? Naming the audience sharpens the diagnosis.',
        '2d': 'You can point to what\'s weak and explain why. You mention it but don\'t push when someone senior disagrees. The diagnosis is right. The next shift: practice saying "I think this specific section needs rework before we send it, here\'s why" and holding the position. The judgment is already there. The conviction needs to match it.',
        '2e': 'You hold a clear picture of what good looks like for this type of work. You name exactly where yours falls short and why. The next shift: start catching the gap while you\'re still building, not after. If you can feel the work drifting from the standard mid-execution, change course before finishing. That\'s the difference between reflection after the work and reflection during it.',
        '2f': 'You catch problems while building and fix them before showing anyone. When challenged, you point to the specific section and explain what\'s wrong. The next shift: look for the thing nobody else in the room has flagged. Not formatting or clarity, but whether the recommendation survives contact with the client\'s actual situation. That takes holding the business context and the technical quality in the same frame.',
        '2g': 'You see what others miss. Not surface problems but structural ones: assumptions that haven\'t been verified, conditions that changed since the data was gathered. The next shift: know when to stop. Hunt for the weakest part before showing anyone, but also know when the rest is strong enough to ship. The hardest judgment isn\'t finding problems. It\'s knowing when further refinement serves the work versus serves your own need to keep checking.',
        '2h': 'You hunt for the weakest part before showing anyone, and you know when the rest is done. You don\'t polish past the point where it stops improving. Each deliverable sharpens your definition of what "good" means for that type of work. You\'re operating at the highest level on these dimensions. Your growth now comes from helping others develop the same quality eye you carry.',
      },
    },
    {
      questionId: 3,
      scoring: { '3a': 1, '3b': 2, '3c': 3, '3d': 4, '3e': 5, '3f': 6, '3g': 7, '3h': 8 },
      feedback: {
        '3a': 'You see the salary gap and it looks like falling behind. The agency and experimentation you have access to haven\'t registered as valuable yet. That\'s where most people start. The next shift: compare what you do in a week to what your friend does. Not the pay. The tasks. The freedom. The problems you get to touch. That comparison tells a different story.',
        '3b': 'You know you\'re doing more, but when someone pushes on salary, you don\'t have the words. The next shift: pick one specific thing you did last month that your friend\'s role would never let them touch. Name it. Practice saying it out loud. The argument starts with one concrete example, not a general feeling.',
        '3c': 'You can feel that your profile is becoming unusual. The experiments, the freedom, the range of what you touch. But when someone asks "where is this going?", you don\'t have a clear answer yet. The next shift: connect the unusual profile to a specific outcome. "I\'m building the skill to ___" finishes the sentence that makes the path visible.',
        '3d': 'After a strong week, the conviction is real. After a tough one, the salary comparison wins. The next shift: write down why you\'re here during a good week. Read it during a bad one. If the reasoning doesn\'t hold, the problem is the reasoning, not the week. If it does hold, the problem is that conviction isn\'t durable yet. Durability comes from evidence, not enthusiasm.',
        '3e': 'You know why you\'re here, you can explain it, and the explanation holds under pressure. You see that your profile sits at an intersection most people can\'t reach. The next shift: stop explaining why you stayed and start running experiments nobody asked for. The agency is yours. Use it to build something only this environment makes possible.',
        '3f': 'You\'ve stopped debating whether to stay. You\'re using the environment as a lab, running your own experiments, and deliberately building what makes your profile unique. The next shift: connect the experiments to each other. Each one should build on what the last one taught you. The compounding starts when the experiments form a chain, not a list.',
        '3g': 'You can trace the chain: project 1 taught X, which made project 2 possible, which produced Y. Your career is compounding and you can show the math. The next shift: if someone offered you double the salary tomorrow, could you calculate what it costs in momentum? That calculation is what separates a strong position from an unbreakable one.',
        '3h': 'You built something that didn\'t exist before you started. The experiments, the methodology, the category. The salary comparison doesn\'t apply because you\'re not on the same axis anymore. You\'re operating at the highest level on these dimensions. Your growth now comes from helping others see the same compounding logic in their own work.',
      },
    },
    {
      questionId: 4,
      scoring: { '4a': 1, '4b': 2, '4c': 3, '4d': 4, '4e': 5, '4f': 6, '4g': 7, '4h': 8 },
      feedback: {
        '4a': 'You see your scope clearly and stay inside it. The CEO\'s business problem didn\'t register as something connected to your work. That\'s where most people start. The next shift: next time someone describes a problem outside your scope, ask one question about it. Just one. See if the answer connects to anything you\'re building.',
        '4b': 'You listen and find it interesting but don\'t connect it to your work. The next shift: after the next meeting where someone mentions a problem outside your scope, write down one sentence: "This problem might connect to my work because ___." Even a guess starts building the muscle that turns proximity into insight.',
        '4c': 'You can see that the business problem might connect to your technical work. The connection is forming. The next shift: pull the thread. Ask "what actually happens step by step?" The detail is where the real connection between business problem and technical solution shows up. The note you wrote down is the start. The follow-up question is what makes it useful.',
        '4d': 'You ask a follow-up question and sense the connection. But you\'re not sure if going outside your assigned scope is expected or overstepping. The next shift: it\'s not overstepping. Your work gets better when the business context shapes the design. Next time, instead of wondering, propose: "I think this connects to what I\'m building. Here\'s how." The worst that happens is someone says "stay focused." The best is that your work solves a bigger problem.',
        '4e': 'You ask the CEO to walk through the problem in detail. The business context changes your technical design because you\'re starting from the workflow, not from the spec. The next shift: start asking questions the CEO doesn\'t expect from someone in your role. Look for where two teams or two processes should be talking to each other but aren\'t. That gap is usually where the real problem lives.',
        '4f': 'You ask questions outside your expected role and find that the CEO\'s problem and your assigned work are the same problem from different angles. The next shift: go sit with the team that has the problem. What you hear from the people doing the work will be different from what the CEO described. The real bottleneck is usually in the gap between what leadership sees and what the ground floor actually does.',
        '4g': 'You spend time with the team, watch what they actually do, and find a bottleneck different from what was described. Your solution draws on tech, business understanding, and process knowledge together. The next shift: you\'ve been doing this at one client. Start noticing the pattern across clients. The same class of problem shows up at every growing company, wearing different costumes. Recognizing the pattern turns a one-time fix into a repeatable skill.',
        '4h': 'Every client meeting starts with the business problem, not the technical scope. Your solutions change how teams work together because you\'ve built the habit of seeing the whole system. You\'re operating at the highest level on these dimensions. Your growth now comes from doing this so consistently that others learn the approach by watching you work.',
      },
    },
    {
      questionId: 5,
      scoring: { '5a': 1, '5b': 2, '5c': 3, '5d': 4, '5e': 5, '5f': 6, '5g': 7, '5h': 8 },
      feedback: {
        '5a': 'You fix what\'s in front of you. Each time the problem returns, it\'s a new task. That\'s where most people start. The next shift: next time you fix a recurring problem, ask one question. "Is this the same problem as last time, or a different one?" If it\'s the same, the fix isn\'t working. That\'s worth investigating.',
        '5b': 'You notice the pattern and mention it. You don\'t dig into why because the assignment is to fix, not to investigate. The next shift: the next time you mention "this keeps happening," spend 30 minutes looking for what the recurring instances have in common. Time of quarter, team involved, workflow step. The pattern is in the data you already have.',
        '5c': 'You see the pattern and wonder if something structural causes it. You fix the symptom because that\'s what was asked. The next shift: trace the symptom one step back. If the problem starts in the same place every time, something upstream is producing it. Follow the chain one step further than the symptom. That one step often reveals the actual cause.',
        '5d': 'You mapped the structure and proposed a fix for the root cause. When resistance came, you didn\'t push. The structural fix was right. The next shift: present it as a cost argument. "If we fix the root cause, we stop spending X hours every quarter on a problem that shouldn\'t exist." Frame it so saying no costs more than saying yes. The reasoning is there. The persuasion needs to match it.',
        '5e': 'You traced the problem to the feedback loop that produces it. You see the root cause and you recognize that this type of diagnosis is the specific skill you\'re building. The next shift: find the leverage point. Not just the root cause, but the one place where a small change prevents the whole loop from running. That\'s where the intervention should land. Root cause tells you what\'s wrong. Leverage point tells you where to act.',
        '5f': 'You found the leverage point and positioned yourself at the gap between two groups that should be communicating. The next shift: look across your clients. Is this the same structural problem showing up in different companies? If you\'ve seen it twice, it\'s not a client problem. It\'s a pattern at this growth stage. That recognition changes what your skill is worth in the market.',
        '5g': 'You see the pattern across multiple clients and you\'re building an approach to diagnose and fix this class of problem. You also see that market demand for this skill is growing. The next shift: don\'t just fix the problem. Change how the client thinks about it. If you can shift their mental model, they stop producing the problem entirely. That\'s the highest-leverage intervention: changing the thinking, not the system.',
        '5h': 'You change how clients think about the type of problem, not just the specific instance. Your interventions look simple but shift behavior across multiple surfaces because you target the right point in the system. You\'re operating at the highest level on these dimensions. Your growth now comes from building this into a practice that others can learn from you.',
      },
    },
  ],
};

/* ═══════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════ */

function getScoreLabel(pct: number): { label: string; color: string; bg: string } {
  if (pct >= 80) return { label: 'Exceptional', color: '#2D6A4F', bg: '#E8F5E9' };
  if (pct >= 60) return { label: 'Strong', color: '#0033CC', bg: '#E4ECF9' };
  if (pct >= 40) return { label: 'Developing', color: '#C8952E', bg: '#FFF8E1' };
  return { label: 'Emerging', color: '#7B1E3A', bg: '#F2E4E9' };
}

function getOverallInsight(pct: number): string {
  if (pct >= 80) return 'You see the world through a lens most people never develop. Your instincts are calibrated to the kind of thinking this work demands.';
  if (pct >= 60) return 'Strong foundations with room to sharpen. You have the raw material — the Fellowship will give you the reps to refine it.';
  if (pct >= 40) return 'You\'re building. Some instincts are there, others need deliberate development. That\'s exactly what the Fellowship is designed for.';
  return 'You\'re early in this journey. That\'s not a weakness — it\'s a starting point. The best Fellows often start here and grow the fastest.';
}

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = ((current + 1) / total) * 100;
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-black uppercase tracking-widest font-mono text-[#8A8A8A]">
          Question {current + 1} of {total}
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

function ScoreRing({ score, max, size = 120 }: { score: number; max: number; size?: number }) {
  const pct = (score / max) * 100;
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;
  const { color } = getScoreLabel(pct);

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
}: {
  question: Question;
  selectedOptionId: string;
  rubricEntry: QuestionRubric;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const score = rubricEntry.scoring[selectedOptionId] ?? 0;
  const feedback = rubricEntry.feedback[selectedOptionId] ?? '';
  const maxScore = Math.max(...Object.values(rubricEntry.scoring));
  const pct = (score / maxScore) * 100;
  const { label, color, bg } = getScoreLabel(pct);
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
                Question {index + 1}
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
                    Your Answer
                  </span>
                  <p className="text-sm text-[#1A1A1A] mt-1 font-medium">{selectedOption?.text}</p>
                </div>
                <div className="rounded-xl p-5" style={{ backgroundColor: bg }}>
                  <span className="text-[10px] font-black uppercase tracking-widest font-mono" style={{ color }}>
                    Feedback
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

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */

export function Identity() {
  const { questions, rubric, maxScorePerQuestion } = QUIZ_DATA;
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

  // scoring
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

      {/* ──────────────── HERO ──────────────── */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 bg-gradient-to-b from-[#000A1F] via-[#001133] to-[#001A4D] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]" style={{ background: 'radial-gradient(ellipse, rgba(0,51,204,0.15) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 right-0 w-[500px] h-[300px]" style={{ background: 'radial-gradient(ellipse, rgba(255,215,0,0.08) 0%, transparent 70%)' }} />
        </div>
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(white 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="hero-eyebrow eyebrow text-[#FFD700]/70 mb-6">{QUIZ_DATA.title}</p>
          <h1 className="hero-title text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[1.08] mb-6 tracking-tight">
            How Do You<br />
            <span className="text-[#FFD700]">See the World?</span>
          </h1>
          <p className="hero-sub text-base md:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed mb-10">
            {QUIZ_DATA.subtitle}
          </p>
          {!submitted && (
            <div className="hero-cta flex flex-wrap items-center justify-center gap-4">
              <a href="#quiz" className="btn-yellow !py-3 !px-8 gap-2">
                <span>Start the Quiz</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </section>

      {!submitted ? (
        /* ──────────────── QUIZ ──────────────── */
        <section id="quiz" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
          <div className="max-w-3xl mx-auto">
            <ProgressBar current={currentQ} total={totalQuestions} />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Question */}
                <div className="mb-8">
                  <h2 className="text-xl md:text-2xl font-black text-[#1A1A1A] leading-tight mb-3">
                    {currentQuestion.text}
                  </h2>
                  {currentQuestion.context && (
                    <p className="text-sm text-[#4A4A4A] leading-relaxed">{currentQuestion.context}</p>
                  )}
                </div>

                {/* Options — single column for long-form responses */}
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

            {/* Navigation */}
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
                Previous
              </button>

              {/* Dot indicators */}
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
                  Next
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
                  See Results
                </button>
              )}
            </div>

            {/* Answered indicator */}
            <p className="text-center text-[10px] font-black uppercase tracking-widest font-mono text-[#8A8A8A] mt-6">
              {Object.keys(answers).length} of {totalQuestions} answered
            </p>
          </div>
        </section>
      ) : (
        /* ──────────────── RESULTS ──────────────── */
        <>
          {/* Overall Score */}
          <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
            <div className="max-w-3xl mx-auto">
              <FadeIn>
                <div className="rounded-2xl bg-white border border-[#E8E4E0] p-8 md:p-12 text-center">
                  <p className="eyebrow text-[#0033CC] mb-8">Your Result</p>

                  <ScoreRing score={totalScore} max={maxTotal} size={140} />

                  <div className="mt-6">
                    <span
                      className="inline-block text-sm font-black uppercase tracking-widest font-mono px-4 py-2 rounded-full"
                      style={{
                        color: getScoreLabel(totalPct).color,
                        backgroundColor: getScoreLabel(totalPct).bg,
                      }}
                    >
                      {getScoreLabel(totalPct).label}
                    </span>
                  </div>

                  <p className="text-base md:text-lg text-[#4A4A4A] leading-relaxed max-w-xl mx-auto mt-6">
                    {getOverallInsight(totalPct)}
                  </p>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* Per-Question Breakdown */}
          <section className="pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
            <div className="max-w-3xl mx-auto">
              <FadeIn>
                <p className="eyebrow text-[#0033CC] mb-6">Question-by-Question Breakdown</p>
                <h2 className="text-2xl md:text-4xl font-black text-[#1A1A1A] leading-tight mb-10">
                  What each answer reveals
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
                    />
                  );
                })}
              </div>

              {/* Retake + Back */}
              <FadeIn delay={600}>
                <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
                  <button
                    onClick={handleRetake}
                    className="btn-blue-outline inline-flex items-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Quiz</span>
                  </button>
                  <a href="/fellowship" className="btn-yellow !py-3 !px-8 gap-2">
                    <span>Explore the Fellowship</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </FadeIn>
            </div>
          </section>
        </>
      )}

      {/* ──────────────── BACK NAV ──────────────── */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto text-center">
          <a href="/" className="btn-blue-outline inline-flex items-center gap-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sciensation</span>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
