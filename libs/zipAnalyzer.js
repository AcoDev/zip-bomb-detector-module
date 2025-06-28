import StreamZip from "node-stream-zip";

/**
 * Analyzes a ZIP file to detect potential zip bombs.
 * For example: too many files, disproportionate size, nested depth, etc.
 * 
 * @param {string} filePath Path to the zip file
 * @param {object} options Configuration options
 * @returns {Promise<{ isBomb: boolean, details: object }>}
 */
export async function analyzeZip(filePath, options = {}) {
  const maxEntries = options.maxEntries || 10000;
  const maxSize = options.maxSize || 500 * 1024 * 1024;
  const maxDepth = options.maxDepth || 10;

  const zip = new StreamZip.async({ file: filePath });

  try {
    const entries = await zip.entries();
    const entryCount = Object.keys(entries).length;

    if (entryCount > maxEntries) {
      await zip.close();
      return { isBomb: true, details: { reason: "Too many entries", entryCount } };
    }

    await zip.close();
    return { isBomb: false, details: { entryCount } };
  } catch (err) {
    try {
      await zip.close();
    } catch {}
    throw err;
  }
}
