// Example matches for the prototype, clearly marked as examples on screen. They describe a
// garden or a grower by rough area and needs only: no names, addresses or phone numbers.

export const GARDENS = [
  { id: 'g1', size: 'A medium garden', area: 'Gilesgate', help: 'Growing vegetables, weeding', visits: 'Once a week' },
  { id: 'g2', size: 'A small garden', area: 'Newton Hall', help: 'Just some company, pruning', visits: 'Once a fortnight' },
  { id: 'g3', size: 'A large garden', area: 'Belmont', help: 'Growing vegetables, mowing the lawn', visits: 'Twice a week' },
];

export const GROWERS = [
  { id: 'p1', likes: 'Vegetables and herbs', experience: 'A little', free: 'Weekends' },
  { id: 'p2', likes: 'Fruit and flowers', experience: 'Lots', free: 'Weekday mornings' },
  { id: 'p3', likes: 'Anything!', experience: 'None yet', free: 'Evenings' },
];

// The next example after `index`, going back to the first after the last.
export function next(list, index) {
  return (index + 1) % list.length;
}
