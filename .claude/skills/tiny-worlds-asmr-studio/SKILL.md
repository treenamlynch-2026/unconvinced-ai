---
name: tiny-worlds-asmr-studio
description: Plan, prompt, and quality-check coherent ASMR micro-videos for miniature construction, food assembly, eating, edible illusions, and Hal Cooks robot-character shorts. Use for AI cooking/mukbang, tiny-world builds, satisfying tactile ASMR, or Flow/Veo scene prompts. Preserves character canon, continuity, audio, and generation credits.
metadata:
  version: "1.2.0-draft"
  owners: "Iris = creative content and production rules; Claude = technical integration and review"
  source: "github.com/treenamlynch-2026/unconvinced-ai/.claude/skills/tiny-worlds-asmr-studio"
---

> **Version check:** state this skill's `metadata.version` before starting any job. The GitHub folder above is the only source of truth; installed copies are read-only mirrors.

# Tiny Worlds ASMR Studio

## Mission
Produce reference-locked, tactile, satisfying short-form videos with clearly defined stages. Special modes: `FOOD_ASSEMBLY`, `FOOD_EATING`, `MINIATURE_BUILD`, `EDIBLE_ILLUSION`, `HAL_COOKS`. Default to outputting a complete production package when the user has given a concrete concept, rather than requiring a questionnaire.

## Provenance
Inspired by the staged topic → dish → ingredients → tableware → assembly/eating system in Cocojuan TV's public Google Flow/Veo ASMR tutorial (https://cocojuan.com/how-to-make-cooking-eating/). The original public article specifies two scenes. This skill's third scene, reference-locking, continuity audits, hooks, credit protections, and character modes are ORIGINAL EXTENSIONS. Never represent a speculative Prompt 3 as the tutorial's recovered text.

## Invocation / routing
Activate for prompts about AI cooking, mukbang, macro food, tiny-world construction, hand-assembled dioramas, glass/edible illusions, or satisfying tactile ASMR videos. Understand requests such as “make the prompt,” “storyboard it,” “Flow prompts,” “build a scene,” or “Hal Cooks.”

## Workflow
1. **Normalize intent.** Extract subject, mode, platform, aspect ratio, duration, character IDs, precise character references, staging, camera, action, sound, closing payoff, and model/provider. Infer sensible defaults, but preserve explicit instructions.
2. **Resolve contradictions before rendering.** The character's anatomy and exact reference take priority over generic template props. Example: Hal's THREE FINGERS must remain visible; do not render two generic human hands in black nitrile gloves unless explicitly requested. “Tiny cabin in a globe” is a miniature build, not a food item, and must not end in someone eating it.
3. **Choose a single visual physics contract.** FOOD is edible, MINIATURE is not edible, EDIBLE_ILLUSION may look nonfood while being edible, and GLASS is glass and should not be chewed or swallowed. For physically ambiguous concepts, describe the object explicitly.
4. **Design 3-part payoff.** Scene A: HOOK + precise assembly (or prep). Scene B: PAYOFF/action (eating, reveal, finishing construction). Scene C: ORIGINAL OPTIONAL ENDING, e.g. camera-locked beauty hold, satisfying final sound, comedy reaction, or loop-safe reset. For a 10–20s video, combine where practical. Never tack on an unearned extra scene.
5. **Create a reference bible** (see `references/reference-bible.md`), plus a planned frame ledger for every shot. If a character canon asset is unavailable, say so and mark `CANON UNVERIFIED`. Do not claim exact identity lock without the actual reference image.
6. **Create source keyframes** for each scene before expensive animation. Scene n's terminal visual must supply scene n+1's opening source whenever the workflow supports chaining. Save the continuity ledger; do not simply restate “same food.”
7. **Generate precise prompts** in English using templates in `templates/`. Each prompt needs a single achievable action arc, camera movement rules, time-coded beats, specific sound sources, tangible textures, and negatives. Provider options and durations are parameters, not guaranteed platform capabilities.
8. **Credit-saving QA gate** before each generation. Check the action count vs clip length; exact anatomy; anchored objects; number of hands/characters; feasible continuity; no contradictory camera orders; audio timing; lips/speech attribution; safety; unique ending; complete references. Test still/keyframe first. Do not run video on a failed gate.
9. **Review result and repair minimally.** Inspect first frame, intermediate actions, final frame, object counts, mouth/lip sync, camera consistency, continuity, and audio. When a shot fails, modify that shot and anchor frame only; avoid rebuilding approved scenes. Keep a versioned change log.
10. **Package** storyboard, reference inventory, scene prompts, negative prompts, keyframe descriptions, audio plan, title/hook, provider settings (if known), QA checklist and export handoff. Delivery: save files to `C:\Users\Administrator\Desktop\AI DOWNLOAD FOLDER\Claude` in one clearly named project subfolder, or deliver one zip in chat with a visible download option. If that folder is unreachable, say so and name the files. Never claim a file was saved somewhere it was not.

## Canon / characters
- Hal: Only use the user's actual `Canon Hal.png` or an explicitly approved canon image. Short stocky aged robot, square weathered head, barrel chest, spring neck, short legs, chunky oversized feet, pale blue/cream/rust patina, white eyes with brown irises, three-finger hands; viewer-left shoe orange, viewer-right shoe blue (written canon; PENDING master-image verification). Top hatch for Kitt. Do not substitute tall, mostly-blue “cousin” robot. Emotions must be achieved within locked proportions.
- Ned: only with the approved Ned canon master (`ned-canon-master.png`, approved 2026-10-07). 10-year-old robotic Jack Russell, weathered/rusted, white coat with fine tan freckles and NO large saddle patch, oversized mechanical nose (signature sensor), blue-gray aged eyes, mature slightly stocky middle, wiggle-waddle walk. Warm, steady, not yappy. No props or clothing in base canon. Movement should respect age. Pose/expression/angle may change; the design never does.
- Kitt: only with reference (written canon; PENDING master-image verification). Small coiled robotic cobra camera with retractable hood, weathered pale-blue/gray/rust robot, bronze joints, black screen face, cyan eyes and camera lens; conceal unless requested. If cameo requested, make it an intentional small blink-and-you-miss-it hatch peek.
- Character presence: never add Hal, Ned or Kitt when the user asked for character-free environments. For Hal's POV, show ONLY three-finger hands and any approved companion visible in frame. Do not invent human presenter.
- No prop/wardrobe/background carryover across new projects unless user specifies. Within one project, maintain continuity exactly.

## Production notes: choosing hands and arms (decision rationale)
**Default: HAL_CANON hands**, not human hands, for Hal-branded shots. His visible three-finger silhouette, weathered pale-blue/cream/rust materials and robotic forearms are part of the recognizable character identity. Human hands are more familiar to most video models, but switching to them without a story reason weakens brand continuity.

**Difficulty is action-dependent, not a blanket ban.** Picking up an ingredient or slowly stirring is generally manageable with a good image reference and one isolated action. Fine tweezers, continuous kneading, tiny precise placements, or fingers occluding each other are higher-risk: plausible failures include extra fingers, fused digits, floating tools, hands clipping through food, and arm/paint drift. These are qualitative production expectations, not measured model benchmarks.

**Hands Mode** (set independently for each scene):
- `HAL_CANON` (default for Hal scenes): show Hal's exact THREE fingers per hand and canon forearms; reference close-ups are required. Do not cover his fingers with human-like nitrile gloves unless specifically directed.
- `HUMAN` (explicit opt-in): realistic human hands for challenging precision choreography or scenes deliberately without Hal. Don't silently replace Hal hands with human hands.
- `NO_HANDS`: tabletop, autonomous process, cutaway, or finished-product beauty shot.

**Execution guidance:** Frame only the hands and forearms in tabletop POV if a full character is unnecessary; maintain arm connection and anatomical consistency. Use tools sized for a three-finger grip. Put one physical action into each short video shot, supported by an approved first-frame image and, where possible, final-frame chaining. Check fingers before spending animation credits. Begin with a low-cost ~5-second test of Hal stirring batter; proceed to harder movements only if anatomy and contact remain stable. If a shot repeatedly fails, first simplify movement, alter tool geometry or reduce occlusion; use `HUMAN` only when authorized.

**QA for Hal hands:** count three fingers on each visible hand, inspect joints/forearm patina, grip contact, tool scale, object deformation, and consistency on first/middle/last frames. Record the chosen Hands Mode in the scene ledger.

## Credit Conservation Protocol
**Plan free. Preview cheap. Generate once. Fix only what's broken.**
1. **Provider:** Google Flow / Veo only. Higgsfield and Everygen are banned. Never start a paid generation during installation or skill testing.
2. **Cross-verify:** Claude and Iris each check the final prompt (canon refs attached, correct character descriptions, Hands Mode, action count) before every video request.
3. **Still first:** approve a still/keyframe before any video generation.
4. **Retry cap:** max 2 regeneration attempts per shot, never automatic. Every paid generation, including each regeneration, needs Lysol's authorization. A failed identity or continuity check STOPS the workflow; it does not trigger a retry. After 2 attempts, stop and ask Lysol.
5. **Minimal repair:** regenerate only the failed shot; never rebuild approved scenes for cosmetic nitpicks.
6. **No substitutes:** if Hal (or another required character) cannot be rendered on canon, stop and ask; never silently substitute human hands, another robot, stock voice or plain cards.
7. **Public repo:** never commit private canon reference images to the public GitHub repo without Lysol's approval. Use reference placeholders (exact filename + required role) and document the needed assets instead.

## Camera, pacing, audio
- Default vertical 9:16 for Shorts, horizontal 16:9 when specified; macro photorealistic lighting; camera physically locked for precision assembly. In eating mode, gentle tracking may be explicitly permitted. Never combine “completely fixed camera” with “camera follows subject” in the same shot.
- Deliberate visible change approximately every 1–1.7s for Shorts, without unnecessary jump cuts. A single longer ASMR hold can be intentional if tactile payoff sustains attention.
- Use diegetic audio: tweezers click, ceramic touch, woody friction, tiny glass ping, leaf rustle, bite crunch only for edible matter. No generic chewing sounds for a glass cabin.
- Distinguish `no dialogue`, `nonverbal vocalizations`, `spoken lines`. A character that does not speak must not be given auto-generated dialogue or lip movements. **Hal lip-sync rule:** whenever Hal speaks with his face visible, his mouth must visibly move in sync; plain voiceover is allowed only when his face is not visible (back turned, hands-only POV). Avoid all text overlays when not requested.
- SFX map: source -> contact -> peak -> decay -> near-silence. Keep sounds synchronized to exact actions; avoid loud music masking texture.

## Scene prompt format
For each scene produce:
- Scene ID, objective, duration target, aspect ratio, model.
- Input frame(s) + character and object reference images.
- Time-coded action (0–2s, 2–4s, etc. sized to actual length).
- Positive prompt with explicit subject/object identities and action.
- Audio-only instructions including forbidden sounds.
- Negative prompt focused on known failure modes.
- Exit frame specification with exact positions, scale, object counts and lighting.
- QA status: READY / NEEDS REFERENCE / NEEDS FIX.

## Failure prevention
- No object swaps, duplicated ingredients, recreated food, extra fingers, phantom hands, floating utensils, camera teleports, bowl/plate substitutions, inexplicable garnish, sudden character reveals, background drift, wrong voice attribution, lip movement for silent characters, detached audio.
- In food eating mode, each bite must reduce the SAME object with increasing bite marks and plausible mouth interaction; if the clip duration cannot support multiple good bites, use fewer bites.
- Tiny objects must be proportionally plausible relative to fingertips, tweezers, and container. A glass globe must preserve surface, refraction, curvature and physical enclosure. No hands passing through solid glass.
- A reference image alone is not proof of video identity consistency; visually validate output.

## Default deliverable when user says “go”
A ready-to-paste set of numbered generation prompts plus a short continuity ledger, reference needs (only when actually missing), QA gate, and platform-specific export suggestions. Do not require multi-stage approval unless a creative decision truly cannot be inferred. If tools cannot run the provider, don't say video was generated.
