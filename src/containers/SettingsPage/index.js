import { pure } from 'recompose';
import { Col, Row } from 'reactstrap';

import { Page, PageHeader, PageContent, Button, Link } from 'src/components';

import css from './style.css';


const breadcrumbs = [{
  label: 'Settings & Assets',
}];

const categories = [{
  label: 'Tools',
  url: '/tools/',
}, {
  label: 'Site Variables',
}, {
  label: 'Assets',
}, {
  label: 'Issuers',
  url: '/issuers/',
}, {
  label: 'Services',
  url: '/services/',
}, {
  label: 'Shortcodes',
}, {
  label: 'Snippets',
}, {
  label: 'Site Settings',
}, {
  label: 'Industries',
  url: '/industries/',
}, {
  label: 'Document Templates',
  url: '/document-templates/',
}];

const enhance = pure;

const SettingsPage = () => (
  <Page title="Settings">
    <PageHeader breadcrumbs={breadcrumbs} />
    <PageContent>
      <Row>
        {categories.map(({ label, url }) => (
          <Col xl="2" lg="3" md="4" sm="6" xs="12" key={label + url} className={css.category}>
            <Button
              tag={Link}
              to={url}
              color="primary"
              disabled={!url}
              outline
              block
            >{label}</Button>
          </Col>
        ))}
      </Row>
    </PageContent>
  </Page>
);


export default enhance(SettingsPage);
