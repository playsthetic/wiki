## Code

The rule of thumb for our projects is to stay away from native C++ code unless absolutely necessary. In other words, make a native base class in C++ only when something cannot be done in script or Blueprint. Later down the road, once we start profiling, functions that are not performing well enough can be re-written in C++.

For the most part, we match the conventions established by the existing Unreal Engine code. For instance, all symbols should be [Pascal cased](https://en.wiktionary.org/wiki/Pascal_case), like `MyFunction`. The following paragraphs are about differences and added conventions.

### Acronyms

Abbreviations or acronyms are a source of [debate](https://stackoverflow.com/questions/15526107/acronyms-in-camelcase) and should generally be avoided. You will find inconsistency in their capitalization all across Unreal's codebase, that said, we will be picking a side. The first character of the acronym will always be uppercase, while subsequent will be lowercase, such as "two dimensions" is `2d` and "field of view" is `Fov`.

> [!Info]  
This differs from the [Microsoft guidelines](https://docs.microsoft.com/en-us/previous-versions/dotnet/netframework-1.1/141e06ef(v=vs.71)?redirectedfrom=MSDN) that make an exception of two letters acronyms such as `IO` or `AI`.

### Classes

Do not prefix your classes with the game name. Our code is specifically written for the game, therefore there is no need to prefix everything with redundant information. In addition, if classes were to be reused in another project, this will save some unnecessary refactoring. In case of conflict with pre-existing engine names, be creative and find words that define your class more precisely. All native our C++ code classes should be suffixed with `_C` such as `APlayerPawn_C`.

### Boolean properties

Unreal Engine has an established convention of prefixing all boolean properties with a `b`. This practice is often referred to as Hungarian notation and is completely unnecessary in modern typed languages like C++,  therefore we will not be adopting this convention on our projects.

### Functions

Functions should describe an action. For this reason, they should start with a verb such as `DoThis`, `GetThat`, and `SetThose`.

### Delegates

For event dispatchers, also known as event dispatchers in Blueprint and not to be confused with custom events, always use the On prefix such as `OnSomethingHappened`.

> [!Info]  
> Delegates in code are event dispatchers in Blueprint. Custom events in Blueprint are functions in code. Finally, functions are just functions.

### Engine code changes

The engine code is added as a submodule to the project's repository. Any change to that codebase should be preceded by a `// Playsthetic` commented line. This is to simplify the migration process presented below.

## Script

For scripting, we rely on an open source project called [Unreal Engine AngelScript](https://angelscript.hazelight.se/). Scripting is where we'll be storing most of the project's code logic and shares most of the coding standards established in C++ code.

### Classes

All AngelScript classes will be suffixed with the letter `_AS` such as `APlayerPawn_AS`.

## Assets

Names should be [Pascal cased](https://en.wiktionary.org/wiki/Pascal_case), such as a wooden crate would be named `WoodenCrate`.

> [!Note]  
> Suppressing the presence of underscores solves the eternal question of when and why they should be used. Below you will see that we reserve underscores for a specific use.

Do not prefix or suffix assets with their type abbreviation, such as `SK` for skeletal meshes.

> [!Note]  
> Not using type prefixes may surprise some, as it goes against [Epic's recommendation](https://docs.unrealengine.com/4.27/ko/ProductionPipelines/AssetNaming/). That said, we find that having this information present in the name isn't quite necessary while hurting readability. Unreal's search takes types into account and displays them at all times next to the asset name. It's also worth noting that the Unreal editor itself does not comply with these official recommendations. For example, when creating a material instance, the resulting asset will be suffixed `_Inst`. When importing a skeletal mesh, the skeleton will end up suffixed with `_Skeleton`.

A teapot static mesh for a kitchen could be stored in one of these two ways:

```
/Game/_Kitchen/StaticMeshes/Kitchen_Teapot.uasset
/Game/_Kitchen/_Teapot/Teapot_StaticMesh.uasset
```

This example reveals a few important aspects of our naming convention. First off, we can see two types of folder.

Namespace folders such as `_Kitchen` are in singular form and used to store related assets. These folders are always prefixed with underscores, so they can show on top when browsing assets. The namespace is then reflected in the asset name separated by underscores as in `Kitchen_Teapot.uasset`.

Grouping folders such as `SkeletalMeshes` are in plural form and are used to store assets of the same type. Generally, we are using the literal Unreal type to name these folders. Assets don't necessary have to live in a grouping folder, in which case they need to be suffixed with their type. That's the case of `Teapot_StaticMesh.uasset` on the second line.

If the teapot comprised two static meshes parts, we could consider one of these two configurations:

```
/Game/_Kitchen/StaticMeshes/Kitchen_Teapot_Body.uasset  
/Game/_Kitchen/StaticMeshes/Kitchen_Teapot_Lid.uasset  
  
/Game/_Kitchen/_Teapot/StaticMeshes/Kitchen_TeapotBody.uasset  
/Game/_Kitchen/_Teapot/StaticMeshes/Kitchen_TeapotLid.uasset
```

This second example still follows the listed conventions. Take note that `TeapotBody` is Pascal cased on two last lines because `Teapot` is not a namespace in that context.

> [!Note]  
> Even though we are putting some effort into having a logical and organized folder structure, we recommend search assets using the "Open Asset" feature (Ctrl + P). It has brilliant support for fuzzy search and will take paths and types into consideration.

### Blueprints

Blueprints should not feature any logic unless absolutely necessary. Most of the logic should live in script or native code, leaving Blueprint solely for deriving class defaults.

If Blueprint had to be used, most points made in the code section would apply. Use [Pascal case](https://en.wiktionary.org/wiki/Pascal_case) for properties, functions, dispatchers, components, and timelines like you would in C++.

> [!Note]  
> It's tempting to give your symbols nice names with spaces when using Blueprint, but ultimately it makes it inconsistent when searching inherited symbols declared in C++. It also makes refactoring easier when moving stuff between code and Blueprint.

#### Custom events

They shall always be prefixed with `Event` and spelled in title case such as `Event Start Eating`. This will look consistent with built-in events and allows finding them easily in search.

> [!Note]  
> On `BeginPlay` is the only built-in event that does not follow that convention. It could be tempting to modify the source to correct that inconsistency.

#### Timelines

Timelines should always end with the word Timeline as it makes it easy to find them in the search.

#### Functions

Always make your functions [pure](https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/UserGuide/Functions/) when possible. In other words for getters that do not modify the state.

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

Niagara system parameters shall be [Pascal cased](https://en.wiktionary.org/wiki/Pascal_case) such as `MyFloatParameter`. This will make all attributes appear the same way whether they are built-in or custom.

Stay away from using material dynamic parameters in favor of renderer material bindings whenever possible. Currently, material bindings cannot be used for per-particle attributes.

### Materials

Material parameters shall be using title-case such as `My Float Parameter`. This will make all material parameters labeled in the same style, whether they are built-in or custom.

Do not reference material directly. Instead, prefer passing through a material instance. This makes testing, setting up defaults, and swapping entire materials easier.

### Material layers

Material layer parameter groups should all be prefixed with the name of thelayer,r such as a `Snow` layer parameter group called `Snow Textures`. 

> [!Note]  
> This is because there is currently a bug in Unreal that will hide groups with the same name in the material details panel.

### Material functions

Limit the use of material functions to abstract reusable blocks of functionality. Do not nest material parameters in functions, only expose inputs that can be fed to the function by its client. If you are tempted to break these conventions, it probably means you want to start looking into material layers.

### Textures

Unless salvaged from somewhere else, always create your textures in 4096 and export them to PNG. In the editor, make use of the Maximum Texture Size property to define what should compute at runtime. Trying to push data destruction as late as possible in the pipeline will offer great flexibility.

### Niagara

Niagara system parameters shall be [Pascal cased](https://en.wiktionary.org/wiki/Pascal_case) such as `MyFloatParameter`. This will make all attributes appear the same way whether they are built-in or custom.

Stay away from using material dynamic parameters in favor of renderer material bindings whenever possible. Currently, material bindings cannot be used for per-particle attributes.
