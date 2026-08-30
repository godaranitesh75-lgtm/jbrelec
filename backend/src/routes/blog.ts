import { Router } from 'express';
import { prisma } from '../libs/prisma.js';
import { authenticate } from '../middleware/auth.js';
import { AuthenticatedRequest } from '../types.js';

export const blogRouter = Router();

blogRouter.get('/', async (_req, res, next) => {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
    });
    return res.json({ posts });
  } catch (error) {
    next(error);
  }
});

blogRouter.get('/:slug', async (req, res, next) => {
  try {
    const { slug } = req.params;
    const post = await prisma.blogPost.findUnique({ where: { slug } });
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    return res.json(post);
  } catch (error) {
    next(error);
  }
});

blogRouter.post('/', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    const { title, slug, excerpt, content, coverImage, published, publishedAt } = req.body;
    if (!title || !slug || !content) {
      return res.status(400).json({ message: 'Title, slug, and content are required' });
    }

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage,
        published: published ?? false,
        publishedAt: published ? (publishedAt ? new Date(publishedAt) : new Date()) : null,
      },
    });

    return res.status(201).json(post);
  } catch (error) {
    next(error);
  }
});

blogRouter.put('/:id', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    const { id } = req.params;
    const { title, slug, excerpt, content, coverImage, published, publishedAt } = req.body;

    const updateData: Record<string, unknown> = {};
    if (title !== undefined) updateData.title = title;
    if (slug !== undefined) updateData.slug = slug;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (content !== undefined) updateData.content = content;
    if (coverImage !== undefined) updateData.coverImage = coverImage;
    if (published !== undefined) {
      updateData.published = published;
      updateData.publishedAt = published ? (publishedAt ? new Date(publishedAt) : new Date()) : null;
    }

    const post = await prisma.blogPost.update({
      where: { id },
      data: updateData,
    });

    return res.json(post);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete('/:id', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    const { id } = req.params;
    await prisma.blogPost.delete({ where: { id } });
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
});
