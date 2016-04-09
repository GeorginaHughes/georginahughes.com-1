/**
 * Created by georginahughes on 14/09/15.
 */
angular.module('ghApp', ['ngRoute']);

angular.module('ghApp')
    .controller('GhCv', GhCv)
    .controller('GhLinks', GhLinks)
    .controller('GhHome', GhHome)
    .controller('GhContact', GhContact)
    .factory('Page', Page);

angular.module('ghApp')
    .config(['$routeProvider', ghRouteConfiguration]);