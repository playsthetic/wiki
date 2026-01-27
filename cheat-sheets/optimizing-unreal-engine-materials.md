# Optimizing Unreal Engine Materials

## Draw calls

It's important to understand that in Unreal, the number of draw calls is a function `mesh × materials`. This means that one material instance asset used on two different mesh components referencing two mesh assets, will result in two draw calls. The same goes for two material instance assets used on two mesh components referencing the same mesh asset.

It's also important to mention that two mesh component referencing the same mesh asset can be interpreted unique when:

- They are not packed on the same lightmap.
- The vertex buffer is unique due to level painted vertex color or altered flags.

To be determined how this applied to meshes rendered through Niagara systems.

## Static switches

Maintaining unique materials can be difficult, as you'll want them to share a parameter interface. This can be achieved by having a layer of parametric material functions (material functions that declare parameters instead of inputs) but it might still feel like a lot of work having to build unique materials each time you are creating something new.

> [!Info]  
> A good case for a parametric function is a "uber" material function used in materials that are affecting parameters that cannot be altered on material instances (i.e. `Disable Depth Test`).

For this reason, the "uber" material approach make sense, and since you cannot afford to have all materials in your game paying for the cost of all the features of this giant network, you will put them behind a static switches.

This solves the runtime evaluation of your material in exchange for a very long shader permutation compiling time when you modify that "uber" material.

> [!Info]  
> As soon as you're hitting these long shader compilation times, you will want to look into computing your [Derived Data Cache](https://dev.epicgames.com/documentation/en-us/unreal-engine/using-derived-data-cache-in-unreal-engine) (a.k.a. DDC) through a continuous integration step in your backend.

## Material layers

Unreal [layered materials](https://dev.epicgames.com/documentation/en-us/unreal-engine/layered-materials) are a potential solution that should be explored to solve the impossible maintainability, performance and permutation triangle by:

- Offering artist the ability to create new material quickly.
- Keep the material performant for runtime.
- Reduce drastically the number of permutations to compile.
