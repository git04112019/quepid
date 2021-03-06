'use strict';

/*jshint latedef:false */

angular.module('QuepidApp')
  .controller('AddMemberCtrl', [
    '$scope',
    'flash',
    'teamSvc', 'userSvc',
    function (
      $scope,
      flash,
      teamSvc, userSvc
    ) {
      var ctrl = this;

      $scope.$watch('team', function() {
        ctrl.team = $scope.team;
      });

      // Functions
      ctrl.addMember    = addMember;
      ctrl.getUsers     = getUsers;
      ctrl.selectMember = selectMember;

      function selectMember($item) {
        ctrl.selectedMember = $item;
      }

      function addMember() {
        if ( angular.isDefined(ctrl.selectedMember) ) {
          teamSvc.addMember(ctrl.team, ctrl.selectedMember)
            .then(function() {
              flash.success = 'New member added';
              ctrl.selected = '';
            }, function(response) {
              flash.error = response.data.error;
            });
        } else {
          teamSvc.addMemberByEmail(ctrl.team, ctrl.selected)
            .then(function() {
              flash.success = 'New member added';
              ctrl.selected = '';
            }, function(response) {
              flash.error = response.data.error;
            });
        }
      }

      function getUsers(val) {
        return userSvc.users(val)
          .then(function(response) {
            return response.data.users;
          });
      }
    }
  ]);
