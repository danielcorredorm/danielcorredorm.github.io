---
layout: ../../layouts/Markdown.astro
title: "Killer Klowns From Outer Space: The Game"
description: "Daniel Corredor's work as a gameplay engineer on Killer Klowns From Outer Space: The Game (Teravision Games), a shipped multiplayer AA title."
tagline: "Shipped multiplayer AA · Teravision Games"
facts:
  Role: "Mid-Level Gameplay Engineer"
  Studio: "<a href=\"https://www.teravisiongames.com/\">Teravision Games</a> (Bogotá, Colombia)"
  Dates: "Jun 2021 – Apr 2023"
  Game: "3D third-person multiplayer, AA"
  Status: "Shipped"
  Tech: "Unreal Engine, C++, Blueprints, Gameplay Ability System"
  Links: "<a href=\"https://killerklownsthegame.com/\">Official site</a>"
video: "iqlVMqvo0hg"
videoTitle: "Killer Klowns From Outer Space: The Game — Launch Trailer"
---

*Video: the official launch trailer. It shows the game, not only my part of it.*

## What I built

My work on the team was broad: I worked across many character abilities and shared gameplay systems.

- Co-developed replicated multiplayer gameplay systems and core mechanics in C++ and Blueprints, using the Gameplay Ability System (GAS) for character abilities.
- Prototyped and built gameplay tools, with maintainable and optimized code, so the design and art teams could iterate fast.
- Profiled game performance and fixed complex multiplayer replication bugs, keeping network synchronization and frame rates stable across target platforms.
- Worked with Art, Audio and QA to deliver complete features, and documented every technical implementation in Confluence.

### An ability I built: Shorty's Pizza Box

Shorty, one of the Klowns, turns into a pizza box with legs, walks around the map blending into the scenery, and ambushes a human player with an uppercut that kills instantly.

- I built the ability and made it fully functional on my own, with the Gameplay Ability System (GAS) and a mix of C++ and Blueprints.
- The hard part was multiplayer: keeping the sounds and animations in sync for every player.

## Multiplayer bugs I fixed

Most of the bugs I fixed were replication bugs:

- **RPCs:** fixed gameplay that broke between server and clients by correcting how RPCs were used.
- **Net dormancy:** fixed bugs in actors whose network dormancy was not handled correctly.
- **UI for a subset of players:** fixed UI that had to be visible only to a specific group of players.

## Credits

I am credited under **Programmers** in the game's credits.

![Close-up of the Programmers section of the in-game credits, with an arrow pointing to the name Daniel Corredor](../../assets/killer-klowns-credits-programmers.jpg)

The full credits screen:

![The in-game credits of Killer Klowns From Outer Space: The Game, Programmers section, with an arrow pointing to the name Daniel Corredor](../../assets/killer-klowns-credits.jpg)
