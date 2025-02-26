# Optimizing Niagara systems

This is mostly a TLDR version of [this official page](https://dev.epicgames.com/community/learning/tutorials/15PL/unreal-engine-optimizing-niagara-scalability-and-best-practices).

## Systems

Having a lot of Niagara system can be costly. So if you can have one system do the work of many it's better, that said for maintainability and scalability it's not always the best. There are cool assets called [Effect Types](https://dev.epicgames.com/documentation/en-us/unreal-engine/performance-budgeting-using-effect-types-in-niagara-for-unreal-engine?application_version=5.0). They can be assigned to systems and control additional scalability settings for them.

## Emitters

Emitters are also expensive. A couple strategies involved in reducing the amount of emitters is to use multiple renderer modules for a single emitter, leverage the mesh index of the mesh renderer to control what meshes are used, or referencing the [spawn index](https://www.youtube.com/watch?v=oX6uiPWXJDY&t=1120s) on your particles.

> [!Warning]  
> Given context, it's not always better to user an array of mesh in a mesh renderer over multiple emitters. Make sure to profile when you carry these optimizations.

There are also the [Lightweight Emitters](https://dev.epicgames.com/documentation/en-us/unreal-engine/niagara-lightweight-emitters) that were introduced as experimental in 5.4.

## Pooling

Niagara system components referencing the same assets can be stored in a pool. This can be achieved by setting the [pooling method](https://dev.epicgames.com/documentation/en-us/unreal-engine/API/Plugins/Niagara/ENCPoolMethod?application_version=4.27) when spawning the component. There are also pool settings on the system itself.

## CPU vs GPU

It's important to note that there is always a CPU cost to emitters, since only the particle modules would be running on the GPU when using a GPU emitter. The takeaway is the GPU particles are not always better, especially with low particle counts.

## Emitter bounds

Fixed is always more efficient, except when a localize cluster of particle travels far away from the emitter. There are also cvars to control dynamic transform update frequency.

- `fx.Niagara.EmitterBounds.DynamicSnapValue`
- `fx.Niagara.EmitterBounds.DynamicExpandMultiplier`
- `fx.Niagara.EmitterBounds.FixedExpandMultiplier`

## Warmup

Avoid warmup for systems that are not present on start, as the need to evaluate previous frame during runtime can lead to hitches.

## Meshes

These are attributes that are making the mesh heavier.

- Removing collisions from the static mesh asset.
- Turn off `Cast Shadow` on the LOD used by Niagara if shadows aren't needed.
- Turning off the distance field, by setting the LOD `Distance Field Resolution Scale` to `0.0`.
- Making sure the mesh doesn't have extra UV channels.

## Current frame data

This is enabled by default, but most of the emitters might not need it.

## Calculations and data storage

It is important to realize that you can be computing and storing data at different frequencies. Evaluating a value on `System Spawn` is less frequent than doing it at `Particle Spawn`. Similarly, storing a value at System level takes less space than doing it per particle. Make sure to do your calculations at the appropriate place in the stack.

## Avoid events

Particle reads using the attribute reader data interface are generally more performant than events, and can usually achieve the same behavior.

## Sorting

Sorting is disabled by default, but when enabled it will run on the GPU by default GPU, causing an overhead, and taking up extra memory in the index buffer. This can result in poor draw performance.The following cvars can force CPU emitters to sort on the CPU.

- `Niagara.GPUSorting.CPUToGPUThreshold`
- `Niagara.GPUCulling.CPUToGPUThreshold`
