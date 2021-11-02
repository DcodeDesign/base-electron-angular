import { spawn, ChildProcess } from 'child_process';

export async function exec(cmd: string, args: Array<string> = []) {
  const child = spawn(cmd, args, { shell: true });
  redirectOutputFor(child);
  await waitFor(child);
}

function redirectOutputFor(child: ChildProcess) {
  const printStdout = (data: Buffer) => {
    process.stdout.write(data.toString());
  };
  const printStderr = (data: Buffer) => {
    process.stderr.write(data.toString());
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  child.stdout && child.stdout.on('data', printStdout);
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  child.stderr && child.stderr.on('data', printStderr);

  child.once('close', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    child.stdout && child.stdout.off('data', printStdout);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    child.stderr && child.stderr.off('data', printStderr);
  });
}

async function waitFor(child: ChildProcess) {
  return new Promise<void>(resolve => {
    child.once('close', () => resolve());
  });
};
