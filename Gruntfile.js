module.exports = function(grunt) {
  grunt.initConfig({
    env: {
      release: {
        NODE_ENV: 'production'
      }
    },
    sass: {
      options: {
        sourceMapEmbed: true
      },
      dist: {
        files: {
          'dist/main.css': 'src/scss/main.scss'
        }
      }
    },
    eslint: {
      options: {
        force: true
      },
      dist: {
        src: ['src/**/*.js']
      }
    },
    run: {
      flow: {
        cmd: 'flow'
      }
    },
    browserify: {
      options: {
        browserifyOptions: {
          debug: true
        },
        transform: [
          [
            'babelify', {
              presets: [
                'es2015',
                'react'
              ]
            }
          ]
        ]
      },
      dist: {
        src: 'src/app.js',
        dest: 'build/app-browserify.js'
      }
    },
    uglify: {
      dist: {
        src: 'build/app-browserify.js',
        dest: 'dist/app.js'
      }
    },
    watch: {
      files: ['src/**/*.js'],
      tasks: ['default']
    },
    copy: {
      dist: {
        files: {
          'dist/index.html': 'src/index.html'
        }
      },
      browserify: {
        files: {
          'dist/app.js': 'build/app-browserify.js',
          'dist/a.wav': 'src/a.wav'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-force-task');
  grunt.loadNpmTasks('grunt-run');

  grunt.registerTask('check', ['force:eslint', 'run:flow']);
  grunt.registerTask('build', ['browserify', 'copy', 'sass']);
  grunt.registerTask('default', ['check', 'build']);
  grunt.registerTask('release', ['env:release', 'eslint', 'run:flow', 'browserify', 'uglify', 'copy:dist', 'sass']);
};
