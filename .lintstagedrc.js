module.exports = {
  '*.{js,jsx,ts,tsx}': (filenames) => {
    const filteredFiles = filenames.filter((file) => file.startsWith('src/'));
    const commands = [];
    if (filteredFiles.length > 0) {
      commands.push(`eslint --fix "${filteredFiles.join('" "')}"`);
      commands.push(`prettier --write "${filteredFiles.join('" "')}"`);
    }
    
    return commands;
  }
};
