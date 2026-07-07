import type { Meta, StoryObj } from '@storybook/web-components-vite';

interface SwitchArgs {
  label: string;
  checked: boolean;
  disabled: boolean;
}

const meta: Meta<SwitchArgs> = {
  title: 'Components/Switch',
  component: 'wc-switch',
  render: ({ label, checked, disabled }) => {
    const el = document.createElement('wc-switch');
    el.checked = checked;
    el.disabled = disabled;
    el.textContent = label;
    return el;
  },
  args: {
    label: 'Email notifications',
    checked: false,
    disabled: false,
  },
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  parameters: {
    actions: { handles: ['wc-change'] },
  },
};

export default meta;
type Story = StoryObj<SwitchArgs>;

export const Off: Story = {};

export const On: Story = {
  args: { checked: true },
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Locked setting' },
};
