// The garden log's rules, with no screen code: totals and checking a new entry.

// → { jobs, kg } over the whole log.
export function totals(log) {
  return {
    jobs: log.filter((e) => e.type === 'job').length,
    kg: Math.round(log.reduce((t, e) => t + (e.type === 'food' ? Number(e.kg) || 0 : 0), 0) * 10) / 10,
  };
}

// An error message for a new entry, or null when it's fine.
export function problem(type, text, kg) {
  if (!text.trim()) return 'Please write a few words first.';
  if (type === 'food' && !(Number(kg) > 0)) return 'Please add roughly how many kg.';
  return null;
}

export const EXAMPLES = [
  { type: 'job', text: 'Sowed runner beans', example: true },
  { type: 'food', text: 'Picked salad leaves', kg: 0.5, example: true },
  { type: 'job', text: 'Weeded the vegetable bed', example: true },
];
