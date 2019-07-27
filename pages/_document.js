import Document, { Html, Head, Main, NextScript } from "next/document";
import { TypographyStyle, GoogleFont } from "react-typography";
import typography from "../utils/typography";

class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <TypographyStyle typography={typography} />
          <GoogleFont typography={typography} />
        </Head>
        <body className="dark">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
