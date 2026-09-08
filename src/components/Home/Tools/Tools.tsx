import { useEffect, useState } from "react";
import type { ToolSections } from "../../../hooks/useTools";
import type { Category, LoadStatus, Tool } from "../../../types";
import { ui } from "../../../i18n/zh-CN";
import ShowMoreButton from "../../Shared/Buttons/ShowMoreButton/ShowMoreButton";
import { ToolCard } from "./ToolCard/ToolCard";
import s from "./Tools.module.css";

interface ToolsProps {
  sections: ToolSections;
  searchKeywords: string[];
  isSearching: boolean;
  categories: Category[];
  loadStatus: LoadStatus;
  errorMessage: string;
  searchQuery: string;
  activeCategory: string;
  setSearchQuery: (query: string) => void;
}

const sectionVariantClass = {
  featured: s.toolSectionFeatured,
  editors: s.toolSectionEditors,
  meets: s.toolSectionMeets,
} as const;

export function Tools({
  sections,
  searchKeywords,
  isSearching,
  categories,
  loadStatus,
  errorMessage,
  searchQuery,
  activeCategory,
  setSearchQuery,
}: ToolsProps) {
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    setShowMore(false);
  }, [searchQuery, activeCategory]);

  if (loadStatus === "loading") {
    return (
      <main className={s.grid}>
        <div className={s.loading}>{ui.initializing}</div>
      </main>
    );
  }

  const { featured, editorsPicks, meetsCriteria } = sections;
  const totalCount =
    featured.length + editorsPicks.length + meetsCriteria.length;

  if (totalCount === 0) {
    return (
      <main className={s.grid}>
        <div className={s.empty}>
          <h3>{ui.noMatches}</h3>

          <p>{ui.noMatchesHint}</p>
        </div>
      </main>
    );
  }

  const hasCurated = featured.length > 0 || editorsPicks.length > 0;
  const meetsExpanded = !hasCurated || showMore;

  return (
    <main className={s.toolSections} id="main-content">
      {loadStatus == "error" && (
        <div className={s.error}>
          <h3>{ui.loadFailed}</h3>
          <p>{errorMessage}</p>
          <p className={s.errorFallback}>{ui.loadFallback}</p>
        </div>
      )}

      <>
        {featured.length > 0 && (
          <ToolsSection
            label={ui.featured}
            variant="featured"
            tools={featured}
            categories={categories}
            searchKeywords={searchKeywords}
            setSearchQuery={setSearchQuery}
          />
        )}

        {editorsPicks.length > 0 && (
          <ToolsSection
            label={ui.editorsPicks}
            variant="editors"
            tools={editorsPicks}
            categories={categories}
            searchKeywords={searchKeywords}
            setSearchQuery={setSearchQuery}
          />
        )}

        {meetsCriteria.length > 0 &&
          (meetsExpanded || isSearching ? (
            <ToolsSection
              label={ui.meetsCriteria}
              variant="meets"
              tools={meetsCriteria}
              categories={categories}
              searchKeywords={searchKeywords}
              setSearchQuery={setSearchQuery}
            />
          ) : (
            <ShowMoreButton
              setShowMore={setShowMore}
              meetsCriteria={meetsCriteria}
            />
          ))}
      </>
    </main>
  );
}

interface ToolsSectionProps {
  label: string;
  variant: "featured" | "editors" | "meets";
  tools: Tool[];
  categories: Category[];
  searchKeywords: string[];
  setSearchQuery: (query: string) => void;
}

function ToolsSection({
  label,
  variant,
  tools,
  categories,
  searchKeywords,
  setSearchQuery,
}: ToolsSectionProps) {
  return (
    <section className={`${s.toolSection} ${sectionVariantClass[variant]}`}>
      <div className={s.sectionDivider}>{label}</div>

      <div className={s.grid}>
        {tools.map((tool) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            category={categories.find((c) => c.id === tool.category)}
            searchKeywords={searchKeywords}
            setSearchQuery={setSearchQuery}
          />
        ))}
      </div>
    </section>
  );
}
