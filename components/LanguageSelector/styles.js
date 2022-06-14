export const customStyles = {
  control: (provided, { theme, isFocused }) => ({
    ...provided,
    background: "transparent",
    cursor: "pointer",
    borderColor: isFocused ? "transparent" : theme.appTheme.textColor2,
    minHeight: "unset",
    minWidth: 69.5,
    boxShadow: isFocused ? `0 0 0 1px ${theme.appTheme.bgColor1}` : "none",
    opacity: isFocused ? 1 : 0.7,
    "&:hover": {
      borderColor: isFocused ? "transparent" : theme.appTheme.textColor1,
      opacity: 1,
    },
  }),
  indicatorSeparator: (provided, { theme }) => ({
    ...provided,
    backgroundColor: theme.appTheme.textColor2,
  }),
  dropdownIndicator: (provided, { theme }) => ({
    ...provided,
    color: theme.appTheme.textColor2,
    paddingBlock: "0.25rem",
    paddingInline: "0.25rem",
    "&:hover": {
      color: theme.appTheme.textColor1,
    },
  }),
  menu: (provided) => ({
    ...provided,
    width: "max-content",
    marginLeft: "-80%",
    padding: 8,
    "@media (min-width: 380px)": {
      marginLeft: "--50%",
    },
    "@media (min-width: 768px)": {
      marginLeft: "-60%",
    },
  }),
  option: (provided, { isFocused, isSelected, theme }) => {
    let bgColor = isSelected ? theme.appTheme.brand : undefined;

    if (!bgColor) {
      bgColor = isFocused ? theme.appTheme.grey5 : undefined;
    }

    return {
      ...provided,
      cursor: "pointer",
      backgroundColor: bgColor,
    };
  },
  singleValue: (provided, { theme }) => ({
    ...provided,
    color: theme.appTheme.textColor2,
    textAlign: "center",
    "&:hover": { color: theme.appTheme.textColor1 },
  }),
};
