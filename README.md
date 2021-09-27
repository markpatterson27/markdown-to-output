# Markdown to Output Action

[![units-test](https://github.com/markpatterson27/markdown-to-output/actions/workflows/test.yml/badge.svg)](https://github.com/markpatterson27/markdown-to-output/actions/workflows/test.yml)

GitHub Action that parses a markdown file to action output. Supports frontmatter and templating.

## Usage

```yaml
name: Markdown to Output
on: push
jobs:
  markdown-output:
    name: Markdown to Output
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2 
      - uses: markpatterson27/markdown-to-output@v1
        id: mto
        with:
          filepath: examples/project.md
      - run: |
          echo ${{ steps.mto.outputs.attributes }}
          echo ${{ steps.mto.outputs.body }}
```

## Inputs

| Input Name | Required | Default | Description |
|---|---|---|---|
| `filepath` | yes | none | Path to markdown file. |

## Outputs

| Output Name | Description |
|---|---|
| `attributes` | Array of parsed front matter attributes. Attribute names are converted to lowercase kebab-case with special characters removed. |
| `body` | Main body content of file. |
