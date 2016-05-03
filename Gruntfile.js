module.exports = function(grunt) {
  grunt.initConfig({
    env: {
      release: {
        NODE_ENV: 'production'
      }
    },
    flow: {
      dist: {
        src: '.'
      }
    },
    babel: {
      options: {
        presets: [
          "es2015",
          "react"
        ]
      },
      dist: {
        src: 'src/app.js',
        dest: 'build/app-babel.js'
      }
    },
    browserify: {
      dist: {
        src: 'build/app-babel.js',
        dest: 'build/app-browserify.js'
      }
    },
    uglify: {
      dist: {
        src: 'build/app-browserify.js',
        dest: 'dist/app.js'
      }
    },
    copy: {
      dist: {
        files: {
          'dist/index.html': 'src/index.html'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-flow-type-check');

  grunt.registerTask('default', ['flow', 'browserify', 'babel', 'uglify', 'copy']);
  grunt.registerTask('release', ['env:release', 'flow', 'browserify', 'babel', 'uglify', 'copy']);
};
