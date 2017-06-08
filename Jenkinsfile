pipeline {
  agent any

  tools {
    nodejs "nodejs8"
  }
  stages {
        stage('PreBuild') {
          steps{
            echo 'started prebuild..'
            sh 'npm install'
            sh 'npm --version'
            sh 'node --version'
          }
        }

        stage('3rd party analysis'){
          steps{
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
          }
        }
        stage('Integration Testing') {
          steps{
            echo 'started integration testing..'
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
