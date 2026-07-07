export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

const template = document.createElement('template');
template.innerHTML = /* html */ `
  <style>
    :host {
      display: inline-block;
      font-family: var(--wc-font, system-ui, -apple-system, sans-serif);
    }

    :host([hidden]) {
      display: none;
    }

    button {
      all: unset;
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5em;
      cursor: pointer;
      border-radius: var(--wc-radius, 6px);
      font-weight: 500;
      line-height: 1;
      transition:
        background-color 120ms ease,
        color 120ms ease,
        box-shadow 120ms ease,
        transform 80ms ease;
      user-select: none;
      -webkit-user-select: none;
    }

    button:focus-visible {
      outline: 2px solid var(--wc-accent, #4f46e5);
      outline-offset: 2px;
    }

    button:active:not(:disabled) {
      transform: translateY(1px);
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    /* Sizes */
    :host([size='small']) button {
      font-size: 0.8125rem;
      padding: 0.375rem 0.75rem;
    }
    :host(:not([size])) button,
    :host([size='medium']) button {
      font-size: 0.875rem;
      padding: 0.5625rem 1rem;
    }
    :host([size='large']) button {
      font-size: 1rem;
      padding: 0.75rem 1.375rem;
    }

    /* Variants */
    :host(:not([variant])) button,
    :host([variant='primary']) button {
      background: var(--wc-accent, #4f46e5);
      color: var(--wc-accent-contrast, #ffffff);
    }
    :host(:not([variant])) button:hover:not(:disabled),
    :host([variant='primary']) button:hover:not(:disabled) {
      background: var(--wc-accent-hover, #4338ca);
    }

    :host([variant='secondary']) button {
      background: var(--wc-surface, transparent);
      color: var(--wc-text, #1f2430);
      box-shadow: inset 0 0 0 1px var(--wc-border, #d4d7dd);
    }
    :host([variant='secondary']) button:hover:not(:disabled) {
      background: var(--wc-surface-hover, #f2f3f5);
    }

    :host([variant='ghost']) button {
      background: transparent;
      color: var(--wc-accent, #4f46e5);
    }
    :host([variant='ghost']) button:hover:not(:disabled) {
      background: var(--wc-accent-soft, rgba(79, 70, 229, 0.08));
    }

    :host([variant='danger']) button {
      background: var(--wc-danger, #dc2626);
      color: #ffffff;
    }
    :host([variant='danger']) button:hover:not(:disabled) {
      background: var(--wc-danger-hover, #b91c1c);
    }
  </style>
  <button part="button" type="button">
    <slot></slot>
  </button>
`;

/**
 * `<wc-button>` — an accessible, themeable button.
 *
 * @attr {('primary'|'secondary'|'ghost'|'danger')} variant - Visual style. Defaults to `primary`.
 * @attr {('small'|'medium'|'large')} size - Control size. Defaults to `medium`.
 * @attr {boolean} disabled - Disables interaction.
 *
 * @slot - Button label content.
 * @csspart button - The internal native `<button>`.
 * @fires wc-click - Fired on activation (not fired when disabled).
 */
export class WcButton extends HTMLElement {
  static readonly tagName = 'wc-button';

  static get observedAttributes(): string[] {
    return ['disabled'];
  }

  #button: HTMLButtonElement;

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open', delegatesFocus: true });
    root.appendChild(template.content.cloneNode(true));
    this.#button = root.querySelector('button')!;

    this.#button.addEventListener('click', (event) => {
      if (this.disabled) {
        event.stopPropagation();
        return;
      }
      this.dispatchEvent(new CustomEvent('wc-click', { bubbles: true, composed: true }));
    });
  }

  attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
    if (name === 'disabled') {
      this.#button.disabled = value !== null;
      this.#button.setAttribute('aria-disabled', String(value !== null));
    }
  }

  get variant(): ButtonVariant {
    return (this.getAttribute('variant') as ButtonVariant | null) ?? 'primary';
  }
  set variant(value: ButtonVariant) {
    this.setAttribute('variant', value);
  }

  get size(): ButtonSize {
    return (this.getAttribute('size') as ButtonSize | null) ?? 'medium';
  }
  set size(value: ButtonSize) {
    this.setAttribute('size', value);
  }

  get disabled(): boolean {
    return this.hasAttribute('disabled');
  }
  set disabled(value: boolean) {
    this.toggleAttribute('disabled', value);
  }
}

if (!customElements.get(WcButton.tagName)) {
  customElements.define(WcButton.tagName, WcButton);
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-button': WcButton;
  }
  interface HTMLElementEventMap {
    'wc-click': CustomEvent<void>;
  }
}
