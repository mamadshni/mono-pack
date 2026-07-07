import type { Meta, StoryObj } from '@storybook/web-components-vite';
import type { ButtonSize, ButtonVariant } from '@acme/web-components';

interface ButtonArgs {
  label: string;
  variant: ButtonVariant;
  size: ButtonSize;
  disabled: boolean;
}

const meta: Meta<ButtonArgs> = {
  title: 'Components/Button',
  component: 'wc-button',
  render: ({ label, variant, size, disabled }) => {
    const el = document.createElement('wc-button');
    el.variant = variant;
    el.size = size;
    el.disabled = disabled;
    el.textContent = label;
    return el;
  },
  args: {
    label: 'Save changes',
    variant: 'primary',
    size: 'medium',
    disabled: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large'],
    },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  parameters: {
    actions: { handles: ['wc-click'] },
  },
};

export default meta;
type Story = StoryObj<ButtonArgs>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: 'secondary', label: 'Cancel' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', label: 'Learn more' },
};

export const Danger: Story = {
  args: { variant: 'danger', label: 'Delete project' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const AllSizes: Story = {
  render: ({ variant }) => {
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;align-items:center;gap:12px;';
    for (const size of ['small', 'medium', 'large'] as const) {
      const el = document.createElement('wc-button');
      el.variant = variant;
      el.size = size;
      el.textContent = size.charAt(0).toUpperCase() + size.slice(1);
      row.appendChild(el);
    }
    return row;
  },
};
