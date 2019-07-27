import BlogLayout from "../components/Layout/BlogLayout";
import DocumentTitle from "react-document-title";
import dayjs from "dayjs";
import { posts } from "../posts.json";
import formatReadingTime from "../utils/formatReadingTime";
import Link from "next/link";
import "./index.scss";
const Home = () => {
  return (
    <DocumentTitle title="All posts | Blog">
      <BlogLayout avatar>
        <ul className="post-list">
          {posts.map((post, index) => (
            <li key={index} className="post-item">
              <h3 className="post-item-name">
                <a href={`/posts/${post.name}`}>{post.name}</a>
              </h3>
              <small>{`${dayjs(post.createTime).format("MMM DD, YYYY")} • ${formatReadingTime(post.readTime)}`}</small>
            </li>
          ))}
        </ul>
      </BlogLayout>
    </DocumentTitle>
  );
};
export default Home;
