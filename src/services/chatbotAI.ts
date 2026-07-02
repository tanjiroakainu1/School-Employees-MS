import type { ChatContext } from '@/types/chatbot';
import { knowledgeBase } from '@/data/chatbotKnowledge';
import { chatbotIdentity } from '@/data/chatbotQuickQuestions';
import { roleSummaries } from '@/config/systemInfo';

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function scoreMatch(query: string, keywords: string[]): number {
  const nq = normalize(query);
  let score = 0;

  for (const kw of keywords) {
    const nk = normalize(kw);
    if (nq === nk) score += 100;
    else if (nq.includes(nk)) score += 50 + nk.length;
    else {
      const words = nk.split(' ').filter((w) => w.length > 2);
      const matched = words.filter((w) => nq.includes(w));
      score += matched.length * 12;
    }
  }

  return score;
}

function formatMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.*?)`/g, '<code class="rounded bg-primary-100 px-1 py-0.5 text-xs text-primary-800">$1</code>')
    .replace(/\n/g, '<br/>');
}

export interface AIResponse {
  content: string;
  html: string;
  confidence: 'high' | 'medium' | 'low';
  source: 'knowledge' | 'fallback' | 'general';
}

export function generateAIResponse(
  query: string,
  context: ChatContext,
  userName?: string,
): AIResponse {
  const nq = normalize(query);

  if (!nq || nq.length < 2) {
    return {
      content: "Could you please rephrase your question? I'm here to help with SEMS and education topics!",
      html: "Could you please rephrase your question? I'm here to help with SEMS and education topics!",
      confidence: 'low',
      source: 'fallback',
    };
  }

  let bestScore = 0;
  let bestAnswer = '';

  for (const entry of knowledgeBase) {
    if (entry.roles && context !== 'home' && context !== 'login' && context !== 'register' && context !== 'guest') {
      if (!entry.roles.includes(context as typeof entry.roles[0])) continue;
    }

    const score = scoreMatch(query, entry.keywords);
    if (score > bestScore) {
      bestScore = score;
      bestAnswer = entry.answer;
    }
  }

  if (bestScore >= 24) {
    const greeting = userName ? `\n\n_Helping ${userName} · ${roleSummaries.find(r => r.role === context)?.label || 'SEMS'}_` : '';
    const content = bestAnswer + (bestScore >= 50 ? '' : '\n\n_Need more detail? Try rephrasing or pick a quick question!_');
    return {
      content: bestAnswer,
      html: formatMarkdown(content) + (greeting ? `<br/><br/><em class="text-xs text-ink-400">${userName ? `Helping ${userName}` : ''}</em>` : ''),
      confidence: bestScore >= 50 ? 'high' : 'medium',
      source: 'knowledge',
    };
  }

  return generateFallbackResponse(query, context, userName);
}

function generateFallbackResponse(query: string, context: ChatContext, userName?: string): AIResponse {
  const nq = normalize(query);

  if (nq.includes('time') || nq.includes('date') || nq.includes('today')) {
    const now = new Date();
    const content = `📅 **Current Date & Time:**\n${now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}\n${now.toLocaleTimeString('en-US')}\n\nSchool tip: Regular attendance tracking (available in SEMS!) helps identify patterns on specific days.`;
    return { content, html: formatMarkdown(content), confidence: 'medium', source: 'general' };
  }

  if (nq.includes('joke') || nq.includes('funny')) {
    const jokes = [
      "Why did the teacher go to the beach? To test the waters... for the school swimming program! 🏖️",
      "What do you call a teacher who never farts in public? A private tutor! 😄",
      "Why was the math book sad? It had too many problems! 📐",
    ];
    const content = jokes[Math.floor(Math.random() * jokes.length)] + "\n\nNeed help with SEMS? I'm serious about that! 🎓";
    return { content, html: formatMarkdown(content), confidence: 'low', source: 'general' };
  }

  if (query.match(/\d+\.?\d*\s*[\+\-\*\/]\s*\d+\.?\d*/)) {
    try {
      const match = query.match(/(\d+\.?\d*)\s*([\+\-\*\/])\s*(\d+\.?\d*)/);
      if (match) {
        const [, a, op, b] = match;
        const ops: Record<string, (x: number, y: number) => number> = {
          '+': (x, y) => x + y,
          '-': (x, y) => x - y,
          '*': (x, y) => x * y,
          '/': (x, y) => x / y,
        };
        const result = ops[op](parseFloat(a), parseFloat(b));
        const content = `🧮 **Calculation:** ${a} ${op} ${b} = **${result}**\n\nFun fact: SEMS tracks ${4} roles managing school operations — much more complex than arithmetic!`;
        return { content, html: formatMarkdown(content), confidence: 'medium', source: 'general' };
      }
    } catch { /* ignore */ }
  }

  const contextLabel = roleSummaries.find((r) => r.role === context)?.label || 'SEMS';
  const content = `I searched my knowledge base for "${query}" but didn't find an exact match. Here's what I can help with as **${chatbotIdentity.name}**:\n\n• **${contextLabel}** features & how-to guides\n• Demo data, credentials & workflows\n• HR, education & leadership topics worldwide\n\n💡 **Try asking:**\n• "How do I ${context === 'employee' ? 'submit leave' : context === 'hr-officer' ? 'approve leave' : context === 'department-head' ? 'assign tasks' : context === 'super-admin' ? 'manage users' : 'get started'}?"\n• "What are the demo login credentials?"\n• "Explain the leave approval workflow"\n\nOr tap a **Quick Question** chip below! ${userName ? `\n\n_Happy to help you, ${userName}!_` : ''}`;

  return {
    content,
    html: formatMarkdown(content),
    confidence: 'low',
    source: 'fallback',
  };
}

/** Run automated tests against the AI engine */
export function runChatbotTests(): { passed: number; failed: number; results: string[] } {
  const tests = [
    { q: 'What is SEMS?', expect: 'School Employees Management System' },
    { q: 'demo password', expect: 'password123' },
    { q: 'How do I submit leave?', expect: 'Leave Request' },
    { q: 'hello', expect: 'SAGE' },
    { q: 'approve leave hr', expect: 'Leave Approval' },
    { q: 'teacher burnout tips', expect: 'Burnout' },
    { q: 'assign tasks department', expect: 'Assign Tasks' },
    { q: 'export reports admin', expect: 'Export' },
    { q: '2 + 2', expect: '4' },
    { q: 'who are you', expect: 'SAGE' },
    { q: 'leave types', expect: 'Vacation' },
    { q: 'sidebar features employee', expect: 'My Profile' },
    { q: 'monitor attendance department', expect: 'Attendance Monitoring' },
    { q: 'classroom management tips', expect: 'Classroom Management' },
    { q: 'who built sems', expect: 'Raminder Jangao' },
  ];

  const results: string[] = [];
  let passed = 0;
  let failed = 0;

  for (const t of tests) {
    const res = generateAIResponse(t.q, 'home');
    const ok = res.content.toLowerCase().includes(t.expect.toLowerCase()) || res.html.toLowerCase().includes(t.expect.toLowerCase());
    if (ok) {
      passed++;
      results.push(`✅ "${t.q}" → matched "${t.expect}" (${res.confidence})`);
    } else {
      failed++;
      results.push(`❌ "${t.q}" → expected "${t.expect}", got: ${res.content.slice(0, 80)}...`);
    }
  }

  return { passed, failed, results };
}
