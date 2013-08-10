describe('js-coffee: ', function() {

    var BORSCHIK = require('borschik');
    var FS = require('fs');
    var PATH = require('path');
    var ASSERT = require('assert');

    function readFile(path) {
        return FS.readFileSync(PATH.resolve(__dirname, path));
    }

    function testJS(dir, inPath, outPath, okPath) {
        inPath = PATH.resolve(PATH.join(__dirname, dir, inPath));
        outPath = PATH.resolve(PATH.join(__dirname, dir, outPath));
        okPath = PATH.resolve(PATH.join(__dirname, dir, okPath));

        it('UglifyJS yes', function(done) {
            return BORSCHIK
                .api({ tech: './index.js', input: inPath, output: outPath, minimize: true })
                .then(function() {
                    ASSERT.equal(readFile(outPath).toString(), readFile(okPath).toString());
                    done()
                }, function(e) {
                    done(e)
                })
                .fail(function(e) {
                    done(e);
                });


        });

        afterEach(function() {
            FS.unlinkSync(outPath);
        });
    }

    testJS('files', 'test.coffee', '_test.js', 'ok_jscoffee.js');

});
