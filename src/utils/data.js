const fs = require('fs');

const load = (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

const save = (data, filePath) => {
  const dataJSON = JSON.stringify(data);
  fs.writeFileSync(filePath, dataJSON);
};

module.exports = {
  load,
  save,
};
