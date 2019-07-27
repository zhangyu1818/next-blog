import Typography from "typography";
import wordpress2016Theme from "typography-theme-wordpress-2016";

wordpress2016Theme.overrideThemeStyles = () => {
  return {
    a: {
      color: "var(--textLink)"
    },
    hr: {
      background: "var(--hr)"
    },
    "a.anchor": {
      boxShadow: "none"
    },
    "p code": {
      fontSize: "1rem"
    },
    "h1 code, h2 code, h3 code, h4 code, h5 code, h6 code": {
      fontSize: "inherit"
    },
    "li code": {
      fontSize: "1rem"
    },
    blockquote: {
      color: "inherit",
      borderLeftColor: "inherit",
      opacity: "0.8"
    },
    h1: {
      lineHeight: 1.5
    },
  };
};

const typography = new Typography(wordpress2016Theme);

export default typography;
