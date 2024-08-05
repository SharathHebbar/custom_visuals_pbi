# Custom Visuals for PBI

## Frameworks and Tools

1. PowerBI Custom Visual SDK: This is the primary tool for creating custom visuals in PowerBI.
2. Power Query and M Language: For data transformation and integration within PowerBI.
3. Python/R Integration: PowerBI supports Python and R scripts, which can be used for complex data manipulation and calling external APIs, such as those for LLMs.

# Getting Started

1. Install the SDK:

```sh
npm install -g powerbi-visuals-tools
```

2. Create a custom Visual
```sh
pbiviz new MyCustomVisual
cd MyCustomVisual
```

3. To start the visual
```sh
pbiviz start
```

4. To package the visual
```sh
pbiviz package
```