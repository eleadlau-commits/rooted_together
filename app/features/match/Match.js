// Match: the start tab. It shows one suggested match (examples.js) for the person's role from
// the 'profile' service. "Request an introduction" records the request as "With the team":
// the team contacts both people first, and the app never contacts the other person.
// Without a profile (or without the welcome feature) it asks the person to tell us about
// themselves first.
//
// Event 'intro:requested' { matchId }.
// Saved data: 'requests' → [{ matchId, at }].

import { Feature, ui } from 'folio';
import { GARDENS, GROWERS, next } from './examples.js';

const { el } = ui;

export default class Match extends Feature {
  start() {
    this.index = 0;
    this.requests = this.storage.get('requests', []);
    this.add('safety.notes', { order: 20, text: () => 'Asking for an introduction goes to our team first. Addresses are only shared after the team has met you both.' });
    this.on('profile:saved', () => { this.index = 0; });
    this.add('views', {
      id: 'match', label: 'Match', icon: 'people', order: 10, start: true,
      subtitle: () => 'Garden Share',
      mount: (container) => { this.box = el('div', { class: 'rt', 'data-own-swipe': true }); container.append(this.box); },
      render: () => this.box.replaceChildren(...this.page().flat(Infinity).filter(Boolean)),
    });
  }

  page() {
    const profile = this.use('profile');
    const me = profile?.get();
    if (!me) {
      return [
        el('h2', {}, 'Tell us about you, and we\'ll suggest a match'),
        el('p', { class: 'rt-muted' }, 'It takes two short steps.'),
        profile ? el('button', { type: 'button', class: 'rt-btn', onclick: () => profile.edit() }, 'Get started') : ui.missing('Sign-up isn\'t in this version.'),
      ];
    }
    const owner = me.role === 'owner';
    const list = owner ? GROWERS : GARDENS;
    const match = list[this.index % list.length];
    const asked = this.requests.some((r) => r.matchId === match.id);
    return [
      el('h2', {}, owner ? 'We think you\'d get on' : 'Here\'s a garden for you'),
      el('div', { class: 'rt-card strong' },
        el('p', { class: 'rt-example' }, 'Example match'),
        owner ? this.growerCard(match, me) : this.gardenCard(match)),
      el('div', { class: 'rt-safe' }, ui.icon('help'), el('span', {},
        `Requests go to our team first, never straight to ${owner ? 'the grower' : 'the garden owner'}.`)),
      asked
        ? el('div', { class: 'rt-card' }, el('span', { class: 'rt-pill on' }, 'With the team'),
          el('h3', {}, 'Request sent to our team'),
          el('p', {}, 'Someone from Rooted Together will contact you first to talk it through and arrange a meeting. ', el('span', { class: 'rt-ph' }, '[We aim to reply within X days]')))
        : this.confirming === match.id
          ? el('div', { class: 'rt-card strong' },
            el('h3', {}, 'Send this request to our team?'),
            el('p', {}, 'Someone from Rooted Together will get in touch with you first. Nobody else sees your details.'),
            el('button', { type: 'button', class: 'rt-btn', onclick: () => this.request(match) }, 'Yes, send it'),
            el('button', { type: 'button', class: 'rt-btn alt', onclick: () => { this.confirming = null; this.refresh(); } }, 'Not now'))
          : el('button', { type: 'button', class: 'rt-btn', onclick: () => { this.confirming = match.id; this.refresh(); } }, 'Request an introduction'),
      el('button', { type: 'button', class: 'rt-btn alt', onclick: () => { this.index = next(list, this.index); this.confirming = null; this.refresh(); } }, 'Show me someone else'),
    ];
  }

  gardenCard(g) {
    return [el('h3', {}, g.size), el('dl', { class: 'rt-facts' },
      el('dt', {}, 'Area'), el('dd', {}, g.area),
      el('dt', {}, 'Help wanted'), el('dd', {}, g.help),
      el('dt', {}, 'Visits'), el('dd', {}, g.visits))];
  }

  growerCard(p, me) {
    return [el('h3', {}, 'A grower near you'), el('dl', { class: 'rt-facts' },
      el('dt', {}, 'Likes'), el('dd', {}, p.likes),
      el('dt', {}, 'Experience'), el('dd', {}, p.experience),
      el('dt', {}, 'Free'), el('dd', {}, p.free),
      el('dt', {}, 'Area'), el('dd', {}, me.answers.area || 'Durham'))];
  }

  request(match) {
    this.confirming = null;
    this.requests.push({ matchId: match.id, at: Date.now() });
    this.storage.set('requests', this.requests);
    this.emit('intro:requested', { matchId: match.id });
    this.refresh();
    this.toast('Sent to the Rooted Together team.');
  }
}
