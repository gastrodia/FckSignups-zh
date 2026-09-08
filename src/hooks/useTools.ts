import { useEffect, useMemo, useState } from "react";
import {
  DEV_JSON_URL,
  FALLBACK_DATA,
  PROD_JSON_URL,
} from "../constants/fallbackData";
import type { Category, LoadStatus, Tool, ToolsData } from "../types";
import { localizeToolsData, ui } from "../i18n/zh-CN";

export interface ToolSections {
  featured: Tool[];
  editorsPicks: Tool[];
  meetsCriteria: Tool[];
}

interface UseToolsReturn {
  tools: Tool[];
  filteredTools: Tool[];
  sections: ToolSections;
  searchKeywords: string[];
  isSearching: boolean;
  categories: Category[];
  loadStatus: LoadStatus;
  errorMessage: string;
  searchQuery: string;
  activeCategory: string;
  setSearchQuery: (q: string) => void;
  setActiveCategory: (id: string) => void;
}

function sectionize(tools: Tool[]): ToolSections {
  return {
    featured: tools.filter((entry) => entry.section === "featured"),
    editorsPicks: tools.filter((entry) => entry.section === "editors-pick"),
    meetsCriteria: tools.filter(
      (entry) => entry.section !== "featured" && entry.section !== "editors-pick",
    ),
  };
}

export function useTools(): UseToolsReturn {
  const [allTools, setAllTools] = useState<Tool[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadStatus, setLoadStatus] = useState<LoadStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    async function load() {
      setLoadStatus("loading");
      let data: ToolsData | null = null;
      let error = "";

      if (import.meta?.env?.DEV) {
        data = await loadTools(DEV_JSON_URL);
      }

      // Try loading data from GITHUB if not loaded yet.
      if (!data) data = await loadTools(PROD_JSON_URL);

      // If all fails, load fallback data
      if (!data) {
        data = FALLBACK_DATA;
        error = "无法获取最新目录数据";
        setErrorMessage(error);
      }

      hydrate(data, error);
    }
    load();
  }, []);

  function hydrate(data: ToolsData, error: string) {
    const cats = [...(data.categories ?? [])];
    if (!cats.find((c) => c.id === "all")) {
      cats.unshift({
        id: "all",
        name: ui.category,
        icon: "◈",
        description: ui.tools,
      });
    }

    const localizedData = localizeToolsData({
      categories: cats,
      tools: data.tools ?? [],
    });

    setAllTools(localizedData.tools);
    setCategories(localizedData.categories);
    setLoadStatus(!error ? "success" : "error");
  }

  const searchKeywords = useMemo(() => tokenize(searchQuery), [searchQuery]);
  const isSearching = searchKeywords.length > 0;

  // Search filtering & ranking logic
  const scoredTools = useMemo(() => {
    const keywords = searchKeywords;
    return allTools
      .filter(
        (tool) => activeCategory === "all" || tool.category === activeCategory,  // Filters out the entries not the category selected.
      )
      .map((tool) => ({ tool, score: matchScore(tool, keywords) }))              // Scores the entries by how many keywords it matched.
      .filter(({ score }) => keywords.length === 0 || score == keywords.length); // Filters out the entries that don't match the number
  }, [allTools, activeCategory, searchQuery]);                                   // of keywords.

  // Sorts by filter matching score & stars
  const filteredTools = useMemo(
    () =>
      [...scoredTools]
        .sort(
          (a, b) =>
            b.score - a.score || (b.tool.stars ?? 0) - (a.tool.stars ?? 0),
        )
        .map(({ tool }) => tool),
    [scoredTools],
  );

  // Turns filtered tools into three sections: featured, editor's picks, and meets criteria.
  const sections = useMemo<ToolSections>(
    () => sectionize(filteredTools),
    [filteredTools],
  );

  return {
    tools: allTools,
    filteredTools,
    sections,
    searchKeywords,
    isSearching,
    categories,
    loadStatus,
    errorMessage,
    searchQuery,
    activeCategory,
    setSearchQuery,
    setActiveCategory,
  };
}

// Split text into searchable Unicode keywords, so Chinese queries work while
// preserving the upstream behavior for phrases such as "video-editor".
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^\p{L}\p{N}+#]+/u)
    .filter(Boolean);
}

// Number of query keywords found in the tool's name, description, or tags.
function matchScore(tool: Tool, keywords: string[]): number {
  if (keywords.length === 0) return 0;
  const haystack = [
    tool.name,
    tool.description,
    ...tool.tags,
    ...(tool.tagsZh ?? []),
  ]
    .join(" ")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}+#]+/gu, " ");
  return keywords.filter((kw) => haystack.includes(kw)).length;
}

async function loadTools(JSON_URL: string): Promise<ToolsData | null> {
  try {
    const res = await fetch(JSON_URL);
    if (!res.ok) throw new Error(`Failed to get data from ${JSON_URL}`);
    return (await res.json()) as ToolsData;
  } catch (err) {
    console.error(`Couldn't parse tools from: ${JSON_URL}`, err);
    return null;
  }
}
