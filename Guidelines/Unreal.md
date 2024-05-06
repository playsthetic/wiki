## Code

The rule of thumb for our projects is to stay away from native C++ code unless absolutely necessary. In other words, make a native base class in C++ only when something cannot be done in AngelScript or Blueprint. Later down the road, once we start profiling, functions that are not performing well enough can be re-written in C++.

For the most part, we match the conventions established by the existing Unreal Engine code. For instance, all symbols should be [Pascal cased](https://en.wiktionary.org/wiki/Pascal_case), like `MyFunction`. The following paragraphs are about differences and added conventions.

### Acronyms

Abbreviations or acronyms are a source of [debate](https://stackoverflow.com/questions/15526107/acronyms-in-camelcase) and should generally be avoided. You will find inconsistency in their capitalization all across Unreal's codebase, that said, we need to pick sides here. We will not follow the [Microsoft guidelines](https://docs.microsoft.com/en-us/previous-versions/dotnet/netframework-1.1/141e06ef(v=vs.71)?redirectedfrom=MSDN) and always uppercase the first character while lowercasing any subsequence ones, thus regardless of the acronym's length. "2D" (two dimensions) will become `2d`, and "FOV" (field of view) will become `Fov`.

### Classes

Do not prefix your classes with the game name. Our code is specific to each game, therefore there is no need to prefix everything with redundant information. In addition, if classes were to be reused in another project, this will save some unnecessary refactoring. In case of conflict with pre-existing engine names, be creative and find words that define your class more precisely. All native C++ code classes should be suffixed with `C` such as `APlayerPawnC`.

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

### Engine migration

There are easy steps to follow when migrating to a newer engine version in order to keep things as painless as possible. 

#### Minor updates

Start by doing a fresh clone of the official engine code using the following command:

```
gh repo clone EpicGames/UnrealEngine
```

Now `cd` to the `Engine` folder and generate a patch using:

```
git diff current-version-tag new-version-tag -- > patch.diff
```

Remove all instances of `Engine/` using the following PowerShell command:

```
(Get-Content patch.diff) -replace 'Engine/', '' | Out-File -encoding UTF-8 patch-fixed.diff
```

Make a fresh clone of our version of the engine using:

```
gh repo clone Playsthetic/unreal-engine
```

Use `cd unreal-engine` to change the current directory and run:

```
git apply ../UnrealEngine/Engine/patch-fixed.diff
```

This will result in a substantial list of changes. Most will be good changes, but a few will be reverting our custom additions to the engine. These can easily be identified because we prefix any line change with a `//Playsthetic` line.

Once all changes have been taken and conflicts resolved, the migration should be completed. Commit the changes with `git commit -m Update to X.X.X` followed by `git push`.

#### Major updates

For major updates, the patch method just won't work, as there are simply too many changes. We recommend following these steps below:

1. Get the latest engine with `gh repo clone EpicGames/UnrealEngine`.
2. Get our engine with `gh repo clone playsthetic/unreal-engine`.
3. Run `cd unreal-engine`.
4. Merge the newer and older `.gitignore`.
5. Delete the `Binaries`, `Build`, `Config`, `Plugins`, `Programs`, `Shaders`, `Source` folders.
6. Copy the newer version of these folders into `unreal-engine`.
7. Run `git add --force .`.
8. Run `git commit -m "Update to X.X.X"`.
9. Run `git rm -r --cached .`. This will delete the ignored files.
10. Run `git add .`. This will stage the deletion.
11. Run `git commit -m "Remove unnecessary files"`.
12. Cherry pick and resolve previous custom change commits.
13. Run `git push`.

### Script

For scripting, we rely on an open source project called [Unreal Engine AngelScript](https://angelscript.hazelight.se/). Scripting is where we'll be storing most of the project's code logic and shares most of the coding standards established in C++ code.

### Classes

All AngelScript classes will be suffixed with the letter `A` such as `APlayerPawnA`.

## Assets

Names should be [Pascal cased](https://en.wiktionary.org/wiki/Pascal_case), such as a wooden crate would be named `WoodenCrate`.

> [!Note]  
> Suppressing the presence of underscores solves the eternal question of when and why they should be used. You will see soon that we reserver underscores for another use.

Do not prefix or suffix assets with their type abbreviation, such as SK for skeletal meshes.

> [!Note]  
> Not using type prefixes may surprise some, as it goes against [Epic's recommendation](https://docs.unrealengine.com/4.27/ko/ProductionPipelines/AssetNaming/). That said, we find that having this information present in the name isn't quite necessary. Unreal's search takes types into account and displays them at all times next to the asset name. It's also worth noting that the Unreal editor itself does not comply with these official recommendations. For example, when creating a material instance, the resulting asset will be suffixed `Inst`. When importing a skeletal mesh, the skeleton will end up suffixed with `Skeleton`.

A teapot static mesh for a kitchen could be stored in one of these two ways:

```
/Game/_Kitchen/StaticMeshes/Kitchen_Teapot.uasset
/Game/_Kitchen/_Teapot/Teapot_StaticMesh.uasset
```

This example reveals a few important aspects of our naming convention. First off, we can see two types of folder.

Namespace folders such as `_Kitchen` are in singular form and used to store related assets. These folders are always prefixed with underscores, so they can show on top when browsing assets. The namespace is then reflected in the asset name and separated using underscores.

Type folder such as `SkeletalMeshes` are in plural form and are used to store assets of the same type. By convention, we are using the literal Unreal type to name these folders. When an asset does not live in a type folder, it needs to be suffixed with its type. That's the case of `Teapot_StaticMesh.uasset` on the second line.

If the teapot comprised two static meshes parts, we could consider one of these two configurations:

```
/Game/_Kitchen/StaticMeshes/Kitchen_Teapot_Body.uasset  
/Game/_Kitchen/StaticMeshes/Kitchen_Teapot_Lid.uasset  
  
/Game/_Kitchen/_Teapot/StaticMeshes/Kitchen_TeapotBody.uasset  
/Game/_Kitchen/_Teapot/StaticMeshes/Kitchen_TeapotLid.uasset
```

This second example still follows all the conventions mentioned above. Take note that `TeapotBody` is Pascal cased on two last lines because `Teapot` is not a namespace on that context.

> [!Note]  
> Even though we are putting some effort into having a logical and organized folder structure, we do recommend to not browse your assets manually. Instead, make use of the "Open Asset" feature (Ctrl + P) and its brilliant support for lazy typing. It will search not only names but also paths and types.

### Blueprints

Blueprints should not feature any logic unless absolutely necessary. Most logic should live in script or native code and Blueprint should solely be used to derive classes defaults value.

In the logic had to be implemented in Blueprint, most points made in the code section would apply. Use [Pascal case](https://en.wiktionary.org/wiki/Pascal_case) for properties, functions, dispatchers, components, and timelines like you would in C++. It's tempting to give your symbols nice names with spaces when using Blueprint, but ultimately it makes it inconsistent when searching inherited symbols declared in C++. It also makes refactoring easier when moving stuff between code and Blueprint.

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
