/*
 * app_model_money.js
 * Money model
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/* global $, app */
app.model.money = (function () {
  'use strict';
  
  var
  	amountToSend = 0,
  	set_amount_to_send,
    get_amount_to_send;

  set_amount_to_send = function( amt ){
    amountToSend = amt;
  };

  get_amount_to_send = function(){
    return amountToSend + '.00';
  };

  return {
  	set_amount_to_send : set_amount_to_send,
    get_amount_to_send : get_amount_to_send
  };

}());
