import { Occasion } from '../types';

export const OCCASIONS: Occasion[] = [
  {
    id: 'birthday',
    label: 'Birthday',
    icon: 'Cake',
    description: 'Celebrate another year around the sun with grand joy.',
    suggestedPrompt: 'Make it a fun and emotional birthday wish mentioning their favorite coffee habit, turning 30, and wishing them endless success this year.',
  },
  {
    id: 'graduation',
    label: 'Graduation',
    icon: 'GraduationCap',
    description: 'Honor academic triumph and bright future horizons.',
    suggestedPrompt: 'Congratulate them on earning their degree, inspire them for their career ahead, and praise their dedication.',
  },
  {
    id: 'promotion',
    label: 'Promotion',
    icon: 'Rocket',
    description: 'Applaud career achievements and new leadership steps.',
    suggestedPrompt: 'Congratulate them on stepping into their new executive role and praise their relentless work ethic.',
  },
  {
    id: 'anniversary',
    label: 'Anniversary',
    icon: 'Heart',
    description: 'Toast to love, togetherness, and cherished memories.',
    suggestedPrompt: 'Wish them a happy anniversary, highlight their beautiful bond, and wish them decades of togetherness.',
  },
  {
    id: 'festival',
    label: 'Festival & Holidays',
    icon: 'Sparkles',
    description: 'Spread festive cheer and joyful family blessings.',
    suggestedPrompt: 'Send warm festive holiday wishes filled with health, prosperity, peace, and abundance.',
  },
  {
    id: 'wedding',
    label: 'Wedding',
    icon: 'Crown',
    description: 'Bless the happy couple on their magical wedding day.',
    suggestedPrompt: 'Wish the bride and groom a lifetime of laughter, unity, and unforgettable adventures together.',
  },
  {
    id: 'achievement',
    label: 'Achievement',
    icon: 'Trophy',
    description: 'Recognize sports, business, or personal milestones.',
    suggestedPrompt: 'Celebrate their victory and salute their unwavering grit and excellence.',
  },
  {
    id: 'custom',
    label: 'Custom Surprise',
    icon: 'Gift',
    description: 'Design any unique message or personal surprise.',
    suggestedPrompt: 'Create a memorable message with inside jokes, special memories, and heartfelt love.',
  },
];
