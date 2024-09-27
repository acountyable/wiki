// generate_readmes.ts

import { walk } from "https://deno.land/std@0.203.0/fs/mod.ts";
import { join, extname, basename } from "https://deno.land/std@0.203.0/path/mod.ts";

// Define the source and output directories
const sourceDir = "./src";
const contentDir = "./content";
const countiesOutputDir = join(contentDir, "counties");
const statesOutputDir = join(contentDir, "states");

// Ensure the output directories exist
await Deno.mkdir(countiesOutputDir, { recursive: true });
await Deno.mkdir(statesOutputDir, { recursive: true });

// Function to sanitize strings for YAML and filenames
function sanitizeString(str: string): string {
  if (typeof str !== 'string') return '';
  return str.replace(/"/g, '\\"').replace(/\n/g, ' ').trim();
}

function sanitizeFilename(name: string | undefined): string {
  if (typeof name !== 'string') return '';
  return name.replace(/ /g, "_").replace(/[^a-zA-Z0-9_-]/g, "").toLowerCase();
}

// Function to determine if the JSON represents a state or a county
function isStateLevel(geoid: string): boolean {
  // US Census GEOID for state has 2 digits
  return geoid.length === 2;
}

// Helper function to capitalize strings
function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Define interfaces for your data structures
interface Layer {
  name: string;
  data: string;
  protocol: string;
  website?: string;
  license?: Record<string, string>;
  compression?: string;
  conform?: Record<string, any>;
  [key: string]: any; // if there are additional unknown properties
}

interface Data {
  coverage: any;
  schema: number;
  layers: Record<string, Layer[]>;
  description?: string;
}

// Function to convert JSON data to Markdown content with YAML front matter
function createMarkdownContent(data: Data, type: 'state' | 'county'): string {
  const coverage = data.coverage || {};
  const usCensus = coverage["US Census"] || {};
  const geoid = usCensus.geoid || '';
  const name = usCensus.name || '';
  const stateName = usCensus.state || coverage.state || '';
  const country = coverage.country || '';
  const stateCode = coverage.state || '';
  const countyName = coverage.county || '';

  // Start constructing YAML front matter
  const frontMatterLines = [
    "---",
    `title: "${sanitizeString(type === 'state' ? `${stateName} State` : `${name}`)}"`,
    `geoid: "${sanitizeString(geoid)}"`,
    `state: "${sanitizeString(stateName)}"`,
    `country: "${sanitizeString(country)}"`,
  ];

  if (type === 'county') {
    frontMatterLines.push(`county: "${sanitizeString(countyName)}"`);
  } else {
    frontMatterLines.push(`type: "state"`);
  }

  frontMatterLines.push(`schema: ${data.schema || 1}`);

  // Add layers information
  if (data.layers) {
    frontMatterLines.push("layers:");
    for (const [layerName, layerArray] of Object.entries(data.layers)) {
      frontMatterLines.push(`  ${layerName}:`);
      (layerArray as Layer[]).forEach((layer) => {
        frontMatterLines.push(`    - name: "${sanitizeString(layer.name)}"`);
        frontMatterLines.push(`      data: "${sanitizeString(layer.data)}"`);
        frontMatterLines.push(`      protocol: "${sanitizeString(layer.protocol)}"`);

        // Optional fields
        if (layer.website) {
          frontMatterLines.push(`      website: "${sanitizeString(layer.website)}"`);
        }
        if (layer.license) {
          frontMatterLines.push(`      license:`);
          for (const [key, value] of Object.entries(layer.license)) {
            frontMatterLines.push(`        ${key}: "${sanitizeString(value)}"`);
          }
        }
        if (layer.compression) {
          frontMatterLines.push(`      compression: "${sanitizeString(layer.compression)}"`);
        }

        // Conform details
        if (layer.conform) {
          frontMatterLines.push(`      conform:`);
          for (const [key, value] of Object.entries(layer.conform)) {
            if (Array.isArray(value)) {
              frontMatterLines.push(`        ${key}:`);
              value.forEach((item: any) => {
                if (typeof item === 'object') {
                  frontMatterLines.push(`          -`);
                  for (const [k, v] of Object.entries(item)) {
                    frontMatterLines.push(`            ${k}: "${sanitizeString(v)}"`);
                  }
                } else {
                  frontMatterLines.push(`          - "${sanitizeString(item)}"`);
                }
              });
            } else if (typeof value === 'object') {
              frontMatterLines.push(`        ${key}:`);
              for (const [k, v] of Object.entries(value)) {
                frontMatterLines.push(`          ${k}: "${sanitizeString(v)}"`);
              }
            } else {
              frontMatterLines.push(`        ${key}: "${sanitizeString(value)}"`);
            }
          }
        }
      });
    }
  }

  // Close YAML front matter
  frontMatterLines.push("---\n");

  // Add Markdown content (optional)
  let markdownContent = '';
  if (type === 'county') {
    markdownContent += `# ${name} County

**State:** ${stateName}

**GEOID:** ${geoid}

## Description

${sanitizeString(data.description || "No description available.")}

## Layers

`;

    // Optionally, list layers in the content
    if (data.layers) {
      for (const [layerName, layerArray] of Object.entries(data.layers)) {
        markdownContent += `### ${capitalize(layerName)}\n\n`;
        (layerArray as Layer[]).forEach((layer, index) => {
          markdownContent += `**Layer ${index + 1}:** ${layer.name}\n\n`;
          markdownContent += `- **Data URL:** [Link](${layer.data})\n`;
          markdownContent += `- **Protocol:** ${layer.protocol}\n`;
          if (layer.website) {
            markdownContent += `- **Website:** [Link](${layer.website})\n`;
          }
          if (layer.license) {
            markdownContent += `- **License:** ${layer.license.text} ([Link](${layer.license.url}))\n`;
          }
          if (layer.compression) {
            markdownContent += `- **Compression:** ${layer.compression}\n`;
          }
          if (layer.conform) {
            markdownContent += `- **Conform:**\n`;
            for (const [key, value] of Object.entries(layer.conform)) {
              if (Array.isArray(value)) {
                markdownContent += `  - ${capitalize(key)}:\n`;
                value.forEach((item: any) => {
                  if (typeof item === 'object') {
                    markdownContent += `    - ${JSON.stringify(item)}\n`;
                  } else {
                    markdownContent += `    - ${item}\n`;
                  }
                });
              } else if (typeof value === 'object') {
                markdownContent += `  - ${capitalize(key)}:\n`;
                for (const [k, v] of Object.entries(value)) {
                  markdownContent += `    - ${capitalize(k)}: ${v}\n`;
                }
              } else {
                markdownContent += `  - ${capitalize(key)}: ${value}\n`;
              }
            }
          }
          markdownContent += `\n`;
        });
      }
    }
  } else if (type === 'state') {
    markdownContent += `# ${stateName} State

**GEOID:** ${geoid}

## Description

${sanitizeString(data.description || "No description available.")}

## Counties

`;

    // List all counties with links in a table
    if (data.counties && data.counties.length > 0) {
      markdownContent += "| County | Link |\n|--------|------|\n";
      data.counties.forEach((county: any) => {
        const countyName = county.coverage?.county || county.name || 'Unknown';
        const countySanitized = sanitizeFilename(countyName);
        markdownContent += `| ${sanitizeString(countyName)} | [Link](./${countySanitized}.md) |\n`;
      });
    } else {
      markdownContent += "No counties available.\n";
    }

    markdownContent += `\n## Layers\n\n`;

    // List layers in a table format
    if (data.layers) {
      for (const [layerName, layerArray] of Object.entries(data.layers)) {
        markdownContent += `### ${capitalize(layerName)}\n\n`;
        markdownContent += "| Name | Data URL | Protocol | Conform |\n|------|----------|----------|--------|\n";
        (layerArray as Layer[]).forEach((layer) => {
          const name = sanitizeString(layer.name);
          const dataUrl = `[Link](${sanitizeString(layer.data)})`;
          const protocol = sanitizeString(layer.protocol);
          const conform = layer.conform ? JSON.stringify(layer.conform).replace(/"/g, '\'') : 'N/A';
          markdownContent += `| ${name} | ${dataUrl} | ${protocol} | ${conform} |\n`;
        });
        markdownContent += "\n";
      }
    }
  }

  return frontMatterLines.join("\n") + markdownContent;
}

// Function to generate State JSON and README
async function generateStateFiles(statesData: Map<string, any[]>) {
  for (const [stateCode, counties] of statesData.entries()) {
    if (counties.length === 0) {
      console.warn(`No counties data found for state code: ${stateCode}`);
      continue;
    }

    // Assume all counties belong to the same state
    const stateName = counties[0].coverage["US Census"].state || counties[0].coverage.state || '';
    const geoid = counties[0].coverage["US Census"].geoid || '';

    // Extract state-level information
    const stateData = {
      coverage: {
        "US Census": {
          geoid: geoid.substring(0, 2), // State GEOID is first 2 digits
          name: stateName,
          state: stateName
        },
        country: counties[0].coverage.country || '',
        state: stateCode,
      },
      schema: 2,
      layers: {
        addresses: [],
        parcels: [],
        buildings: []
      },
      counties: counties.map(county => ({
        name: county.coverage.county,
        geoid: county.coverage["US Census"].geoid,
        data_types: Object.keys(county.layers || {})
      }))
    };

    // Aggregate layers from all counties
    counties.forEach(county => {
      if (county.layers) {
        for (const [layerType, layerArray] of Object.entries(county.layers)) {
          if (stateData.layers[layerType]) {
            stateData.layers[layerType].push(...(layerArray as Layer[]).map((layer: Layer) => ({
              ...layer,
              county: county.coverage.county
            })));
          }
        }
      }
    });

    // Define state directory
    const sanitizedState = sanitizeFilename(stateCode);
    const stateDir = join(statesOutputDir, sanitizedState);
    await Deno.mkdir(stateDir, { recursive: true });

    // Write state JSON
    const stateJsonPath = join(stateDir, "data.json");
    await Deno.writeTextFile(stateJsonPath, JSON.stringify(stateData, null, 2));
    console.log(`Generated ${stateJsonPath}`);

    // Generate state README
    const stateReadmeContent = createMarkdownContent(stateData, 'state');
    const stateReadmePath = join(stateDir, "README.md");
    await Deno.writeTextFile(stateReadmePath, stateReadmeContent);
    console.log(`Generated ${stateReadmePath}`);
  }
}

// Collect all JSON file paths first
const jsonFilePaths: string[] = [];
for await (const entry of walk(sourceDir, {
  exts: [".json"],
  includeFiles: true,
  skip: [
    /\/services\//,
    /\/scripts\//,
    /\/_includes\//,
    /\/_data\.yml/,
    /\/plugins\.ts/,
    /\/README\.md/,
    /\/LICENSE/,
    /\/CHANGELOG\.md/,
    /\/404\.md/,
  ],
})) {
  if (entry.isFile && extname(entry.name) === ".json") {
    jsonFilePaths.push(entry.path);
  }
}

// Map to hold state-wise counties data
const statesData = new Map<string, any[]>();

// Function to process a single file
async function processFile(path: string) {
  try {
    // Read and parse the JSON file
    const jsonData = await Deno.readTextFile(path);
    const data: Data = JSON.parse(jsonData);

    // Extract coverage information
    const coverage = data.coverage || {};
    const usCensus = coverage["US Census"] || {};
    const geoid = usCensus.geoid || '';
    const name = usCensus.name || '';
    const stateName = usCensus.state || coverage.state || '';
    const country = coverage.country || '';
    const stateCode = coverage.state || '';
    const countyName = coverage.county || '';

    if (!geoid || !stateName) {
      console.warn(`Skipping ${path}: Missing 'geoid' or 'state' information.`);
      return;
    }

    const type: 'state' | 'county' = isStateLevel(geoid) ? 'state' : 'county';

    // Generate Markdown content
    const markdown = createMarkdownContent(data, type);

    // Determine the relative path to the state directory
    const relativePath = path.substring(sourceDir.length + 1); // Remove 'src/' prefix
    const pathSegments = relativePath.split("/");

    if (pathSegments.length < 2) {
      console.warn(`Skipping ${path}: Unable to determine state or filename.`);
      return;
    }

    const state = pathSegments[0];
    const filename = pathSegments.slice(1).join("/"); // Handle possible nested directories

    // Sanitize state and county names for directory and file names
    const sanitizedState = sanitizeFilename(state);
    const sanitizedCounty = sanitizeFilename(basename(filename, ".json"));

    if (type === 'county') {
      // Define the output directory based on state
      const stateCountiesDir = join(countiesOutputDir, sanitizedState);
      await Deno.mkdir(stateCountiesDir, { recursive: true });

      // Define the output file path for the county Markdown
      const outputFilePath = join(stateCountiesDir, `${sanitizedCounty}.md`);

      // Write the Markdown file
      await Deno.writeTextFile(outputFilePath, markdown);
      console.log(`Generated ${outputFilePath}`);

      // Aggregate data for the state JSON and README
      if (!statesData.has(stateCode)) {
        statesData.set(stateCode, []);
      }
      statesData.get(stateCode)!.push(data);
    } else if (type === 'state') {
      // Define the output directory for state
      const stateDir = join(statesOutputDir, sanitizedState);
      await Deno.mkdir(stateDir, { recursive: true });

      // Define the output file paths for state JSON and README
      const stateJsonPath = join(stateDir, "data.json");
      const stateReadmePath = join(stateDir, "README.md");

      // Write state JSON
      await Deno.writeTextFile(stateJsonPath, JSON.stringify(data, null, 2));
      console.log(`Generated ${stateJsonPath}`);

      // Generate state README
      const stateReadmeContent = createMarkdownContent(data, 'state');
      await Deno.writeTextFile(stateReadmePath, stateReadmeContent);
      console.log(`Generated ${stateReadmePath}`);
    }

  } catch (error) {
    console.error(`Error processing ${path}:`, error);
  }
}

// Function to process files with concurrency
async function run() {
  const concurrencyLimit = 10;
  let index = 0;

  async function worker() {
    while (index < jsonFilePaths.length) {
      const currentIndex = index++;
      const path = jsonFilePaths[currentIndex];
      await processFile(path);
    }
  }

  const workers = Array(concurrencyLimit).fill(null).map(() => worker());
  await Promise.all(workers);

  // After processing all files, generate state-level files from aggregated data
  await generateStateFiles(statesData);
}

await run();
