/**
 *
 * PatientLogin
 *
 */

import { Button, Checkbox, Form, Icon, Input, PageHeader } from 'antd';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { visitorLogin } from './actions';
import './index.css';
import reducer from './reducer';
import saga from './saga';
import makeSelectPatientLogin from './selectors';
import HeaderImage from 'images/chat_header.svg';
import Logo from '../../components/Logo';
import HeartLineFooter from '../../components/HeartLineFooter';

function PatientLogin({
  visitorLogin,
  history,
  form: { getFieldDecorator, validateFields },
}) {
  useInjectReducer({ key: 'patientLogin', reducer });
  useInjectSaga({ key: 'patientLogin', saga });
  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        visitorLogin(values.email, values.password);
      }
    });
  };

  return (
    <>
      <div style={{ display: 'inline-block' }}>
        <div style={{ maxWidth: '500px', textAlign: 'center', margin: '0 auto' }}>
          <img style={{ width: '100%', display: 'inline-block', backgroundSize: '100% 100%' }} src={HeaderImage} />
        </div>
      </div>
      <div style={{ margin: '0 auto', padding: '1em' }}>
        <Logo />
      </div>
      <div style={{ margin: '0 auto' }}>
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not a valid E-mail!',
                },
                { required: true, message: 'Please input your email!' },
              ],
            })(
              <Input
                prefix={
                  <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="E-mail"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' },
              ],
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Sign in
            </Button>
          </Form.Item>
          Don't have an account? <Link to="/patient/register">SIGN UP.</Link>
        </Form>
      </div>
      <HeartLineFooter />
    </>
  );
}

PatientLogin.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  patientLogin: makeSelectPatientLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    visitorLogin: (email, password) => dispatch(visitorLogin(email, password)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
  withRouter,
  Form.create({ name: 'normal_login' }),
)(PatientLogin);
