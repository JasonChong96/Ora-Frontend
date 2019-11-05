/**
 *
 * VisitorChat
 *
 */

import {
  Col,
  Dropdown,
  Icon,
  Menu,
  Modal,
  PageHeader,
  Row,
  Input,
  Button,
} from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import socketIOClient from 'socket.io-client';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import HeaderImage from 'images/chat_header.svg';
import LogoImage from 'images/logo.svg';
import Chat from '../../components/Chat';
import { makeSelectCurrentUser } from '../App/selectors';
import {
  addChatMessage,
  setFirstMsg,
  setStaffJoined,
  logOut,
  reset,
  convertAnonymousAccount,
  submitSettings,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectVisitorChat, {
  makeSelectChatMessages,
  makeSelectStaffJoined,
  makeSelectFirstMsg,
} from './selectors';
import { refreshAuthToken } from '../StaffMain/actions';
import { setError } from '../App/actions';
import ConvertAnonymousModal from '../../components/ConvertAnonymousModal';
import ConvertAnonymousModal2 from '../../components/ConvertAnonymousModal2';
import Logo from '../../components/Logo';
import HeartLineFooter from '../../components/HeartLineFooter';
import SettingsModal from '../../components/SettingsModal';

function showLogOut(onConfirm) {
  Modal.confirm({
    title: 'Log out',
    content: 'Are you sure you want to log out?',
    onOk() {
      onConfirm();
    },
  });
}

function showLeaveChat(onConfirm) {
  Modal.confirm({
    title: 'Are you sure you want to leave this chat?',
    content: 'You may not be taking to the same person the next time you chat',
    iconType: 'warning',
    onOk() {
      onConfirm();
    },
  });
}

function showConnectFailed() {
  Modal.error({
    title: 'Connection failed',
    content: 'Please try again by refreshing the page or logging out.'
  })
}

function showRoomExists() {
  Modal.error({
    title: 'User already connected',
    content: 'Chatting on the same account on two tabs is not allowed.'
  })
}

export function VisitorChat({
  isFirstMsg,
  hasStaffJoined,
  setHasStaffJoined,
  submitSettings,
  setIsFirstMsg,
  user,
  messages,
  addChatMessage,
  refreshToken,
  logOut,
  reset,
  showError,
  convertAnonymousAccount,
}) {
  useInjectReducer({ key: 'visitorChat', reducer });
  useInjectSaga({ key: 'visitorChat', saga });
  const [socket, setSocket] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignUpForLogOut, setShowSignUpForLogOut] = useState(false);
  function connectSocket() {
    const socket = socketIOClient('https://api.chatwithora.com', {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        },
      },
      reconnectionDelay: 5000,
      reconnectionAttempts: 10,
      transports: ['polling'],
    });
    socket.on('connect', () => {
      reset();
      setIsConnected(true);
      console.log('Connected');
    });
    socket.on('disconnect', () => {
      // socket.emit('disconnect_request');
      console.log('disconnected');
      setIsConnected(false);
      setIsFirstMsg(true);
      setHasStaffJoined(false);
      addChatMessage({
        content: { content: 'Your connection has been reset' },
      });
      addChatMessage({
        content: {
          content: 'You may send another message to talk to another volunteer!',
        },
      });
    });
    socket.on('staff_join_room', data => {
      setHasStaffJoined(true);
      addChatMessage({
        content: { content: `${data.user.full_name} has joined the chat!` },
      });
    });
    socket.on('staff_leave', data => {
      setIsFirstMsg(true);
      setHasStaffJoined(false);
      addChatMessage({
        content: { content: `${data.user.full_name} has left the chat.` },
      });
      addChatMessage({
        content: {
          content: 'You may send another message to talk to another volunteer!',
        },
      });
    });
    socket.on('staff_send', data => addChatMessage({
      ...data.content,
      user: data.user,
    }));
    socket.on('reconnect_error', error => {
      if (error.description == 401 && user) {
        refreshToken();
        setForceUpdate(x => !x);
      }
    });
    socket.on('reconnect', () => {
      reset();
      setIsConnected(true);
    });
    socket.on('reconnect_failed', () => {
      showConnectFailed();
    });
    socket.on('visitor_room_exists', () => {
      showRoomExists();
      setIsConnected(false);
    });
    return socket;
  }
  const sendMsg = !socket
    ? false
    : msg => {
      setIsFirstMsg(false);
      socket.emit(
        isFirstMsg
          ? 'visitor_first_msg'
          : hasStaffJoined
            ? 'visitor_msg'
            : 'visitor_msg_unclaimed',
        msg,
        (res, err) => {
          if (res) {
            addChatMessage({ user: user.user, content: msg });
          } else {
            showError({
              title: 'Failed to send a message',
              description: err,
            });
          }
        },
      );
    };
  const leaveChat = !socket
    ? false
    : () => {
      socket.emit('visitor_leave_room', (res, err) => {
        if (res) {
          setIsFirstMsg(true);
          setHasStaffJoined(false);
          addChatMessage({
            content: { content: 'You have successfully left the chat.' },
          });
          addChatMessage({
            content: {
              content:
                'You may send another message to talk to another volunteer!',
            },
          });
        } else {
          showError({
            title: 'Failed to leave chat',
            description: err,
          });
        }
      });
    };
  useEffect(() => {
    const socket = connectSocket();
    setSocket(socket);
    setIsFirstMsg(true);
    setHasStaffJoined(false);
    window.onbeforeunload = function () {
      return true;
    };
    return () => {
      socket.close();
    };
  }, [forceUpdate]);
  return (
    <>
      <div
        style={{
          position: 'absolute',
          width: '100%',
          display: 'inline-block',
          zIndex: 1,
        }}
      >
        <div
          style={{ maxWidth: '500px', textAlign: 'center', margin: '0 auto' }}
        >
          <img
            style={{
              width: '100%',
              display: 'inline-block',
              backgroundSize: '100% 100%',
            }}
            src={HeaderImage}
          />
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          top: '1rem',
          width: '100%',
          display: 'inline-block',
          zIndex: 1,
        }}
      >
        <div
          style={{ maxWidth: '100px', textAlign: 'center', margin: '0 auto' }}
        >
          <img
            style={{
              width: '100%',
              display: 'inline-block',
              backgroundSize: '100% 100%',
            }}
            src={LogoImage}
          />
        </div>
      </div>
      <Row
        type="flex"
        align="middle"
        justify="center"
        style={{ width: '100%' }}
      >
        <Col xs={24} md={16} lg={12}>
          <PageHeader
            style={{ backgroundColor: 'rgba(0,0,0,0)', zIndex: 2 }}
            extra={
              <Dropdown
                overlay={
                  <Menu>
                    {hasStaffJoined && (
                      <Menu.Item
                        style={{
                          color: 'red',
                        }}
                        onClick={() => showLeaveChat(leaveChat)}
                      >
                        <Icon type="exclamation-circle" theme="filled" /> Leave
                        chat
                      </Menu.Item>
                    )}
                    <Menu.Item
                      onClick={() =>
                        user.user.is_anonymous
                          ? setShowSignUp(true)
                          : setShowSettings(true)
                      }
                    >
                      <Icon type="setting" />
                      {user.user.is_anonymous ? ' Sign Up' : 'Settings'}
                    </Menu.Item>
                    <Menu.Item
                      onClick={() =>
                        user.user.is_anonymous
                          ? setShowSignUpForLogOut(true)
                          : showLogOut(logOut)
                      }
                    >
                      <Icon type="logout" /> Log out
                    </Menu.Item>
                  </Menu>
                }
              >
                <Icon
                  style={{
                    fontSize: '2em',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    color: '#0EAFA7',
                    padding: '0 0.5em 0.5em 0.5em',
                  }}
                  type="more"
                />
              </Dropdown>
            }
          />
          <Chat
            messages={messages}
            user={user.user}
            onSendMsg={sendMsg}
            isLoading={!isConnected}
            isVisitor
          />
        </Col>
      </Row>
      <ConvertAnonymousModal
        visible={showSignUp}
        onCancel={() => setShowSignUp(false)}
        onCreate={(email, password) => {
          convertAnonymousAccount(user.user.id, email, password);
          setShowSignUp(false);
        }}
      />
      <ConvertAnonymousModal2
        visible={showSignUpForLogOut}
        cancelText="Cancel"
        onCancel={() => {
          setShowSignUpForLogOut(false);
        }}
        okText="No thanks, just log me out"
        onOk={() => {
          setShowSignUpForLogOut(false);
          logOut();
        }}
        onCreate={(email, password) => {
          convertAnonymousAccount(user.user.id, email, password);
          setShowSignUp(false);
        }}
      />

      <SettingsModal
        visible={showSettings}
        title="Account Settings"
        onCancel={() => {
          setShowSettings(false);
        }}
        onOk={() => {
          setShowSettings(false);
        }}
        setError={showError}
        onSubmit={(name, password) => {
          submitSettings(name, password, user.user.id);
          setShowSettings(false);
        }}
      />
    </>
  );
}

VisitorChat.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  visitorChat: makeSelectVisitorChat(),
  user: makeSelectCurrentUser(),
  messages: makeSelectChatMessages(),
  hasStaffJoined: makeSelectStaffJoined(),
  isFirstMsg: makeSelectFirstMsg(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    convertAnonymousAccount: (id, email, password) =>
      dispatch(convertAnonymousAccount(id, email, password)),
    addChatMessage: message => dispatch(addChatMessage(message)),
    setIsFirstMsg: firstMsg => dispatch(setFirstMsg(firstMsg)),
    setHasStaffJoined: staffJoined => dispatch(setStaffJoined(staffJoined)),
    refreshToken: () => dispatch(refreshAuthToken(false)),
    logOut: () => dispatch(logOut()),
    reset: () => dispatch(reset()),
    showError: error => dispatch(setError(error)),
    submitSettings: (name, password, id) =>
      dispatch(submitSettings(name, password, id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(VisitorChat);
