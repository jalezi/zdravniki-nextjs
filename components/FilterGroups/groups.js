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
    label: "generalPractitioner",
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
    label: "dentist",
  },
];

export const AGE_GROUP = [
  {
    value: "",
    Icon: AdultsIcon,
    label: "adults",
  },
  {
    value: "y",
    Icon: KidsIcon,
    label: "youth",
  },
  {
    value: "s",
    Icon: StudentsIcon,
    label: "students",
  },
];
export const ACCEPTS_GROUP = [
  {
    value: "y",
    Icon: CheckIcon,
    label: "accepts",
  },
  {
    value: "n",
    Icon: BanIcon,
    label: "rejects",
  },
  {
    value: "",
    Icon: AllIcon,
    label: "all",
  },
];
