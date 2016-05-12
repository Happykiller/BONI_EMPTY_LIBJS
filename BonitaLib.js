/**
 * @use var bonitaLib = new BonitaLib();
 */

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

            //if array
            if(Array.isArray(objReturn)){
              //for each elt of target we apply the partn array
              var defaultEltArray = objReturn[0];
              objReturn = [];
              for(var index in params.source){
                  objReturn.push(this.mergeRecursive({default: defaultEltArray, source: params.source[index]}));
              }
              //if object
            }else if((objReturn !== null) && (objReturn !== undefined) && (objReturn.constructor === Object)){
              for(var key in objReturn){
                  if(params.source[key] !== undefined){
                      objReturn[key] =  this.mergeRecursive({default: objReturn[key], source: params.source[key]});
                  }
              }
            
              //check if sources attrib in more
              for (var key in params.source) {
                  if(!objReturn.hasOwnProperty(key)){
                      objReturn[key] = params.source[key];
                  }
              }
            }else if(params.source !== null){
              objReturn = params.source;
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
        },
        /**
         * @param {Object}
         * @returns {String}
         */
        formatterJsonToHtml: function(obj) {
            var strHtml = '';

            //if array
            if(Array.isArray(obj)){
                strHtml += 'Array['+obj.length+'] <ul>';
                for(var index in obj){
                    strHtml += '<li><span style="color:#9b59b6;">' + index + ':</span> ' + this.formatterJsonToHtml(obj[index]) + '</li>';
                }
                strHtml += '</ul>';
            }else if((obj !== null) && (obj !== undefined) && (obj.constructor === Object)){
                strHtml += 'Object{'+Object.keys(obj).length+'} <ul>';
                for(var key in obj){
                    strHtml += '<li><span style="color:#9b59b6;">' + key + ':</span> ' + this.formatterJsonToHtml(obj[key]) + '</li>';
                }
                strHtml += '</ul>';
            }else {
                if(obj === null){
                    strHtml = '<span style="color:#95a5a6;">'+obj+'</span>';
                }else if(typeof obj === "number"){
                    strHtml = '<span style="color:#2980b9;">'+obj+'</span>';
                }else if (typeof obj === "string") {
                    strHtml = '<span style="color:#c0392b;">"'+obj+'"</span>';
                }else{
                    strHtml = '<span style="color:#2980b9;">'+obj+'</span>';
                }
            }

            return strHtml;
        }
    };
})(this);