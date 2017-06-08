pipeline {
  agent any

  tools {
    nodejs "nodejs8grunt"
  }
  stages {
        stage('PreBuild') {
          steps{
            echo 'started prebuild..'
            sh 'npm install'
            sh 'npm --version'
            sh 'node --version'
            sh 'npm run db:seed'
          }
        }

        stage('3rd party analysis'){
          steps{
            echo 'start analysis'
            sh 'grunt retire'
            sh 'license-checker --production > licenses-production.txt'
                    archiveArtifacts 'licenses-production.txt'
            sh 'license-checker --development > licenses-development.txt'
                    archiveArtifacts 'licenses-development.txt'
          }
        }

        stage('Build') {
          steps{
            echo 'started build..'
            sh 'grunt jshint'
            sh 'npm start > stdout.txt 2> stderr.txt & '
          }
        }
        stage('Integration Testing') {
          steps{
            echo 'started integration testing..'
            sh 'npm install chromedriver'
            sh 'grunt mochaTest:security'
            sh 'curl http://192.168.1.195:9000/OTHER/core/other/htmlreport/?apikey=dvarh87o132g62dtdst0d5ide7 > secproxy.html' # Get the report from the ZAP docker container
              archiveArtifacts 'secproxy.html'
            sh 'curl http://192.168.1.195:9000/OTHER/core/other/xmlreport/?apikey=dvarh87o132g62dtdst0d5ide7 > /secproxy.xml' # Get the report from the ZAP docker container
              archiveArtifacts 'secproxy.xml'
            sh 'curl --insecure -H "Accept: application/json" -X POST --form "file=@./test-reports/secproxy.xml" "https://192.168.99.100:8443/threadfix/rest/applications/1/upload?apiKey={Ja9yE6ZaUYHesgC5fyqoCV4zB43iIuwLrMxqCXtaG8}"' # Upload the report to Threadfix for the specific application.
          }
        }

        stage('docker evaluation') {
          steps{
            echo 'analyzing with clair...'
          }
        }

        stage('ZAP-test') {
          steps{
            echo 'started zaptesting..'
          }
        }

        stage('Clean-up') {
            steps {
                //Optional Cleaning steps
                echo 'Cleaning..'
            }
        }
   }
}
