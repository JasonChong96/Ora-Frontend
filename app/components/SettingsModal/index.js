/**
 *
 * SettingsModal
 *
 */

import React, { memo, useEffect } from 'react';
import { Modal, Form, Input, Icon } from 'antd';
import { compose } from 'redux';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function SettingsModal({
  title,
  okText,
  cancelText,
  visible,
  onCancel,
  onSubmit,
  setError,
  form: { getFieldValue, getFieldDecorator, validateFields, resetFields },
}) {
  const compareToFirstPassword = (rule, value, callback) => {
    if (value !== getFieldValue('password')) {
      callback('Password is different!');
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    if (value && value.length < 8) {
      callback('Must be of 8 characters or more');
    }
    if (value && !/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(value)) {
      callback('Need at least 1 number 1 alphabet');
    }
    if (value) {
      validateFields(['confirm'], { force: true });
    }
    callback();
  };

  useEffect(() => {
    if (!visible) {
      resetFields();
    }
  }, [visible])

  return (
    <Modal
      visible={visible}
      title={title}
      okText={okText}
      cancelText={cancelText}
      onCancel={onCancel}
      onOk={() =>
        validateFields((err, values) => {
          if (err) {
            return;
          }
          if ((!values.dname || !values.dname.length) && (!values.email || !values.email.length)
            && (!values.password || !values.password.length)) {
            setError({
              title: 'Failed to Save Settings',
              description: 'Please fill in at least one field to change'
            })
            return;
          }
          onSubmit(values.dname, values.email, values.password);
        })
      }
    >
      Please fill in the settings you would like to change
      <br />
      <br />
      <Form layout="vertical">
        <Form.Item label="Display Name">
          {getFieldDecorator('dname', {
            rules: [],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />,
          )}
        </Form.Item>
        <Form.Item label="Email">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not a valid E-mail!',
              },
            ],
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          )}
        </Form.Item>
        <Form.Item hasFeedback label="New Password">
          {getFieldDecorator('password', {
            rules: [
              {
                validator: validateToNextPassword,
              },
            ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
            />,
          )}
        </Form.Item>
        <Form.Item hasFeedback label="Confirm Password">
          {getFieldDecorator('confirm', {
            rules: [
              {
                validator: compareToFirstPassword,
              },
            ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
            />,
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
}

SettingsModal.propTypes = {};

SettingsModal.defaultProps = {
  okText: 'Update Account',
  cancelText: 'Cancel',
  title: 'Sign up for a permanent account',
};

export default compose(
  memo,
  Form.create({ name: 'form_in_modal' }),
)(SettingsModal);
