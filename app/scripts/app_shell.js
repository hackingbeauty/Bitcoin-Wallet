/*
 * module_template.js
 * Template for browser feature modules
 *
 * Michael S. Mikowski - mike.mikowski@gmail.com
 * Copyright (c) 2011-2012 Manning Publications Co.
*/

/*jslint         browser    : true, continue : true,
  devel  : true, indent     : 2,    maxerr   : 50,
  newcap : true, nomen      : true, plusplus : true,
  regexp : true, sloppy     : true, vars     : false,
  white  : true, camelcase  : false
*/

/*global $, app, Handlebars, unescape */

app.shell = (function () {
  'use strict';

  //---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    configMap = {
      main_html: Handlebars.compile($('#app-shell-template').html())
    },
    stateMap  = { $container : null },
    jqueryMap = {},

    parseRoute,
    closeModalsOnClick,
    showOrHideLoginView,

    setJqueryMap,
    configModule,
    initModule;
  //----------------- END MODULE SCOPE VARIABLES ---------------

  //------------------- BEGIN UTILITY METHODS ------------------
  // example : getTrimmedString
  //-------------------- END UTILITY METHODS -------------------

  //--------------------- BEGIN DOM METHODS --------------------
  // Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var $container = stateMap.$container;

    jqueryMap = {
      $container        : $container,
      $shell            : $container.find('#app-shell'),
      $shellBody        : $container.find('#app-shell-body'),
      $headerContainer  : $('#app-header-container'),
      $sideBar          : $('#app-sidebar-container')
    };
  };
  // End DOM method /setJqueryMap/
  //---------------------- END DOM METHODS ---------------------

  //------------------- BEGIN EVENT HANDLERS -------------------

  closeModalsOnClick = function(){
    $('html').on('click',function( ){
      $.gevent.publish( 'app-close-modals', [ ] );
    });
  };

  parseRoute = function(){
    var routeHash = window.location.hash.substr(2);

    if(app.model.user.is_authenticated()){
      if( /sendMoney/.test( routeHash )){
        jqueryMap.$shellBody.empty();
        app.send_money.initModule( jqueryMap.$shellBody );
      } else if ( /currencyPad/.test( routeHash )){
        jqueryMap.$shellBody.empty();
        app.currency_pad.initModule( jqueryMap.$shellBody );
      } else if( /accountBalance/.test( routeHash )){
        jqueryMap.$shellBody.empty();
        app.account_balance.initModule( jqueryMap.$shellBody );
      } else if( /transactionHistory/.test( routeHash ) ){
        jqueryMap.$shellBody.empty();
        app.transaction_history.initModule( jqueryMap.$shellBody );
      } else {
        jqueryMap.$shellBody.empty();
        app.currency_pad.initModule( jqueryMap.$shellBody );
        // app.account_balance.initModule( jqueryMap.$shellBody );
      }
    } else {
      // Do something here if user not authenticated
    }
  };

  showOrHideLoginView = function(event, authStatus){
    if(authStatus === 'signed-out'){
      jqueryMap.$shellBody.empty();
      app.homepage_view.initModule( jqueryMap.$shellBody )
    } else {
      parseRoute();
      // $.uriAnchor.setAnchor( { currencyPad: 'opened' } );
    }
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
  initModule = function ( $container ) {
    var dataMode;
    dataMode = window.location.host === 'localhost:9000' ? 'dev' : 'prod';
    app.config.setDataMode( dataMode );
    console.log('----------- Data Mode = ' + app.config.getDataMode() + ' -----------');
    
    stateMap.$container = $container;
    $container.html(  configMap.main_html() );
    setJqueryMap();

    $.gevent.subscribe( jqueryMap.$container, 'app-authentication-status',    showOrHideLoginView );

    // parseRoute(); // must do first time

    app.header.initModule( jqueryMap.$headerContainer );
    app.sidebar.initModule( jqueryMap.$sideBar );

    closeModalsOnClick();

    $(window)
      .bind( 'hashchange', parseRoute );
    
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
