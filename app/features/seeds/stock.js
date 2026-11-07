// The seed library's example stock and the rules for reserving and returning, with no screen
// code. Counts are examples for the prototype; the team will add the real stock.

export const STOCK = [
  { id: 'runner-beans', name: 'Runner beans', note: 'Easy for beginners', count: 6 },
  { id: 'kale', name: 'Kale', note: 'Good in small spaces', count: 4 },
  { id: 'courgette', name: 'Courgette', note: 'Big harvests', count: 0 },
  { id: 'salad', name: 'Salad leaves', note: 'Quick to grow', count: 8 },
  { id: 'potatoes', name: 'Seed potatoes', note: 'Needs a bigger bed', count: 3 },
];

// How many are left once this phone's reservations are taken off.
export function left(seed, mine) {
  return Math.max(0, seed.count - (mine.includes(seed.id) ? 1 : 0));
}

export function canReserve(seed, mine) {
  return !mine.includes(seed.id) && seed.count > 0;
}
