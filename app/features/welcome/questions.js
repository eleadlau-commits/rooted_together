// The sign-up questions for each path, and whether a step is answered, with no screen code.
// There is never a box for an address or phone number.

export const AREAS = ['Belmont', 'Elvet', 'Framwellgate Moor', 'Gilesgate', 'Neville\'s Cross', 'Newton Hall', 'Pity Me', 'Sherburn Road', 'Other or not sure'];

export const PATHS = {
  member: {
    title: 'Your plot',
    finish: 'Ask for a plot',
    steps: [
      { heading: 'Which membership suits you?', questions: [
        { key: 'tier', label: 'Choose one', check: 'Membership', kind: 'one', options: ['Starter', 'Standard', 'Supported'] },
      ] },
      { heading: 'What would you like to grow?', questions: [
        { key: 'interests', label: 'Pick any that interest you', check: 'What you would like to grow', kind: 'many', options: ['Vegetables', 'Fruit', 'Herbs', 'Flowers', 'Anything!'] },
        { key: 'experience', label: 'How much growing have you done?', kind: 'one', options: ['None yet', 'A little', 'Lots'] },
      ] },
      { heading: 'Which days suit you?', questions: [{ key: 'days', label: 'Pick any that suit you', check: 'Days', kind: 'many', options: ['Wednesday: Social Gardening', 'Sunday: Community and Skills'] }] },
    ],
  },
  volunteer: {
    title: 'Helping out',
    finish: 'Offer to help',
    steps: [
      { heading: 'How would you like to help?', questions: [
        { key: 'help', label: 'Pick any that fit', check: 'How you would like to help', kind: 'many', options: ['Teaching growing skills', 'Running a workshop', 'Sharing music', 'Building wildlife homes', 'Refreshments', 'Anything!'] },
      ] },
      { heading: 'Which days suit you?', questions: [{ key: 'days', label: 'Pick any that suit you', check: 'Days', kind: 'many', options: ['Wednesday: Social Gardening', 'Sunday: Community and Skills'] }] },
    ],
  },
};

// Has every question on this step been answered?
export function stepDone(step, answers) {
  return step.questions.every((q) => {
    const v = answers[q.key];
    return Array.isArray(v) ? v.length > 0 : !!v;
  });
}

// Tapping an option: one-choice questions switch, many-choice questions add or remove.
export function choose(question, current, option) {
  if (question.kind === 'many') {
    const list = Array.isArray(current) ? current : [];
    return list.includes(option) ? list.filter((o) => o !== option) : [...list, option];
  }
  return current === option ? null : option;
}
