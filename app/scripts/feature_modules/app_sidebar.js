/*
 * app_sidebar.js
 * Sidebar feature module
*/

/*jslint         browser    : true, continue : true,
  devel  : true, indent     : 2,    maxerr   : 50,
  newcap : true, nomen      : true, plusplus : true,
  regexp : true, sloppy     : true, vars     : false,
  white  : true, camelcase  : false
*/

/*global $, app, Handlebars */

app.sidebar = (function () {
  'use strict';
  
  //---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    configMap = {
      main_html: Handlebars.compile($('#app-sidebar-template').html()),
      sidebar_list_html : Handlebars.compile($('#app-sidebar-list-template').html())
    },
    stateMap  = { $container : null },
    jqueryMap = {},

    onAuthStatus,
    sideBarBtnClick,

    setJqueryMap, configModule, initModule;
  //----------------- END MODULE SCOPE VARIABLES ---------------

  //------------------- BEGIN UTILITY METHODS ------------------
  // example : getTrimmedString
  //-------------------- END UTILITY METHODS -------------------

  //--------------------- BEGIN DOM METHODS --------------------
  // Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var $container = stateMap.$append_target.find('#app-sidebar');
    jqueryMap = { 
      $container        : $container,
      $sideBarList      : $container.find('#app-sidebar-list'), 
      $coreDrawerPanel  : document.getElementById('core-drawer-panel')
    };
  };
  // End DOM method /setJqueryMap/
  //---------------------- END DOM METHODS ---------------------

  //------------------- BEGIN EVENT HANDLERS -------------------
  onAuthStatus = function(evt, authStatus){
    jqueryMap.$container.empty();
    if(authStatus === 'signed-in'){
      jqueryMap.$container.append(
        configMap.sidebar_list_html({
          isSignedIn : true
        })
      );
    }
    if(authStatus === 'signed-out'){
     jqueryMap.$container.append(
        configMap.sidebar_list_html({
          isSignedIn : false
        })
      );
    }
    setJqueryMap();
    sideBarBtnClick();
  };

  sideBarBtnClick = function(){
    var provider, $btn;
    jqueryMap.$sideBarList.on('click','li', function(){
      $btn = $(this).data('link');
      switch($btn){
        case 'account-balance':
          $.uriAnchor.setAnchor( { accountBalance : 'opened'} );
          break;
        case 'send-money':
          $.uriAnchor.setAnchor( { currencyPad : 'opened'} );
          break;
        case 'sign-out':
          app.model.user.sign_out();
          $.gevent.publish( 'app-user-signed-out', [ ] );
          $.uriAnchor.setAnchor( { bye : 'forNow'} );
          break;
        case 'sign-in':
          provider = $(this).data('provider');
          app.model.user.sign_in( provider );
          break;
        default:
          break;
      }
      jqueryMap.$coreDrawerPanel.closeDrawer();
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
    $.gevent.subscribe( jqueryMap.$container, 'app-authentication-status',    onAuthStatus ); 
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
