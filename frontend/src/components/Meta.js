import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Direwolf Pet Store',
  description: 'We sell the best direwolves',
  keywords: 'direwolves, pets, fantasy pets',
};

export default Meta;
