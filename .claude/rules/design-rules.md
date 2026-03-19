# Design Rules

## Goal
Make the app look clean and easy to use. Keep it simple — no fancy animations or complex layouts.

## Colors
- Primary (buttons, links, highlights): `#1565C0` (blue)
- Primary dark (button hover): `#0D47A1`
- Background: `#FAFAFA` (off-white, easier on the eyes than pure white)
- Card/surface: `#FFFFFF`
- Text primary: `#212121`
- Text secondary: `#757575` (for labels and subtitles)
- Border: `#E0E0E0`
- Success: green text `#2E7D32` on green background `#E8F5E9`
- Error: red text `#C62828` on red background `#FFEBEE`

## Typography
- Font: system font stack — `'Segoe UI', system-ui, -apple-system, sans-serif`
- Body line height: `1.7` (gives text room to breathe)
- Section titles: `2rem`, bold, dark color `#0D2137`
- Paper titles inside cards: `1.2rem`, bold
- Labels/secondary text: `0.9rem`, color `#757575`

## Layout
- Max width of the page content: `960px`, centered with `margin: 0 auto`
- Side padding: `48px` on left and right
- Space between sections: `80px`
- Use `display: flex` and `gap` for forms so inputs and buttons line up in a row

## Navbar
- Background: white, with a thin bottom border
- Height: `64px`
- Sticky at the top so it stays visible when scrolling
- App name on the left, bold, uppercase, blue color

## Cards (paper items)
- White background, light border, small border-radius (`8px`)
- Padding inside: `28px 32px`
- Subtle shadow: `box-shadow: 0 1px 3px rgba(0,0,0,0.06)`
- On hover, shadow gets slightly stronger to show it is interactive

## Forms
- Inputs: full border, rounded corners (`4px`), padding `12px 16px`
- On focus, input border turns blue with a soft blue glow
- Buttons: blue background, white text, uppercase, bold
- On hover, button gets darker and a soft shadow appears
- Disabled button: gray, no cursor pointer

## Status Messages
- Loading: simple text, blue color
- Success: green text inside a light green box with a green border
- Error: red text inside a light red box with a red border
- Both use padding, rounded corners, and appear below the relevant form or button

## Paper ID display
- Use monospace font so it looks like a code/ID
- Light gray background pill shape so users know they can copy it

## General Rules
- Do not use any external UI libraries (no Bootstrap, MUI, Tailwind, etc.)
- Write all CSS from scratch in `react/src/styles.css`
- Import the CSS file in `react/src/index.js`
- Use `className` in React components to apply styles
- Keep CSS organized: base → navbar → layout → typography → forms → cards → messages
- Always add hover states to buttons and cards so the UI feels responsive
