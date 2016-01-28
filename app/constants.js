'use strict';

module.exports = {
  //ACTION CONSTANTS
  action: {
    //NavBar
    LOGOUT: 'LOGOUT',
    NAV_LOGIN: 'NAV_LOGIN',
    NAV_PROFILE: 'NAV_PROFILE',


    //Login
    LOGIN: 'LOGIN',
    NAV_STAGING: 'NAV_STAGING',
    IS_LOGGED_IN: 'IS_LOGGED_IN',
    IS_LOGGED_OUT: 'IS_LOGGED_OUT',

    //Staging
    NAV_SOLO_ARENA: 'NAV_SOLO_ARENA',
    NAV_CHALLENGE_ARENA: 'NAV_CHALLENGE_ARENA',
    CREATE_SOCKET: 'CREATE_SOCKET',
    NAV_SOLO_STAGING: 'NAV_SOLO_STAGING',
    STORE_USER_PROBLEMS: 'STORE_USER_PROBLEMS',

    //Arena
    GET_PROBLEM: 'GET_PROBLEM',
    GET_PROBLEM_SUCCESS: 'GET_PROBLEM_SUCCESS',
    GET_PROBLEM_ERROR: 'GET_PROBLEM_ERROR',
    SUBMIT_PROBLEM: 'SUBMIT_PROBLEM',
    SUBMIT_PROBLEM_WRONG: 'SUBMIT_PROBLEM_WRONG',
    SUBMIT_PROBLEM_SUCCESS: 'SUBMIT_PROBLEM_SUCCESS',
    NAV_LEADERBOARD: 'NAV_LEADERBOARD',
    STORE_EDITOR: 'STORE_EDITOR',
    SYNTAX_ERROR: 'SYNTAX_ERROR',
    NO_SYNTAX_ERROR: 'NO_SYNTAX_ERROR',
    STORE_SOLO_PROBLEM: 'STORE_SOLO_PROBLEM',

    //Arena - Sockets
    ENTER_ROOM: 'ENTER_ROOM',
    PROBLEM_START: 'PROBLEM_START',
    EXIT_ROOM: 'EXIT_ROOM',
    OPPONENT_FINISH: 'OPPONENT_FINISH',
    OPPONENT_KEYSTROKE: 'OPPONENT_KEYSTROKE',

    //Leaderboard
    GET_LEADERBOARD: 'GET_LEADERBOARD',
    GET_LEADERBOARD_SUCCESS: 'GET_LEADERBOARD_SUCCESS',
    GET_LEADERBOARD_ERROR: 'GET_LEADERBOARD_ERROR'
  },

  //VIEW CONSTANTS
  view: {
    LOGIN: 'LOGIN',
    STAGING: 'STAGING',
    SOLO_ARENA: 'SOLO_ARENA',
    SOLO_STAGING: 'SOLO_STAGING',
    CHALLENGE_ARENA: 'CHALLENGE_ARENA',
    LEADERBOARD: 'LEADERBOARD',
    PROFILE: 'PROFILE'
  }
}
