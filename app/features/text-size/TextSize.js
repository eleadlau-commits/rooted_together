// Text size: Normal, Larger or Largest, chosen in Settings, or stepped up with "Bigger text" in
// the menu. It zooms the whole app, pop-ups included, and is remembered on this phone.
// Saved data: 'size' → 'normal' | 'large' | 'largest'.

import { Feature, ui } from 'folio';
import { SIZES, scaleFor, nextSize } from './sizes.js';

const { el } = ui;

export default class TextSize extends Feature {
  start() {
    this.size = this.storage.get('size', 'normal');
    this.apply();
    this.add('header.buttons', { id: 'text-size', label: 'Bigger text', icon: 'plus', order: 50,
      onClick: () => { this.set(nextSize(this.size)); this.toast(`Text size: ${SIZES.find((s) => s.id === this.size).label}`); } });
    this.add('settings', { id: 'text-size', title: 'Text size', order: 10, render: () => el('div', { class: 'rt-chips', role: 'radiogroup', 'aria-label': 'Text size' },
      SIZES.map((s) => el('button', { type: 'button', class: 'rt-chip', role: 'radio', 'aria-checked': String(s.id === this.size), 'aria-pressed': String(s.id === this.size),
        onclick: () => { this.set(s.id); this.app.shell.refreshSettings(); } }, s.label))) });
  }

  set(id) {
    this.size = id;
    this.storage.set('size', id);
    this.apply();
  }

  apply() {
    document.body.style.zoom = String(scaleFor(this.size));
  }
}
