import { type ModalConfig } from "../hooks/useModal";
import { categoryTranslations, ui } from "../i18n/zh-CN";

const categoryOptions = Object.fromEntries(
  Object.entries(categoryTranslations)
    .filter(([id]) => id !== "all")
    .map(([id, translation]) => [id, translation.name]),
);

export const MODAL_CONFIGS: ModalConfig[] = [
  {
    modalId: "submit-tool",
    modalTitle: ui.tool,
    submitURL:
      "https://fcksignups-submit.abdullahalkafajy.workers.dev/submit-tool",
    pages: [
      {
        title: ui.basicInfo,
        fields: [
          {
            type: "text",
            name: "name",
            label: ui.name,
            placeholder: ui.namePlaceholder,
            required: true,
          },
          {
            type: "textarea",
            name: "description",
            label: ui.description,
            placeholder: ui.descriptionPlaceholder,
            required: true,
          },
          {
            type: "url",
            name: "url",
            label: "URL",
            placeholder: "https://excalidraw.com",
            required: true,
          },
          {
            type: "text",
            name: "tags",
            label: ui.tags,
            placeholder: ui.tagsPlaceholder,
          },
          {
            type: "text",
            name: "github",
            label: ui.github,
            placeholder: "https://github.com/excalidraw/excalidraw",
          },
          {
            type: "select",
            name: "category",
            label: ui.category,
            options: { invalid: ui.selectOne, ...categoryOptions },
            required: true,
          },
        ],
      },
    ],
  },
  {
    modalId: "report-tool",
    modalTitle: ui.reportModal,
    submitURL:
      "https://fcksignups-submit.abdullahalkafajy.workers.dev/report-tool",
    pages: [
      {
        title: ui.basicInfo,
        fields: [
          {
            type: "text",
            name: "toolId",
            label: ui.toolId,
            placeholder: ui.toolIdPlaceholder,
            required: true,
          },
          {
            type: "textarea",
            name: "report",
            label: ui.report,
            placeholder: ui.reportPlaceholder,
            required: true,
          },
        ],
      },
    ],
  },
  {
    modalId: "suggest-tool",
    modalTitle: ui.suggestionModal,
    submitURL:
      "https://fcksignups-submit.abdullahalkafajy.workers.dev/suggest-tool",
    pages: [
      {
        title: ui.basicInfo,
        fields: [
          {
            label: ui.toolIdea,
            name: "toolIdea",
            required: true,
            type: "textarea",
            placeholder: ui.toolIdeaPlaceholder,
          },
        ],
      },
    ],
  },
];
