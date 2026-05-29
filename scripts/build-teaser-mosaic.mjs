import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const root = process.cwd();
const defaultRows = 4;
const defaultColumns = 5;
const defaultOutput = `public/assets/videos/teaser-mosaic-${defaultRows}x${defaultColumns}.mp4`;
const presetGroups = {
  mixed: ["pink", "navy_blue", "blue_short", "black_dress", "purple_short", "pink_dress"],
  garments: ["pink", "navy_blue", "blue_short", "black_dress", "purple_short", "pink_dress"],
  dresses: ["black_dress", "pink_dress", "pink", "navy_blue", "blue_short", "purple_short"],
};

const parseArgs = () => {
  const rawArgs = process.argv.slice(2);
  const state = {
    output: defaultOutput,
    preset: "mixed",
    rows: defaultRows,
    columns: defaultColumns,
    tileFit: "auto",
    inputs: [],
    listOnly: false,
  };

  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];

    if (arg === "--output" || arg === "-o") {
      state.output = rawArgs[index + 1] || state.output;
      index += 1;
      continue;
    }

    if (arg === "--preset" || arg === "-p") {
      state.preset = rawArgs[index + 1] || state.preset;
      index += 1;
      continue;
    }

    if (arg === "--rows" || arg === "-r") {
      state.rows = Number.parseInt(rawArgs[index + 1] || String(state.rows), 10);
      index += 1;
      continue;
    }

    if (arg === "--columns" || arg === "-c") {
      state.columns = Number.parseInt(rawArgs[index + 1] || String(state.columns), 10);
      index += 1;
      continue;
    }

    if (arg === "--tile-fit") {
      state.tileFit = rawArgs[index + 1] || state.tileFit;
      index += 1;
      continue;
    }

    if (arg === "--list") {
      state.listOnly = true;
      continue;
    }

    state.inputs.push(arg);
  }

  return state;
};

const collectNumberedVideos = (folder) => {
  const directory = path.join(root, "public/assets/videos", folder);
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .filter((file) => file.toLowerCase().endsWith(".mp4"))
    .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }))
    .map((file) => `public/assets/videos/${folder}/${file}`);
};

const collectFlexRolloutLeaves = () => {
  const baseDir = path.join(root, "public/assets/videos/flex_rollouts");
  if (!fs.existsSync(baseDir)) {
    return [];
  }

  const leaves = [];
  for (const split of fs.readdirSync(baseDir).sort()) {
    const splitDir = path.join(baseDir, split);
    if (!fs.statSync(splitDir).isDirectory()) {
      continue;
    }

    for (const way of fs.readdirSync(splitDir).sort()) {
      const wayDir = path.join(splitDir, way);
      if (!fs.statSync(wayDir).isDirectory()) {
        continue;
      }

      for (const variant of fs.readdirSync(wayDir).sort()) {
        const variantDir = path.join(wayDir, variant);
        if (!fs.statSync(variantDir).isDirectory()) {
          continue;
        }

        const files = fs
          .readdirSync(variantDir)
          .filter((file) => file.toLowerCase().endsWith(".mp4"))
          .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }))
          .map((file) => `public/assets/videos/flex_rollouts/${split}/${way}/${variant}/${file}`);

        if (files.length) {
          leaves.push(files);
        }
      }
    }
  }

  return leaves;
};

const sampleRoundRobin = (groups, count) => {
  const selected = [];
  let round = 0;

  while (selected.length < count) {
    let pickedThisRound = 0;

    for (const group of groups) {
      if (selected.length >= count) {
        break;
      }

      if (round < group.length) {
        selected.push(group[round]);
        pickedThisRound += 1;
      }
    }

    if (pickedThisRound === 0) {
      break;
    }

    round += 1;
  }

  return selected;
};

const presetInputs = Object.fromEntries(
  Object.entries(presetGroups).map(([name, folders]) => [name, folders.flatMap(collectNumberedVideos)])
);
const flexRolloutGroups = collectFlexRolloutLeaves();

const args = parseArgs();
const requiredCount = args.rows * args.columns;
const isFlexRolloutPreset = args.preset === "flex-rollouts-diverse";
const largeGrid = args.rows * args.columns >= 64;

if (!["auto", "cover", "contain"].includes(args.tileFit)) {
  console.error("Tile fit must be one of: auto, cover, contain.");
  process.exit(1);
}

if (!Number.isInteger(args.rows) || !Number.isInteger(args.columns) || args.rows <= 0 || args.columns <= 0) {
  console.error("Rows and columns must be positive integers.");
  process.exit(1);
}

if (args.listOnly) {
  console.log("Available presets:");
  Object.entries(presetInputs).forEach(([name, files]) => {
    console.log(`- ${name} (${files.length} videos)`);
    files.forEach((file) => console.log(`  ${file}`));
  });
  if (flexRolloutGroups.length) {
    const diversePreview = sampleRoundRobin(flexRolloutGroups, Math.min(24, flexRolloutGroups.flat().length));
    console.log(`- flex-rollouts-diverse (${flexRolloutGroups.flat().length} videos across ${flexRolloutGroups.length} groups)`);
    diversePreview.forEach((file) => console.log(`  ${file}`));
  }
  process.exit(0);
}

const presetFiles =
  args.preset === "flex-rollouts-diverse"
    ? sampleRoundRobin(flexRolloutGroups, requiredCount)
    : presetInputs[args.preset] || presetInputs.mixed;
const inputs = args.inputs.length ? args.inputs : presetFiles.slice(0, requiredCount);
const output = args.output;

if (inputs.length !== requiredCount) {
  console.error(`Expected exactly ${requiredCount} input videos for a ${args.rows}x${args.columns} mosaic, got ${inputs.length}.`);
  console.error("Use `--list` to inspect presets, or pass explicit video paths.");
  process.exit(1);
}

for (const input of inputs) {
  if (!fs.existsSync(path.join(root, input))) {
    console.error(`Missing input video: ${input}`);
    process.exit(1);
  }
}

const probeDuration = (file) => {
  const result = spawnSync(
    "ffprobe",
    [
      "-v",
      "error",
      "-show_entries",
      "format=duration",
      "-of",
      "default=noprint_wrappers=1:nokey=1",
      file,
    ],
    { encoding: "utf8" }
  );

  if (result.status !== 0) {
    console.error(`ffprobe failed for ${file}\n${result.stderr}`);
    process.exit(result.status ?? 1);
  }

  const duration = Number.parseFloat(result.stdout.trim());
  if (!Number.isFinite(duration)) {
    console.error(`Could not parse duration for ${file}`);
    process.exit(1);
  }
  return duration;
};

const getDurations = (clipInputs) => {
  if (isFlexRolloutPreset && clipInputs.every((file) => file.includes("/flex_rollouts/"))) {
    return clipInputs.map(() => 20.1);
  }

  return clipInputs.map(probeDuration);
};

const resolveTileFit = () => {
  if (args.tileFit !== "auto") {
    return args.tileFit;
  }

  if (isFlexRolloutPreset && largeGrid) {
    return "contain";
  }

  return "cover";
};

const columns = args.columns;
const rows = args.rows;
const tileWidth = largeGrid ? 160 : 480;
const tileHeight = largeGrid ? 90 : 360;
const fps = 25;
const directRenderLimit = 64;
const tileFit = resolveTileFit();

const renderMosaic = ({ clipInputs, outputFile, mosaicRows, mosaicColumns, cellWidth, cellHeight, label }) => {
  const durations = getDurations(clipInputs);
  const maxDuration = Math.max(...durations);
  const canvasWidth = cellWidth * mosaicColumns;
  const canvasHeight = cellHeight * mosaicRows;
  const inputArgs = clipInputs.flatMap((file) => ["-i", file]);

  const videoFilters = clipInputs.map((_, index) => {
    const padDuration = Math.max(0, maxDuration - durations[index]);
    const pad = padDuration > 0.01 ? `tpad=stop_mode=clone:stop_duration=${padDuration.toFixed(3)},` : "";
    const fitFilter =
      tileFit === "contain"
        ? `scale=${cellWidth}:${cellHeight}:force_original_aspect_ratio=decrease,pad=${cellWidth}:${cellHeight}:(ow-iw)/2:(oh-ih)/2:color=#f5f2ea`
        : `scale=${cellWidth}:${cellHeight}:force_original_aspect_ratio=increase,crop=${cellWidth}:${cellHeight}`;
    return `[${index}:v]${pad}${fitFilter},setpts=PTS-STARTPTS[v${index}]`;
  });

  const overlays = [];
  overlays.push(`color=c=#f5f2ea:s=${canvasWidth}x${canvasHeight}:d=${maxDuration.toFixed(3)}[base]`);

  let previous = "base";
  for (let index = 0; index < clipInputs.length; index += 1) {
    const x = (index % mosaicColumns) * cellWidth;
    const y = Math.floor(index / mosaicColumns) * cellHeight;
    const next = index === clipInputs.length - 1 ? "final" : `tmp${index + 1}`;
    overlays.push(`[${previous}][v${index}]overlay=${x}:${y}[${next}]`);
    previous = next;
  }

  const filterComplex = `${videoFilters.join(";")};${overlays.join(";")};[final]format=yuv420p[v]`;

  fs.mkdirSync(path.dirname(path.join(root, outputFile)), { recursive: true });

  const ffmpegArgs = [
    "-y",
    "-filter_threads",
    "1",
    "-filter_complex_threads",
    "1",
    ...inputArgs,
    "-filter_complex",
    filterComplex,
    "-map",
    "[v]",
    "-an",
    "-r",
    String(fps),
    "-c:v",
    "libx264",
    "-crf",
    "18",
    "-preset",
    "slow",
    "-movflags",
    "+faststart",
    outputFile,
  ];

  console.log(`Building ${label} to ${outputFile}`);
  console.log(`Clip count: ${clipInputs.length}`);
  console.log(`Tile size: ${cellWidth}x${cellHeight}`);
  console.log(`Tile fit: ${tileFit}`);
  console.log(`Longest clip duration: ${maxDuration.toFixed(3)}s`);

  const render = spawnSync("ffmpeg", ffmpegArgs, { stdio: "inherit" });
  if (render.status !== 0) {
    process.exit(render.status ?? 1);
  }
};

const buildHierarchicalMosaic = ({
  clipInputs,
  outputFile,
  mosaicRows,
  mosaicColumns,
  cellWidth,
  cellHeight,
  label,
}) => {
  if (clipInputs.length <= directRenderLimit || mosaicRows % 2 !== 0 || mosaicColumns % 2 !== 0) {
    renderMosaic({ clipInputs, outputFile, mosaicRows, mosaicColumns, cellWidth, cellHeight, label });
    return;
  }

  const chunkRows = mosaicRows / 2;
  const chunkColumns = mosaicColumns / 2;
  const quadrants = [[], [], [], []];

  for (let row = 0; row < mosaicRows; row += 1) {
    for (let column = 0; column < mosaicColumns; column += 1) {
      const index = row * mosaicColumns + column;
      const quadrant =
        row < chunkRows
          ? (column < chunkColumns ? 0 : 1)
          : (column < chunkColumns ? 2 : 3);
      quadrants[quadrant].push(clipInputs[index]);
    }
  }

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "mosaic-stage-"));
  const chunkFiles = quadrants.map((_, index) => path.join(tempDir, `chunk-${index + 1}.mp4`));

  quadrants.forEach((chunkInputs, index) => {
    buildHierarchicalMosaic({
      clipInputs: chunkInputs,
      outputFile: chunkFiles[index],
      mosaicRows: chunkRows,
      mosaicColumns: chunkColumns,
      cellWidth,
      cellHeight,
      label: `${label} chunk ${index + 1}/4`,
    });
  });

  renderMosaic({
    clipInputs: chunkFiles,
    outputFile,
    mosaicRows: 2,
    mosaicColumns: 2,
    cellWidth: chunkColumns * cellWidth,
    cellHeight: chunkRows * cellHeight,
    label,
  });

  fs.rmSync(tempDir, { recursive: true, force: true });
};

console.log(`Building ${rows}x${columns} teaser mosaic to ${output}`);
console.log(`Preset: ${args.inputs.length ? "custom" : args.preset}`);
buildHierarchicalMosaic({
  clipInputs: inputs,
  outputFile: output,
  mosaicRows: rows,
  mosaicColumns: columns,
  cellWidth: tileWidth,
  cellHeight: tileHeight,
  label: `${rows}x${columns} teaser mosaic`,
});
