const template = document.createElement('template');
template.innerHTML = /* html */ `
  <style>
    :host {
      display: inline-flex;
      align-items: center;
      gap: 0.625rem;
      font-family: var(--wc-font, system-ui, -apple-system, sans-serif);
      font-size: 0.875rem;
      color: var(--wc-text, #1f2430);
    }

    :host([hidden]) {
      display: none;
    }

    :host([disabled]) {
      opacity: 0.5;
      pointer-events: none;
    }

    .track {
      all: unset;
      box-sizing: border-box;
      position: relative;
      width: 2.5rem;
      height: 1.4rem;
      border-radius: 999px;
      background: var(--wc-switch-off, #c9cdd4);
      cursor: pointer;
      transition: background-color 160ms ease;
      flex: none;
    }

    .track:focus-visible {
      outline: 2px solid var(--wc-accent, #4f46e5);
      outline-offset: 2px;
    }

    .thumb {
      position: absolute;
      top: 0.175rem;
      left: 0.175rem;
      width: 1.05rem;
      height: 1.05rem;
      border-radius: 50%;
      background: #ffffff;
      box-shadow: 0 1px 2px rgba(15, 18, 25, 0.25);
      transition: translate 160ms ease;
    }

    :host([checked]) .track {
      background: var(--wc-accent, #4f46e5);
    }

    :host([checked]) .thumb {
      translate: 1.1rem 0;
    }

    @media (prefers-reduced-motion: reduce) {
      .track,
      .thumb {
        transition: none;
      }
    }
  </style>
  <button class="track" part="track" role="switch" aria-checked="false">
    <span class="thumb" part="thumb"></span>
  </button>
  <label part="label"><slot></slot></label>
`;

/**
 * `<wc-switch>` — an accessible on/off toggle.
 *
 * @attr {boolean} checked - Whether the switch is on.
 * @attr {boolean} disabled - Disables interaction.
 *
 * @slot - Visible label text.
 * @csspart track - The switch track.
 * @csspart thumb - The moving thumb.
 * @csspart label - The label wrapper.
 * @fires wc-change - Fired when the checked state changes. `detail.checked` holds the new state.
 */
export class WcSwitch extends HTMLElement {
  static readonly tagName = 'wc-switch';

  static get observedAttributes(): string[] {
    return ['checked', 'disabled'];
  }

  #track: HTMLButtonElement;

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open', delegatesFocus: true });
    root.appendChild(template.content.cloneNode(true));
    this.#track = root.querySelector('.track')!;

    this.#track.addEventListener('click', () => this.#toggle());
    root.querySelector('label')?.addEventListener('click', () => this.#toggle());
  }

  attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
    if (name === 'checked') {
      this.#track.setAttribute('aria-checked', String(value !== null));
    }
    if (name === 'disabled') {
      this.#track.disabled = value !== null;
    }
  }

  #toggle(): void {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.dispatchEvent(
      new CustomEvent<{ checked: boolean }>('wc-change', {
        detail: { checked: this.checked },
        bubbles: true,
        composed: true,
      }),
    );
  }

  get checked(): boolean {
    return this.hasAttribute('checked');
  }
  set checked(value: boolean) {
    this.toggleAttribute('checked', value);
  }

  get disabled(): boolean {
    return this.hasAttribute('disabled');
  }
  set disabled(value: boolean) {
    this.toggleAttribute('disabled', value);
  }
}

if (!customElements.get(WcSwitch.tagName)) {
  customElements.define(WcSwitch.tagName, WcSwitch);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-switch': WcSwitch;
  }
  interface HTMLElementEventMap {
    'wc-change': CustomEvent<{ checked: boolean }>;
  }
}
