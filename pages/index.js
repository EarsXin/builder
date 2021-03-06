import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import withLayout from '../lib/withLayout';

const Index = ({ user }) => {
  return (
    <div style={{ padding: '10px 45px' }}>
      <Head>
        <title>Index page</title>
        <meta name="description" content="This is the description of the Index page" />
      </Head>
      <p>Content on Index page</p>
      <p>
        Email:
        {user && user.email}
        {!user && 'liyao'}
      </p>
    </div>
  );
};

Index.getInitialProps = async ({ query }) => ({ user: query.user });

Index.proprTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
};

Index.defaultProps = {
  user: null,
};

export default withLayout(Index);
