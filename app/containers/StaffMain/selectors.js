import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the staffMain state domain
 */

const selectStaffMainDomain = state => state.staffMain || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by StaffMain
 */

const makeSelectStaffMain = () =>
  createSelector(
    selectStaffMainDomain,
    substate => substate,
  );

const makeSelectUnclaimedChats = () =>
  createSelector(
    selectStaffMainDomain,
    substate => substate.unclaimedChats,
  );

const makeSelectAllVolunteers = () =>
  createSelector(
    selectStaffMainDomain,
    substate => substate.allVolunteers,
  );

const makeSelectAllSupervisors = () =>
  createSelector(
    selectStaffMainDomain,
    substate => substate.allSupervisors,
  );

const makeSelectActiveChats = () =>
  createSelector(
    selectStaffMainDomain,
    substate => substate.activeChats,
  );

const makeSelectRegisterStaffClearTrigger = () =>
  createSelector(
    selectStaffMainDomain,
    substate => substate.registerStaffClearTrigger,
  );

const makeSelectRegisterStaffPending = () =>
  createSelector(
    selectStaffMainDomain,
    substate => substate.registerStaffPending,
  );

const makeSelectUnreadCount = () =>
  createSelector(
    selectStaffMainDomain,
    substate => substate.unreadCount,
  );

const makeSelectAllVisitors = () =>
  createSelector(
    selectStaffMainDomain,
    substate => substate.allChats,
  );

const makeSelectOngoingChats = () =>
  createSelector(
    selectStaffMainDomain,
    substate => substate.ongoingChats,
  );

const makeSelectUnreadChats = () =>
  createSelector(
    selectStaffMainDomain,
    substate => substate.unreadChats,
  )

const makeSelectBookmarkedChats = () =>
  createSelector(
    selectStaffMainDomain,
    substate => substate.bookmarkedChats,
  )

const makeSelectSupervisorPanelChats = () =>
  createSelector(
    selectStaffMainDomain,
    substate => substate.supervisorPanelChats,
  )

const makeSelectOnlineVisitors = () =>
  createSelector(
    selectStaffMainDomain,
    substate => substate.onlineVisitors,
  )

const makeSelectFlaggedChats = () =>
  createSelector(
    selectStaffMainDomain,
    substate => substate.flaggedChats,
  )

const makeSelectStaffPanelChats = () =>
  createSelector(
    selectStaffMainDomain,
    substate => substate.staffPanelChats,
  )

const makeSelectOfflineUnclaimedChats = () =>
  createSelector(
    selectStaffMainDomain,
    substate => substate.offlineUnclaimedChats,
  )

const makeSelectVisitorTypingStatus = () =>
  createSelector(
    selectStaffMainDomain,
    substate => substate.visitorTypingStatus,
  )

const makeSelectStaffsHandlingVisitor = () =>
  createSelector(
    selectStaffMainDomain,
    substate => substate.staffsHandlingVisitor,
  )

const makeSelectAllUnhandledChats = () =>
  createSelector(
    selectStaffMainDomain,
    substate => substate.allUnhandledChats,
  )

const makeSelectMyUnhandledChats = () =>
  createSelector(
    selectStaffMainDomain,
    substate => substate.myUnhandledChats
  )

const makeSelectMyHandledChats = () =>
  createSelector(
    selectStaffMainDomain,
    substate => substate.myHandledChats
  )

const makeSelectUnreadStatus = () =>
  createSelector(
    selectStaffMainDomain,
    substate => substate.unreadStatus
  )


export default makeSelectStaffMain;
export {
  selectStaffMainDomain,
  makeSelectUnreadStatus,
  makeSelectStaffsHandlingVisitor,
  makeSelectMyUnhandledChats,
  makeSelectMyHandledChats,
  makeSelectAllUnhandledChats,
  makeSelectOfflineUnclaimedChats,
  makeSelectVisitorTypingStatus,
  makeSelectUnclaimedChats,
  makeSelectAllVolunteers,
  makeSelectFlaggedChats,
  makeSelectAllSupervisors,
  makeSelectActiveChats,
  makeSelectRegisterStaffPending,
  makeSelectRegisterStaffClearTrigger,
  makeSelectUnreadCount,
  makeSelectAllVisitors,
  makeSelectOngoingChats,
  makeSelectUnreadChats,
  makeSelectBookmarkedChats,
  makeSelectSupervisorPanelChats,
  makeSelectOnlineVisitors,
  makeSelectStaffPanelChats,
};
