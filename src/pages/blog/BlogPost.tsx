import { useParams, Navigate } from "react-router-dom";
import BlogTemplate from "@/templates/BlogTemplate";
import { findPost } from "@/content/blog/posts";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? findPost(slug) : undefined;
  if (!post) return <Navigate to="/blog" replace />;
  return <BlogTemplate view="post" post={post} />;
}
