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
} from "../Shared/Icons";

export const DR_GROUP = [
  {
    value: "gp",
    Icon: GPIcon,
    label: "general practitioner",
  },
  {
    value: "ped",
    Icon: KidsIcon,
    label: "pediatrician",
  },
  {
    value: "gyn",
    Icon: GynIcon,
    label: "gynecologist",
  },
  {
    value: "den",
    Icon: DentistIcon,
    label: "general practitioner",
  },
];

export const AGE_GROUP = [
  {
    value: "adults",
    Icon: AdultsIcon,
    label: "adults",
  },
  {
    value: "youth",
    Icon: KidsIcon,
    label: "youth",
  },
  {
    value: "students",
    Icon: StudentsIcon,
    label: "students",
  },
];
export const ACCEPTS_GROUP = [
  {
    value: "y",
    Icon: CheckIcon,
    label: "accepting",
  },
  {
    value: "n",
    Icon: BanIcon,
    label: "not accepting",
  },
  {
    value: "all",
    Icon: AllIcon,
    label: "all",
  },
];
