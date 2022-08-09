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
    href: '/gp',
  },
  {
    value: 'ped',
    Icon: KidsIcon,
    label: 'pediatrician',
    href: '/ped',
  },
  {
    value: 'gyn',
    Icon: GynIcon,
    label: 'gynecologist',
    href: '/gyn',
  },
  {
    value: 'den',
    Icon: DentistIcon,
    label: 'dentist',
    href: '/den',
  },
];

export const AGE_GROUP = [
  {
    value: 'all',
    Icon: AdultsIcon,
    label: 'adults',
    href: '/den',
  },
  {
    value: 'y',
    Icon: KidsIcon,
    label: 'youth',
    href: '/den-y',
  },
  {
    value: 's',
    Icon: StudentsIcon,
    label: 'students',
    href: '/den-s',
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
