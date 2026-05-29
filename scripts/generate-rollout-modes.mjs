import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const rolloutRoot = path.join(root, "public/assets/videos/flex_rollouts");
const rolloutPreviewRoot = path.join(root, "public/assets/images/flex_rollouts");
const outputPath = path.join(root, "src/data/rollout-modes.generated.json");

const naturalSort = (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
const toPublicUrl = (absPath) => `/${path.relative(path.join(root, "public"), absPath).split(path.sep).join("/")}`;
const withAssetVersion = (absPath) => {
  const stats = fs.statSync(absPath);
  const version = `${Math.floor(stats.mtimeMs)}-${stats.size}`;
  return `${toPublicUrl(absPath)}?v=${version}`;
};

const collectDirectMp4Files = (absDir) => {
  const entries = fs.readdirSync(absDir, { withFileTypes: true }).sort((a, b) => naturalSort(a.name, b.name));
  return entries
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".mp4"))
    .map((entry) => path.join(absDir, entry.name));
};

const getRolloutModeDescriptor = (wayName) => {
  const way = wayName.replace(/^way/i, "");
  const descriptors = {
    "1": "sleeve: down | body: top down",
    "2": "sleeve: cross | body: bottom up",
    "3": "sleeve: diagonal | body: top down",
    "4": "sleeve: diagonal | body: side fold",
    "5": "sleeve: asymmetric | body: top down",
    "6": "sleeve: down | body: bottom up",
    "7": "sleeve: down | body: side fold",
    "8": "sleeve: cross | body: top down",
    "9": "sleeve: cross | body: side fold",
    "10": "sleeve: diagonal | body: bottom up",
    "11": "sleeve: center | body: top down",
  };

  return descriptors[way] ?? "";
};

const collectRolloutModes = () => {
  if (!fs.existsSync(rolloutRoot)) return [];
  const modes = [];

  ["seen", "unseen"].forEach((group) => {
    const groupDir = path.join(rolloutRoot, group);
    if (!fs.existsSync(groupDir)) return;
    const wayDirs = fs
      .readdirSync(groupDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort(naturalSort);

    wayDirs.forEach((wayName) => {
      const wayDir = path.join(groupDir, wayName);
      const leafDirs = fs
        .readdirSync(wayDir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .sort(naturalSort);

      leafDirs.forEach((leafName) => {
        const absModeDir = path.join(wayDir, leafName);
        const videos = collectDirectMp4Files(absModeDir).map(withAssetVersion);
        if (!videos.length) return;

        const previewPath = path.join(rolloutPreviewRoot, group, wayName, leafName, "preview.png");
        const previewJsonPath = path.join(rolloutPreviewRoot, group, wayName, leafName, "preview.json");
        const previewMeta = fs.existsSync(previewJsonPath)
          ? JSON.parse(fs.readFileSync(previewJsonPath, "utf-8"))
          : null;

        const shortLabel = `${wayName.replace(/^way/i, "mode")}/${leafName}`;
        const fullLabel = `${wayName.replace(/^way/i, "Mode ")} / ${leafName}`;
        const descriptor = getRolloutModeDescriptor(wayName);

        modes.push({
          key: `${group}/${wayName}/${leafName}`,
          group,
          label: `${group === "seen" ? "Seen" : "Unseen"} / ${shortLabel}`,
          shortLabel,
          fullLabel,
          descriptor,
          instruction: previewMeta?.instruction ?? "",
          preview: fs.existsSync(previewPath) ? withAssetVersion(previewPath) : "",
          videos,
        });
      });
    });
  });

  return modes;
};

fs.writeFileSync(outputPath, `${JSON.stringify(collectRolloutModes(), null, 2)}\n`);
console.log(`Wrote ${outputPath}`);
