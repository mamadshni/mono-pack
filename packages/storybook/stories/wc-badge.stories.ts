import type { Meta, StoryObj } from '@storybook/web-components-vite';
import type { BadgeTone } from '@acme/web-components';

interface BadgeArgs {
  label: string;
  tone: BadgeTone;
}

const meta: Meta<BadgeArgs> = {
  title: 'Components/Badge',
  component: 'wc-badge',
  render: ({ label, tone }) => {
    const el = document.createElement('wc-badge');
    el.tone = tone;
    el.textContent = label;
    return el;
  },
  args: {
    label: 'Active',
    tone: 'neutral',
  },
  argTypes: {
    tone: {
      control: 'select',
      options: ['neutral', 'success', 'warning', 'danger', 'info'],
    },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<BadgeArgs>;

export const Neutral: Story = {};

export const Success: Story = { args: { tone: 'success', label: 'Deployed' } };
export const Warning: Story = { args: { tone: 'warning', label: 'Degraded' } };
export const Danger: Story = { args: { tone: 'danger', label: 'Failed' } };
export const Info: Story = { args: { tone: 'info', label: 'Beta' } };

export const AllTones: Story = {
  render: () => {
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;align-items:center;gap:10px;flex-wrap:wrap;';
    const tones: [BadgeTone, string][] = [
      ['neutral', 'Draft'],
      ['success', 'Deployed'],
      ['warning', 'Degraded'],
      ['danger', 'Failed'],
      ['info', 'Beta'],
    ];
    for (const [tone, label] of tones) {
      const el = document.createElement('wc-badge');
      el.tone = tone;
      el.textContent = label;
      row.appendChild(el);
    }
    return row;
  },
};
