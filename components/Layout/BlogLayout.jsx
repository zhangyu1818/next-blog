import BlogHeader from "./BlogHeader";
import Avatar from "../Avatar";
import BlogFooter from "./BlogFooter";

const BlogLayout = ({ avatar, post, children }) => (
  <div className="blog">
    <BlogHeader smallTitle={post} />
    {avatar && <Avatar />}
    <main className={post && "post"}>{children}</main>
    {!post && <BlogFooter />}
  </div>
);

export default BlogLayout;
