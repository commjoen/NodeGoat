pipeline {
  agent any

  tools {
    nodejs
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
