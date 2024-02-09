module.exports = {
  '*.{js,jsx,ts,tsx}': (filenames) => [
    `eslint --fix "${filenames.join('" "')}"`,
    `prettier --write "${filenames.join('" "')}"`
  ]
}
