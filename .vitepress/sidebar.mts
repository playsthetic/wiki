import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import matter from "gray-matter";

interface SidebarItem {
  text: string;
  link: string;
}

interface SidebarSection {
  text: string;
  items: SidebarItem[];
}

function getMarkdownTitle(filePath: string): string {
  const content = readFileSync(filePath, "utf-8");
  const { data, content: markdown } = matter(content);

  // Use frontmatter title if available
  if (data.title) {
    return data.title;
  }

  // Extract first H1 heading from markdown
  const match = markdown.match(/^#\s+(.+)$/m);
  if (match) {
    return match[1].trim();
  }

  // Fallback to filename
  return filePath.split("/").pop()?.replace(/\.md$/, "") || "Untitled";
}

function generateSidebarSection(
  sectionPath: string,
  sectionTitle: string
): SidebarSection {
  const files = readdirSync(sectionPath)
    .filter((file) => file.endsWith(".md"))
    .sort();

  const items: SidebarItem[] = files.map((file) => {
    const filePath = join(sectionPath, file);
    const title = getMarkdownTitle(filePath);
    const link = `/${sectionPath}/${file.replace(/\.md$/, "")}`;

    return { text: title, link };
  });

  return {
    text: sectionTitle,
    items,
  };
}

export function generateSidebar(): SidebarSection[] {
  return [
    generateSidebarSection("guidelines", "Guidelines"),
    generateSidebarSection("cheat-sheets", "Cheat Sheets"),
    generateSidebarSection("references", "References"),
  ];
}
