var BorschikJS = require('borschik/lib/techs/js');

var jsCoffeeFile = BorschikJS.File.inherit({

    parseInclude: function(/** Buffer */content) {
        var COFFEE = require('coffee-script');
        var PATH = require('path');

        if (Buffer.isBuffer(content)) {
            content = content.toString('utf8');
        }

        return PATH.extname(this.path) === '.coffee'?
            this.__base(COFFEE.compile(content, { filename: this.path })) :
            this.__base.apply(this, arguments);

    }

});

var jsCoffeeTech = BorschikJS.Tech.inherit({

    File: jsCoffeeFile

});

exports.Tech = jsCoffeeTech;
exports.File = jsCoffeeFile;
