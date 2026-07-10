# ICP and Price Validation Baseline

Status: Phase 0 evidence baseline  
Captured: 2026-07-10  
Analytics window: previous 7 days from 2026-07-03T08:26:51Z  
Source: read-only aggregate of the configured Supabase `analytics_events` table

## 1. Initial ICP hypothesis

The first paying audience is deliberately narrow:

> Independent developers and small product teams building B2B SaaS with Next.js, React,
> Tailwind, shadcn, and an AI coding tool, who can ship functionality but need a coherent,
> production-ready visual system without hiring a full design team.

This ICP is a hypothesis to validate. It is not permission to expand support to every framework or
customer type.

## 2. Current seven-day funnel

| Signal | Count | Interpretation |
| --- | ---: | --- |
| Total analytics events | 27,288 | Complete rows retrieved for the seven-day window |
| Unique sessions | 2,672 | Session-ID based; not equivalent to authenticated users |
| Page views | 21,565 | Acquisition volume, not purchase intent |
| Style views | 5,040 | Users are exploring named visual directions |
| Code copies | 232 | Closest existing proxy for implementation intent |
| CTA clicks | 387 | Mixed CTA types; not specific enough for pricing decisions |
| Searches | 17 | Search instrumentation is sparse relative to traffic |
| GitHub clicks | 48 | Open-source interest signal |
| Style exports | 0 | Either unused or not instrumented at the actual export seams |
| Template views | 0 | Existing event type is not producing usable data |

Observed code-copy rate relative to style views: approximately 4.6%.

This is not a purchase-conversion rate. Users have not been shown a priced pack, deliverable list,
license, refund policy, or checkout/deposit action.

## 3. Style demand signals

### Top style views

| Rank | Style | Views |
| ---: | --- | ---: |
| 1 | Corporate Clean | 323 |
| 2 | Neumorphism | 276 |
| 3 | Editorial | 228 |
| 4 | Glassmorphism | 218 |
| 5 | Neo-Brutalist | 192 |
| 6 | Soft UI | 168 |
| 7 | macOS Vibrancy | 145 |
| 8 | Bento Grid | 143 |
| 9 | Notion Style | 127 |
| 10 | Minimalist Flat | 113 |

### Top style-specific code copies

| Rank | Style | Copies |
| ---: | --- | ---: |
| 1 | Corporate Clean | 25 |
| 2 | Neo-Brutalist | 14 |
| 3 | Data Dense | 10 |
| 4 | Apple Style | 10 |
| 5 | Soft UI | 9 |
| 6 | Editorial | 8 |
| 7 | Neumorphism | 8 |
| 8 | Linear Style | 7 |
| 9 | Ghibli Style | 7 |
| 10 | Glassmorphism | 6 |

Seventeen additional copy events used the slug `unknown`; tracking identity must be corrected before
using copies as a precise per-style conversion metric.

## 4. What the evidence supports

- Product/SaaS-oriented styles currently show stronger implementation signals than Cyberpunk Neon.
- Corporate Clean is the leading Pack 1 candidate because it ranks first in both views and known
  style-specific code copies.
- Editorial and Glassmorphism remain strong alternative test directions.
- Existing data does not prove willingness to pay, preferred deliverables, or acceptable price.
- Rankings may contain exposure bias because the current analytics do not record catalog-card
  impressions or rank position.

## 5. Pack 1 offer hypothesis

Working name: **Corporate Clean SaaS Production Pack**

Proposed outcome:

> Install a complete, restrained B2B SaaS visual system into a clean Next.js + Tailwind + shadcn
> project, including the states and page structures that AI-generated interfaces usually omit.

Minimum priced-offer deliverables:

- one complete runnable SaaS application shell;
- navigation, hero/summary, data card, table/list, form, dialog, empty, loading, error, and success blocks;
- full light/dark variables and state rules;
- restrained motion with keyboard, touch, and reduced-motion behavior;
- a small owned or explicitly licensed asset set;
- one supported shadcn-compatible install channel;
- compatibility, conflict, update, refund, and commercial-use terms.

No public pack page or visual purchase entry is authorized by this document. Its visual design requires
explicit approval before implementation.

## 6. Price hypotheses

Test prices must be shown with the same deliverables and license:

- **Founding Solo:** CNY 199 one-time.
- **Solo Plus anchor:** CNY 399 one-time with a clearly bounded update period.
- **Private Brand Kit discovery:** starting at CNY 3,000 for tightly scoped custom work.

The CNY 199 price tests low-friction demand. The CNY 399 price tests whether the production outcome,
rather than prompt quantity, supports healthier unit economics.

## 7. Validation evidence required

### Quantitative path

- 30-day window;
- at least 200 qualified ICP visitors who see price, deliverables, license, and refund terms;
- at least 5% verified-email price acceptance;
- at least 2% checkout start, paid preorder, or defined deposit.

### Interview path

- 20 interviews with the target ICP;
- at least 6 explicitly accept the displayed price;
- at least 3 are willing to place a deposit.

Waitlist clicks without price exposure do not count as purchase intent.

## 8. Unit economics gate

Before Pack 2 begins, Pack 1 must record:

- no more than 80 maintainer production hours unless explicitly approved;
- no more than CNY 1,500 external asset cost unless explicitly approved;
- payment fees, taxes, refunds, and net collected revenue;
- at least 90% clean-project install success;
- median support below 30 minutes per successful install;
- refund rate below 20%;
- break-even unit count and contribution margin.

Ten customers are an initial demand signal, not proof of sustainable profitability.

## 9. Instrumentation status before the offer test

Implemented without visual changes on 2026-07-10:

- `showcase_open` on the two existing style-detail entry points;
- `shadcn_command_copy` on successful command copy;
- `catalog_impression` with one-based rank, sort, filter count, and no raw search query;
- corrected `code_copy` style identity without the `unknown` sentinel;
- strict public-event runtime validation, request limits, rate limiting, and server-derived style slugs;
- client/authoritative trust separation so browser events cannot claim verified intent, checkout,
  purchase, refund, or installation success.

Defined in the event contract but intentionally not emitted until the corresponding approved offer,
checkout, payment, or install-verification source exists:

- `pack_offer_view`
- `pack_price_view`
- `pack_purchase_intent`
- `pack_checkout_start`
- `pack_purchase`
- `pack_refund`
- `pack_install_success`

Historical data cannot be backfilled for the newly instrumented events. Their baseline begins only
after this version is deployed. A public priced offer remains gated by explicit frontend approval.

Execution materials are indexed in
[`PRODUCT_VALIDATION_PLAYBOOK.md`](./PRODUCT_VALIDATION_PLAYBOOK.md).
