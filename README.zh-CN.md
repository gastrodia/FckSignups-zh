# NoSignups
## （原名 FckSignups）

[![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/hbDDqdmcm)
[![Reddit](https://img.shields.io/badge/Reddit-FF4500?style=for-the-badge&logo=reddit&logoColor=white)](https://www.reddit.com/r/fucksignups/)

> **开源工具。拒绝废话。**
> 精选一批可以直接在浏览器中使用的开源工具：无需账号、无需邮箱、不追踪，只提供真正能工作的工具。

语言：简体中文 | [English](README.md)

---

## 这是什么？

NoSignups 是一个 React + TypeScript 项目。如果你想在本地运行，只需克隆仓库、安装依赖并启动开发服务器。

下面的命令可以一次完成上述步骤：

```bash
git clone https://github.com/gastrodia/FckSignups-zh.git && \
cd FckSignups-zh && \
npm install && \
npm run dev
```

---

## 项目理念

| 我们相信 | 我们拒绝 |
|----------|----------|
| 工具应该开箱即用 | 强制注册墙 |
| 你的数据属于你 | 数据采集与追踪 |
| 默认采用开源方案 | 不透明的闭源黑盒 |
| 简单就是更好 | 臃肿和不必要的复杂性 |

---

## 工具数据结构

| 字段 | 必填 | 说明 |
|------|------|------|
| `id` | 是 | 适合放入 URL 的唯一标识符 |
| `name` | 是 | 显示名称 |
| `description` | 是 | 一句话简介 |
| `url` | 是 | 工具的直接链接 |
| `category` | 是 | 必须匹配某个分类的 `id` |
| `tags` | 否 | 用于搜索的关键词数组 |
| `github` | 否 | 源代码仓库链接 |
| `license` | 否 | SPDX 许可证标识符 |
| `stars` | 否 | GitHub Star 数量（用于显示） |
| `featured` | 否 | 布尔值；为 `true` 时置顶 |
| `notRecommendedReason` | 否 | 不推荐该条目的原因 |

---

## 分类

默认分类如下：

| ID | 名称 | 图标 |
|----|------|------|
| `all` | 全部 | ◈ |
| `productivity` | 效率 | ⚡ |
| `design` | 设计与图形 | 🎨 |
| `development` | 开发 | 💻 |
| `writing` | 写作与文档 | ✍️ |
| `privacy` | 隐私 | 🔒 |
| `utilities` | 实用工具 | 🛠️ |
| `data` | 数据与分析 | 📊 |
| `media` | 媒体 | 🎬 |
| `education` | 教育 | 🎓 |

---

## 贡献指南

- 工具必须能够**无需创建账号**即可使用
- 描述保持在 140 个字符以内
- 使用 3–5 个相关标签
- 可以通过[提交工具](https://github.com/gastrodia/FckSignups-zh/issues/new?template=request-to-add-a-tool.md)提交你找到或制作的工具，也可以使用网站上的“提交工具”按钮。

---

## 讨论

如果你想发表意见，可以加入 Reddit 社区：[r/fucksignups](https://www.reddit.com/r/fucksignups/)。

欢迎提出批评和建议。

---

## 精选工具

> 为什么有些工具会被精选？

很简单：目前工具数量已经超过 200 个，其中很多功能相似。为了避免内容同质化，我们会把独特的工具置顶。这个标准带有主观性，因为“独特”没有统一定义；在这里，它指的是与其他工具有所不同的工具，无论是质量出色，还是创意特别。

---

## 许可证

NoSignups 目录代码以 **GPL-3.0 License** 发布。

目录中收录的各个工具仍保留其自身许可证。我们不主张拥有任何第三方项目的所有权。

---

## 致谢

由一群厌倦了向所有网站提交邮箱的人，带着一点怨气整理维护。

---

*没有 Cookie，没有分析，没有废话。*
