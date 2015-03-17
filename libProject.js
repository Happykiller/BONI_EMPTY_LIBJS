//# sourceURL=libProject.js
//Library of tools for the exemple

/**
 * @author FRO
 * @date 19/01/2015
 */

(function () {
    'use strict';

    var
        _input = input,
        _output = output
    ;
    
    ////////////////////////// PRIVATE METHODS ////////////////////////

    /**
     * @name _init
     * @desc Initialize
     */
    function _init() {
        $.ajax({
            type : "Get",
            url :_input.rest+"datas.json",
            data : null,
            dataType :"jsonp",
            jsonp: false,
            jsonpCallback: "myJsonMethod",
            success : function(data){
                _datas = data; 
                $.functionsApp.init();
            },
            error : function(httpReq,status,exception){
                var err = status + ", " + exception;
                console.log( "Request Failed: " + err );
            }
        });
    }

    ////////////////////////// PUBLIC METHODS /////////////////////////

    $.functionsApp = {
        init : function () {
            try {
                $('#content').html('Hello World');
            } catch (er) {
                console.log(0, "ERROR - init :" + er.message);
            }
        }
    };

    // Initialize
    _init();

})();