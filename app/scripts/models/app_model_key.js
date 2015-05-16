/*
 * app_model_key.js
 * Key model
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/* global $, app */

app.model.key = (function () {
  'use strict';
  
  var
    generate,
    makePoetry;

  generate = function(){
    // Figure out how to generate private/public keys
    // Generate public and private keys
    var keys = {
      'publicKey'   : 12312312312,
      'privateKey'  : 2342323423423
    } 
    return keys;
  };

  makePoetry = function(){

  };

  return {
    generate : generate  
  };

}());
