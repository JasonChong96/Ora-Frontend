/**
 *
 * Home
 *
 */

import { Button, Col, Icon, Row, PageHeader, Dropdown, Menu } from 'antd';
import Text from 'antd/lib/typography/Text';
import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import makeSelectHome from './selectors';
import AnonymousLoginModal from '../../components/AnonymousLoginModal';
import { loginAnonymously } from './actions';
import HeaderImage from 'images/home_header.svg';
import LandingImg from '../../components/Landing';
import HeartLineFooter from '../../components/HeartLineFooter';

export function Landing({ loginAnonymously }) {
  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        display: 'inline-block',
        zIndex: 1,
      }}
    >
      <PageHeader
        extra={[
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item>
                  <Link to="/staff/main">Volunteer Login</Link>
                </Menu.Item>

                <Menu.Item>
                  <Link to="/staff/main">Supervisor Login</Link>
                </Menu.Item>
              </Menu>
            }
          >
            <Icon
              style={{
                fontSize: '1.5rem',
                cursor: 'pointer',
                marginLeft: '4rem',
              }}
              type="menu"
            />
          </Dropdown>,
        ]}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1
          style={{
            color: '#0EAFA7',
            fontSize: '30px',
          }}
        >
          <b>Stressed?</b>
          <b> Overwhelmed?</b>
        </h1>
        <LandingImg />
        <h1 style={{ color: '#0EAFA7', fontSize: '30px' }}>
          <b>Need a listening ear?</b>
        </h1>
        <div style={{ padding: '1em' }}>
          <Link to="/">
            <Button
              type="primary"
              ghost
              size="large"
              style={{ height: '1.5em', width: '20em', fontSize: '30px' }}
            >
              CHAT WITH ORA
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

Landing.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default compose(memo)(Landing);