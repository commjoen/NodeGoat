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
            sh 'grunt mochaTest:security'
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
