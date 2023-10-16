## Introduction

The rigging process is broken down into two parts. The first part happens in Blender and consists of assembling meshes and bones together via weights. The second part is [the creation of a](https://wiki.playsthetic.com/app/page/10V4VCLOP9fO-zpjstysVfgn41LTjSqWx3XAdlW2uo1A) control rig directly in Unreal, feeding from the armature exported from Blender as FBX.

## Yellow

Yellow is our custom Blender add-on that will help facilitate the rigging workflow. Download the latest version [here](https://github.com/playsthetic/yello/archive/refs/heads/master.zip) and follow [these instructions](https://docs.blender.org/manual/en/latest/editors/preferences/addons.html#installing-add-ons) to install it in Blender. Once installed, you should see a Yellow tab on the right side of your viewport. Buttons have tooltips if you want to know what they do.

## Units

In order to work on skeletal meshes in Blender that will come in at the right scale into Unreal and Unity, you need to [set your Blender unit scale](https://docs.blender.org/manual/en/latest/scene_layout/scene/properties.html#units) to `0.01`. Blender does not behave ideally at this scale so I am always curious to hear how we can fix this in the future. You can keep an eye on [this thread](https://blender.stackexchange.com/questions/202805) if you are interested to know more.

## Hierarchy

In Blender, the root of the rig will automatically be the armature object. For Unreal, though, the root of the skeletal mesh starts with the first bone it finds in the hierarchy. It's important to note that there can only be a single root bone.  

> [!Note]  
There is an option in Blender to change the armature node type to a FBX root or limb node but it does not seem to change anything for Unreal on import.|

Since we need more than a single `Pelvis` bone at the root of the hierarchy, for instance for hit box transforms, we always start the bones' hierarchy with a `Root` bone.

## Axes

All bones should be pointing Y forward which is a convention dictated by Blender.

> [!Note]  
> There is an option in Blender to change the primary bone axis on export, that said it does not seem to change anything on import. Until then we are stuck with Y forward. The feature was suggested on [this thread](https://blender.community/c/rightclickselect/dzhbbc).

Bones that are used as floating locators should be pointing  up. This is not so much something required by Unreal, but it seems to import as a better default in other applications like Cascadeur and Unity.

## Naming convention

Following a strict naming convention is a great base to facilitate automation. This section will take you with how and why we name things a certain way.

### Bones

Bones should have simple unique names such as Head,  `Forarm_L`, or `Pinky_001_L`.  
We use 3 digits increments because that's Blender's default.

### Controls

Controls should have the same unique names as bones because it keeps string manipulation to a minimum when setting up control rigs in Unreal Engine. For IK controls just use the IK prefix such as `IK_Arm_L`.

### Meshes

Meshes should be suffixed with the word Mesh such as `Armor_Mesh`, `ShoulderPad_L_Mesh`. This is because even though Blender supports similar names for objects living in different hierarchies, Unreal FBX's importer does not and will rename your bones on import if they have conflicting names with the mesh.
