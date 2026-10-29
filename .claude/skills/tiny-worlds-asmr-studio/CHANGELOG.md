# Changelog

## 1.2.2 (2026-10-28) — fixes from the first dry-run test
- Version now stated in the body (account installs strip frontmatter, so `metadata.version` was invisible).
- Body now points to the GitHub folder for templates/references/examples (account installs carry SKILL.md only).
- Hand reference set: Hal canon front image (3 fingers + thumb verified on both hands). Image NOT committed (public repo); stored privately by Lysol.
- Mouth rule corrected from the canon front image: closed = thin line; open = flat rectangular teeth row + pink tongue. Negative changed from "no visible teeth" to "no pointed, sharp or human teeth".

## 1.2.1 (2026-10-28) — Lysol correction from the Hal character reference sheet
- Hal fully re-described from the reference sheet (front/three-quarter/side/back + expressions).
- **Hands: three fingers + thumb per hand** (Lysol-confirmed). Reference sheet hands flagged off-model (draws four fingers in some views).
- Colors: orange rust + cream dominate; blue only as faded, weathered accent patches and the left shoe. A solid or mostly-blue robot = the cousin (NEGATIVE DESIGN).
- Added Hal NEGATIVE DESIGN list, incl. never a mostly-blue head and never a head more rectangular than square (Lysol).
- Hal shoe colors now VERIFIED against the sheet (viewer-left orange, viewer-right blue).
- Version `1.2.0-draft` → `1.2.1`.

## 1.2.0-draft (2026-10-28) — PENDING IRIS REVIEW
Technical (Claude):
- Frontmatter: `version` moved to `metadata.version` (Claude validator rejects unknown keys); added owners + source-of-truth path.
- Folder renamed `Tiny_Worlds_ASMR_Studio` → `tiny-worlds-asmr-studio` (must match `name`).
- Step 10 delivery: replaced ChatGPT-only `/mnt/data` rule with Lysol's Claude-folder / single-zip rule.
- Description: added trigger phrases.

Creative (drafted by Claude — Iris approves/edits/rejects):
- Ned canon aligned to approved master (2026-10-07): saddle patch KEPT, oversized mechanical nose, stocky wiggle-waddle.
- Hal lip-sync rule added.
- New Credit Conservation Protocol section (Flow/Veo only, cross-verify, still first, max 2 retries, minimal repair, no non-Hal substitutes).
- Cabin example: Scene A split into A1/A2 (one action per shot); Scene B roof made one action; Scene C "indistinct movement" removed.

Iris review round 1 (2026-10-28) — applied:
- Regenerations: max 2 attempts, never automatic; each needs authorization; failed identity/continuity check stops the workflow.
- No silent substitution of human hands or another robot.
- Public-repo rule: no private canon images; use placeholders.
- Hal shoe colors + Kitt (now incl. retractable hood) kept as written canon, flagged PENDING master-image verification.

Iris final diff review: confirmed Ned's large brown saddle patch per Lysol's explicit correction; corrected Scene C hand continuity. Hal and Kitt written canon retained with master-image verification still required before generation. Approved for merge.

## 1.1.0 (Iris)
- Hands Mode (HAL_CANON / HUMAN / NO_HANDS) + production notes.

## 1.0.0 (Iris)
- Initial package.
