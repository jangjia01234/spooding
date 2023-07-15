import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

import { media } from "@/styles/theme";

export const GlobalStyle = createGlobalStyle`
    ${reset}
    html {
        margin-top: 67px;
        font-size: 16px;
        font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
        font-display: fallback;
        background-color: #1D1D1D;
        color: #1D1D1D;
    }
    ::-webkit-scrollbar {
        display: none;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    button {
        background: none;
        border: none;
        cursor: pointer;
    }
    .pc-only {
        display: block;
        ${media.mobile} {
            display: none;
        }
    }
    .mobile-only {
        display: none;
        ${media.mobile} {
            display: block;
        }
    }
`;
