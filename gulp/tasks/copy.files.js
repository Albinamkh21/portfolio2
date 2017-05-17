'use strict';

module.exports = function() {
    $.gulp.task('copy:files', function() {
        return $.gulp.src(['./source/**/*.*', '!./source/images/**/*.*', '!./source/js/**/*.*', '!./source/style/**/*.*', '!./source/template/**/*.*',  '!./source/spriteIcons/**/*.*']
                            , { since: $.gulp.lastRun('copy:files') })
            .pipe($.gulp.dest($.config.root + '/assets/'));
    });
};

