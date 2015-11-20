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
                  if(Array.isArray(objReturn[p])){
                      if(params.source[p] !== undefined){
                          if(params.source[p].length >= 1){
                              for(var indice in params.source[p]){
                                  if ((objReturn[p][0] !== undefined) && (objReturn[p][0] !== null) && ( objReturn[p][0].constructor === Object )) {
                                      objReturn[p][indice] = this.mergeRecursive({"default": params.default[p][0], "source": params.source[p][indice]});
                                  } else {
                                      if(params.source[p][indice] !== undefined){
                                          objReturn[p][indice] = params.source[p][indice];
                                      }
                                  }
                              }
                          }else{
                              objReturn[p] = [];
                          }
                      }else{
                          for(var indice in params.source[p]){
                              if ((objReturn[p][0] !== undefined) && (objReturn[p][0] !== null) && ( objReturn[p][0].constructor === Object )) {
                                  objReturn[p][indice] = this.mergeRecursive({"default": params.default[p][0], "source": params.source[p][indice]});
                              } else {
                                  if(params.source[p][indice] !== undefined){
                                      objReturn[p][indice] = params.source[p][indice];
                                  }
                              }
                          }
                      }
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

              //check if sources attrib in more
              for (var p in params.source) {
                  if(!objReturn.hasOwnProperty(p)){
                      objReturn[p] = params.source[p];
                  }
              }

            return objReturn;
        },
        /**
        * @param {Object}
        * @returns {Object}
        */
        clone: function(obj) {
            if (obj === null || typeof obj !== 'object') {
                return obj;
            }

            var temp = obj.constructor(); // give temp the original obj's constructor
            for (var key in obj) {
                temp[key] = this.clone(obj[key]);
            }

            return temp;
        }
    };
})(this);