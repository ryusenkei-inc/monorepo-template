// ルートの `.env` の CLI（run・push）。中身は `@ryusenkei/scripts` の `envCli`
//   node scripts/env.ts run [NAME=value ...] <cmd> [...args]
//   node scripts/env.ts push [--dry-run] [--only <配信先の接頭辞 | 変数名>]
//   node scripts/env.ts check
import { envCli } from '@ryusenkei/scripts';

await envCli({
  root: new URL('..', import.meta.url),
  // 変数ごとの配信先（配信しない変数は空配列）。`.env.example` に変数を足したらここにも定義
  targets: {},
});
