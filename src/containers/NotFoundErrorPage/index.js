import BodyClassName from 'react-body-classname';

import { Page, PageContent, Link, Button } from 'src/components';

import enhance from './enhance';

const NotFoundErrorPage = () => (
  <Page className="text-center" title="Not Found">
    <BodyClassName className="animsition page-error page-error-404 layout-full" />
    <PageContent className="vertical-align-middle">
      <header>
        <h1 className="animation-slide-top">404</h1>
        <p>Page Not Found !</p>
      </header>
      <p className="error-advise">YOU SEEM TO BE TRYING TO FIND HIS WAY HOME</p>

      <Button tag={Link} to="/" color="primary" className="btn-round">GO TO HOME PAGE</Button>
    </PageContent>
  </Page>
);


export default enhance(NotFoundErrorPage);
