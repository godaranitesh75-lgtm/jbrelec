import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, FileText } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  published: boolean;
  publishedAt: string;
  createdAt: string;
}

export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/blog`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatDate = (date: string) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const estimateReadTime = (content: string) => {
    const words = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  return (
    <main>
      <section className="blog-hero">
        <div className="blog-hero-inner">
          <span className="blog-hero-eyebrow"><span className="blog-hero-eyebrow-line" /> JBR Electrical Blog</span>
          <h1>Insights, tips & updates</h1>
          <p>Stay updated with the latest in electrical products, safety practices, and project guidance from the JBR Electrical team.</p>
        </div>
      </section>

      <section className="blog-section">
        <div className="blog-container">
          {loading && (
            <div className="blog-empty">
              <p>Loading latest posts...</p>
            </div>
          )}

          {!loading && posts.length === 0 && (
            <div className="blog-empty">
              <FileText size={32} />
              <p>No blog posts published yet. Check back soon for updates.</p>
            </div>
          )}

          <div className="blog-grid">
            {posts.map((post) => (
              <article
                key={post.id}
                className="blog-card"
                onClick={() => setSelectedPost(post)}
              >
                {post.coverImage && (
                  <div className="blog-card-image">
                    <img src={post.coverImage} alt={post.title} />
                  </div>
                )}
                <div className="blog-card-body">
                  <div className="blog-card-meta">
                    <span className="blog-card-date">
                      <Calendar size={14} />
                      {formatDate(post.publishedAt || post.createdAt)}
                    </span>
                    <span className="blog-card-read-time">
                      <Clock size={14} />
                      {estimateReadTime(post.content)} min read
                    </span>
                  </div>
                  <h2>{post.title}</h2>
                  {post.excerpt && <p>{post.excerpt}</p>}
                  <span className="blog-card-link">
                    Read more <ArrowRight size={14} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {selectedPost && (
        <div className="modal-backdrop" onClick={() => setSelectedPost(null)}>
          <div className="modal-dialog blog-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedPost.title}</h2>
              <button onClick={() => setSelectedPost(null)} className="modal-close">✕</button>
            </div>
            <div className="blog-modal-body">
              {selectedPost.coverImage && (
                <img src={selectedPost.coverImage} alt={selectedPost.title} className="blog-modal-image" />
              )}
              <div className="blog-modal-meta">
                <span><Calendar size={14} /> {formatDate(selectedPost.publishedAt || selectedPost.createdAt)}</span>
                <span><Clock size={14} /> {estimateReadTime(selectedPost.content)} min read</span>
              </div>
              {selectedPost.excerpt && <p className="blog-modal-excerpt">{selectedPost.excerpt}</p>}
              <div className="blog-modal-content">
                {selectedPost.content.split('\n').map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
