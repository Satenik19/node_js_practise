import { resolve, join, parse } from 'path';
import fs from 'fs';

const currentDir = resolve();
const filePath = join(currentDir, 'example.txt')
// console.log(filePath, 'path');

// console.log(parse(filePath));

// fs.readFile(filePath, 'utf8', function(error, text) {
//     console.log(text);
// })

// fs.promises.readFile(filePath, 'utf8').then((text) => {
//     console.log(text);
// });

// fs.promises.writeFile(filePath, 'Hello world');
fs.promises.unlink(filePath);