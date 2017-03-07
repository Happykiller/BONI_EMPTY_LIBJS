/**
 * @use var bonitaLib = new BonitaLib();
 */

(function(exports){
    "use strict";

    function BonitaLib(){

    }

    exports.BonitaLib = BonitaLib;

    BonitaLib.prototype = {
       /**
        * @param {string} who
        * @returns {string}
        */
        sayHello: function(who) {
          return "Hello : " + who;
        },
        /**
         * @param {string|integer} num
          * @param {integer} length
         * @returns {string}
         */
        pad: function(num, length){
          if(typeof num !== "integer"){
              num = parseInt(num);
          }
          var response = num + "";
          while (response.length < length){
            response = "0" + response;
          }
          return response;
        },
        /**
         * @param {Date} myDate
         * @param {string} format
         * @returns {string}
         */
        dateFormat: function(myDate, format){
          var yearFull = myDate.getFullYear();
          var year = myDate.getYear();
          var mounth = this.pad(myDate.getMonth() + 1, 2);
          var day = this.pad(myDate.getDate(), 2);
          var hour = this.pad(myDate.getHours(), 2);
          var minute = this.pad(myDate.getMinutes(), 2);
          var second = this.pad(myDate.getSeconds(), 2);

          var response = format.replace("yyyy", yearFull).replace("yy",year).replace("mm",mounth).replace("dd",day).replace("hh",hour).replace("mi",minute).replace("ss",second);

          return response;
        },
        /**
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
		     * @ex : var bonitaLib = new BonitaLib(); return bonitaLib.formatterJsonToHtml($data.context);
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
        },
        /**
        * @name $.Oda.Tooling.order
        * @param {Object} p_params
        * @param p_params.collection
        * @param p_params.compare with a, b
        * @desc compare must be return 1 si a before b, -1 if b before a, 0 if equal
        * @returns {$.Oda.Tooling}
        */
        order: function(p_params) {
            try {
                var clone = this.clone(p_params.collection);

                var newCollection = this.orderInter({
                    collectionOri:  clone,
                    collectionDest: [],
                    compare: p_params.compare
                });
                return newCollection;
            } catch (er) {
                console.log("order : " + er.message);
                return null;
            }
        },
        /**
         * @name $.Oda.Tooling.orderInter
         * @param {Object} p_params
         * @param p_params.collectionOri
         * @param p_params.collectionDest
         * @param p_params.compare
         * @returns {$.Oda.Tooling}
         */
        orderInter: function(p_params) {
            try {
                if(p_params.collectionOri.length > 0){
                    var min = {
                        value: null,
                        index: null
                    };

                    for(var index in p_params.collectionOri){
                        var elt = p_params.collectionOri[index];
                        if(min.value === null){
                            min.value = elt;
                            min.index = parseInt(index);
                        }else{
                            var resultCompare = p_params.compare(min.value, elt);
                            if(resultCompare === 1){
                                min.value = elt;
                                min.index = parseInt(index);
                            }
                        }
                    }

                    p_params.collectionOri.splice(min.index,1);
                    p_params.collectionDest.push(min.value);

                    return this.orderInter({
                        collectionOri:  p_params.collectionOri,
                        collectionDest: p_params.collectionDest,
                        compare: p_params.compare
                    });
                }else{
                    return p_params.collectionDest;
                }
            } catch (er) {
                console.log("orderInter : " + er.message);
                return null;
            }
        }
    };
})(this);
