export function splitTags(tags: string[] | undefined): string[] {
  if (!tags || !Array.isArray(tags)) return [];

  return tags
    .flatMap((tag) => tag.split(",").map((t) => t.trim()))
    .filter((tag) => tag !== "");
}
