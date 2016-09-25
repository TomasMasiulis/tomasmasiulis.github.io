/**
 * INSPINIA - Responsive Admin Theme
 *
 */

/**
 * MainCtrl - controller
 */
function MainCtrl() {

    //this.userName = 'Example user';
    this.helloText = 'Welcome in drop2books';
    this.descriptionText = 'It is an application that collect all your expenses, recognizes them and sends to your accountant';

    var currentUser = getCurrentUser();
    this.userName = currentUser.get('username');

    this.total = getTotalInvoices(this);
};


angular
    .module('drop2books')
    .controller('MainCtrl', MainCtrl)