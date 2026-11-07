// Keeping everyone safe: a row in the menu that opens the safeguarding page. The page starts
// with the scheme's own promises (rules.js), then lists the notes other features add through
// the 'safety.notes' slot, so the page always says what the app really does.
//
// Slot 'safety.notes': Item: { order, text() → one sentence }.
// Saved data: none.

import { Feature, ui } from 'folio';
import { PROMISES, CONTACT_PLACEHOLDER, CHECKS_PLACEHOLDER } from './rules.js';

const { el } = ui;

export default class Safeguarding extends Feature {
  start() {
    this.defineSlot('safety.notes', 'A line on the safeguarding page about what a feature does to keep people safe. Item: { order, text() → one sentence }.');
    this.add('header.buttons', { id: 'safety', label: 'Keeping everyone safe', icon: 'help', order: 30, onClick: () => this.open() });
  }

  open() {
    if (!this.window) this.window = ui.dialog({ title: 'Keeping everyone safe', className: 'safety-dialog' });
    const notes = this.slot('safety.notes').map((n) => n.text()).filter(Boolean);
    this.window.setContent(el('div', { class: 'rt' },
      el('h2', {}, 'Your safety comes first'),
      el('ul', { class: 'safety-list' }, [...PROMISES, ...notes].map((line) => el('li', {}, line))),
      el('div', { class: 'rt-card' },
        el('h3', {}, 'Checks'),
        el('p', {}, el('span', { class: 'rt-ph' }, CHECKS_PLACEHOLDER))),
      el('div', { class: 'rt-card' },
        el('h3', {}, 'Worried about something?'),
        el('p', {}, 'Talk to ', el('span', { class: 'rt-ph' }, CONTACT_PLACEHOLDER), '.'))));
    this.window.open();
  }
}
