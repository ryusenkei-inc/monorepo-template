import { runAffectedCheck } from '@ryusenkei/conventions';

const results = await runAffectedCheck({
  steps: () => [
    { name: 'prose-lint', command: 'pnpm', args: ['exec', 'prose-lint'] },
    { name: 'conventions', command: 'pnpm', args: ['exec', 'ryusenkei-conventions', 'check'] },
  ],
});
process.exitCode = results.every((r) => r.ok) ? 0 : 1;
