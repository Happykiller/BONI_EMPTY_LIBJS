(function(exports){
  "use strict";

  function BonitaLib(){

  }

  exports.BonitaLib = BonitaLib;

  BonitaLib.prototype = {
    sayHello: function(who) {
      return "Hello : " + who;
    }
  };
})(this);
