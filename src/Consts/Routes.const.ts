export const ROUTES = {
  LOGIN: {
    id: 'login',
    path: '/login'
  },

  REGISTER: {
    id: 'register',
    path: '/register'
  },

  HOME: {
    id: 'home',
    path: '/'
  },

  NEW_PROFILE: {
    id: 'new-profile',
    path: '/new-profile'
  },

  EDIT_PROFILE: {
    id: 'edit-profile',
    path: '/edit-profile'
  },

  MESSAGES: {
    id: 'messages',
    path: '/messages'
  },

  PROFILE: {
    id: 'profile',
    path: '/profile/:uri'
  },

  GROUP: {
    id: 'group',
    path: '/group/:uri'
  },

  PROFILE_FEED: {
    id: 'profile-feed',
    path: '/profile/:uri/feed'
  },

  PROFILE_CONNECTIONS: {
    id: 'profile-connections',
    path: '/profile/:uri/connections'
  },

  PROFILE_GROUPS: {
    id: 'profile-groups',
    path: '/profile/:uri/groups'
  },

  SUGGESTIONS_PROFILE: {
    id: 'suggestions-profiles',
    path: '/suggestions/profiles'
  },

  SUGGESTIONS_GROUPS: {
    id: 'suggestions-groups',
    path: '/suggestions/groups'
  }
}
