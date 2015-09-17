/**
 * Created by georginahughes on 15/09/15.
 */
function Page() {
    var title = 'Georgina Hughes',
        menuMessage = 'Menu',
        mainClass = 'home';

    return {
        getTitle: getTitle,
        setTitle: setTitle,
        getMenuMessage: getMenuMessage,
        setMenuMessage: setMenuMessage,
        getMainClass: getMainClass,
        setMainClass: setMainClass
    };

    function getTitle() {
        return title;
    }

    function setTitle(newTitle){
        title = newTitle;
    }

    function getMenuMessage(){
        return menuMessage;
    }

    function setMenuMessage(newMessage){
        menuMessage = newMessage;
    }

    function getMainClass(){
        return mainClass;
    }

    function setMainClass(newClass){
        mainClass = newClass;
    }
}