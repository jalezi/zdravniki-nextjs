const colors = {
  accent: "#09AFDA",
  brand: "#26c5ed",
  textLight: "#777C80",
  lightGrey: "#CDCDCD",
};

const theme = {
  primary1: "#51BAF7",
  primary2: "#3CAAEA",
  primary3: "#73C4F3",
  primary4: "#B2E0FB",
  primary5: "#EFF9FF",
  secondary: "#102A43",
  grey1: "#1F2933",
  grey2: "#3E4C59",
  grey3: "#7B8794",
  grey4: "#CDD7E3",
  grey5: "#F0F4F8",
  grey6: "#DCE1E7",
  black: "#000000",
  white: "#FFFFFF",
  textColor1: "rgba(0, 0, 0, 0.87)",
  textColor2: "rgba(0,0,0,0.66)",
  textColor3: "#212529",
  bgColor1: "#F4F8F8",
  bgColor2: "#E8EFF0",
  brand: "#26c5ed",

  LIST_HEADER: {
    color: "#6c7074",
    borderBottomColor: "#c4d4d7",
  },

  FILTER: {
    backgroundColor1: "#ffffff",
    backgroundColor2: "#E8EFF0",
    backgroundColor3: "#DAE5E7",
    backgroundColor4: "#212529",
    backgroundColor5: "#104856",
  },

  CARDS: {
    acceptsY: "#95C83F",
    acceptsDarkY: "#81B130",
    acceptsN: "#DC3435",
  },

  BUTTONS: {
    backgroundHover: "rgba(0, 0, 0, 0.04)",
  },

  INPUTS: {
    border: "#C4D4D7",
    placeholder: "#C4D4D7",
  },

  MARKERS: {
    acceptsY: "#2E7D32",
    acceptsN: "#D32F2F",
  },

  MD: {
    textColor: "rgba(0, 0, 0, 0.7)",
    linkColor: "rgba(0, 0, 0, 0.8)",
    elementBoxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.15)",
    linkBoxShadow: `inset 0 0px 0 white, inset 0 -4px ${colors.brand}`,
    linkBoxShadowHover: `inset 0 0px 0 white, inset 0 -20px ${colors.brand}`,
    summaryBorder: "#DEDEDE",
    summaryText: "rgba(0, 0, 0, 0.75)",
    tableTdBorder: "rgba(0, 0, 0, 0.45)",
    dataTermBoxShadow: `inset 0 0 0 white, inset 0 -4px ${colors.brand}`,
    dataTermBoxShadowHover: `inset 0 0 0 white, inset 0 -20px ${colors.brand}`,
    dataTermBcgColor: "#414040",
  },

  mobileHeaderHeight: "56px",
  headerHeight: "64px",

  mobileBreakPoint: {
    SP: `380px`,
    M: `420px`,
    L: `560px`,
  },

  // Responsive Breakpoints
  breakPoint: {
    // Phone's portrait mode usually ranges from 360px - 640px
    SM: `640px`,
    MD: `768px`,
    LG: `1024px`,
    XL: `1280px`,
  },
};

export { theme };
