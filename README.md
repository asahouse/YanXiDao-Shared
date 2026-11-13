# @yanxidao/shared

研习岛（YanXiDao）多端共享核心库，提供客户端（[YanXiDao](https://github.com/asahouse/YanXiDao)）与独立管理平台（[YanXiDao-Admin-Platform](https://github.com/asahouse/YanXiDao-Admin-Platform)）共同依赖的纯 TypeScript 领域规则、类型契约与安全工具函数。

## 包含模块

- `src/levelRules.ts`：30 级成长经验表（`LEVEL_TABLE`）、每日经验上限（`DAILY_EXP_CAP`）、VIP 类型与倍率（`VIP_TYPE_INFO`）、有效期计算（`calculateVipExpiration`）及可升级目标筛选（`getHigherVipTypes`）。
- `src/textLinks.ts`：纯文本 URL 安全解析器（`splitTextWithLinks`），避免前端使用 `v-html` 带来 XSS 风险。
- `src/types.ts`：前后端通用的课程、课时、用户画像与业务类型定义。

## 开发与测试

```bash
npm install
npm run build
npm test
```

## 跨仓库引用方式

本包通过 Git Tag 进行版本锁定分发（内置 `prepare` 脚本会在安装时自动执行 `tsc` 构建）：

```json
{
  "dependencies": {
    "@yanxidao/shared": "git+https://github.com/asahouse/YanXiDao-Shared.git#v1.0.0"
  }
}
```
