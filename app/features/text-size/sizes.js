// The text sizes people can choose, with no screen code. 'scale' zooms the whole app.
export const SIZES = [
  { id: 'normal', label: 'Normal', scale: 1 },
  { id: 'large', label: 'Larger', scale: 1.15 },
  { id: 'largest', label: 'Largest', scale: 1.3 },
];

export function scaleFor(id) {
  return (SIZES.find((s) => s.id === id) || SIZES[0]).scale;
}

// The next size up, going back to Normal after Largest.
export function nextSize(id) {
  const i = SIZES.findIndex((s) => s.id === id);
  return SIZES[(i + 1) % SIZES.length].id;
}
