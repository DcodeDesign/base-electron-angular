import * as fs from 'fs-extra';
import * as path from 'path';
import { chdir } from 'process';
import { exec } from './utils';

interface Target {
  name: 'appImage' | string;
}

interface Context {
  appOutDir: string; // .../build/clean/build/linux-unpacked
  outDir: string; // .../build/clean/build
  targets: [Target];
}

export default async function(context: Context) {
  console.log(context);
  const isLinux = context.targets.find(target => target.name === 'appImage');
  if (!isLinux) {
    return;
  }

  const originalDir = process.cwd();
  const dirname = context.appOutDir;
  chdir(dirname);

  await exec('mv', ['beoogo-console', 'beoogo-console.bin'])
  const wrapperScript = `#!/bin/bash
    "\${BASH_SOURCE%/*}"/beoogo-console.bin "$@" --no-sandbox
  `;
  fs.writeFileSync('beoogo-console', wrapperScript);
  await exec('chmod', ['+x', 'beoogo-console']);

  chdir(originalDir);
}
