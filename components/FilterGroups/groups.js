import {
  AdultsIcon,
  AllIcon,
  BanIcon,
  CheckIcon,
  DentistIcon,
  GPIcon,
  GynIcon,
  KidsIcon,
  StudentsIcon,
} from '../Shared/Icons';

export const DR_GROUP = [
  {
    value: 'gp',
    Icon: GPIcon,
    label: 'generalPractitioner',
    href: { pathname: '/[type]', query: { type: 'gp' } },
  },
  {
    value: 'ped',
    Icon: KidsIcon,
    label: 'pediatrician',
    href: { pathname: '/[type]', query: { type: 'ped' } },
  },
  {
    value: 'gyn',
    Icon: GynIcon,
    label: 'gynecologist',
    href: { pathname: '/[type]', query: { type: 'gyn' } },
  },
  {
    value: 'den',
    Icon: DentistIcon,
    label: 'dentist',
    href: { pathname: '/[type]', query: { type: 'den' } },
  },
];

export const AGE_GROUP = [
  {
    value: 'all',
    Icon: AdultsIcon,
    label: 'adults',
    href: { pathname: '/[type]', query: { type: 'den' } },
  },
  {
    value: 'y',
    Icon: KidsIcon,
    label: 'youth',
    href: { pathname: '/[type]', query: { type: 'den-y' } },
  },
  {
    value: 's',
    Icon: StudentsIcon,
    label: 'students',
    href: { pathname: '/[type]', query: { type: 'den-s' } },
  },
];
export const ACCEPTS_GROUP = [
  {
    value: 'y',
    Icon: CheckIcon,
    label: 'accepts',
  },
  {
    value: 'n',
    Icon: BanIcon,
    label: 'rejects',
  },
  {
    value: 'all',
    Icon: AllIcon,
    label: 'all',
  },
];
