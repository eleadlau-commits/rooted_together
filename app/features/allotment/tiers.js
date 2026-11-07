// The three memberships, from Team Green Durham's plan. Fees stay placeholders until checked.
export const TIERS = [
  { id: 'Starter', what: 'A smaller growing plot and shared community activities.', fee: '[£ fee TBC]' },
  { id: 'Standard', what: 'A larger plot, the seed library and workshops.', fee: '[£ fee TBC]' },
  { id: 'Supported', what: 'Reduced-cost or sponsored, for anyone who may struggle to afford the standard fee.', fee: 'Reduced or sponsored' },
];

export const PLOTS = 20; // the first group, from the plan

export function tierFor(id) {
  return TIERS.find((t) => t.id === id) || null;
}
