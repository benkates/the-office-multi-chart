# Multi-Chart Svelte Example

Proof of concept multi-chart data tool using randomly generated data. Based on [this Observable notebook](https://observablehq.com/d/c5955832413ea211)

## TODO

- [ ] force, not in love with data/shape. the current model is to use the last link listed as the link (and it's only one side) - so would need something to combine
- [ ] fix titles, add notes
- [ ] comment some more
- [ ] rename some vars (cat, etc.)
- [ ] lower opacity just a touch globally
- [ ] can the tooltip contain a store? tooltip.hoveredData could be scoped to just that tooltip
  - [ ] backup would just be a global variable and the same as the selectedCat;
- [ ] GH CI/CD - build/deploy in the cloud on push (is it expensive?)
- [ ] check out skeleton UI (uses tailwind CSS)
- [ ] [use tooltip as action ie: use:tooltip](https://svelte.dev/repl/dd6754a2ad0547c5b1c1ea37c0293fef?version=3.55.0) and [this video](https://www.youtube.com/watch?v=0GqIoo66i0g)

- [x] put dropdown and button side-by-side
- [x] button to reset highlighting
- [x] check out multi-hover (hover on one, another chart lights up)
- [x] move/zoom force?
- [x] fix card title padding (too big on bottom...)
- [x] created relative path (`base: "./"`) in `vite.config.js`
- [x] add an interaction for the bar charts
- [x] [sveltify the force directed graph](https://github.com/happybeing/d3-fdg-svelte/blob/master/src/NetworkGraphSvelteSVG.svelte)
- [x] use [iconify for UI](https://www.youtube.com/watch?v=iGVhzsTZSa8)
- [x] convert margin to function that accepts w/h and multiples by percentage
- [x] make SVG render "svelty"
- [x] make transitions "svelty"
- [x] [UI framework (MUI for now)](https://sveltematerialui.com/)
  - [x] gutter for rows once they go to a new line
- [x] favicon
