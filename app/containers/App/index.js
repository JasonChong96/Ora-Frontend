/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Switch, Route, Router } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';

import GlobalStyle from '../../global-styles';
import { Button, notification } from 'antd';
import Home from '../Home';
import PatientLogin from '../PatientLogin';
import PatientGettingStarted from '../PatientGettingStarted';
import StaffLogin from '../StaffLogin';
import PatientRegister from '../PatientRegister';
import StaffMain from '../StaffMain';
import 'antd/dist/antd.less';
import './index.less';
import VisitorChat from '../VisitorChat';
import history from '../../utils/history';
import { compose } from 'redux';
import { makeSelectError } from './selectors';
import { setError } from './actions';

const AppWrapper = styled.div`
  // max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100vh;
  // padding: 0 16px;
  flex-direction: column;
`;

function App({ error, setError }) {
  useEffect(() => {
    if (error) {
      notification.error({
        message: error.title,
        description: error.description,
      });
      setError(false);
    }
  }, [error]);

  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      {/* <Header /> */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/patient/login" component={PatientLogin} />
        <Route path="/patient/register" component={PatientRegister} />
        <Route path="/patient/main" component={VisitorChat} />
        <Route
          path="/patient/getting-started"
          component={PatientGettingStarted}
        />
        <Route path="/features" component={FeaturePage} />
        <Route path="/staff/login" component={StaffLogin} />
        <Route path="/staff/main" component={StaffMain} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      {/* <Footer /> */}
      <GlobalStyle />
    </AppWrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    setError: error => dispatch(setError(error)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(App);
