## v0.1.5 (2026-06-07)

### Breaking Changes
- 无

### Features
- 无

### Fixes
- 修复 Docker 运行镜像缺少法务模板目录，导致容器内 seed 无法读取 Markdown 模板的问题。

### Improvements
- 无

### Others
- 无

Tests: not run (not requested)

## v0.1.4 (2026-06-07)

### Breaking Changes
- 无

### Features
- 无

### Fixes
- 修复反向代理场景下的 Auth.js 回调异常（UnknownAction），并识别 X-Forwarded 请求头。
- 修复 Server Actions 在 Docker 部署中的加密密钥不一致问题，避免登录/退出动作失效。

### Improvements
- 将登录与退出逻辑集中到 server actions，简化页面组件调用方式。
- 补充 AUTH_SECRET、NEXT_SERVER_ACTIONS_ENCRYPTION_KEY 等生产环境配置说明与排障指南。

### Others
- 无

Tests: not run (not requested)

## v0.1.3 (2026-06-07)

### Breaking Changes
- 无

### Features
- 重构后台运营流程：车辆改为列表与独立编辑页，支持发布/下架/删除与字段可见性配置。
- 移除博客模块，FAQ 与导航支持完整增删改，首页内容改为按语言维护。
- 新增租赁 CTA 跳转策略（电话/邮件/WhatsApp/链接）与前台 FAQ 展示。
- 媒体存储迁移至 `data/uploads`，通过 `/api/media` 提供访问，并新增启动/部署自动升级脚本。

### Fixes
- 无

### Improvements
- 法务页统一采用 Vditor Markdown 编辑，特商法模板迁移为 Markdown 表格。
- 前台法务渲染改用 markdown-it，并补充表格样式与保存反馈体验。

### Others
- 同步更新部署文档、环境变量模板与种子数据。

Tests: not run (not requested)

## v0.1.2 (2026-04-28)

### Breaking Changes
- 无

### Features
- 无

### Fixes
- 修正容器化部署中的鉴权主机信任配置，降低公网域名场景下登录与回调异常风险。

### Improvements
- 调整部署流程细节：单架构镜像构建、容器首启自动执行种子初始化，并补充部署文档与环境模板说明。

### Others
- 无

Tests: not run (not requested)

## v0.1.1 (2026-04-28)

### Breaking Changes
- 无

### Features
- 无

### Fixes
- 无

### Improvements
- 调整容器构建阶段执行顺序，在构建前先完成 Prisma 数据库推送，降低构建阶段因数据库上下文缺失导致的失败概率。

### Others
- 无

Tests: not run (not requested)

## v0.1.0 (2026-04-28)

### Breaking Changes
- 无

### Features
- 新增多语言路由与法务、公司信息管理能力，覆盖前后台核心页面。
- 新增可配置的页脚区域标题与站点列表，支持按语言维护。
- 完善前后台多语言文案接入，并新增语言切换组件。
- 新增站点信息后台、图片上传字段与 Markdown 编辑器，提升运营配置能力。

### Fixes
- 优化容器构建与运行链路，补充 Prisma 生成与运行依赖，降低部署失败风险。

### Improvements
- 统一后台登录页与后台表单输入样式，增强编辑态可感知性与界面一致性。
- 补充全局与按语言错误页，提升异常场景下的可恢复性。
- 将默认内容与种子数据切换为日本市场语境，并同步 SEO 与展示文案。

### Others
- 清理旧版静态站点资源与入口文件，统一项目结构到新应用架构。
- 新增容器发布流水线与部署模板，支持镜像构建推送与快速落地。
- 补充项目说明文档与 README 更新，完善交付信息。

Tests: not run (not requested)
