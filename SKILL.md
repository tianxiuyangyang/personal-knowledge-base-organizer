---
name: personal-knowledge-base-organizer
description: Build or adapt a polished Chinese personal knowledge-base website with PARA organization, a dashboard, editable knowledge nodes, an infinite pan-and-zoom graph, and fullscreen immersion. Use when a user wants a personal knowledge vault or a site matching the bundled 知境 experience; do not use for a generic blog or simple notes list.
metadata:
  short-description: Build the 知境-style personal knowledge-base site
---

# 个人知识库整理skill

Create a user-owned, local-first personal knowledge-base website that matches the bundled **知境** experience: editorial dashboard, capture and review workflow, and an editable knowledge-space network as the primary interface.

## Primary rule: preserve the reference experience

The canonical implementation is in [`assets/zhijing-site-template/`](assets/zhijing-site-template/). When the user asks for the same site, **start from that template** instead of recreating a visually similar interface from scratch. This protects functional parity for the graph, LocalStorage persistence, responsive layout, dark mode, keyboard command menu, and fullscreen behavior.

Use [`scripts/create_knowledge_base_site.py`](scripts/create_knowledge_base_site.py) to copy and personalize the canonical files. Read [`references/site-contract.md`](references/site-contract.md) before changing the template. Read [`references/knowledge-method.md`](references/knowledge-method.md) when the task includes structuring the user's actual knowledge or adapting the starter data.

## Fast path: create the identical site

1. Decide the destination directory. If the user gave a workspace, create the website inside it using a clear directory such as `知识库网站`.
2. Use the generator script. Provide `--profile` only if a profile JSON was supplied; otherwise its defaults preserve the original visual reference.
3. Run `node --check <destination>/app.js`.
4. Serve the directory locally (`python -m http.server 8080`) or use the user's existing local preview method.
5. Verify these observable flows:
   - homepage has the prominent **知识地图** launch card;
   - its “进入知识空间” button opens the graph;
   - its fullscreen button, and the graph-page fullscreen button, enter/exit fullscreen;
   - graph node create, edit, connect, drag, and persistence work;
   - inbox and task interactions work;
   - desktop and mobile layouts do not obscure the editor.

Do not introduce a backend, npm build step, framework migration, analytics, authentication, cloud storage, images, or copyrighted media unless the user specifically asks. The reference implementation is deliberately static and local-first.

## Personalize with intent

Ask only for information that materially changes the personalized result and cannot be safely inferred:

- display name and initial;
- a short personal system subtitle/status;
- active projects, long-term areas, and starter notes if the user wants real content rather than the starter examples.

If details are absent, create the site first with the bundled starter content and clearly identify the files/data areas the user can later replace. Avoid inventing private biographical facts.

The template uses all-custom CSS, Canvas-rendered graph visuals, text, and browser-native APIs. Do not replace it with third-party graphics merely to add ornamentation.

## Required implementation invariants

- The homepage must treat the knowledge map as a **core project**, not a buried navigation item.
- The graph must be directly manipulable: pan, zoom, node selection, drag repositioning, creation, editing, connections, deletion, and reset/fit view.
- Fullscreen applies to the graph workbench (not merely the page) and must be exited with `Esc`.
- Interaction data must persist locally; current implementation uses namespaced LocalStorage keys.
- Preserve accessibility basics: real buttons, labels for editor controls, focusable controls, and readable contrast.
- Preserve the site’s Chinese-first language and refined “deep ink / warm paper / olive / gold” visual system unless the user explicitly requests a redesign.
- When altering DOM IDs or the graph data model, update the associated JavaScript and test every graph action afterward.

## Working modes

### Exact replica

Copy the bundled template through the generator. Make only requested identity/content substitutions. This is the default for “和现在这个一模一样” requests.

### Personal content adaptation

Keep the interaction and visual contract intact; update data arrays in `app.js`, visible copy in `index.html`, and profile strings. Use the PARA and node-design guidance in [`references/knowledge-method.md`](references/knowledge-method.md).

### Existing site integration

First inspect the current project and identify whether its routing, CSS, and state model can safely host the reference implementation. If it cannot, place the canonical implementation in a separate route or self-contained directory rather than partially copying graph code into incompatible markup. Retain existing conventions only when doing so does not break the required graph behaviors.

## Definition of done

A completed result includes the static site source, an easy local launch instruction, and a tested knowledge-space route. For the bundled implementation, the required source files are `index.html`, `styles.css`, and `app.js`; no external build dependency is required.
