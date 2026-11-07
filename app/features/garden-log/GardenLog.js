// My garden: a tab with a simple log of jobs done and food picked, and their totals. Starts with
// three entries marked as examples. Reserving seeds (if the seed library is there) adds a line.
//
// Service 'impact': totals() → { jobs, kg }, for a team dashboard later.
// Saved data: 'log' → [{ type: 'job' | 'food', text, kg?, at, example? }], newest first.

import { Feature, ui } from 'folio';
import { totals, problem, EXAMPLES } from './log.js';

const { el } = ui;

export default class GardenLog extends Feature {
  start() {
    this.log = this.storage.get('log', EXAMPLES);
    this.type = 'job';
    this.provide('impact', { totals: () => totals(this.log) });
    this.on('seeds:reserved', ({ name }) => this.addEntry({ type: 'job', text: `Reserved ${name} seeds` }));
    this.add('views', {
      id: 'garden', label: 'My garden', icon: 'home', order: 40, subtitle: () => 'Your log',
      mount: (container) => { this.box = el('div', { class: 'rt', 'data-own-swipe': true }); container.append(this.box); },
      render: () => this.box.replaceChildren(...this.page().flat(Infinity).filter(Boolean)),
    });
  }

  page() {
    const t = totals(this.log);
    const food = this.type === 'food';
    const text = el('input', { type: 'text', id: 'log-text', placeholder: food ? 'e.g. Courgettes' : 'e.g. Watered the beans' });
    const kg = food && el('input', { type: 'number', id: 'log-kg', min: '0', step: '0.1', inputmode: 'decimal', placeholder: 'e.g. 1.5' });
    const error = ui.errorBox();
    const kind = (value, label) => el('button', { type: 'button', class: 'rt-chip', 'aria-pressed': String(this.type === value), onclick: () => { this.type = value; this.refresh(); } }, label);
    return [
      el('h2', {}, 'What have you done this week?'),
      el('div', { class: 'log-totals' },
        el('div', { class: 'rt-card' }, el('strong', { class: 'log-num' }, String(t.jobs)), 'jobs done'),
        el('div', { class: 'rt-card' }, el('strong', { class: 'log-num' }, t.kg.toFixed(1)), 'kg of food grown')),
      el('div', { class: 'rt-card' },
        el('h3', {}, 'Add to your log'),
        el('div', { class: 'rt-chips' }, kind('job', 'A job I did'), kind('food', 'Food I picked')),
        el('div', { class: 'rt-q' }, el('label', { for: 'log-text' }, food ? 'What did you pick?' : 'What did you do?'), text),
        kg && el('div', { class: 'rt-q' }, el('label', { for: 'log-kg' }, 'Roughly how much? (kg)'), kg),
        error,
        el('button', { type: 'button', class: 'rt-btn', onclick: () => {
          const message = problem(this.type, text.value, kg?.value);
          if (message) { error.show(message); return; }
          this.addEntry(food ? { type: 'food', text: text.value.trim(), kg: Math.round(Number(kg.value) * 10) / 10 } : { type: 'job', text: text.value.trim() });
          this.toast('Added to your log.');
        } }, 'Add')),
      el('h3', {}, 'Your log'),
      el('ul', { class: 'log-list' }, this.log.map((e) => el('li', { class: e.type },
        e.text, e.kg ? ` · ${e.kg} kg` : '', e.example && el('span', { class: 'rt-example' }, ' (example)')))),
      el('p', { class: 'rt-muted rt-small' }, 'Your log helps us show the difference Rooted Together makes. ', el('span', { class: 'rt-ph' }, '[How impact data is used and stored]')),
    ];
  }

  addEntry(entry) {
    this.log = [{ ...entry, at: Date.now() }, ...this.log];
    this.storage.set('log', this.log);
    this.refresh();
  }
}
