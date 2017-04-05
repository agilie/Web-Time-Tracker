;(function($){
    var defaultSetting = {
        format: 'H:i:s',
        countdown: false,
        passed: 0,
        passedStop: -1,
        timestart: 0,
        timestop: 0,
        delayInterval: 1000,
        stop: null
    };
    var setting;
    var idTimeout = null;
    var thisTimeTracker = null;

    function methodInit(options) {
        
        thisTimeTracker = this;
        setting = $.extend({}, defaultSetting, options);
        if (setting.timestop) {
            setting.passedStop = setting.timestop * 1000;
        }
        if (setting.countdown && setting.passedStop === 0) {
            setting.countdown = false;
        }
        if (setting.passed !== 0) {
            setting.passed = setting.passed * 1000;
        }
        methods.display.apply();
        methods.stop.apply();
    }

    function methodStart() {
        
        setting.timestart = Date.now(); // time start
        idTimeout = setTimeout(methods.make, setting.delayInterval);
    }

    function methodStop() {
        
        if (idTimeout) {
            clearTimeout(idTimeout);
        }
    }

    function methodMake() {
        
        var now = Date.now();
        setting.passed += now - setting.timestart;
        setting.timestart = now;
        methods.display.apply();
        if (setting.passed <= setting.passedStop || setting.passedStop < 0) {
            idTimeout = setTimeout(methods.make, setting.delayInterval);
        } else {
            setting.passed = setting.passedStop;
            if (setting.stop) {
                setting.stop.apply();
            }
        }
    }

    function methodDisplay() {
        
        var hour = 0, min = 0, sec = 0;
        var text = setting.format;
        var passed = setting.passed;
        var fnRound = Math.floor;
        if (setting.countdown) {
            passed = setting.passedStop - passed;
            fnRound = Math.ceil;
        }
        sec = fnRound(passed / 1000) % 60;
        min =  Math.floor(passed / (60 * 1000)) % 60;
        hour =  Math.floor(passed / (60 * 60 * 1000));

        min = min < 10 ? '0' + min : min;
        sec = sec < 10 ? '0' + sec : sec;
        hour = hour < 10 ? '0' + hour : hour;
        text = text.replace('H', hour).replace('i', min).replace('s', sec);
        thisTimeTracker.text(text);
    }

    function methodReset() {
        
        setting.passed = 0;
        if (setting.timestop) {
            setting.passedStop = setting.timestop * 1000;
        }
        if (setting.countdown && setting.passedStop === 0) {
            setting.countdown = false;
        }
        methods.display.apply();
    }

    var methods = {
        init: methodInit,
        start: methodStart,
        stop: methodStop,
        make: methodMake,
        display: methodDisplay,
        reset: methodReset
    };

    $.fn.timetracker = function(method){
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply( this, arguments );
        } else {
            $.error(method + ' don\'t exists');
        }
    };
})(jQuery);