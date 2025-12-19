import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    channel: z.enum(['life', 'work']),
    tags: z.array(z.string()).default([]),
    description: z.string().optional(),
    draft: z.boolean().default(false),
    cover: z.string().optional(),
    gallery: z.array(z.string()).default([]),
  }),
});

const updatesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.date(),
    title: z.string().optional(),
    images: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  posts: postsCollection,
  updates: updatesCollection,
};

