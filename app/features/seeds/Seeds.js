// Seed library: a tab to browse the shared seed box (stock.js), reserve a packet and return
// it. Reserved packets show under "My seeds". Collecting is from a place the team will name.
//
// Events 'seeds:reserved' { id, name } and 'seeds:returned' { id, name }.
// Saved data: 'mine' → [seed id].

import { Feature, ui } from 'folio';
import { STOCK, left, canReserve } from './stock.js';

const { el } = ui;

export default class Seeds extends Feature {
  start() {
    this.mine = this.storage.get('mine', []);
    this.add('views', {
      id: 'seeds', label: 'Seeds', icon: '<path d="M12 21V11"/><path d="M12 11C12 6 8 4 4 4c0 5 3 7 8 7zM12 13c0-4 3-6 8-6 0 4-3 6-8 6z"/>',
      order: 20, subtitle: () => 'Free to borrow',
      mount: (container) => { this.box = el('div', { class: 'rt', 'data-own-swipe': true }); container.append(this.box); },
      render: () => this.box.replaceChildren(...this.page().flat(Infinity).filter(Boolean)),
    });
  }

  page() {
    const mine = STOCK.filter((s) => this.mine.includes(s.id));
    return [
      el('h2', {}, 'Borrow seeds for free'),
      el('p', { class: 'rt-muted' }, 'Reserve a packet, then collect it from ', el('span', { class: 'rt-ph' }, '[library location]'), '. Save some seeds at the end of the season and bring them back.'),
      mine.length > 0 && el('h3', {}, 'My seeds'),
      mine.map((s) => el('div', { class: 'rt-card' }, el('div', { class: 'rt-row' },
        el('div', {}, el('b', {}, s.name), el('br'), el('span', { class: 'rt-muted' }, 'Reserved')),
        el('button', { type: 'button', class: 'rt-btn small alt', onclick: () => this.giveBack(s) }, 'Return')))),
      el('h3', {}, 'Browse'),
      el('p', { class: 'rt-example' }, 'Example stock'),
      STOCK.map((s) => el('div', { class: 'rt-card' }, el('div', { class: 'rt-row' },
        el('div', {}, el('b', {}, s.name), el('br'), el('span', { class: 'rt-muted' }, `${s.note} · ${left(s, this.mine)} left`)),
        this.mine.includes(s.id) ? el('span', { class: 'rt-pill on' }, 'Reserved')
          : canReserve(s, this.mine) ? el('button', { type: 'button', class: 'rt-btn small', onclick: () => this.reserve(s) }, 'Reserve')
            : el('span', { class: 'rt-pill' }, 'None left')))),
    ];
  }

  save() { this.storage.set('mine', this.mine); this.refresh(); }

  reserve(s) {
    this.mine = [...this.mine, s.id];
    this.save();
    this.emit('seeds:reserved', { id: s.id, name: s.name });
    this.toast(`${s.name} reserved.`);
  }

  giveBack(s) {
    this.mine = this.mine.filter((id) => id !== s.id);
    this.save();
    this.emit('seeds:returned', { id: s.id, name: s.name });
    this.toast(`Thanks for returning ${s.name}!`);
  }
}
