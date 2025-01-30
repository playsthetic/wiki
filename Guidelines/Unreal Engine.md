## Code

The rule of thumb for our projects is to stay away from native C++ code unless absolutely necessary. In other words, make a native base class in C++ only when something cannot be done in script. When we start profiling, functions that are not performing well enough can be re-written in C++.

For the most part, we match the conventions established by the existing Unreal Engine code. For instance, all symbols should be [Pascal cased](https://en.wiktionary.org/wiki/Pascal_case), like `MyFunction`. The following paragraphs are about differences and added conventions.

### Acronyms

Abbreviations or acronyms are a source of [debate](https://stackoverflow.com/questions/15526107/acronyms-in-camelcase) and should generally be avoided. You will find inconsistency in their capitalization across Unreal's codebase, with names like `FGuid` or `SetFOV`. For our sake, we'll be sticking to the [Microsoft guidelines](https://docs.microsoft.com/en-us/previous-versions/dotnet/netframework-1.1/141e06ef(v=vs.71)?redirectedfrom=MSDN) which dictates to use uppercase for two characters acronyms, such as `2D` for "two dimensions", and [Pascal case](https://en.wiktionary.org/wiki/Pascal_case) for the rest, such as `Fov` for "field of view".

### Classes

Try to stay away from prefixing your classes with the project name. The game code is not destined to be shared across projects like plugins' code would, therefore we can spare the redundancy. If classes were to be copied in another project, this will also save us some unnecessary refactoring.

In case of conflict with pre-existing engine class names, pre-fixing is acceptable, but try finding a name that define your classes more precisely first.

### Functions

Functions should describe an action. For this reason, they should start with a verb such as `DoThis`, `GetThat`, and `SetThose`.

### Delegates

For delegates always use the `On` prefix and past form such as `OnSomethingHappened`.

> [!Info]  
> Delegates in code are called event dispatchers in Blueprint. Custom events in Blueprint are called functions in code. Finally, functions are just functions.

### Engine code changes

The engine code is added as a submodule to the project's repository. Any change to that codebase should be preceded by a `// Playsthetic` commented line. This is to simplify the [[Unreal Engine migration|migration process]].

## Scripts

For scripting, we rely on an open source project called [Unreal Engine AngelScript](https://angelscript.hazelight.se/). Scripting is where we'll be storing most of the project's code logic and shares about the same coding standards established for C++. All AngelScript classes will be suffixed with the letter `_AS` such as `APlayerPawn_AS`.

## Assets

We comply to the [type prefix convention](https://docs.unrealengine.com/4.27/en-US/ProductionPipelines/AssetNaming/) established by Epic Games such as a grid texture would be named `T_Grid` texture. Find below a list of own custom type prefixes.

| Prefix | Type                           |
| ------ | ------------------------------ |
| PP     | Post Process Material          |
| PPI    | Post Process Material Instance |

> [!Note]  
It is also worth mentioning that we not use the prefix `BP` for blueprints but instead use a prefix derived from their inherited code class. For example a sword actor Blueprint asset would therefore for be called `A_Sword`.

When it comes to folder structure, a teapot static mesh for a kitchen could be stored in one of these two ways:

```
/Kitchen/SKM_Kitchen_Teapot.uasset
/Kitchen/Teapot/SKM_Kitchen_Teapot.uasset
```

As you can see we are aiming for unique names regardless of which folder the asset lives in.

> [!Note]  
> Even though we are putting some effort into having a logical and organized folder structure, we recommend search assets using the "Open Asset" feature (Ctrl + P). It has brilliant support for fuzzy search and will take paths and types into consideration.

Finally, there is an important distinction when it comes to capitalized snake vs Pascal casing as both naming convention can coexist in an asset name.

If we had two types of teapots such as an English and Japanese teapot the skeletal meshes would respectively be named `SKM_Kitchen_EnglishTeapot` and `SKM_Kitchen_JapaneseTeapot`.

As you can see `EnglishTeapot` is not snake cased, that is because `English` is not an entity, the `EnglishTeapot` is the unique entity. This is an indication that we do not use folders for arbitrary grouping but solely for entity nesting.

### Blueprints

Blueprints should not feature any logic unless absolutely necessary. Most of the logic should live in script or native code, leaving Blueprint solely for deriving class defaults and manipulating pre-existing components.

### Materials

Material parameters shall be using title-case such as `My Float Parameter`. This will make all material parameters labeled in the same style, whether they are built-in or custom.

Do not reference material directly. Instead, prefer passing through a material instance. This makes testing, setting up defaults, and swapping entire materials easier.

### Material layers

Material layer parameter groups should all be prefixed with the name of the layer such as a Snow layer parameter group called Snow Textures. 

> [!Note]  
> This is because there is currently a bug in Unreal that will hide groups with the same name in the material details panel.

### Material functions

Limit the use of material functions to abstract reusable blocks of functionality. Do not nest material parameters in functions, only expose inputs that can be fed to the function by its client. If you are tempted to break these conventions, it probably means you want to start looking into material layers.

### Textures

Unless salvaged from somewhere else, always create your textures in 4096 and export them to PNG. In the editor, make use of the Maximum Texture Size property to define what should compute at runtime. Trying to push data destruction as late as possible in the pipeline will offer great flexibility.

### Niagara

Niagara system parameters shall be [Pascal cased](https://en.wiktionary.org/wiki/Pascal_case) such as `MyFloatParameter`. This will make all attributes appear the same way, whether they are built-in or custom.

Stay away from using material dynamic parameters in favor of renderer material bindings whenever possible. Currently, material bindings cannot be used for per-particle attributes.

### Materials

Material parameters shall be using title-case such as `My Float Parameter`. This will make all material parameters labeled in the same style, whether they are built-in or custom.

Do not reference material directly. Instead, prefer passing through a material instance. This makes testing, setting up defaults, and swapping entire materials easier.

### Material layers

Material layer parameter groups should all be prefixed with the name of the layer, such as a `Snow` layer parameter group called `Snow Textures`. 

> [!Note]  
> This is because there is currently a bug in Unreal that will hide groups with the same name in the material details panel.

### Material functions

Limit the use of material functions to abstract reusable blocks of functionality. Do not nest material parameters in functions, only expose inputs that can be fed to the function by its client. If you are tempted to break these conventions, it probably means you want to start looking into material layers. Material function inputs should be title cased, such as `My Float Input`.

### Textures

Unless salvaged from somewhere else, always create your textures in `4096` and export them to `.png`. In the editor, make use of the `Maximum Texture Size` property to define what should compute at runtime. Trying to push data destruction as late as possible in the pipeline will offer great flexibility.

### Niagara systems

Niagara system parameters shall be [Pascal cased](https://en.wiktionary.org/wiki/Pascal_case) such as `MyFloatParameter`. This will make all attributes appear the same way whether they are built-in or custom.

Stay away from using material dynamic parameters in favor of renderer material bindings whenever possible. Currently, material bindings cannot be used for per-particle attributes.

### Animation Blueprints

More coming when they are being used more intensively.

## Static meshes

Modeling will happen in Blender with models facing `-Y`. When imported in the editor, static meshes should end up facing `Y`.

> [!Note]  
> It's worth mentioning that the `Right` view should be used to see a model from the front in the editor. Not sure how much this due to legacy shananigans, but for compatibility we will obey by it.

## Skeletal meshes

All skeletal meshes are created in the editor using `Convert to Skeletal Mesh`. In terms of bone naming convention, we follow the snake case convention established by Unreal such as 'pelvis', `upperarm_l`, etc.

### Control rigs

As it stands we are leveraging the powerful modular control rigs.
