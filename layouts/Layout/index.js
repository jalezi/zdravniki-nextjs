import Head from 'next/head';

import { ThemeProvider } from 'styled-components';

import Header from '../../components/Header';
import { theme } from '../../constants/theme';
import { ChildrenPropType } from '../../types';

const Layout = function Layout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <style>
          @import
          url(https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap);
        </style>
      </Head>
      <Header />
      {children}
    </ThemeProvider>
  );
};

export default Layout;

Layout.defaultProps = {
  children: undefined,
};

Layout.propTypes = {
  children: ChildrenPropType,
};
