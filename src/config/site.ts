export const site = {
	name: 'AI PM Notes',
	domain: 'https://aipmnotes.com',
	description:
		'AI 产品经理的工具、方法、案例与工作流笔记。记录工具、方法、案例、Agent、工作流与个人项目。',
	author: 'Wenshan',
	lang: 'zh-CN',
} as const;

export const nav = [
	{ label: '首页', href: '/' },
	{ label: 'AI产品经理', href: '/ai-pm/' },
	{ label: 'Vibe Coding', href: '/vibe-coding/' },
	{ label: 'AI工作流', href: '/ai-workflow/' },
	{ label: '文章', href: '/blog/' },
	{ label: '关于', href: '/about/' },
] as const;

export const stats = [
	{ label: '原创文章', key: 'articles' as const },
	{ label: 'AI工作流案例', key: 'workflows' as const },
	{ label: 'Vibe Coding项目', key: 'vibe' as const },
	{ label: '产品分析笔记', key: 'analysis' as const },
];

export const expertise = [
	'AI产品设计',
	'需求分析',
	'PRD文档',
	'AI Agent',
	'Vibe Coding',
	'跨境电商',
	'供应链系统',
	'自动化工作流',
];

export const projects = [
	{
		title: 'Hermes Agent 部署教程',
		description: '从零部署 Hermes Agent，打通本地与云端的多 Agent 协作环境。',
		href: '/blog/hermes-agent-deploy/',
		tag: 'AI Agent',
	},
	{
		title: 'AI选品监控机器人',
		description: '基于竞品数据与关键词趋势的自动化选品监控与告警方案。',
		href: '/blog/ai-product-monitor/',
		tag: '跨境电商',
	},
	{
		title: 'PRD自动生成工作流',
		description: '将需求访谈、用户故事与原型说明串联为可评审的 PRD 文档流水线。',
		href: '/blog/prd-auto-workflow/',
		tag: 'AI工作流',
	},
	{
		title: 'Amazon广告分析助手',
		description: '广告报表解析、异常归因与优化建议的 AI 辅助分析工具实践。',
		href: '/blog/amazon-ads-assistant/',
		tag: '产品分析',
	},
	{
		title: 'AI产品经理博客搭建记录',
		description: '用 Astro 搭建 aipmnotes.com 静态博客的选型、结构与部署全过程。',
		href: '/blog/build-aipmnotes-blog/',
		tag: 'Vibe Coding',
	},
];
