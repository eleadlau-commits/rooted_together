// Allotment: the start tab. It says what Rooted Together is, shows the person's plot request
// (from the 'profile' service, if they asked for a plot) as "With the team", lists the three
// memberships (tiers.js) and ends with Garden Share as a future plan.
// Saved data: none (the request lives in welcome's profile).

import { Feature, ui } from 'folio';
import { TIERS, PLOTS, tierFor } from './tiers.js';

const { el } = ui;
const ph = (text) => el('span', { class: 'rt-ph' }, text);

export default class Allotment extends Feature {
  start() {
    this.add('views', {
      id: 'allotment', label: 'Allotment', icon: 'home', order: 5, start: true,
      subtitle: () => 'Rooted Together',
      mount: (container) => { this.box = el('div', { class: 'rt', 'data-own-swipe': true }); container.append(this.box); },
      render: () => this.box.replaceChildren(...this.page().flat(Infinity).filter(Boolean)),
    });
  }

  page() {
    const profile = this.use('profile');
    const me = profile?.get();
    return [
      el('h2', {}, 'A community allotment bringing generations together'),
      el('p', {}, `Your own plot to grow flowers, fruit or vegetables, in a first group of up to ${PLOTS} members at `, ph('[site TBC]'), '.'),
      this.yours(profile, me),
      el('h3', {}, 'Memberships'),
      TIERS.map((t) => el('div', { class: `rt-card${me?.answers?.tier === t.id ? ' strong' : ''}` },
        el('div', { class: 'rt-row' }, el('b', { class: 'allot-tier' }, t.id), t.fee.startsWith('[') ? ph(t.fee) : el('span', { class: 'rt-pill' }, t.fee)),
        el('p', {}, t.what))),
      el('p', { class: 'rt-muted rt-small' }, 'You keep what you grow, and may sell permitted surplus at the harvest market.'),
      el('div', { class: 'rt-card allot-later' },
        el('span', { class: 'rt-pill' }, 'Future plan'),
        el('h3', {}, 'Garden Share'),
        el('p', {}, 'Later, we\'d like to match people who can no longer manage their gardens with people who want space to grow. Every first introduction would go through our team.')),
    ];
  }

  yours(profile, me) {
    if (me?.role === 'member') {
      const tier = tierFor(me.answers.tier);
      return el('div', { class: 'rt-card strong' },
        el('span', { class: 'rt-pill on' }, 'With the team'),
        el('h3', {}, `Your plot request: ${tier ? tier.id : 'membership'}`),
        el('p', {}, 'Someone from Rooted Together will get in touch about a plot. ', ph('[We aim to reply within X days]')),
        el('button', { type: 'button', class: 'rt-btn alt', onclick: () => profile.edit() }, 'Change my answers'));
    }
    if (me?.role === 'volunteer') {
      return el('div', { class: 'rt-card strong' },
        el('span', { class: 'rt-pill on' }, 'With the team'),
        el('h3', {}, 'Thank you for offering to help'),
        el('p', {}, 'We\'ll be in touch about Wednesday and Sunday sessions.'));
    }
    return profile ? el('button', { type: 'button', class: 'rt-btn', onclick: () => profile.edit() }, 'Ask for a plot') : null;
  }
}
