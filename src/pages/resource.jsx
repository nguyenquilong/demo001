import { Helmet } from 'react-helmet-async';

import { ResourceView } from 'src/sections/resource/view';

// ----------------------------------------------------------------------

export default function ResourcePage() {
  return (
    <>
      <Helmet>
        <title> Resource </title>
      </Helmet>

      <ResourceView />
    </>
  );
}
