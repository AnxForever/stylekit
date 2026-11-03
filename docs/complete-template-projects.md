# Complete projects in the template library

## User outcome and correction

The user expected recognizable, usable website projects in the template library,
including their actual personal site at https://me.anxforever.cn. The earlier
`technical-profile` addition was an original visual study with fictional identity
and content. It did not fulfill that expectation. Keep it as a downloadable
example; do not present it as the user's personal website.

Add the real personal site and three complete upstream projects using the
existing external-project contract. The first card uses the real Anx homepage
capture, names its author, and points to the public site and full repository.
Blog and portfolio discovery must both find it, including searches for its name,
domain, and stack. External project cards do not use StyleKit's partial source or
download endpoints. Internal examples remain available with explicit labels.

## Source evidence, checked 2026-10-14

| Project | Pinned source | Verified scope |
| --- | --- | --- |
| [AnxForever](https://github.com/AnxForever/anx-portfolio) | `a7434847797658402d50fba29827eef246102bb7` | Live footer matches the public repository commit. Profile, projects, `/blog`, four independent articles, `/now`, `/bookmarks`, site search. MDX source and editable profile/project data. |
| [AstroPaper](https://github.com/satnaing/astro-paper) | `35cfa7fbe0b897306d27670d3819e55d5205f3dd` | `src/pages/index.astro`, `posts/[...slug]/index.astro`, and `search.astro`; Markdown/MDX content, Pagefind search, archives, tags, RSS. |
| [Fuwari](https://github.com/saicaca/fuwari) | `6d39b0dec41282e7852e23e032998a5789abee28` | `src/pages/[...page].astro`, `posts/[...slug].astro`, and `archive.astro`; paginated posts, article pages, archives, search, RSS. Older Astro 5/Tailwind 3 stack; not archived when checked. |
| [AstroWind](https://github.com/arthelokyo/astrowind) | `14e1a691f80548dcc36370847b1a02c0d0b12821` | `index.astro`, `about.astro`, and `[...blog]/index.astro`; business pages, composable sections, blog routes. The former onwidget URL redirects to the current repository. |

All four repositories are public. The LICENSE files identify MIT; AstroWind's
file is `LICENSE.md`. Anx retains its upstream copyright and brand policy.
Link to each project's actual license instead of treating source-code permission
as permission to copy personal identities or artwork. Card covers are screenshots
of the linked public sites; the upstream source and media are not repackaged.

Live homepage previews were opened in a real Chromium browser and captured at
1440 by 900. New WebP covers use the existing 1280 by 800 cover format. Upstream
README and source routes were checked; this work does not claim fresh local
builds of all four third-party repositories or verification of their optional
external services.

## Design and acceptance

Keep StyleKit's existing white/black surface, accent, type scale and grid. Use
real project screenshots as the distinguishing visual element. Place the four
new projects first in the recommended order; show the stack, three concrete
capabilities, original preview and full repository. Avoid another row of filter
buttons. Multi-category filtering and search aliases repair discovery directly.

| Feature | Decision and failure cases | Coverage / delivery / research history |
| --- | --- | --- |
| PROJECT-IDENTITY | Show the actual Anx site and repository with its real screenshot; distinguish the prior Alex Morgan sample. | Covered: source/live identity match and 1440px/390px gallery inspection / implemented / backfilled |
| PROJECT-DISCOVERY | Secondary categories, name/domain/repository/stack search; preserve empty query and combined filters. | Covered: discovery unit cases and desktop/mobile browser checks / implemented / backfilled |
| PROJECT-SCOPE | Label upstream projects versus downloadable examples; no local ZIP/source buttons for external sites; license only when known. | Covered: asset/export API unit checks and desktop/mobile card/source-browser checks / implemented / backfilled |
| PROJECT-CATALOG | Three additional complete projects with real routes, documented setup, license and preview; retain attribution and original destinations. | Covered for listing: source routes, license and real homepage preview checked; fresh upstream builds not claimed / implemented / none |

Historical sample limitations remain explicit: some older interface demos have
placeholder links or local form feedback. This release does not turn all of them
into production applications, add backend services to them, or claim the
existing `anx-blog` demo is the author's real site. Its display name now identifies
it as an experimental blog example.
