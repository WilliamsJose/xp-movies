module.exports = {
  'src/*.{js,jsx,ts,tsx}': (filenames) => [
    `prettier --write ${filenames.join(' ')}`,
    `npx run lint --fix . ${filenames.join(' --filename')}`
  ]
}
