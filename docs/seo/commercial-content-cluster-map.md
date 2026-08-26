# Commercial Content Cluster Map

Date: 2026-08-26
Branch: `codex/commercial-seo-pages`
Spec: `docs/superpowers/specs/2026-08-26-commercial-keyword-architecture.md`

All 95 published MDX articles in `src/content/blog` were inventoried before any
was edited. 18 were selected. The other 77 were left untouched — no dates
changed, no `updated` field added, no body edits.

## Selection method

The library is three verticals (freight brokerage, general contracting, DTC
e-commerce) plus two general automation pieces. Almost every post mentions AI, so
"mentions AI" was not a criterion. A post was selected only when:

1. its operational problem maps onto one specialist service without stretching;
2. it is useful to a buyer at the research stage, not only to a practitioner;
3. its primary informational query does not compete with the parent page's
   commercial query;
4. it is specific enough that a link to it reads as a recommendation rather than
   as filler.

Rule 3 is why the strongest-sounding candidates are not always the selected ones.
An article whose primary query is close to a commercial page's primary query is a
cannibalisation risk, not a cluster member.

Each selected article carries exactly one link to its commercial parent, placed
in body copy where the argument naturally reaches for it, plus two or three
related-article links. Anchors are varied and descriptive; none is a repeated
exact-match phrase, and none is "learn more" or "click here".
`scripts/validate-seo.ts` enforces the one-parent rule and resolves every
internal link in every article source at build time.

## Cluster: `/services/ai-chatbot-development`

| Slug | Title | Primary informational intent | Why it supports this parent | Related articles | Overlap found |
| --- | --- | --- | --- | --- | --- |
| `ai-wismo-tickets-dtc-brand` | How AI Clears the WISMO Ticket Backlog at a $10M DTC Brand | what WISMO tickets cost a DTC brand | The archetypal chatbot workload: high-volume status questions with the answer sitting in a system. Reader arrives asking about cost, leaves needing a conversational surface. | `dtc-refund-reflex-delivered-not-received-claims`, `address-errors-dtc-reship-cost` | No |
| `dtc-refund-reflex-delivered-not-received-claims` | The DTC Refund Reflex on Delivered-Not-Received Claims | how to handle delivered-not-received claims | Draws the line between what an assistant should gather and what a human must decide — the fit question the parent page answers. | `ai-wismo-tickets-dtc-brand`, `address-errors-dtc-reship-cost`, `returns-fraud-dtc-margin-tax` | Adjacent to `returns-fraud-dtc-margin-tax`; different primary query (claims handling vs fraud economics) |
| `freight-check-calls-before-after-ai` | Freight Check Calls, Before and After AI | what manual track-and-trace costs a brokerage | The same conversational-retrieval pattern outside e-commerce, which widens the parent page beyond a support-desk read. | `pod-lag-dso-math-freight-brokers`, `load-board-tab-churn-slows-freight-broker-coverage`, `otif-penalties-erode-broker-margin-retail-freight` | No |
| `follow-up-gap-freight-leads` | The Follow-Up Gap: Where 80% of Freight Leads Die | why freight leads go cold after one or two touches | Establishes what an immediate, useful first reply is worth — the sales-side case for a conversational surface. | `hidden-cost-manual-freight-sales-desk`, `manual-credit-reviews-delay-broker-first-loads`, `carrier-onboarding-backlogs-cap-broker-spot-coverage` | Yes — see the consolidation section |
| `cancellation-reason-capture-dtc-winback-blind-spot` | Cancellation Reason Capture and the DTC Winback Blind Spot | how to capture and use cancellation reasons | A conversational surface is also a collection surface; the article makes the case for asking one question at the moment of churn. | `card-on-file-declines-dtc-subscription-churn`, `store-credit-vs-cash-refund-dtc-repeat-purchase`, `return-to-exchange-conversion-dtc-brands` | No |

## Cluster: `/services/forward-deployed-engineer`

| Slug | Title | Primary informational intent | Why it supports this parent | Related articles | Overlap found |
| --- | --- | --- | --- | --- | --- |
| `agentic-ai-blueprint` | Agentic AI Blueprint: Launch High-Impact Automation Pilots in 30 Days | how to run a 30-day agentic AI pilot | The closest thing in the library to a written description of how an embedded engagement opens: frame, assemble, ship, scale. | `automation-roi-playbook`, `manual-vs-ai-order-exception-handling`, `spot-load-carrier-sourcing-agentic-ai` | No |
| `manual-vs-ai-order-exception-handling` | Manual vs AI-Augmented Order Exception Handling | manual vs AI order exception handling | A before-and-after of one process, where the hard parts are discovery and exception design rather than model choice. | `multi-channel-inventory-drift-dtc`, `split-shipments-dtc-multi-warehouse-margin-leak`, `ai-wismo-tickets-dtc-brand` | No |
| `carrier-vetting-manual-vs-ai-assisted-scoring` | Carrier Vetting: Manual Reviews vs AI-Assisted Scoring | manual vs AI-assisted carrier vetting | Scoring rules only survive contact with a real carrier file when written next to the people applying them — the embedded-delivery argument. | `double-brokering-fraud-mid-size-brokerages`, `expired-carrier-docs-broker-capacity-loss`, `carrier-onboarding-backlogs-cap-broker-spot-coverage` | No |
| `subcontractor-bid-leveling-ai-assisted` | Subcontractor Bid Leveling: Manual vs AI-Assisted Review | manual vs AI-assisted subcontractor bid leveling | Implementation study where the work is normalising inconsistent inputs, not the analysis — discovery done beside the desk. | `estimating-capacity-caps-mid-size-gc-pipeline`, `trade-buyout-overruns-erode-gc-job-margin`, `subcontractor-prequal-cycle-time-gc-preconstruction` | No |
| `daily-reports-gc-jobs-forms-to-ai-summaries` | Daily Reports on GC Jobs: From Forms to AI Summaries | how AI changes construction daily reporting | Adoption in the field, not summary quality, decides whether the deployment survives — the clearest case in the library for staying through rollout. | `weekly-oac-meeting-prep-gc-pm-hours`, `truck-ticket-capture-gc-concrete-earthwork-jobs`, `slow-rfi-cost-mid-size-gc` | No |

## Cluster: `/services/custom-ai-software`

| Slug | Title | Primary informational intent | Why it supports this parent | Related articles | Overlap found |
| --- | --- | --- | --- | --- | --- |
| `spot-load-carrier-sourcing-agentic-ai` | Spot Load Carrier Sourcing: Before and After Agentic AI | how agentic AI changes spot carrier sourcing | An agent working a loop end to end, with action boundaries that have to be written into the system — the agent half of the parent page. | `load-board-tab-churn-slows-freight-broker-coverage`, `carrier-no-show-re-coverage-spot-brokerage`, `ai-pricing-engines-freight-broker-quote-desks` | No |
| `ai-pricing-engines-freight-broker-quote-desks` | How AI Pricing Engines Change Freight Broker Quote Desks | what an AI pricing engine does on a quote desk | Business logic as versioned software — the clearest example of the rules a vendor product cannot model. | `fuel-surcharge-update-lag-broker-margin`, `annual-lane-rfp-crunch-mid-size-brokerages`, `spot-load-carrier-sourcing-agentic-ai` | No |
| `freight-bill-audit-sampled-vs-ai-line-item-review` | Freight Bill Audit: Sampled vs AI Line-Item Review | sampled vs full freight bill audit | Custom data processing where the value is precisely the volume a person cannot review. | `ltl-reweigh-fees-compound-broker-margin`, `ltl-reclass-charges-cost-brokerages-quarterly`, `accessorial-revenue-brokerages-forget-to-bill` | No |
| `multi-channel-inventory-drift-dtc` | Multi-Channel Inventory Drift on a $10M DTC Brand | why multi-channel inventory goes out of sync | Several systems each holding a partial truth: reconciliation as an integration problem, which is the most common trigger for a custom build. | `dtc-out-of-stock-conversion-spillover`, `stale-product-data-dtc-marketplace-rankings`, `split-shipments-dtc-multi-warehouse-margin-leak` | No |
| `hidden-cost-manual-submittal-tracking-gcs` | The Hidden Cost of Manual Submittal Tracking on a GC's Desk | what manual submittal tracking costs a GC | A textbook internal-tools case: a critical process on a spreadsheet, an inbox, and one person's memory. | `slow-rfi-cost-mid-size-gc`, `long-lead-procurement-slippage-gc-schedule`, `closeout-drag-punch-list-cost-gc` | No |

## Cluster: `/services`

Broad automation posts. Assigned to the hub rather than the homepage, because
the reader's next question is "what would you actually do", which is a services
question, not a brand question.

| Slug | Title | Primary informational intent | Why it supports this parent | Related articles | Overlap found |
| --- | --- | --- | --- | --- | --- |
| `automation-roi-playbook` | Automation ROI Playbook: Turn AI Experiments Into Pipeline Growth | how to build an automation ROI case | The business case for automation in general, with no single specialist service implied. Belongs to the hub. | `agentic-ai-blueprint`, `hidden-cost-manual-freight-sales-desk`, `manual-vs-ai-order-exception-handling` | No |
| `hidden-cost-manual-freight-sales-desk` | The Hidden Cost of a Manual Freight Sales Desk | what a manual freight sales desk costs | Cross-functional cost-of-manual-work piece — quotes, CRM hygiene, follow-up, P&L. Too broad for one specialist page. | `follow-up-gap-freight-leads`, `manual-credit-reviews-delay-broker-first-loads`, `annual-lane-rfp-crunch-mid-size-brokerages` | Yes — see the consolidation section |
| `manual-tender-acceptance-brokerage-routing-guide` | What Manual Tender Acceptance Costs a Routing Guide | what manual tender acceptance costs | A narrow, well-bounded automation with a one-page acceptance criteria — the shape of ordinary hub work rather than a specialist engagement. | `otif-penalties-erode-broker-margin-retail-freight`, `receiver-appointment-portals-ftl-broker-cycle-time`, `off-hours-loads-slip-mid-size-freight-brokerages` | No |

## Articles deliberately not selected

Recording the near misses so the same debate is not re-run later.

| Slug | Considered for | Why not selected |
| --- | --- | --- |
| `restock-alert-lag-drains-dtc-waitlist-revenue` | chatbot | The mechanism is scheduled notification, not conversation. Selecting it would have stretched the chatbot cluster to mean "any customer messaging". |
| `address-errors-dtc-reship-cost` | chatbot | Genuinely useful, but the primary intent is fulfilment cost, not a conversational surface. Kept as a related link from two chatbot-cluster posts instead. |
| `certified-payroll-spreadsheets-vs-ai-gc`, `carrier-onboarding-backlogs-cap-broker-spot-coverage`, and the other "manual vs AI" vertical posts | forward deployed engineer | The FDE cluster would absorb half the library on the strength of the phrase "manual vs AI". Five posts that are genuinely about implementation and adoption are more useful than fifteen that are about a cost line. |
| The remaining ~70 vertical cost-of-inaction posts | any | Strong for their own informational queries and better left to rank on them. Adding a commercial link to all of them would be a site-wide exact-match pattern, which is the thing the spec rules out. |

## Consolidation analysis

No article is deleted, merged, or redirected in this pass. Two reasons, both
independent of judgement about the content:

1. The repository has **no tested permanent-redirect pattern**. `vercel.json`
   contains one rewrite (`/api/(.*)`) and no `redirects` array, and Phase 1
   deliberately removed the broad SPA catch-all so unknown paths return a real
   404. Introducing redirects here would mean shipping untested routing
   infrastructure alongside a content change.
2. These URLs may already be indexed. Consolidating on anything short of
   unequivocal duplication trades a known ranking for a hoped-for one.

### Candidate pair 1 — the only one with substantial overlap

| Field | Value |
| --- | --- |
| URL A | `https://apexifylabs.com/blog/hidden-cost-manual-freight-sales-desk` |
| URL B | `https://apexifylabs.com/blog/follow-up-gap-freight-leads` |
| Intended query | "cost of a manual freight sales desk" (A) vs "freight lead follow-up gap" (B) |
| Evidence of overlap | Same audience and same desk. Both frame the problem as reps losing hours to repeatable work, both structure the argument as before/after AI, both close with a near-identical "three signals worth checking on your own desk" section, and A's "where the money quietly disappear" section already covers dropped follow-ups — B's entire subject. |
| Recommended canonical | A (`hidden-cost-manual-freight-sales-desk`) — broader scope, covers quoting, CRM hygiene, and the desk P&L, of which follow-up is one section. |
| Unique material to preserve | B's follow-up cadence math (touch coverage, the 80% drop-off after one or two touches, recoverable revenue as a multiple of monthly lead spend) and its "humans still close" framing, neither of which appears in A. |
| Recommended redirect target | `https://apexifylabs.com/blog/hidden-cost-manual-freight-sales-desk`, 301, only after a redirect pattern exists and has been tested against the current 404 behaviour. |
| Confidence | Medium. Not unequivocal: B has a distinct primary query and could equally be strengthened rather than absorbed. **Requires separate approval.** |

Interim treatment applied in this pass: the two posts are assigned to different
purposes (A to `/services`, B to `/services/ai-chatbot-development`), and each
links to the other, so the pair reads as complementary rather than as two
attempts at the same page.

### Candidate pairs examined and rejected

| Pair | Why it is not a consolidation candidate |
| --- | --- |
| `why-brokerages-leave-detention-on-the-dock` / `accessorial-revenue-brokerages-forget-to-bill` | Detention is one accessorial; the second post covers lumper, layover, redelivery, and tarp. Shared vocabulary, different primary queries and different recovery workflows. |
| `change-orders-pricing-gc-margin-twice` / `owner-verbal-directives-never-become-change-orders` | One is about pricing lag on a logged change order, the other about scope that never reaches the log at all. Different failure, different fix, different query. |
| `store-credit-vs-cash-refund-dtc-repeat-purchase` / `return-to-exchange-conversion-dtc-brands` | Refund method versus exchange conversion. Adjacent in the returns flow and correctly cross-linked, but they answer different questions. |
| `ltl-reweigh-fees-compound-broker-margin` / `ltl-reclass-charges-cost-brokerages-quarterly` | Two distinct billing mechanisms that operators search for separately. |

**High-confidence consolidation candidates: zero.**

## Content gaps

Every specialist page reached five genuinely relevant supporting articles, so no
link was manufactured to hit the floor of three. The gaps that remain are
buyer-stage articles the library does not have at all — the six briefs in the
spec, most importantly the two that define the category for a reader who has
never heard the term:

- `What Is a Forward Deployed Engineer? Role, Skills, and When to Hire One`
- `Forward Deployed Engineer vs Solutions Engineer vs AI Consultant`
- `AI Chatbot Development Cost, Timeline, and Architecture Choices`
- `AI Chatbot vs Rule-Based Chatbot for Customer Support`
- `Custom AI Software vs SaaS vs Low-Code Automation`
- `AI Automation Agency vs In-House Team: Cost, Speed, and Ownership`

Writing them is a separate pass and is out of scope here.
