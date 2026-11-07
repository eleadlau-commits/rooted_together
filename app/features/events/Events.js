// What's on: the Wednesday and Sunday sessions, the seasons, then the harvest market and the end of season festival. Dates and venues are
// placeholders until the team sets them. "Remind me" is remembered on this phone; in the real
// app it would send a reminder once a date is set.
//
// Saved data: 'remind' → [event id].

import { Feature, ui } from 'folio';

const { el } = ui;

const WEEK = [
  { day: 'Wednesdays', name: 'Social Gardening', about: 'A relaxed afternoon to tend your plot and enjoy each other\'s company.',
    things: ['Gardening on your plot', 'Music-sharing across generations', 'Shared picnics and refreshments'] },
  { day: 'Sundays', name: 'Community and Skills', about: 'Learning, sharing skills and helping local wildlife.',
    things: ['Gardening workshops', 'Older members teaching growing skills', 'Bird feeders, hedgehog shelters and insect homes', 'Composting and recycling'] },
];

const SEASONS = [
  ['Spring', 'Planting days, seed sharing and preparing plots'],
  ['Summer', 'Gardening, outdoor socials and environmental workshops'],
  ['Autumn', 'Harvest celebrations and the community market'],
  ['Winter', 'Seed library, planning and indoor workshops'],
];

const EVENTS = [
  { id: 'market', name: 'Harvest market', about: 'Growers share and sell what they\'ve grown at the end of each crop cycle.' },
  { id: 'festival', name: 'End of season festival', about: 'Food, music and a big thank you to everyone who grew with us.' },
];

export default class Events extends Feature {
  start() {
    this.remind = this.storage.get('remind', []);
    this.add('views', {
      id: 'events', label: 'What\'s on', icon: 'calendar', order: 30, subtitle: () => 'Every week',
      mount: (container) => { this.box = el('div', { class: 'rt', 'data-own-swipe': true }); container.append(this.box); },
      render: () => this.box.replaceChildren(...this.page().flat(Infinity).filter(Boolean)),
    });
  }

  page() {
    return [
      el('h2', {}, 'Every week'),
      WEEK.map((w) => el('div', { class: 'rt-card' },
        el('span', { class: 'rt-pill on' }, w.day),
        el('h3', {}, w.name),
        el('p', {}, w.about),
        el('ul', { class: 'week-list' }, w.things.map((t) => el('li', {}, t))),
        el('p', { class: 'rt-muted rt-small' }, 'Times: ', el('span', { class: 'rt-ph' }, '[TBC]')))),
      el('h3', {}, 'Through the year'),
      el('dl', { class: 'rt-facts' }, SEASONS.map(([s, what]) => [el('dt', {}, s), el('dd', {}, what)])),
      el('h3', {}, 'Coming up'),
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
            on ? '✓ On your list' : 'Remind me'));
      }),
    ];
  }

  toggle(e) {
    const on = this.remind.includes(e.id);
    this.remind = on ? this.remind.filter((id) => id !== e.id) : [...this.remind, e.id];
    this.storage.set('remind', this.remind);
    this.refresh();
    if (!on) this.toast(`Added to your list. In this draft no reminder is sent yet.`);
  }
}
