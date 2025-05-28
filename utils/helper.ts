export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

export function unslugify(slug: string): string {
  return slug
    .replace(/-/g, " ")            // Replace dashes with spaces
    .replace(/\s+/g, " ")          // Normalize whitespace
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
}
