---
layout: ../../layouts/Markdown.astro
title: "Contenders: Arena"
description: "Gameplay work on Contenders: Arena (GAMECAN EU), a multiplayer shooter in Steam Early Access: GAS abilities, Magnetic Hand and client-side prediction."
tagline: "Third-person multiplayer shooter · GAMECAN EU"
facts:
  Role: "Gameplay Engineer"
  Studio: "GAMECAN EU (Pärnu, Estonia)"
  Dates: "May 2023 – Dec 2024 (with Oh, Hel No!)"
  Game: "3D third-person multiplayer shooter"
  Platform: "PC (Steam Early Access)"
  Tech: "Unreal Engine 4, C++, Blueprints, Gameplay Ability System"
  Links: "<a href=\"https://store.steampowered.com/app/2445510/Contenders_Arena/\">Steam</a> · <a href=\"https://gamerant.com/contenders-arena-hands-on-preview/\">Game Rant preview</a>"
# Gallery alt texts, in the order of 1.jpg to 4.jpg
shotAlts:
  - "A robot fighter clings to a wall in a sci-fi arena marked with the Contenders logo"
  - "Overhead view of an orange robot leaping across arena platforms while firing a laser"
  - "An arena corridor with a red hologram of a robot fighter"
  - "Three robot fighters on pedestals in front of team banners"
video: "ZDS5orT1VqM"
videoTitle: "Contenders: Arena — Gameplay Trailer"
videoNote: "The official gameplay trailer. It shows the game, not only my part of it."
---

## What I built

I worked across many abilities together with other developers. Every ability in the game was built on the **Gameplay Ability System**.

### Magnetic Hand

I built **Magnetic Hand** almost from scratch and took it to a finished, working state. It is an ability for Gunn, the tank character. Gunn stretches out his hand and uses a magnetic field to pull objects toward him, such as the flag in Capture the Flag, and also enemy and allied players. The ability has its own UI.

- **Server-side pull, replicated to everyone.** The pull runs on the server. The RPCs and replication are set up so every other player sees the object or player being pulled by the ability's owner.
- **Prediction on pulled players.** The game is fast-paced, and keeping client and server in sync was a constant challenge. The team used movement prediction to avoid jittering. In Magnetic Hand I used it to predict the pull on another player, so the pulled player does not desync.

### Studio practices

- I set up the studio's central Unreal Engine technical documentation and repository guidelines.
- The team worked with Jira, Perforce and Confluence, with dev, QA and production branches, and everything was documented.
- I researched and integrated new Unreal Engine features, and guided cross-functional teams on project structure, optimization and debugging of multiplayer systems.

## Project status

The game is in Steam Early Access. GAMECAN EU closed for lack of funding, so development did not continue.
