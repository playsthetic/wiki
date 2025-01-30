# wiki

## Requirement

-   [Bun](https://bun.sh/) >= 1.2.1

## Development

Install requirements.

```shell
bun install
```

Run the live server locally.

```shell
bun vitepress dev
```

## Build

GitLab CI will automatically publish the pages when pushing new commits.
That said if you want to build locally run the command below.

```shell
bun vitepress build
```
