(function () {
  angular
    .module('taco')
    .component('leaderboardListItem', {
      templateUrl: 'js/components/leaderboard/leaderboard-list-item/leaderboard-list-item.tpl.html',
      controller: controller,
      bindings: {
        eater: '<',
        showGroupName: '<'
      }
    });

  function controller($state, firebaseService) {
    var $ctrl = this;
    
    $ctrl.goToOverview = goToOverview;
    $ctrl.getGroupName = getGroupName;

    function goToOverview() {
      var stateName = $state.current.name.includes('group') ?
        'app.groups-leaderboard-overview' :
        'app.leaderboard-overview';

      $state.go(stateName, {userId: $ctrl.eater.id});
    }

    function getGroupName() {
      var group = _.find(firebaseService.groups, ['id', $ctrl.eater.groupId]);
      return group ? group.name : '';
    }
  }
})();
