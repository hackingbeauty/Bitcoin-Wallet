/*
 * app_model_transaction.js
 * Transaction model
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/* global $, app */

app.model.transaction = (function () {
  'use strict';
  
  var
    doTrans;

  doTrans = function(payeePublicAddress, amount, callback){
    //localStorage....
    // get private key from localStorage
    // who you are paying
    // callback(response) //true = pass, false = fail
  };

  return {
    doTrans : doTrans
  };

}());
