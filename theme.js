let theme = {
  fontFamilySerif: "Fira Sans",
  fontFamilySansSerif: "Fira Sans",
  marginTop: "25px", //used in place of theme.spacing.unit *3
  unit: "8px",
  cardPadding: "35px",
  cardPaddingMobile: "19px",
  boxShadow: "0 4px 14px rgba(0,0,0,.05);",
  max: {
    mobile: "399.5px",
    xs: "424.5px",
    sm: "767.5px",
    md: "999.5px",
    lg: "1919.5px"
  },
  min: {
    xs: "425px",
    sm: "768px",
    md: "1000px",
    lg: "1920px"
  },
  colour: {
    textColour: "#3d3d3d",
    paleGrey: "#eaebed",
    backgroundFillColour: "#F2F5F8",
    backgroundFillColour2: "#E1E4E7",
    backgroundFillColour3: "#066169",
    backgroundFillColour4: "#232323",
    fontColour: "#333",
    accentFontColour: "#333",
    accentFontColour2: "#333",
    cerulean: "#006cc9",
    darkGreyBlue: "#333",
    paleBlue: "#e3f2ff",
    focusColour: "#ffcc33",
    white: "#ffffff",
    black: "#000000",
    betaBlue: "#22a7f0",
    alertModal: "#ff6961",
    paleBlueGrey: "#f1f7fc",
    darkBlueGrey: "#d8dee2",
    borderGreen: "#fff",
    linkTextColour: "#066169",
    divider: "#E1E4E7",
    hoverBackground: "#f6f9fa",
    button1: "#066169",
    button1Hover: "#0aa4b1",
    headerBackground: "#000"
  }
};

theme.colour.linkColour = theme.colour.cerulean;
theme.colour.linkHoverColour = theme.colour.cerulean;

export const globalTheme = { ...theme };
