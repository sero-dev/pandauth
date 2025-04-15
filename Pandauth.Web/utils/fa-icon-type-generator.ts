import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const IMPORT_FILE_PATH =
  './node_modules/@fortawesome/fontawesome-free/metadata/icons.yml';
const EXPORT_FILE_NAME = 'fa-icon-type.ts';
const EXPORT_FILE_PATH = path.join(
  './projects/common/src/lib/components/fa-icon',
  EXPORT_FILE_NAME
);

function readFromYaml(filePath: string): any {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = yaml.load(fileContents);
    return data;
  } catch (error) {
    console.error('Error reading YAML file:', error);
    return null;
  }
}

const content = readFromYaml(IMPORT_FILE_PATH);
const keys = Object.keys(content).filter((k) =>
  content[k].styles.includes('solid')
);
const typeDefinition = `export type FaIcon = ${keys
  .map((k) => `'${k}'`)
  .join(' | ')}\n`;

fs.writeFileSync(EXPORT_FILE_PATH, typeDefinition);
console.log(`TypeScript type file generated: ${EXPORT_FILE_NAME}`);
