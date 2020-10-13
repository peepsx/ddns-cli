const createDirectory = require('./createDirectory');

export default function createDefaultDir() {
  const dirType = "Default directory";
  createDirectory(process.env.DEFAULT_DIR, dirType, () => {
    console.log(`${dirType} was created at ${defaultDir}`);
  });
}