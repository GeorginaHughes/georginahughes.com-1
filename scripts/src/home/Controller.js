/**
 * Created by georginahughes on 15/09/15.
 */
function GhHome($scope, Page){
    $scope.Page = Page;

    $scope.Page.setTitle('Georgina Hughes');

    $scope.toggleMenu = toggleMenu;

    $scope.menuIsOpen = false;

    Page.setMenuMessage('Menu');
    Page.setMainClass('home');

    function toggleMenu(){
        if($scope.menuIsOpen){
            Page.setMenuMessage('Menu');
        } else {
            Page.setMenuMessage('Close');
        }

        $scope.menuIsOpen = !$scope.menuIsOpen;
    }
}