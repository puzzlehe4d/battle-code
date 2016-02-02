var db = require('../helpers/dbConfig');
var Challenge = require('./challengeModel.js');
var User = require('../users/userModel.js');
var Solution = require('../solutions/solutionModel.js');
var _ = require('lodash');

module.exports = {
  // GET /api/challenges
  getChallenge: function (req, res) {
    Challenge.fetchAll()
    .then(function (challenges) {
      var i = Math.floor(Math.random() * challenges.size());
      res.status(200).json(challenges.at(i));
    }).catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  },

  // NOT an HTTP route, will be called by sockets
  getChallengeMultiplayer: function (req, callback) {
    //req has to have type
    var p1 = req.body.player1_github_handle;
    var p2 = req.body.player2_github_handle;
    var type = req.body.type;
    var completedChallenges = {
      p1: [],
      p2: []
    };
    var completed = [];
    var total = [];

    // Get list of challenges completed by player1
    User.forge({
      github_handle: p1
    }).fetch({withRelated: ['solutions']})
    .then(function (user) {
      completedChallenges.p1 = user.related('solutions').filter(function(s){
        if(s.type === type) {
          return true;
        }
      });
      completedChallenges.p1 = completedChallenges.p1.map(function (s) {
        return s.get('challenge_id');
      });
    // Get list of challenges completed by player2
      return User.forge({
        github_handle: p2
      }).fetch({withRelated: ['solutions']})
    })
    .then(function (user) {
      completedChallenges.p2 = user.related('solutions').filter(function(s){
        if(s.type === type) {
          return true;
        }
      });
      completedChallenges.p2 = completedChallenges.p2.map(function (s) {
        return s.get('challenge_id');
      });
    // Get list of all challenges
      return Challenge.forge({type: type}).fetchAll();
    })
    .then(function (challenges) {
      // return a challenge neither player has seen
      completed = _.union(completedChallenges.p1, completedChallenges.p2);
      total = challenges.map(function (c) {
        return c.get('id');
      })
      var available = _.difference(total, completed);
      // if no challenges are available
      if (available.length === 0) {
        return null;
      }
      // otherwise continue to fetch challenge
      else {
        var challenge = _.sample(available);
        return challenge;
      }
    })
    .then(function (id) {
      if (id === null) {
        return null;
      }
      return Challenge.forge({id: id, type:'battle'}).fetch()
    })
    .then(function (challenge) {
      if (challenge !== null) {
        var attrs = {
          id: challenge.get('id'),
          name: challenge.get('name'),
          prompt: challenge.get('prompt')
        };
        if (callback) {
          callback(attrs);
        }
      } else {
        if (callback) {
          callback(null);
        }
      }
    });
  },

  // GET /api/challenges/:challengeId
  getChallengeById: function (req, res) {
    var challengeId = req.params.challengeId;
    Challenge.forge({
      id: challengeId
    })
    .fetch()
    .then(function (challenge) {
      if (challenge) {
        res.status(200).json(challenge);
      } else {
        res.status(404).json(null);
      }
    }).catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  },
  // POST /api/challenges
  addChallenge: function (req, res) {
    var challengeAttr = {
      name: req.body.name,
      prompt: req.body.prompt,
      test_suite: req.body.test_suite,
      type: req.body.type
    };
    console.log(challengeAttr);

    Challenge.forge(challengeAttr).save()
    .then(function (challenge) {
      res.status(201).json(challenge);
    }).catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  },

  resetWithData: function () {
    return Challenge.forge({
      name: "Test function one",
      prompt: "Write a function one() that returns the value 1.\n\nExample usage: \none(1); \/\/ => 1\none(2); \/\/ => 1",
      test_suite: "assert.equal(one(1),1);\nassert.equal(one(2),1);",
      type:'battle'
    }).save()
    .then(function () {
      return Challenge.forge({
        name: "Test function two",
        prompt: "Write a function two() that returns the value 2.\n\nExample usage: \ntwo(1); \/\/ => 2\ntwo(2); \/\/ => 2",
        test_suite: "assert.equal(two(1),2);\nassert.equal(two(2),2);",
        type:'battle'
      }).save();
    })
    .then(function () {
      return Challenge.forge({
        name: "Test function three",
        prompt: "Write a function three() that returns the value 3.\n\nExample usage: \nthree(1); \/\/ => 3\nthree(2); \/\/ => 3",
        test_suite: "assert.equal(three(1),3);\nassert.equal(three(2),3);",
        type:'battle'
      }).save();
    })
    .then(function () {
      return Challenge.forge({
        name: "Test function four",
        prompt: "Write a function four() that returns the value 4.\n\nExample usage: \nfour(1); \/\/ => 4\nfour(2); \/\/ => 4",
        test_suite: "assert.equal(four(1),4);\nassert.equal(four(2),4);",
        type:'battle'
      }).save();
    })
    .then(function() {
      return Challenge.forge({
        name: "nth Fibonacci",
        prompt: "A Fibonacci sequence is a list of numbers that begins with 0 and 1, and each subsequent number is the sum of the previous two.\n\nFor example, the first five Fibonacci numbers are:\n\n 0 1 1 2 3\n\nIf n were 4, your function should return 3; for 5, it should return 5.\n\nWrite a function that accepts a number, n, and returns the nth Fibonacci number. Use a recursive solution to this problem; if you finish with time left over, implement an iterative solution.\n\nExample usage:\nnthFibonacci(2); \/\/ => 1\nnthFibonacci(3); \/\/ => 2\nnthFibonacci(4); \/\/ => 3\netc...",
        test_suite: "assert.equal(nthFibonacci(1), 1);\nassert.equal(nthFibonacci(2), 1);\nassert.equal(nthFibonacci(3), 2);\nassert.equal(nthFibonacci(4), 3);\nassert.equal(nthFibonacci(5), 5);\nassert.equal(nthFibonacci(10), 55);\nassert.equal(nthFibonacci(20), 6765);",
        type:'battle'
      }).save();
    })
  }
};
