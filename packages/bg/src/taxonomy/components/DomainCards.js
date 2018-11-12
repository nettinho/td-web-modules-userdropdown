import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card, Header, Icon, Message, Divider } from "semantic-ui-react";
import { compose } from "redux";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { linkTo } from "../routes";
import { getVisibleDomains } from "../selectors";

const toDomainPath = linkTo.DOMAIN;

export const DomainCard = ({ id, name, type, description, childCount }) => (
  <Card key={id} link as={Link} to={toDomainPath({ id })}>
    <Card.Content>
      <Card.Header>
        <Icon name="cube" />
        {name}
      </Card.Header>
      <Card.Meta>
        <span>{type || <FormattedMessage id="domain" />}</span>
      </Card.Meta>
    </Card.Content>
    <Card.Content description={description} />
    <Card.Content extra>
      <Icon name="cubes" />
      <FormattedMessage
        id="domain.props.children"
        values={{ count: childCount }}
      />
    </Card.Content>
  </Card>
);

DomainCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  type: PropTypes.string,
  childCount: PropTypes.number,
  description: PropTypes.string
};

export const DomainCards = ({
  visibleDomains,
  domainsFilter,
  domain,
  intl: { formatMessage }
}) => (
  <React.Fragment>
    <Divider hidden />
    {domainsFilter && (
      <Header as="h4">
        <Icon name="search" />
        <Header.Content>
          {visibleDomains.length == 0 && (
            <FormattedMessage id="domains.search.results.empty" />
          )}
          {visibleDomains.length > 0 && (
            <FormattedMessage
              id="domains.search.results.count"
              values={{ count: visibleDomains.length }}
            />
          )}
        </Header.Content>
      </Header>
    )}
    {_.isEmpty(visibleDomains) &&
      domain &&
      domain.id && (
        <Message
          icon="warning"
          header={formatMessage({ id: "domain.children.empty" })}
          list={[
            <Link key={1} to={linkTo.DOMAIN_NEW({ id: domain.id })}>
              <FormattedMessage id="domain.actions.create" />
            </Link>
          ]}
        />
      )}
    <Card.Group>{visibleDomains.map(DomainCard)}</Card.Group>
  </React.Fragment>
);

DomainCards.propTypes = {
  visibleDomains: PropTypes.array,
  domainsFilter: PropTypes.string,
  domain: PropTypes.object,
  intl: PropTypes.object
};

const mapStateToProps = state => ({
  visibleDomains: getVisibleDomains(state),
  domainsLoading: state.domainsLoading,
  domainsFilter: state.domainsFilter,
  domain: state.domain
});

export default compose(
  injectIntl,
  connect(mapStateToProps)
)(DomainCards);
