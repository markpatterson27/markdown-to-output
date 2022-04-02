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
      - uses: actions/checkout@v3 
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

Additionally, each attribute name will have it's own output.

## Similar projects / Inspiration

- [Markdown Meta](https://github.com/mheap/markdown-meta-action) - doesn't output body of file, just front matter attributes
- [Create an Issue Action](https://github.com/JasonEtco/create-an-issue) - file processed to creating issues. no output of file data. goal to do something similar, but want to decouple the process




if just looking to read file contents to step output

```yaml
- id: read-file
  run: echo "::set-output name=contents::$(cat filename.txt)" # doesn't remove CR. does remove LF :(
```