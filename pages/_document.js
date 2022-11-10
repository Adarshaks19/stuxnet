import Document from "next/document";
import { ServerStyleSheet } from "styled-components";
import Head from 'next/head'
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
          <Head>
              <link rel="icon" href='https://media.geeksforgeeks.org/wp-content/cdn-uploads/gfg_200X200.png' type="image/x-icon"/>

          </Head>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
