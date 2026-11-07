// The sign-up questions for each path, and whether a step is answered, with no screen code.
// The area is a rough neighbourhood only: there is never a box for a street, house or phone.

export const AREAS = ['Belmont', 'Elvet', 'Framwellgate Moor', 'Gilesgate', 'Neville\'s Cross', 'Newton Hall', 'Pity Me', 'Sherburn Road', 'Other or not sure'];

export const PATHS = {
  owner: {
    title: 'Your garden',
    finish: 'Find me a grower',
    steps: [
      { heading: 'Tell us about your garden', questions: [
        { key: 'size', label: 'How big is it?', kind: 'one', options: ['Small', 'Medium', 'Large'] },
        { key: 'area', label: 'Roughly where is it?', kind: 'area', note: 'Just the area. Please don\'t add your street or house number.' },
      ] },
      { heading: 'What help would you like?', questions: [
        { key: 'help', label: 'Pick any that fit', kind: 'many', options: ['Weeding', 'Growing vegetables', 'Mowing the lawn', 'Pruning', 'Just some company'] },
        { key: 'visits', label: 'How often can a grower visit?', kind: 'one', options: ['Once a week', 'Twice a week', 'Once a fortnight', 'Not sure yet'] },
      ] },
    ],
  },
  grower: {
    title: 'About you',
    finish: 'Find me a garden',
    steps: [
      { heading: 'What would you like to grow?', questions: [
        { key: 'interests', label: 'Pick any that interest you', kind: 'many', options: ['Vegetables', 'Fruit', 'Herbs', 'Flowers', 'Anything!'] },
        { key: 'experience', label: 'How much growing have you done?', kind: 'one', options: ['None yet', 'A little', 'Lots'] },
      ] },
      { heading: 'When are you free?', questions: [
        { key: 'free', label: 'Pick any that fit', kind: 'many', options: ['Weekday mornings', 'Weekday afternoons', 'Evenings', 'Weekends'] },
        { key: 'area', label: 'Which area suits you?', kind: 'area' },
      ] },
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
