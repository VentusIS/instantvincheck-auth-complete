// utils/slugify.ts
export function slugify(input: string): string {
    return (input ?? "")
      .toString()
      .normalize("NFKD")               // split accent marks
      .replace(/[\u0300-\u036f]/g, "") // remove diacritics
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")     // non-alphanum -> hyphen
      .replace(/^-+|-+$/g, "")         // trim hyphens
      .replace(/-{2,}/g, "-");         // collapse
  }

