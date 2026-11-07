// Welcome and sign-up. On first open, a full-screen page asks "I have a garden" or "I want to
// grow", then two short steps of big buttons (questions.js) and a page to check the answers. The answers are saved on this
// phone. "Edit my details" in the menu opens it again.
//
// Service 'profile':
//   get()    → { role: 'owner' | 'grower', answers: {…} } or null before sign-up
//   isSet()  → true once someone has finished signing up
//   edit()   → opens the sign-up page again
// Event 'profile:saved' { role } after signing up or changing details.
// Saved data: 'profile' → { role, answers }.

import { Feature, ui } from 'folio';
import { AREAS, PATHS, stepDone, choose } from './questions.js';

const { el } = ui;

export default class Welcome extends Feature {
  start() {
    this.profile = this.storage.get('profile', null);
    this.provide('profile', {
      get: () => this.profile,
      isSet: () => !!this.profile,
      edit: () => this.open(),
    });
    this.add('header.buttons', { id: 'details', label: 'Edit my details', icon: 'note', order: 20, onClick: () => this.open() });
    this.add('safety.notes', { order: 10, text: () => 'Sign-up only asks for a rough area, never your street, house number or phone number.' });
    this.on('app:ready', () => { if (!this.profile) this.open(); });
  }

  open() {
    if (!this.window) this.window = ui.dialog({ title: 'Welcome', className: 'welcome-dialog' });
    this.draft = { role: this.profile?.role || null, answers: { ...(this.profile?.answers || {}) } };
    this.step = this.profile ? 0 : -1; // -1 is the "what would you like to do?" page
    this.draw();
    this.window.open();
  }

  draw() {
    const path = PATHS[this.draft.role];
    this.window.setTitle(this.step < 0 ? 'Welcome' : path.title);
    const page = this.step < 0 ? this.choosePage() : this.step >= path.steps.length ? this.checkPage(path) : this.stepPage(path);
    this.window.setContent(el('div', { class: 'rt welcome' }, page));
    this.window.content.scrollTop = 0;
  }

  choosePage() {
    const pick = (role) => () => { this.draft = { role, answers: {} }; this.step = 0; this.draw(); };
    return [
      el('h2', {}, 'Welcome to Rooted Together! What would you like to do?'),
      el('p', { class: 'rt-muted' }, 'Choose one. You can change it later.'),
      el('button', { type: 'button', class: 'rt-choice', onclick: pick('owner') }, el('b', {}, 'I have a garden'), el('span', {}, 'I\'d like some help, and some company.')),
      el('button', { type: 'button', class: 'rt-choice', onclick: pick('grower') }, el('b', {}, 'I want to grow'), el('span', {}, 'I\'d like some space to grow food.')),
      el('div', { class: 'rt-safe' }, ui.icon('help'), el('span', {}, 'We never show your address or phone number. Our team arranges every first meeting.')),
    ];
  }

  stepPage(path) {
    const step = path.steps[this.step];
    const last = this.step === path.steps.length - 1;
    const answers = this.draft.answers;
    return [
      el('p', { class: 'rt-eyebrow' }, `Step ${this.step + 1} of ${path.steps.length}`),
      el('h2', {}, step.heading),
      step.questions.map((q) => this.question(q, answers)),
      el('button', {
        type: 'button', class: 'rt-btn', disabled: !stepDone(step, answers),
        onclick: () => { this.step += 1; this.draw(); },
      }, last ? 'Check my answers' : 'Next'),
      el('button', { type: 'button', class: 'rt-btn alt', onclick: () => { this.step -= 1; this.draw(); } }, 'Back'),
    ];
  }

  // The last page: every answer in plain words, with a way back to change them.
  checkPage(path) {
    const answers = this.draft.answers;
    const rows = path.steps.flatMap((step) => step.questions).map((q) => {
      const v = answers[q.key];
      return [el('dt', {}, q.check || q.label), el('dd', {}, Array.isArray(v) ? v.join(', ') : v)];
    });
    return [
      el('p', { class: 'rt-eyebrow' }, 'Nearly done'),
      el('h2', {}, 'Check your answers'),
      el('div', { class: 'rt-card' }, el('dl', { class: 'rt-facts welcome-check' }, rows)),
      el('button', { type: 'button', class: 'rt-btn', onclick: () => this.finish() }, path.finish),
      el('button', { type: 'button', class: 'rt-btn alt', onclick: () => { this.step = 0; this.draw(); } }, 'Change my answers'),
    ];
  }

  question(q, answers) {
    if (q.kind === 'area') {
      const id = `welcome-area-${this.draft.role}`;
      const select = el('select', { id, onchange: () => { answers.area = select.value || null; this.draw(); } },
        el('option', { value: '' }, 'Choose an area'),
        AREAS.map((a) => el('option', { value: a, selected: answers.area === a }, a)));
      return el('div', { class: 'rt-q' }, el('label', { for: id }, q.label), select, q.note && el('p', { class: 'rt-muted rt-small' }, q.note));
    }
    const value = answers[q.key];
    return el('div', { class: 'rt-q', role: 'group', 'aria-label': q.label },
      el('span', { class: 'rt-label' }, q.label),
      el('div', { class: 'rt-chips' }, q.options.map((o) => el('button', {
        type: 'button', class: 'rt-chip',
        'aria-pressed': String(Array.isArray(value) ? value.includes(o) : value === o),
        onclick: () => { answers[q.key] = choose(q, value, o); this.draw(); },
      }, o))));
  }

  finish() {
    this.profile = { role: this.draft.role, answers: this.draft.answers };
    this.storage.set('profile', this.profile);
    this.window.close();
    this.emit('profile:saved', { role: this.profile.role });
    this.app.shell.selectView('match');
    this.refresh();
    this.toast('You\'re signed up. Here\'s a suggested match.');
  }
}
