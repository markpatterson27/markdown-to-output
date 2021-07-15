# Markdown to Output Action

[![units-test](https://github.com/markpatterson27/markdown-to-output/actions/workflows/test.yml/badge.svg)](https://github.com/markpatterson27/markdown-to-output/actions/workflows/test.yml)

GitHub Action that parses a markdown file to action output. Supports frontmatter and templating.

## Usage

```yaml
uses: markpatterson27/markdown-to-output@master
with:
  filepath: examples/project.md
```

## Inputs

| Name | Required | Default | Description |
|---|---|---|---|
| `filepath` | yes | none | Path to markdown file. |

## Outputs
