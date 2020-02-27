'use strict';

import path from 'path';
import fs from 'fs-extra';
import Handlebars from 'handlebars';
import {updateFlag} from '../publish';

function compile(filePath) {
  return Handlebars.compile(
    fs.readFileSync(path.join(process.cwd(), filePath), 'utf8')
  );
}

const swTmp = compile('/src/templates/sw.js');

export default function worker() {
  const swPath = path.join(global.DBUSHELL.__dest, 'sw.js');
  fs.removeSync(swPath);

  return new Promise(async resolve => {
    const swRender = swTmp({
      siteVer: global.DBUSHELL.siteVer
    });

    fs.outputFileSync(swPath, swRender);
    process.stdout.write(`${updateFlag}/sw.js\n`);

    resolve();
  });
}
