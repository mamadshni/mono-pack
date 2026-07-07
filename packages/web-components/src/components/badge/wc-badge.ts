export type BadgeTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

const template = document.createElement('template');
template.innerHTML = /* html */ `
  <style>
    :host {
      display: inline-flex;
      align-items: center;
      gap: 0.375em;
      font-family: var(--wc-font, system-ui, -apple-system, sans-serif);
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.02em;
      line-height: 1;
      padding: 0.3125rem 0.625rem;
      border-radius: 999px;
      background: var(--badge-bg, #eef0f3);
      color: var(--badge-fg, #3f4757);
    }

    :host([hidden]) {
      display: none;
    }

    .dot {
      width: 0.4em;
      height: 0.4em;
      border-radius: 50%;
      background: currentColor;
      flex: none;
    }

    :host([tone='success']) {
      --badge-bg: var(--wc-success-soft, #e3f4e8);
      --badge-fg: var(--wc-success, #157347);
    }
    :host([tone='warning']) {
      --badge-bg: var(--wc-warning-soft, #fdf1dc);
      --badge-fg: var(--wc-warning, #a05e03);
    }
    :host([tone='danger']) {
      --badge-bg: var(--wc-danger-soft, #fbe4e4);
      --badge-fg: var(--wc-danger, #b91c1c);
    }
    :host([tone='info']) {
      --badge-bg: var(--wc-accent-soft, #e7e6fb);
      --badge-fg: var(--wc-accent, #4f46e5);
    }
  </style>
  <span class="dot" part="dot" aria-hidden="true"></span>
  <slot></slot>
`;

/**
 * `<wc-badge>` — a small status label.
 *
 * @attr {('neutral'|'success'|'warning'|'danger'|'info')} tone - Semantic color. Defaults to `neutral`.
 *
 * @slot - Badge text.
 * @csspart dot - The leading status dot.
 */
export class WcBadge extends HTMLElement {
  static readonly tagName = 'wc-badge';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
  }

  get tone(): BadgeTone {
    return (this.getAttribute('tone') as BadgeTone | null) ?? 'neutral';
  }
  set tone(value: BadgeTone) {
    this.setAttribute('tone', value);
  }
}

if (!customElements.get(WcBadge.tagName)) {
  customElements.define(WcBadge.tagName, WcBadge);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-badge': WcBadge;
  }
}
