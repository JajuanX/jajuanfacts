import angular from 'angular'

(function() {
  'use strict';

  angular.module('app', []).component('facts', {
      template: require('./app.html'),
      controller: FactsController,
      styleUrls: require('../style/app.css'),
  });

/** @ngInject */

function FactsController($http, $filter) {
  const $ctrl = this

  $ctrl.$onInit = function() {
    $ctrl.firstName = "Jajuan"
    $ctrl.lastName = "X"
    $ctrl.savedFacts = []
    $ctrl.key = 0
    $ctrl.newFact()
  }

  $ctrl.newFact = () => {
    console.log('running');
    $http.get('https://api.chucknorris.io/jokes/random')
      .then((data)=> {
        $ctrl.fact = data.data.value.replace(/Chuck/gi, $ctrl.firstName).replace(/Norris/gi, $ctrl.lastName).replace(/roundhouse/gi, "boot").replace(/kick/gi, "")
      })
      .catch((err) => {
        console.log(err)
      }
    )
  }

  $ctrl.saveFact = () => {
    if (($ctrl.savedFacts.length === 0)) {
     return $ctrl.savedFacts.push({ fact: $ctrl.fact, key: 0})
   } else if ($ctrl.fact !== $ctrl.savedFacts[$ctrl.savedFacts.length - 1].fact) {
        $ctrl.savedFacts.push({ fact: $ctrl.fact, key: ++$ctrl.key })
     };
    console.log($ctrl.savedFacts);
  }


}
})();

if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports === exports) {
  module.exports = 'FactsAboutMe'
}
