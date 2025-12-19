import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  const updates = await getCollection('updates', ({ data }) => !data.draft);
  
  // 合并并按日期排序
  const allItems = [
    ...posts.map(post => ({
      ...post,
      type: 'post' as const,
    })),
    ...updates.map(update => ({
      ...update,
      type: 'update' as const,
    })),
  ].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: '我的博客',
    description: '个人博客 - 记录生活与工作的点滴',
    site: context.site || 'https://xinyi-jane.github.io',
    items: allItems.map((item) => {
      if (item.type === 'post') {
        return {
          title: item.data.title,
          pubDate: item.data.date,
          description: item.data.description || '',
          link: `/${item.data.channel}/${item.slug}/`,
        };
      } else {
        return {
          title: item.data.title || '动态更新',
          pubDate: item.data.date,
          description: '',
          link: `/updates/#${item.slug}`,
        };
      }
    }),
    customData: `<language>zh-CN</language>`,
  });
};

