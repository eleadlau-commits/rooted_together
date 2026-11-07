// Events: a tab listing the harvest market and the end of season festival. Dates and venues are
// placeholders until the team sets them. "Remind me" is remembered on this phone; in the real
// app it would send a reminder once a date is set.
//
// Saved data: 'remind' → [event id].

import { Feature, ui } from 'folio';

const { el } = ui;

const EVENTS = [
  { id: 'market', name: 'Harvest market', about: 'Growers share and sell what they\'ve grown at the end of each crop cycle.' },
  { id: 'festival', name: 'End of season festival', about: 'Food, music and a big thank you to everyone who grew with us.' },
];

export default class Events extends Feature {
  start() {
    this.remind = this.storage.get('remind', []);
    this.add('views', {
      id: 'events', label: 'Events', icon: 'calendar', order: 30, subtitle: () => 'Dates coming soon',
      mount: (container) => { this.box = el('div', { class: 'rt', 'data-own-swipe': true }); container.append(this.box); },
      render: () => this.box.replaceChildren(...this.page().flat(Infinity).filter(Boolean)),
    });
  }

  page() {
    return [
      el('h2', {}, 'Coming up'),
      EVENTS.map((e) => {
        const on = this.remind.includes(e.id);
        return el('div', { class: 'rt-card' },
          el('span', { class: 'rt-pill on' }, 'Dates coming soon'),
          el('h3', {}, e.name),
          el('p', {}, e.about),
          el('dl', { class: 'rt-facts' },
            el('dt', {}, 'When'), el('dd', {}, el('span', { class: 'rt-ph' }, '[date TBC]')),
            el('dt', {}, 'Where'), el('dd', {}, el('span', { class: 'rt-ph' }, '[venue TBC]'))),
          el('button', { type: 'button', class: 'rt-btn alt', 'aria-pressed': String(on), onclick: () => this.toggle(e) },
            on ? '✓ We\'ll remind you' : 'Remind me'));
      }),
    ];
  }

  toggle(e) {
    const on = this.remind.includes(e.id);
    this.remind = on ? this.remind.filter((id) => id !== e.id) : [...this.remind, e.id];
    this.storage.set('remind', this.remind);
    this.refresh();
    if (!on) this.toast(`We'll remind you about the ${e.name.toLowerCase()} once the date is set.`);
  }
}
