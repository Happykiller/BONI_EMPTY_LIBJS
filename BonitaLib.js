(function(exports){
    "use strict";

    function BonitaLib(){

    }

    exports.BonitaLib = BonitaLib;

    BonitaLib.prototype = {
        sayHello: function(who) {
          return "Hello : " + who;
        },
          /***
           * @param {Object} params.default
           * @param {Object} params.source
           * @param {Object} params
           * @returns {Object}
           */
        mergeRecursive: function(params) {
            var objReturn = this.clone(params.default);

              for (var p in objReturn) {
                  console.log( Array.isArray(objReturn[p]) );
                  if(Array.isArray(objReturn[p])){

                  }else{
                      if ((objReturn[p] !== null) && ( objReturn[p].constructor === Object )) {
                          objReturn[p] = this.mergeRecursive({"default": objReturn[p], "source": params.source[p]});
                      } else {
                          if(params.source[p] !== undefined){
                              objReturn[p] = params.source[p];
                          }
                      }
                  }
              }
            return objReturn;
        },
        /**
        * @param {Object}
        * @returns {Object}
        */
        clone: function(obj) {
            if (null == obj || "object" != typeof obj) return obj;
            var copy = obj.constructor();
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
            }
            return copy;
        }
    };
})(this);