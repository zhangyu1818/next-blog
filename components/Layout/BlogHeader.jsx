import Link from "next/link";
const Header = ({ smallTitle }) => (
  <header className="blog-header">
    <Link href="/">{smallTitle ? <h3 className="blog-name-small">Blog</h3> : <h1 className="blog-name">Blog</h1>}</Link>
  </header>
);
export default Header;
