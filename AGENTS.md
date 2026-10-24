<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Landing page sections live in src/components/xio/; server IP/port/links are centralized in config.ts so every section stays consistent.
- Live Minecraft status polls api.mcsrvstat.us from the browser via React Query refetchInterval; community data uses the browser backend client with anon insert/select RLS.
