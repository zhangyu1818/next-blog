import BlogLayout from "./BlogLayout";
import Link from "next/link";
import DocumentTitle from "react-document-title";
import dayjs from "dayjs";
import Avatar from "../Avatar";
const BlogPost = props => {
  const { children, meta } = props;
  return (
    <DocumentTitle title={`${meta.name} | Blog`}>
      <BlogLayout post>
        <header className="post-title">
          <h1>{meta.name}</h1>
          <small>{dayjs(meta.createTime).format("MMM DD, YYYY")}</small>
        </header>
        {children}
        <hr />
        <Avatar />
        <nav className="post-nav">
          <ul>
            {meta.prev && (
              <li className="post-nav-prev">
                <a href={meta.prev}>← {meta.prev}</a>
              </li>
            )}
            {meta.next && (
              <li className="post-nav-next">
                <a href={meta.next}>{meta.next} →</a>
              </li>
            )}
          </ul>
        </nav>
      </BlogLayout>
    </DocumentTitle>
  );
};

export default BlogPost;
