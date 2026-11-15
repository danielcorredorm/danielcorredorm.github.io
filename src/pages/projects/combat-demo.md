---
layout: ../../layouts/Markdown.astro
title: "GAS action-combat demo"
description: "Technical breakdown of a single-player action-combat demo in Unreal Engine 5.4 and C++: data-driven ability sets, tag-bound input, a custom root-motion dash task, combo windows and Magnitude Calculation costs."
tagline: "Technical breakdown · Unreal Engine 5.4 · C++ · Gameplay Ability System"
facts:
  What: "Single-player third-person action-combat demo"
  Built for: "My technical test for Indie Level Studio"
  Engine: "Unreal Engine 5.4"
  Code: "C++ (gameplay framework, GAS, input, AI tasks) + Blueprints / data assets for content"
  Source: "<a href=\"https://github.com/danielcorredorm/Combat_Demo\">github.com/danielcorredorm/Combat_Demo</a>"
source: "https://github.com/danielcorredorm/Combat_Demo"
video: "ylgzDHg4BoE"
videoTitle: "GAS action-combat demo: gameplay video"
---


A player character fights AI enemies with a melee combo, a dash, jump and double jump. Everything the character can do is granted by the **Gameplay Ability System** from data, and every input reaches its ability through a **Gameplay Tag**, so adding a new ability is data work, not new input code.

**Controls:** left mouse button attacks (base, combo and final attack all use it), Left Shift dashes, Space jumps and double jumps, Left Ctrl crouches, WASD and the mouse move and look. The demo opens on the `L_DemoGame` map.

## How input reaches an ability

```text
Enhanced Input action
   │  (UDPInputConfig: InputAction ↔ InputTag)
   ▼
UDPEnhancedInputComponent::BindAbilityByTag   ── Started → pressed, Completed → released
   ▼
ADPCharacter::AbilityInputTag_Trigger(InputTag, bPressed)
   ▼
UDPAbilitySystemComponent::AbilityInputTagTrigger
   │  finds every granted ability whose spec carries that InputTag
   ▼
TryActivateAbility  (or InputPressed / InputReleased on an active ability)
   ▼
UDPGameplayAbility subclass: Attack · FinalAttack · Dash · Jump · DoubleJump
```

## 1. The ability set is a data asset

[`UDPAbilitySet`](https://github.com/danielcorredorm/Combat_Demo/blob/main/Source/DemoProject/Abilities/DPAbilitySet.h) is a `UPrimaryDataAsset` that lists what a character gets: abilities (each with a level and an **InputTag**), attribute sets (each initialized from a data table) and gameplay effects. The character only calls `GiveToAbilitySystem` when it is possessed. The pattern follows Epic's Lyra sample.

```cpp
FGameplayAbilitySpec AbilitySpec(AbilityCDO, AbilityToGrant.AbilityLevel);
AbilitySpec.SourceObject = SourceObject;
AbilitySpec.DynamicAbilityTags.AddTag(AbilityToGrant.InputTag);
abilitySystem->GiveAbility(AbilitySpec);
```

Invalid entries are logged with their index and skipped instead of crashing, so a designer who leaves a slot empty gets a clear error.

## 2. Abilities bound to input by tag

[`UDPInputConfig`](https://github.com/danielcorredorm/Combat_Demo/blob/main/Source/DemoProject/Inputs/DPInputConfig.h) is a data asset that pairs each Enhanced Input action with a tag, split into native actions (move, look, crouch) and ability actions. [`UDPEnhancedInputComponent::BindAbilityByTag`](https://github.com/danielcorredorm/Combat_Demo/blob/main/Source/DemoProject/Components/DPEnhancedInputComponent.h) binds every ability action twice, on `Started` and `Completed`, and passes the tag plus a pressed/released flag.

[`UDPAbilitySystemComponent::AbilityInputTagTrigger`](https://github.com/danielcorredorm/Combat_Demo/blob/main/Source/DemoProject/Components/DPAbilitySystemComponent.cpp) looks for the granted abilities whose spec has that tag. If the ability is not active it tries to activate it; if it is active, it forwards the press or release (`AbilitySpecInputPressed/Released` and the replicated input events), so abilities can react to holding or releasing a button.

## 3. Native Gameplay Tags

Tags used from C++ are declared as **native tags** with `UE_DECLARE_GAMEPLAY_TAG_EXTERN` / `UE_DEFINE_GAMEPLAY_TAG` in [`DPGameplayTags`](https://github.com/danielcorredorm/Combat_Demo/blob/main/Source/DemoProject/Abilities/DPGameplayTags.h): native input (`Input.Native.Move`, `Look`, `Crouch`), SetByCaller magnitudes (`SetByCaller.Damage`, `SetByCaller.Respawn`) and animation windows (`ANS.HandleCollision`, `ANS.HandleCombo`, `ANS.FinalAttack`). Code never looks tags up by string, and a typo is a compile error. Content tags (abilities, character states, ability input) live in `DefaultGameplayTags.ini`.

## 4. Dash: a custom root-motion Ability Task

[`UDPTApplyRootMotion_Dash`](https://github.com/danielcorredorm/Combat_Demo/blob/main/Source/DemoProject/Abilities/Dash/DPTApplyRootMotion_Dash.cpp) extends `UAbilityTask_ApplyRootMotion_Base`. It builds a `FRootMotionSource_ConstantForce` (direction × strength, duration, optional strength curve, gravity on/off) and applies it to the character movement component, so the dash goes through the movement component instead of setting the actor's location.

- On finish it clamps the velocity to the walk speed, so the character does not slide after the dash.
- It can switch the movement mode during the dash and restore the previous one.
- `OnDestroy` removes the root motion source by ID and marks it for removal, so cancelling the ability never leaves a force running.

[`UDPGADash`](https://github.com/danielcorredorm/Combat_Demo/blob/main/Source/DemoProject/Abilities/Dash/DPGADash.cpp) creates the task along the actor's forward vector, plays the dash montage and ends the ability when the task broadcasts `OnFinish`.

## 5. Combo and hit windows from an AnimNotifyState

[`UDPANS_WindowNotify`](https://github.com/danielcorredorm/Combat_Demo/blob/main/Source/DemoProject/Animation/DPANS_WindowNotify.cpp) is one reusable AnimNotifyState with a tag field: it adds that tag to the owner's ability system as a loose tag when the window opens and removes it when it closes. Animators place the windows on the montage; code only reacts to tags.

[`UDPGAAttack`](https://github.com/danielcorredorm/Combat_Demo/blob/main/Source/DemoProject/Abilities/Attack/DPGAAttack.cpp) plays its montage and waits on those tags with `WaitGameplayTagAdded` / `WaitGameplayTagRemoved`:

- `ANS.HandleCollision` turns the weapon's hit box on and off.
- `ANS.HandleCombo` shows the combo prompt and, while the window is open, sets the weapon's damage multiplier to the running ability's value (×1 on the base attack, ×2 on the combo attack). When the window closes it goes back to ×1.
- [`UDPGAFinalAttack`](https://github.com/danielcorredorm/Combat_Demo/blob/main/Source/DemoProject/Abilities/Attack/DPGAFinalAttack.cpp) listens to `ANS.FinalAttack` instead: a sphere overlap (radius 1000 units) launches nearby characters away and applies 50 damage through a gameplay effect with a `SetByCaller.Damage` magnitude.

### How the combo chains

All three attacks are on the same button. Each attack is its own ability, and which one fires is decided only by tags:

- **`GA_Attack`** fires on a normal press (only death blocks it). While it plays, the character has `Character.State.Attack.Base`.
- **`GA_AttackCombo`** has two Activation Required Tags: `Character.State.Attack.Base` and `ANS.HandleCombo`. While it plays, the character has `Character.State.Attack.Combo`.
- **`GA_FinalAttack`** requires `Character.State.Attack.Combo`. While it plays, the character has `Character.State.Attack.Final`.

So pressing attack again while the base attack's combo window is open starts the combo attack; pressing during the combo attack starts the final attack. Outside the window the combo ability is missing a required tag and simply does not activate. Each ability also blocks the others with **Block Abilities with Tag**, so a click cannot restart the attack that is already playing.


## 6. Ability cost from a Magnitude Calculation

Each ability has an `AbilityCost` property. [`UDPCostMagnitudeCalculation`](https://github.com/danielcorredorm/Combat_Demo/blob/main/Source/DemoProject/Abilities/DPCostMagnitudeCalculation.cpp), a `UGameplayModMagnitudeCalculation`, reads it from the ability in the effect context:

```cpp
if (const auto GameplayAbility = Cast<UDPGameplayAbility>(Spec.GetContext().GetAbility()))
{
    return GameplayAbility->AbilityCost;
}
return 0.0f;
```

One shared cost gameplay effect (`GE_StaminaCost`) serves every ability; tuning a cost is a number on the ability, not a new effect asset. The costs in the demo:

| Ability | Stamina cost |
|---|---|
| Base attack | 5 |
| Combo attack | 10 |
| Final attack | 20 |
| Dash | 10 |
| Double jump | 10 |

Health and Stamina start at 100, initialized from a data table. The [attribute set](https://github.com/danielcorredorm/Combat_Demo/blob/main/Source/DemoProject/Abilities/DPAttributeSet.cpp) clamps both between 0 and their max in `PreAttributeChange`. Stamina comes back through `GE_StaminaRegen`, an infinite periodic effect that the ability set grants on spawn: +0.1 every 0.1 s, about 1 point per second, always on. The slow rate is intentional.


## Also in the project

- **Activation policies** on the base ability (on input, while input is active, on spawn, passive), with spawn activation that respects the ability's net execution policy.
- **Enemy AI** with Behavior Tree tasks: find a random location and attack the target, where the attack task activates a GAS ability on the enemy.
- **Death and revive** driven by attribute change delegates and a blocking gameplay effect with a `SetByCaller.Respawn` magnitude.
- **UMG** character overlay, enemy health bar and combo prompt.

## What I'd change today

I built this demo against a delivery deadline, so there is plenty to improve. For example:

- **Fix a death bug:** once the player dies, enemies can keep hitting them and the player "dies" again several times.
- **Add a real respawn:** today the player only revives. I would add a proper respawn after death.
- **Give enemies different behaviors.**

## Assets

- Character: Unreal Engine mannequin (Manny / Quinn).
- Attack and sword-idle animations: Mixamo. The dash animation is third-party; its source was not recorded.
- Sword: [Sword of Miracle Free](https://sketchfab.com/3d-models/sword-of-miracle-free-a163029fb3d74626bbb1711bd8840c46) by Art_workshop, Sketchfab, CC Attribution.
- Level: Unreal Engine prototype grid materials and meshes.

