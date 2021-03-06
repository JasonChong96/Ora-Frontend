/**
 *
 * HorizontallyCentered
 *
 */

// import styled from 'styled-components';
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

function HorizontallyCentered({ children, padding }) {
  return (
    <Row align="center" style={{ padding }}>
      <Col>{children}</Col>
    </Row>
  );
}

HorizontallyCentered.propTypes = {
  children: PropTypes.node.isRequired,
  padding: PropTypes.string,
};

HorizontallyCentered.defaultProps = {
  padding: '2em',
};

export default memo(HorizontallyCentered);
