module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jsDir: 'src/script/',
    jsDistDir: 'public/script/',
    cssDir: 'src/style/',
    cssDistDir: 'public/style/',
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      js: {
        options: {
          separator: ';'
        },
        src: ['<%=jsDir%>*.js'],
        dest: '<%=jsDir%><%= pkg.name %>.js'
      },
      css: {
        src: ['<%=cssDir%>*.css'],
        dest: '<%=cssDir%><%= pkg.name %>.css'
      }
    },
    uglify: {
      options: {
        banner: 
          '/***********************************\n' +
          '  <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
          '  Built in Chicago by FlyoverWorks\n' +
          '************************************/\n'
      },
      dist: {
        files: {
          '<%= jsDistDir %><%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
        }
      }
    },
    cssmin: {
      add_banner: {
        options: {
          banner: 
            '/***********************************\n' +
            '  <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '  Built in Chicago by FlyoverWorks\n' +
            '************************************/\n'
        },
        files: {
          '<%=cssDistDir%><%= pkg.name %>.min.css': ['<%= concat.css.dest %>']
        }
      }
    },
    watch: {
      files: ['<%=jsDir%>*.js', '<%=cssDir%>*.css'],
      tasks: ['concat', 'uglify', 'cssmin']
    }
  })

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-cssmin')
  grunt.loadNpmTasks('grunt-contrib-watch')

  // Default task(s).
  grunt.registerTask('default', [
    'concat',
    'uglify',
    'cssmin',
    'watch'
  ])

}
