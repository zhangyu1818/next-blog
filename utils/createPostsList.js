const fs = require("fs");
const path = require("path");
const dayjs = require("dayjs");
const util = require("util");

const readDirAsync = util.promisify(fs.readdir);
const writeFileAsync = util.promisify(fs.writeFile);

/* prettier-ignore */
const createImport = (meta, content) => `import BlogPost from "../../components/Layout/BlogPost";
export default ({ children }) => <BlogPost meta={${JSON.stringify(meta)}}>{children}</BlogPost>;

${content}
`;

const createPostsList = async () => {
  // 删除旧post
  const oldPostsPath = path.resolve(__dirname, "../pages/posts");
  const oldPosts = await readDirAsync(oldPostsPath);
  oldPosts.forEach(file => fs.unlinkSync(path.resolve(oldPostsPath, file)));

  // 创建新post
  const dirPath = path.resolve(__dirname, "../blog");
  const temp = await readDirAsync(dirPath);
  // json
  // todo 逻辑太乱
  const posts = temp
    .filter(file => file !== "assets")
    .map(file => {
      const filePath = path.resolve(dirPath, file);
      const { ctime } = fs.statSync(filePath);
      let content = fs.readFileSync(filePath, "utf-8");
      content = content.replace(/!\[(.*)\]\(\.{0,2}\/?(.*)\)/ig, "![$1](/static/$2)");
      const noExt = path.basename(file, ".mdx");
      return {
        createTime: ctime,
        name: noExt,
        readTime: Math.max(1, Math.round(content.length / 500)),
        content,
        file
      };
    })
    .sort((cur, next) => dayjs(next.createTime).unix() - dayjs(cur.createTime).unix())
    .map((post, index, posts) => {
      const prevPost = posts[index - 1];
      const nextPost = posts[index + 1];
      const { file, content, ...postMeta } = post;
      const meta = {
        ...postMeta,
        prev: prevPost && path.basename(prevPost.name, ".mdx"),
        next: nextPost && path.basename(nextPost.name, ".mdx")
      };
      fs.writeFileSync(path.resolve(oldPostsPath, file), createImport(meta, content), "utf-8");
      return meta;
    });
  // 删除旧图片
  const assetsPath = path.resolve(__dirname, "../static/assets");
  const oldAssets = await readDirAsync(assetsPath);
  oldAssets.forEach(file => fs.unlinkSync(path.resolve(assetsPath, file)));
  // 复制新图片
  const blogPostAssetsPath = path.resolve(__dirname, "../blog/assets");
  const blogPostAssets = await readDirAsync(blogPostAssetsPath);
  blogPostAssets.forEach(file =>
    fs.copyFileSync(path.resolve(blogPostAssetsPath, file), path.resolve(assetsPath, file))
  );
  await writeFileAsync("./posts.json", JSON.stringify({ posts }));
};

module.exports = createPostsList;
