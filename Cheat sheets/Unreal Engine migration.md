There are easy steps to follow when migrating to a newer engine version in order to keep things as painless as possible. 

## Minor updates

Start by doing a fresh clone of the official engine code using the following command:

```
gh repo clone EpicGames/UnrealEngine
```

Now `cd` to the `Engine` folder and generate a patch using:

```
git diff <current-version-tag> <new-version-tag> -- > patch.diff
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

## Major updates

For major updates, the patch method just won't work, as there are simply too many changes. We recommend following these steps below:

1. Get the latest engine with `gh repo clone EpicGames/UnrealEngine`.
2. Get our engine with `gh repo clone playsthetic/unreal-engine`.
3. Run `cd unreal-engine`.
4. Merge the newer and older `.gitignore`.
5. Delete the `Binaries`, `Build`, `Config`, `Plugins`, `Programs`, `Shaders`, `Source` folders.
6. Copy the newer version of these folders into `unreal-engine`.
7. Run `git add --force .`. This will make sure to stage all the copied files, even if ignored.
8. Run `git commit -m "Update to X.X.X"`.

> [!Note]  
> Optionally you delete anything that should be ignored using the following commands.
   > 
> 1. Run `git rm -r --cached .`. This will delete the ignored files.  
> 2. Run `git add .`. This will stage the deletion.  
> 3. Run `git commit -m "Remove unnecessary files"`.

 1. Cherry pick and resolve previous custom change commits.
 2. Run `git push`.
