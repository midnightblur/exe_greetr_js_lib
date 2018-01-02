// Use IIFE to safely isolate the code
;(function(global, $) {
    var Greetr = function(firstname, lastname, language) {
        return new Greetr.init(firstname, lastname, language);
    };

    // Setup private properties and methods to use inside the lib
    var supportedLangs = ["en", "es"];

    var greetings = {
        en: "Hello",
        es: "Hola"
    };

    var formalGreetings = {
        en: "Greetings",
        es: "Saludos"
    };

    var logMessages = {
        en: "Logged in",
        es: "Inició sesión:"
    }

    // Put methods inside prototype to save memory space
    Greetr.prototype = {
        fullName: function() {
            return this.firstname + " " + this.lastname;
        },

        isValidLanguage: function(newLang) {
            return (supportedLangs.indexOf(newLang) !== -1);
        },

        greeting: function() {
            return greetings[this.language] + " " + this.firstname + "!";
        },

        formalGreeting: function() {
            return formalGreetings[this.language] + " " + this.fullName();
        },

        greet: function(formal) {
            var msg;

            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }

            if (console) {
                console.log(msg);
            }

            return this; // Make method chainable
        },

        log: function() {
            if (console) {
                console.log(logMessages[this.language] + ": " + this.fullName());
            }

            return this;
        },

        setLang: function(newLang) {
            if (this.isValidLanguage(newLang)) {
                this.language = newLang;
            }
            
            return this;
        },

        HTMLGreeting: function(selector, formal) {
            if (!$) {
                throw "JQuery not loaded";
            }

            if (!selector) {
                throw "Missing jQuery selector";
            }

            var msg;
            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }

            $(selector).html(msg);

            return this;
        }
    };

    // The actual function constructor to create objects to be used outside the lib
    Greetr.init = function(firstname, lastname, language) {
        var self = this;

        // Set default values if there're missing
        self.firstname = firstname || "Default FirstName";
        self.lastname = lastname || "Default LastName";
        self.language = language || "en";
    };

    // Any object created will point to Greetr prototype
    Greetr.init.prototype = Greetr.prototype;

    // Expose 2 objects to use the lib
    global.Greetr = global.G$ = Greetr;
}(window, jQuery));