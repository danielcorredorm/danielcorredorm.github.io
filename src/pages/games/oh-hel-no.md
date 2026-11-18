---
layout: ../../layouts/Markdown.astro
title: "Oh, Hel No!"
description: "Gameplay work on Oh, Hel No! (GAMECAN EU), a multiplayer resource management game: enemy and boss AI, replicated hordes and NPC navigation."
tagline: "Multiplayer resource management · GAMECAN EU"
facts:
  Role: "Gameplay Engineer"
  Studio: "GAMECAN EU (Pärnu, Estonia)"
  Dates: "May 2023 – Dec 2024 (with Contenders: Arena)"
  Game: "3D third-person multiplayer resource management"
  Platform: "PC (Steam Early Access)"
  Tech: "Unreal Engine 5, C++, Blueprints, Behavior Trees, Blackboards, NavMesh"
  Links: "<a href=\"https://store.steampowered.com/app/3225370/Oh_Hel_No/\">Steam</a>"
# Gallery alt texts, in the order of 1.jpg to 4.jpg
shotAlts:
  - "A horned purple creature with a pitchfork next to a chicken on the green crafting map"
  - "Wave 3 in Hel: the player among enemies, 55 kills remaining"
  - "The crafting table menu showing the Stone Grinder recipe"
  - "Enemies close in on the player in Hel, 20 kills remaining"
video: "vEl80jN1qFw"
videoTitle: "Oh, Hel No! — October 2024 Gameplay (Open Development)"
videoNote: "Open-development gameplay from October 2024."
---

## What I built

I built the AI for the game's enemies: the Hel enemies, the boss and the animals on the crafting map. All of it uses Behavior Trees and Blackboards, with NavMesh for navigation.

### Hel enemies and boss

After crafting tasks on the main map, players can enter **Hel**, a level where enemies come in hordes. There are four enemy types, each with melee or ranged attacks, and I built the behavior of each one. All of them chase the match host and attack.

After a set time a boss appears. I also built the boss: it has several attacks and goes after the host too. If the host dies, everyone returns to the crafting level to try again. When the boss dies, Hel resets and enemies spawn again until the next boss. The goal is to survive in Hel as long as possible.

A teammate built the horde spawner; I built the enemies it spawns.

### Crafting-map animals

Chickens and pigs walk between patrol points on the crafting map. If a player attacks them, they turn aggressive and attack players.

### Multiplayer

Enemies and hordes spawn on the server, with RPCs and replication so every player sees the same state. For example, the kill counter updates for everyone, and everyone sees the other players' health, especially the host's.

## Project status

The game is in Steam Early Access. GAMECAN EU closed for lack of funding, so development did not continue.
