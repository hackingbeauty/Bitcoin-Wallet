/*
 * app_currency_pad.js
 * Currency Pad feature module
*/

/*jslint         browser    : true, continue : true,
  devel  : true, indent     : 2,    maxerr   : 50,
  newcap : true, nomen      : true, plusplus : true,
  regexp : true, sloppy     : true, vars     : false,
  white  : true, camelcase  : false
*/

/*global $, app, Handlebars */

app.currency_pad = (function () {
  'use strict';
  
  //---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    configMap = {
      main_html: Handlebars.compile($('#app-currency-pad-template').html())
    },
    stateMap  = { $container : null },
    jqueryMap = {},

    onNumberTap,
    onSendMoney,

    setJqueryMap, configModule, initModule;
  //----------------- END MODULE SCOPE VARIABLES ---------------

  //------------------- BEGIN UTILITY METHODS ------------------
  // example : getTrimmedString
  //-------------------- END UTILITY METHODS -------------------

  //--------------------- BEGIN DOM METHODS --------------------
  // Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var $container = stateMap.$append_target.find('#app-currency-pad');
    jqueryMap = { 
      $container    : $container,
      $numberGrid   : $container.find('#app-number-grid'),
      $amount       : $container.find('#app-currency-amount'),
      $clearBtn     : $container.find('#app-clear-btn'),
      $backSpaceBtn : $container.find('#app-backspace-btn'),
      $sendMoneyBtn : $container.find('.app-send-money-btn'),
      $amountDigits : $container.find('#app-currency-amount-digits')
    };
  };
  // End DOM method /setJqueryMap/
  //---------------------- END DOM METHODS ---------------------

  //------------------- BEGIN EVENT HANDLERS -------------------
  onNumberTap = function(){
    var 
      number, 
      totalAmt = '', 
      $btn,
      currencyVal,
      rawVal,
      newCurrencyVal;

    jqueryMap.$numberGrid.on('tap', 'li', function(){
      $btn = $(this);
      switch($btn.attr('id')){
        case jqueryMap.$clearBtn.attr('id'):
          jqueryMap.$amountDigits.html('0.00');
          totalAmt = '';
          break;
        case jqueryMap.$backSpaceBtn.attr('id'):
          currencyVal = parseInt(jqueryMap.$amountDigits.html(),10)
          rawVal = parseInt(jqueryMap.$amountDigits.html(),10).toString(); //Remove .00 and convert to string
          newCurrencyVal = rawVal.substr(0, rawVal.length-1);
          totalAmt = newCurrencyVal;
          if(!isNaN( newCurrencyVal )&& newCurrencyVal.split('').length > 0){ // If it's a number
            jqueryMap.$amountDigits.html(newCurrencyVal + '.00');
          } else {
            jqueryMap.$amountDigits.html('0.00');
          }
          break;
        default:
          number = $btn.html();
          totalAmt = totalAmt + number;
          jqueryMap.$amountDigits.html(totalAmt + '.00');
          break;
      }
    });
  };

  onSendMoney = function(){
    var amountToSend;
    jqueryMap.$sendMoneyBtn.on('tap', function(){
      amountToSend = parseInt(jqueryMap.$amountDigits.html());
      if(amountToSend > 0){
        app.model.money.set_amount_to_send( amountToSend );
        $.uriAnchor.setAnchor( { sendMoney: 'opened' } );
      } else {

      }
    });
  };
  //-------------------- END EVENT HANDLERS --------------------

  //------------------- BEGIN PUBLIC METHODS -------------------
  // Begin public method /configModule/
  // Purpose    : Adjust configuration of allowed keys
  // Arguments  : A map of settable keys and values
  //   * color_name - color to use
  // Settings   :
  //   * configMap.settable_map declares allowed keys
  // Returns    : true
  // Throws     : none
  //
  configModule = function ( input_map ) {
    app.butil.setConfigMap({
      input_map    : input_map,
      settable_map : configMap.settable_map,
      config_map   : configMap
    });
    return true;
  };
  // End public method /configModule/

  // Begin public method /initModule/
  // Purpose    : Initializes module
  // Arguments  :
  //  * $container the jquery element used by this feature
  // Returns    : true
  // Throws     : none
  //
  initModule = function ( $append_target ) {
    stateMap.$append_target = $append_target;
    $append_target.append( configMap.main_html );
    setJqueryMap();
    onNumberTap();
    onSendMoney();
    return true;
  };
  // End public method /initModule/

  // return public methods
  return {
    configModule : configModule,
    initModule   : initModule
  };
  //------------------- END PUBLIC METHODS ---------------------
}());
