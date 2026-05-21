import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

export const categoryLabels: Record<BlogPost['data']['category'], string> = {
	'ai-pm': 'AI产品经理',
	'vibe-coding': 'Vibe Coding',
	'ai-workflow': 'AI工作流',
	analysis: '产品分析',
};

export async function getPublishedPosts() {
	const posts = await getCollection('blog', ({ data }) => !data.draft);
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getStats() {
	const posts = await getPublishedPosts();
	return {
		articles: posts.length,
		workflows: posts.filter((p) => p.data.category === 'ai-workflow').length,
		vibe: posts.filter((p) => p.data.category === 'vibe-coding').length,
		analysis: posts.filter((p) => p.data.category === 'analysis').length,
	};
}

export function formatDate(date: Date) {
	return date.toLocaleDateString('zh-CN', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

export function postHref(id: string) {
	return `/blog/${id}/`;
}
