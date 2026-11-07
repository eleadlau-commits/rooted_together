// About the team: a menu row that opens a page about Team Green Durham and the four UN
// Sustainable Development Goals the project supports. Names stay placeholders until the team
// adds them. Saved data: none.

import { Feature, ui } from 'folio';

const { el } = ui;

const GOALS = ['2 Zero hunger', '3 Good health and wellbeing', '11 Sustainable cities and communities', '12 Responsible consumption and production'];

export default class About extends Feature {
  start() {
    this.add('header.buttons', { id: 'team', label: 'About the team', icon: 'people', order: 40, onClick: () => this.open() });
  }

  open() {
    if (!this.window) {
      this.window = ui.dialog({ title: 'About the team', className: 'team-dialog' });
      this.window.setContent(el('div', { class: 'rt' },
        el('h2', {}, 'Team Green Durham'),
        el('p', {}, 'We\'re students from Durham University\'s Enactus society. ', el('span', { class: 'rt-ph' }, '[Team names and roles]')),
        el('h3', {}, 'Why we\'re doing this'),
        el('p', {}, 'Notice the overgrown gardens around Durham? Older people have the space, students have the energy, and nobody is bringing them together. Elderly cannot manage them, and students have no space. Both are missing out on fresh food, exercise, companionship and learning from each other.'),
        el('p', {}, 'Rooted Together pairs people who have a garden with people who want to grow food. It also runs a seed library, harvest markets and an end of season festival.'),
        el('h3', {}, 'UN goals we support'),
        el('div', { class: 'rt-chips' }, GOALS.map((g) => el('span', { class: 'rt-pill' }, g))),
        el('p', { class: 'rt-muted rt-small' }, 'This is a draft for testing. ', el('span', { class: 'rt-ph' }, '[contact email]'))));
    }
    this.window.open();
  }
}
