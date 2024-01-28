module.exports = {
  'src/*.{js,jsx,ts,tsx}': (filenames) => [
    `prettier --write "${filenames.join('" "')}"`,
    `npm run lint`
  ]
}
