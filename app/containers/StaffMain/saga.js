import { put, takeLatest, takeEvery, select } from 'redux-saga/effects';
import { post, get, patch } from '../../utils/api';
import history from '../../utils/history';
import {
  userLoggedIn,
  userLoggedOut,
  setError,
  setSuccess,
  patchUserInfo,
} from '../App/actions';
import {
  REFRESH_AUTH_TOKEN,
  REGISTER_STAFF,
  LOAD_CHAT_HISTORY,
  LOG_OUT,
  LOAD_ALL_VOLUNTEERS,
  LOAD_ALL_SUPERVISORS,
  LOAD_ALL_VISITORS,
  SET_LAST_SEEN_MESSAGE_ID,
  LOAD_BOOKMARKED_CHATS,
  SET_VISITOR_BOOKMARK,
  LOAD_LAST_UNREAD,
  LOAD_MESSAGES_BEFORE_FOR_SUPERVISOR_PANEL,
  LOAD_MESSAGES_AFTER_FOR_SUPERVISOR_PANEL,
  SUBMIT_SETTINGS,
  UPDATE_USER,
  LOAD_UNREAD_CHATS,
  LOAD_MOST_RECENT_FOR_SUPERVISOR_PANEL,
  LOAD_UNHANDLED,
  LOAD_FLAGGED_CHATS,
  LOAD_STAFFS_HANDLING_VISITOR,
  LOAD_ALL_UNHANDLED_CHATS,
  LOAD_MY_HANDLED_CHATS
} from './constants';
import {
  addMessageHistory,
  loadVolunteers,
  registerStaffSuccess,
  registerStaffFailure,
  loadSupervisors,
  addToAllVisitors,
  setMessagesForSupervisorPanel,
  addMessagesAfterForSupervisorPanel,
  addMessagesBeforeForSupervisorPanel,
  addVisitorsToBookmarkedChats,
  removeVisitorFromBookmarkedChats,
  loadMessagesAfterForSupervisorPanel,
  loadMessagesBeforeForSupervisorPanel,
  setUnreadChats,
  setHistoryForStaffPanel,
  showHistoryForStaffPanel,
  setMessagesForStaffPanel,
  addActiveChat,
  setStaffsHandlingVisitor,
  setAllUnhandledChats,
  setFlaggedChats,
  setMyUnhandledChats,
  setMyHandledChats,
  setChatUnread,
} from './actions';
import { registerPatientFailure } from '../PatientRegister/actions';
import { makeSelectChatMessages } from '../VisitorChat/selectors';


function* registerStaff({ name, email, password, role }) {
  const [success, response] = yield post(
    '/users',
    {
      full_name: name,
      email,
      password,
      role_id: role,
    },
    response => response,
    e => e.response,
  );
  if (success) {
    yield put(registerStaffSuccess());
    yield put(
      setSuccess({
        title: 'Registration successful!',
        description: `${name} has been successfully registered!`,
      }),
    );
    yield loadAllVolunteers();
    yield loadAllSupervisors();
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error[Object.keys(response.data.error)[0]][0];
    }
    yield put(registerStaffFailure());
    yield put(
      setError({ title: 'Failed to register account', description: msg }),
    );
  }
}

function* refreshAuthToken({ isStaff }) {
  const [success, response] = yield post(
    '/refresh',
    {},
    response => response,
    e => e.response,
  );
  if (success) {
    yield localStorage.setItem('access_token', response.data.access_token);
  } else {
    yield put(userLoggedOut());
    yield history.push(isStaff ? '/staff/login' : '/visitor');
  }
}

function* loadChatHistory({ lastMsgId, visitor, repeat }) {
  const [success, response] = yield get(
    '/visitors/' + visitor.id + '/messages' + (lastMsgId ? ('?before_id=' + lastMsgId) : ''),
    response => response,
    e => e.response,
  );
  if (success) {
    response.data.data.forEach(content => {
      content.user = content.sender ? content.sender : visitor;
    });
    if (!repeat) {
      yield put(setHistoryForStaffPanel(visitor.id, response.data.data));
    } else {
      yield put(setMessagesForStaffPanel(visitor.id, response.data.data));
      if (response.data.data.length) {
        yield loadChatHistory({ lastMsgId: response.data.data[0].id, visitor });
      }
      if (response.data.data.length) {
        yield loadChatUnread({ lastMsgId: response.data.data.slice(-1)[0].id, visitorId: visitor.id })
      }
    }
  }
}

function* loadAllVolunteers() {
  let result = []
  let [success, response] = yield get(
    '/users',
    response => response,
    e => e.response,
  );
  while (success && response.data.data.length) {
    result = result.concat(response.data.data)
    let a = yield get(
      `/users?after_id=${response.data.data.slice(-1)[0].id}`,
      response => response,
      e => e.response,
    );
    success = a[0]
    response = a[1]
  }
  yield put(loadVolunteers(result));
}

function* loadAllSupervisors() {
  const [success, response] = yield get(
    '/users?role_id=2',
    response => response,
    e => e.response,
  );
  if (success) {
    yield put(loadSupervisors(response.data.data));
  } else {
    console.log(response)
  }
}

function* logOut() {
  yield localStorage.removeItem('access_token');
  yield localStorage.removeItem('user');
  yield put(userLoggedOut());
  yield history.push('/staff/login');
}

function* loadLastUnread({ visitor }) {
  const [success, response] = yield get(
    '/visitors/' + visitor.id + '/messages' + '?starts_from_unread=true',
    response => response,
    e => e.response,
  );
  if (success) {
    response.data.data.forEach(content => {
      content.user = content.sender ? content.sender : visitor;
    });
    yield put(setMessagesForSupervisorPanel(visitor.id, response.data.data));
    if (response.data.data.length) {
      yield put(loadMessagesAfterForSupervisorPanel(visitor, response.data.data.slice(-1)[0].id))
      yield put(loadMessagesBeforeForSupervisorPanel(visitor, response.data.data[0].id))
    }
  }
}

function* loadMostRecentForSupervisorPanel({ visitor, shouldSetLastSeen }) {
  const [success, response] = yield get(
    '/visitors/' + visitor.id + '/messages',
    response => response,
    e => e.response,
  );
  if (success) {
    response.data.data.forEach(content => {
      content.user = content.sender ? content.sender : visitor;
    });
    yield put(setMessagesForSupervisorPanel(visitor.id, response.data.data));
    if (response.data.data.length) {
      yield put(loadMessagesBeforeForSupervisorPanel(visitor, response.data.data[0].id));
      if (shouldSetLastSeen) {
        yield setLastSeenMessageId({
          visitorId: visitor.id,
          messageId: response.data.data.slice(-1)[0].id,
        });
      }
    }
  }
}

function* loadChatForward({ visitor, lastMessageId }) {
  const [success, response] = yield get(
    '/visitors/' + visitor.id + '/messages' + '?after_id=' + lastMessageId,
    response => response,
    e => e.response,
  );
  if (success) {
    response.data.data.forEach(content => {
      content.user = content.sender ? content.sender : visitor;
    });
    if (response.data.data.length) {
      yield put(addMessagesAfterForSupervisorPanel(visitor.id, response.data.data));
    }
  }
}

function* loadChatBack({ visitor, firstMessageId }) {
  const [success, response] = yield get(
    '/visitors/' + visitor.id + '/messages' + '?before_id=' + firstMessageId,
    response => response,
    e => e.response,
  );
  if (success) {
    response.data.data.forEach(content => {
      content.user = content.sender ? content.sender : visitor;
    });
    if (response.data.data.length) {
      yield put(addMessagesBeforeForSupervisorPanel(visitor.id, response.data.data));
    }
  }
}

function* loadAllVisitors({ lastVisitorId }) {
  const [success, response] = yield get(
    lastVisitorId ? `/visitors?after_id=${lastVisitorId}&exclude_unhandled=true` : '/visitors?exclude_unhandled=true',
    response => response,
    e => e.response,
  );
  if (success) {
    yield put(addToAllVisitors(response.data.data.map(visitor => { return { visitor } })));
    for (var i = 0; i < response.data.data.length; i++) {
      const visitor = response.data.data[i];
      yield loadStaffsHandlingVisitor({ visitorId: visitor.id })
      if (!(yield select(makeSelectChatMessages())[visitor.id])) {
        yield loadChatHistory({ lastMsgId: null, visitor, repeat: true })
      }
    }
  }
}

function* loadBookmarkedVisitors({ lastVisitorId }) {
  const [success, response] = yield get(
    lastVisitorId ? `/visitors/bookmarked?after_id=${lastVisitorId}` : '/visitors/bookmarked',
    response => response,
    e => e.response,
  );
  if (success) {
    yield put(addVisitorsToBookmarkedChats(response.data.data));
  }
}

function* setLastSeenMessageId({ visitorId, messageId, noReload }) {
  yield patch(
    `/visitors/${visitorId}/last_seen`,
    { last_seen_msg_id: messageId },
    response => response,
    e => e.response,
  );
  if (!noReload) {
    // yield put({
    //   type: LOAD_UNREAD_CHATS,
    // })
  }
}

function* loadUnreadChats() {
  const [success, response] = yield get('/visitors/unread', response => response, e => e.response);
  if (success) {
    yield put(setUnreadChats(response.data.data.map(entity => entity.user)));
  }
}

function* setVisitorBookmark({ visitor, isBookmarked }) {
  const [success, response] = yield patch(
    `/visitors/${visitor.id}/bookmark`,
    { is_bookmarked: isBookmarked },
    response => response,
    e => e.response,
  );
  if (success) {
    if (response.data.data.is_bookmarked) {
      yield put(addVisitorsToBookmarkedChats([visitor]));
    } else {
      yield put(removeVisitorFromBookmarkedChats(visitor.id));
    }
  }
}

function* submitSettings({ name, email, password, id }) {
  const payload = {
    full_name: name,
    email: email,
    password
  }
  Object.keys(payload).forEach(key => {
    if (!payload[key] || !payload[key].length) {
      delete payload[key]
    }
  })
  const [success, response] = yield patch(
    `/users/${id}`,
    payload,
    response => response,
    e => e.response,
  );
  if (success) {
    yield put(patchUserInfo(response.data.data));
    yield put(
      setSuccess({
        title: 'Settings changed successfully!',
        description: ``,
      }),
    );
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response && response.data) {
      msg = response.data.error[Object.keys(response.data.error)[0]][0];
    }
    yield put(
      setError({ title: 'Failed to change settings', description: msg }),
    );
  }
}

function* updateUser({ name, role, disableFlag, id }) {
  const payload = {
    full_name: name,
    role_id: role,
    disabled: disableFlag
  }
  const [success, response] = yield patch(
    `/users/${id}`,
    payload,
    response => response,
    e => e.response,
  );
  if (success) {
    yield put(
      setSuccess({
        title: 'User updated successfully!',
        description: ``,
      }),
    );
    yield loadAllVolunteers();
    yield loadAllSupervisors();
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response && response.data) {
      msg = response.data.error[Object.keys(response.data.error)[0]][0];
    }
    yield put(
      setError({ title: 'Failed to update user!', description: msg }),
    );
  }
}


function* loadUnhandledChats() {
  const [success, response] = yield get(
    '/visitors/unhandled',
    response => response,
    e => e.response
  )

  if (success) {
    yield put(setMyUnhandledChats(response.data.data.map(visitor => { return { visitor } })))
    for (var i = 0; i < response.data.data.length; i++) {
      const visitor = response.data.data[i];
      yield put(addActiveChat({ visitor }))
      yield loadStaffsHandlingVisitor({ visitorId: visitor.id })
      yield loadChatHistory({ lastMsgId: null, visitor, repeat: true })
    }
  }
}

function* loadChatUnread({ visitorId, lastMsgId }) {
  const [success, response] = yield get(
    `/visitors/${visitorId}/last_seen`,
    response => response,
    e => e.response
  )

  if (success) {
    if (response.data.data.last_seen_msg_id != lastMsgId) {
      yield put(setChatUnread(visitorId, true))
    }
  }
}

function* loadMyHandledChats() {
  const [success, response] = yield get(
    '/visitors/subscribed?exclude_unhandled=true',
    response => response,
    e => e.response
  )
  if (success) {
    yield put(setMyHandledChats(response.data.data.map(visitor => { return { visitor } })))
    for (var i = 0; i < response.data.data.length; i++) {
      const visitor = response.data.data[i];
      // yield put(addActiveChat({ visitor }))
      yield loadStaffsHandlingVisitor({ visitorId: visitor.id })
      yield loadChatHistory({ lastMsgId: null, visitor, repeat: true })
    }
  }
}

function* loadAllUnhandledChats() {
  const [success, response] = yield get(
    '/visitors/unhandled?all=true',
    response => response,
    e => e.response
  )

  if (success) {
    yield put(setAllUnhandledChats(response.data.data.map(visitor => { return { visitor } })))
    for (var i = 0; i < response.data.data.length; i++) {
      const visitor = response.data.data[i];
      yield loadStaffsHandlingVisitor({ visitorId: visitor.id })
      yield loadChatHistory({ lastMsgId: null, visitor, repeat: true })
    }
  }
}

function* loadFlaggedChats() {
  const [success, response] = yield get(
    '/visitors/flagged',
    response => response,
    e => response
  )

  if (success) {
    yield put(setFlaggedChats(response.data.data.map(visitor => { return { visitor } })))
    for (var i = 0; i < response.data.data.length; i++) {
      const visitor = response.data.data[i];
      yield loadStaffsHandlingVisitor({ visitorId: visitor.id })
      yield loadChatHistory({ lastMsgId: null, visitor, repeat: true })
    }
  }
}

function* loadStaffsHandlingVisitor({ visitorId }) {
  const [success, response] = yield get(
    `/visitors/${visitorId}/subscribed_staffs`,
    response => response,
    e => response
  )

  if (success) {
    yield put(setStaffsHandlingVisitor(visitorId, response.data.data))
  }
}

// Individual exports for testing
export default function* staffMainSaga() {
  yield takeLatest(REGISTER_STAFF, registerStaff);
  yield takeLatest(REFRESH_AUTH_TOKEN, refreshAuthToken);
  yield takeEvery(LOAD_CHAT_HISTORY, loadChatHistory);
  yield takeLatest(LOAD_ALL_VOLUNTEERS, loadAllVolunteers);
  yield takeLatest(LOAD_ALL_SUPERVISORS, loadAllSupervisors);
  yield takeLatest(LOG_OUT, logOut);
  yield takeLatest(LOAD_ALL_VISITORS, loadAllVisitors);
  yield takeLatest(SET_LAST_SEEN_MESSAGE_ID, setLastSeenMessageId);
  yield takeLatest(LOAD_BOOKMARKED_CHATS, loadBookmarkedVisitors);
  yield takeLatest(SET_VISITOR_BOOKMARK, setVisitorBookmark);
  yield takeLatest(LOAD_LAST_UNREAD, loadLastUnread);
  yield takeLatest(LOAD_MESSAGES_BEFORE_FOR_SUPERVISOR_PANEL, loadChatBack);
  yield takeLatest(LOAD_MESSAGES_AFTER_FOR_SUPERVISOR_PANEL, loadChatForward);
  yield takeLatest(SUBMIT_SETTINGS, submitSettings);
  yield takeLatest(UPDATE_USER, updateUser);
  yield takeLatest(LOAD_UNREAD_CHATS, loadUnreadChats);
  yield takeLatest(LOAD_MOST_RECENT_FOR_SUPERVISOR_PANEL, loadMostRecentForSupervisorPanel);
  yield takeLatest(LOAD_UNHANDLED, loadUnhandledChats);
  yield takeLatest(LOAD_FLAGGED_CHATS, loadFlaggedChats);
  yield takeLatest(LOAD_STAFFS_HANDLING_VISITOR, loadStaffsHandlingVisitor);
  yield takeLatest(LOAD_ALL_UNHANDLED_CHATS, loadAllUnhandledChats);
  yield takeLatest(LOAD_MY_HANDLED_CHATS, loadMyHandledChats);
}
