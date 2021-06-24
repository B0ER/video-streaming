import fsp from "fs/promises";

/**
 * @param {import('fs').PathLike} filePath
 * @param {number} positions.start
 * @param {number} positions.end
 * @returns {{ start: number; end: number; total: number; chunkSize: number }}
 */
export const resolveFile = async (filePath, { start, end }) => {
  const stats = await fsp.stat(filePath);

  const total = stats.size;
  end = end || total - 1;

  const chunkSize = (end - start) + 1;

  return { start, end, total, chunkSize };
};
