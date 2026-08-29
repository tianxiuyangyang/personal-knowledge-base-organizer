# 个人知识库整理skill

一个可复用的 Codex Skill：在任意工作区快速搭建与「知境」一致的高级感、中文优先、可编辑个人知识库网站。

它不只是一个静态页面模板，还将知识整理方法、网站交互规范与一键生成脚本一起封装。安装或引用这个 Skill 后，AI 可以为不同用户生成一套独立的个人知识库网站。

## 核心体验

- **知识地图作为首页主项目**：从首页直接进入知识空间。
- **无限知识网络**：画布支持平移、缩放、拖动节点、创建节点、编辑内容、建立连线、删除节点与视图适配。
- **全屏工作台**：知识地图可一键进入和退出全屏沉浸模式。
- **本地优先**：采用浏览器 LocalStorage 保存节点、连接、收集箱和任务数据；无需后端或账号。
- **高级中文界面**：暖纸、深墨、橄榄绿与金色的视觉体系，并提供深色模式和响应式布局。
- **知识方法内置**：附带 PARA（项目 / 领域 / 资源 / 归档）整理建议和知识节点设计方法。

## 目录结构

```text
.
├── SKILL.md                         # AI 使用这个 Skill 时必须遵循的完整工作流
├── agents/openai.yaml               # Codex 中显示名称与调用配置
├── assets/zhijing-site-template/    # 完整、可直接运行的知识库网站模板
├── references/                      # 网站功能契约、知识整理方法、个人资料示例
└── scripts/create_knowledge_base_site.py # 一键复制并个性化网站的生成器
```

## 快速生成网站

在本仓库目录执行：

```powershell
python .\scripts\create_knowledge_base_site.py ..\我的个人知识库
```

生成后运行：

```powershell
cd ..\我的个人知识库
python -m http.server 8080
```

然后在浏览器打开 `http://localhost:8080`。

### 个性化身份信息

先创建一份资料文件，例如 `profile.json`：

```json
{
  "display_name": "你的名字",
  "initial": "你",
  "status": "持续构建中",
  "brand": "知境",
  "app_title": "个人知识库"
}
```

再执行：

```powershell
python .\scripts\create_knowledge_base_site.py ..\我的个人知识库 --profile .\profile.json
```

更完整的示例见 [`references/profile.example.json`](references/profile.example.json)。

## 作为 Codex Skill 使用

将整个文件夹安装到 Codex 的 skills 目录后，可直接提出类似请求：

```text
使用“个人知识库整理skill”，为我在当前工作区搭建一个与知境一致的个人知识库网站。
```

Skill 会优先复用 `assets/zhijing-site-template` 中的完整实现，以保证知识地图、全屏、持久化和交互体验不会在重新生成时丢失。

## 开源说明

本仓库仅包含原创的 HTML、CSS、JavaScript、Canvas 交互逻辑和文档；不依赖图片、音频、影视片段或第三方受版权限制的视觉素材。

## 许可证

本项目采用 [MIT License](LICENSE) 开源。
