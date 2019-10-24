/**
 *
 * PendingChats
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectPendingChats from './selectors';
import reducer from './reducer';
import saga from './saga';
import { List, Row, Col, Button, Card, Icon } from 'antd';
import Title from 'antd/lib/typography/Title';
import Paragraph from 'antd/lib/typography/Paragraph';
import Text from 'antd/lib/typography/Text';

export function PendingChats({ inactiveChats }) {
  useInjectReducer({ key: 'pendingChats', reducer });
  useInjectSaga({ key: 'pendingChats', saga });
  return <List
    itemLayout="horizontal"
    dataSource={inactiveChats}
    renderItem={item => (
      <Card.Grid style={{ width: '100%', cursor: 'pointer' }}>
        <div
          display="flex"
          flexDirection="column"
          style={{ width: '100%', margin: '1em' }}
        >
          <Row type="flex">
            <Col span={16}>
              <Title level={4}><Icon type="exclamation-circle" twoToneColor='red' theme="twoTone" /> {item.title}</Title>
              <Text style={{ color: 'red' }}><Icon type="star" theme="filled" /> Previously chatted with</Text><br />
              <Text style={{ color: 'red' }}><Icon type="warning" theme="twoTone" twoToneColor='red' /> Flagged</Text>
            </Col>
            <Col span={8}>
              <Text style={{ width: '100%' }}>10 mins ago</Text>
            </Col>
          </Row>
          <Paragraph ellipsis>{item.description}</Paragraph>
        </div>
      </Card.Grid>
    )}
  />
}

PendingChats.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  pendingChats: makeSelectPendingChats(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(PendingChats);
