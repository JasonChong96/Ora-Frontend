/*
 *
 * StaffMain actions
 *
 */

import {
  ADD_ACTIVE_CHAT,
  ADD_MESSAGE_FROM_UNCLAIMED_CHAT,
  ADD_UNCLAIMED_CHAT,
  DEFAULT_ACTION,
  REFRESH_AUTH_TOKEN,
  REGISTER_STAFF,
  REMOVE_ACTIVE_CHAT,
  REMOVE_UNCLAIMED_CHAT,
  RESET,
  SET_UNCLAIMED_CHATS,
  ADD_MESSAGE_HISTORY,
  LOAD_VOLUNTEERS,
  LOAD_ALL_VOLUNTEERS,
  LOAD_SUPERVISORS,
  LOAD_ALL_SUPERVISORS,
  REMOVE_UNCLAIMED_CHAT_BY_VISITOR_ID,
  ADD_MESSAGE_FROM_ACTIVE_CHAT,
  REGISTER_STAFF_SUCCESS,
  ADD_MESSAGE_FROM_UNCLAIMED_CHAT_BY_VISITOR_ID,
  ADD_MESSAGE_FROM_ACTIVE_CHAT_BY_VISITOR_ID,
  LOAD_CHAT_HISTORY,
  SHOW_LOADED_MESSAGE_HISTORY,
  REGISTER_STAFF_FAILURE,
  LOG_OUT,
  SUBMIT_SETTINGS,
  CLEAR_UNREAD_COUNT,
  INCREMENT_UNREAD_COUNT,
  SET_ONLINE_USERS,
  REMOVE_ONLINE_USER,
  ADD_ONLINE_USER,
  ADD_TO_ALL_VISITORS,
  SET_MESSAGES_FOR_SUPERVISOR_PANEL,
  ADD_MESSAGES_BEFORE_FOR_SUPERVISOR_PANEL,
  ADD_MESSAGES_AFTER_FOR_SUPERVISOR_PANEL,
  LOAD_ALL_VISITORS,
  LOAD_MESSAGES_AFTER_FOR_SUPERVISOR_PANEL,
  LOAD_MESSAGES_BEFORE_FOR_SUPERVISOR_PANEL,
  SET_LAST_SEEN_MESSAGE_ID,
  REMOVE_ACTIVE_CHAT_BY_ROOM_ID,
  REMOVE_VISITOR_FROM_BOOKMARKED_CHATS,
  LOAD_BOOKMARKED_CHATS,
  SET_VISITOR_BOOKMARK,
  ADD_ONLINE_VISITOR,
  SET_ONLINE_VISITORS,
  REMOVE_ONLINE_VISITOR,
  LOAD_LAST_UNREAD,
  ADD_VISITORS_TO_BOOKMARKED_CHATS,
  SHOW_MESSAGES_AFTER_FOR_SUPERVISOR_PANEL,
  SHOW_MESSAGES_BEFORE_FOR_SUPERVISOR_PANEL,
  ADD_MESSAGE_FOR_SUPERVISOR_PANEL,
  SET_VISITOR_TALKING_TO,
  SET_UNREAD_CHATS,
  LOAD_UNREAD_CHATS,
  SET_FLAGGED_CHATS,
  ADD_FLAGGED_CHAT,
  REMOVE_FLAGGED_CHAT,
  CHANGE_CHAT_PRIORITY,
  ADD_MESSAGE_FOR_STAFF_PANEL,
  SHOW_HISTORY_FOR_STAFF_PANEL,
  SET_HISTORY_FOR_STAFF_PANEL,
  SET_MESSAGES_FOR_STAFF_PANEL,
  LOAD_MOST_RECENT_FOR_SUPERVISOR_PANEL,
  SET_OFFLINE_UNCLAIMED_CHATS,
  ADD_OFFLINE_UNCLAIMED_CHAT,
  REMOVE_OFFLINE_UNCLAIMED_CHAT,
  UPDATE_USER,
  SET_VISITOR_TYPING,
  LOAD_UNHANDLED,
  LOAD_FLAGGED_CHATS,
  LOAD_STAFFS_HANDLING_VISITOR,
  SET_STAFFS_HANDLING_VISITOR,
  SET_ACTIVE_CHAT_HANDLED,
  SET_ALL_UNHANDLED_CHATS,
  ADD_TO_ALL_UNHANDLED_CHATS,
  REMOVE_FROM_ALL_UNHANDLED_CHATS,
  LOAD_ALL_UNHANDLED_CHATS,
  SET_MY_HANDLED_CHATS,
  SET_MY_UNHANDLED_CHATS,
  ADD_TO_MY_UNHANDLED_CHATS,
  ADD_TO_MY_HANDLED_CHATS,
  REMOVE_FROM_MY_UNHANDLED_CHATS,
  REMOVE_FROM_MY_HANDLED_CHATS,
  LOAD_MY_HANDLED_CHATS,
  REMOVE_FROM_ALL_VISITORS,
  SET_CHAT_UNREAD,
} from './constants';
import { REGISTER_PATIENT_FAILURE } from '../PatientRegister/constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function registerStaff(name, email, password, role) {
  return {
    type: REGISTER_STAFF,
    name,
    email,
    password,
    role,
  };
}

export function registerStaffSuccess() {
  return {
    type: REGISTER_STAFF_SUCCESS,
  };
}

export function registerStaffFailure() {
  return {
    type: REGISTER_STAFF_FAILURE,
  };
}

export function setUnclaimedChats(unclaimedChats) {
  return {
    type: SET_UNCLAIMED_CHATS,
    unclaimedChats,
  };
}

export function addActiveChat(chat) {
  return {
    type: ADD_ACTIVE_CHAT,
    chat,
  };
}

export function removeActiveChat(visitor) {
  return {
    type: REMOVE_ACTIVE_CHAT,
    visitor,
  };
}

export function removeActiveChatByRoomId(room) {
  return {
    type: REMOVE_ACTIVE_CHAT_BY_ROOM_ID,
    room,
  };
}

export function reset() {
  return {
    type: RESET,
  };
}

export function refreshAuthToken(isStaff) {
  return {
    type: REFRESH_AUTH_TOKEN,
    isStaff,
  };
}

export function addUnclaimedChat(room) {
  return {
    type: ADD_UNCLAIMED_CHAT,
    room,
  };
}

export function setHasMoreMessages(visitorId, hasMoreMessages) {
  return {
    type: SET_HAS_MORE_MESSAGES,
    visitorId,
    hasMoreMessages,
  };
}

export function addMessageHistory(visitorId, messages) {
  return {
    type: ADD_MESSAGE_HISTORY,
    visitorId,
    messages,
  };
}

export function loadVolunteers(volunteers) {
  return {
    type: LOAD_VOLUNTEERS,
    volunteers,
  };
}

export function loadAllVolunteers() {
  return {
    type: LOAD_ALL_VOLUNTEERS,
  };
}

export function loadSupervisors(supervisors) {
  return {
    type: LOAD_SUPERVISORS,
    supervisors,
  };
}

export function loadAllSupervisors() {
  return {
    type: LOAD_ALL_SUPERVISORS,
  };
}

export function removeUnclaimedChatByVisitorId(visitorId) {
  return {
    type: REMOVE_UNCLAIMED_CHAT_BY_VISITOR_ID,
    visitorId,
  };
}

export function loadChatHistory(lastMsgId, visitor, repeat) {
  return {
    type: LOAD_CHAT_HISTORY,
    visitor,
    lastMsgId,
    repeat,
  };
}

export function showLoadedMessageHistory(visitorId) {
  return {
    type: SHOW_LOADED_MESSAGE_HISTORY,
    visitorId,
  };
}

export function staffLogOut() {
  return {
    type: LOG_OUT,
  };
}

export function submitSettings(name, email, password, id) {
  return {
    type: SUBMIT_SETTINGS,
    name,
    email,
    password,
    id,
  };
}

export function updateUser(name, role, disableFlag, id) {
  return {
    type: UPDATE_USER,
    name,
    role,
    disableFlag,
    id,
  };
}

export function clearUnreadCount(visitorId) {
  return {
    type: CLEAR_UNREAD_COUNT,
    visitorId,
  };
}

export function incrementUnreadCount(visitorId) {
  return {
    type: INCREMENT_UNREAD_COUNT,
    visitorId,
  };
}

export function addOnlineUser(user) {
  return {
    type: ADD_ONLINE_USER,
    user,
  };
}

export function removeOnlineUser(id) {
  return {
    type: REMOVE_ONLINE_USER,
    id,
  };
}

export function setOnlineUsers(users) {
  return {
    type: SET_ONLINE_USERS,
    users,
  };
}

export function addToAllVisitors(visitors, addToStart) {
  return {
    type: ADD_TO_ALL_VISITORS,
    visitors,
    addToStart,
  }
}

export function removeFromAllVisitors(visitorId) {
  return {
    type: REMOVE_FROM_ALL_VISITORS,
    visitorId,
  }
}

export function setMessagesForSupervisorPanel(visitorId, contents) {
  return {
    type: SET_MESSAGES_FOR_SUPERVISOR_PANEL,
    visitorId,
    contents,
  }
}

export function addMessagesBeforeForSupervisorPanel(visitorId, contents) {
  return {
    type: ADD_MESSAGES_BEFORE_FOR_SUPERVISOR_PANEL,
    visitorId,
    contents,
  }
}


export function loadMessagesBeforeForSupervisorPanel(visitor, firstMessageId) {
  return {
    type: LOAD_MESSAGES_BEFORE_FOR_SUPERVISOR_PANEL,
    firstMessageId,
    visitor,
  }
}

export function addMessagesAfterForSupervisorPanel(visitorId, contents) {
  return {
    type: ADD_MESSAGES_AFTER_FOR_SUPERVISOR_PANEL,
    visitorId,
    contents,
  }
}

export function loadMessagesAfterForSupervisorPanel(visitor, lastMessageId) {
  return {
    type: LOAD_MESSAGES_AFTER_FOR_SUPERVISOR_PANEL,
    lastMessageId,
    visitor,
  }
}

export function loadAllVisitors(lastVisitorId) {
  return {
    type: LOAD_ALL_VISITORS,
    lastVisitorId,
  }
}

export function setLastSeenMessageId(visitorId, messageId, noReload) {
  return {
    type: SET_LAST_SEEN_MESSAGE_ID,
    visitorId,
    messageId,
    noReload,
  }
}

export function addVisitorsToBookmarkedChats(visitors) {
  return {
    type: ADD_VISITORS_TO_BOOKMARKED_CHATS,
    visitors,
  }
}


export function removeVisitorFromBookmarkedChats(visitorId) {
  return {
    type: REMOVE_VISITOR_FROM_BOOKMARKED_CHATS,
    visitorId,
  }
}

export function loadBookmarkedChats(lastVisitorId) {
  return {
    type: LOAD_BOOKMARKED_CHATS,
    lastVisitorId,
  }
}

export function setVisitorBookmark(visitor, isBookmarked) {
  return {
    type: SET_VISITOR_BOOKMARK,
    visitor,
    isBookmarked,
  }
}

export function addOnlineVisitor(visitor) {
  return {
    type: ADD_ONLINE_VISITOR,
    visitor,
  }
}

export function setOnlineVisitors(visitors) {
  return {
    type: SET_ONLINE_VISITORS,
    visitors,
  }
}

export function removeOnlineVisitor(visitorId) {
  return {
    type: REMOVE_ONLINE_VISITOR,
    visitorId,
  }
}

export function loadLastUnread(visitor) {
  return {
    type: LOAD_LAST_UNREAD,
    visitor,
  }
}

export function showMessagesAfterForSupervisorPanel(visitorId) {
  return {
    type: SHOW_MESSAGES_AFTER_FOR_SUPERVISOR_PANEL,
    visitorId,
  }
}

export function showMessagesBeforeForSupervisorPanel(visitorId) {
  return {
    type: SHOW_MESSAGES_BEFORE_FOR_SUPERVISOR_PANEL,
    visitorId,
  }
}

export function addMessageForSupervisorPanel(visitorId, content) {
  return {
    type: ADD_MESSAGE_FOR_SUPERVISOR_PANEL,
    visitorId,
    content,
  }
}

export function setVisitorTalkingTo(visitorId, user) {
  return {
    type: SET_VISITOR_TALKING_TO,
    visitorId,
    user,
  }
}

export function setUnreadChats(visitors) {
  return {
    type: SET_UNREAD_CHATS,
    visitors,
  }
}

export function loadUnreadChats() {
  return {
    type: LOAD_UNREAD_CHATS,
  }
}

export function setFlaggedChats(chats) {
  return {
    type: SET_FLAGGED_CHATS,
    chats,
  }
}

export function addFlaggedChat(chat) {
  return {
    type: ADD_FLAGGED_CHAT,
    chat,
  }
}

export function removeFlaggedChat(visitorId) {
  return {
    type: REMOVE_FLAGGED_CHAT,
    visitorId,
  }
}

export function changeChatPriority(visitorId, priority) {
  return {
    type: CHANGE_CHAT_PRIORITY,
    visitorId,
    priority,
  }
}

export function addMessageForStaffPanel(visitorId, content) {
  return {
    type: ADD_MESSAGE_FOR_STAFF_PANEL,
    visitorId,
    content,
  }
}

export function setMessagesForStaffPanel(visitorId, contents) {
  return {
    type: SET_MESSAGES_FOR_STAFF_PANEL,
    visitorId,
    contents,
  }
}

export function setHistoryForStaffPanel(visitorId, history) {
  return {
    type: SET_HISTORY_FOR_STAFF_PANEL,
    visitorId,
    history,
  }
}

export function showHistoryForStaffPanel(visitorId) {
  return {
    type: SHOW_HISTORY_FOR_STAFF_PANEL,
    visitorId,
  }
}

export function loadMostRecentForSupervisorPanel(visitor, shouldSetLastSeen) {
  return {
    type: LOAD_MOST_RECENT_FOR_SUPERVISOR_PANEL,
    visitor,
    shouldSetLastSeen,
  }
}

export function setOfflineUnclaimedChats(chats) {
  return {
    type: SET_OFFLINE_UNCLAIMED_CHATS,
    chats
  }
}

export function addOfflineUnclaimedChat(chat) {
  return {
    type: ADD_OFFLINE_UNCLAIMED_CHAT,
    chat,
  }
}

export function removeOfflineUnclaimedChat(visitorId) {
  return {
    type: REMOVE_OFFLINE_UNCLAIMED_CHAT,
    visitorId,
  }
}

export function setVisitorTypingStatus(visitorId, time) {
  return {
    type: SET_VISITOR_TYPING,
    visitorId,
    time,
  }
}

export function loadUnhandled() {
  return {
    type: LOAD_UNHANDLED,
  }
}

export function loadFlaggedChats() {
  return {
    type: LOAD_FLAGGED_CHATS,
  }
}

export function loadStaffsHandlingVisitor(visitorId) {
  return {
    type: LOAD_STAFFS_HANDLING_VISITOR,
    visitorId,
  }
}

export function setStaffsHandlingVisitor(visitorId, staffs) {
  return {
    type: SET_STAFFS_HANDLING_VISITOR,
    visitorId,
    staffs,
  }
}

export function setActiveChatUnhandledTime(visitorId, unhandledTime) {
  return {
    type: SET_ACTIVE_CHAT_HANDLED,
    visitorId,
    unhandledTime,
  }
}

export function setAllUnhandledChats(chats) {
  return {
    type: SET_ALL_UNHANDLED_CHATS,
    chats,
  }
}

export function addToAllUnhandledChats(chat) {
  return {
    type: ADD_TO_ALL_UNHANDLED_CHATS,
    chat,
  }
}

export function removeFromAllUnhandledChats(visitorId) {
  return {
    type: REMOVE_FROM_ALL_UNHANDLED_CHATS,
    visitorId,
  }
}

export function loadAllUnhandledChats() {
  return {
    type: LOAD_ALL_UNHANDLED_CHATS,
  }
}

export function setMyUnhandledChats(chats) {
  return {
    type: SET_MY_UNHANDLED_CHATS,
    chats,
  }
}

export function setMyHandledChats(chats) {
  return {
    type: SET_MY_HANDLED_CHATS,
    chats,
  }
}

export function addToMyUnhandledChats(chat) {
  return {
    type: ADD_TO_MY_UNHANDLED_CHATS,
    chat,
  }
}

export function addToMyHandledChats(chat) {
  return {
    type: ADD_TO_MY_HANDLED_CHATS,
    chat,
  }
}

export function removeFromMyUnhandledChats(visitorId) {
  return {
    type: REMOVE_FROM_MY_UNHANDLED_CHATS,
    visitorId,
  }
}

export function removeFromMyHandledChats(visitorId) {
  return {
    type: REMOVE_FROM_MY_HANDLED_CHATS,
    visitorId,
  }
}

export function loadMyHandledChats() {
  return {
    type: LOAD_MY_HANDLED_CHATS,
  }
}

export function setChatUnread(visitorId, isUnread) {
  return {
    type: SET_CHAT_UNREAD,
    visitorId,
    isUnread,
  }
}