import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      white: "#ffffff";
      black: "#1d1d1d";
      purple: "#8559e0";
      lightPurple: "#a385df";
      green: "#5fbd75";
      orange: "#e2765a";
      gray: "#d4d4d4";
      lightGray: "#ececec";
    };
  }
}
