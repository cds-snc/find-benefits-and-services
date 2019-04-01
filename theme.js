let theme = {
  fontFamilySerif: "Georgia",
  fontFamilySansSerif: "Montserrat",
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
    backgroundFillColour: "#f4f7f9",
    backgroundFillColour2: "#d5e2e9",
    fontColour: "#2f3437",
    accentFontColour: "#979797",
    accentFontColour2: "#656972",
    cerulean: "#006cc9",
    darkGreyBlue: "#284162",
    paleBlue: "#e3f2ff",
    focusColour: "#FFBF47",
    white: "#ffffff",
    black: "#000000",
    betaBlue: "#634f70",
    alertModal: "#ff6961",
    paleBlueGrey: "#f1f7fc",
    darkBlueGrey: "#d8dee2",
    borderGreen: "#1da570",
    linkTextColour: "#31353a",
    divider: "#dbe3e5",
    hoverBackground: "#f6f9fa",
    button1: "#2f2f42",
    button1Hover: "#434458",
    headerBackground: "#2e2e40"
  }
};

theme.colour.linkColour = theme.colour.cerulean;
theme.colour.linkHoverColour = theme.colour.cerulean;

export const globalTheme = { ...theme };
