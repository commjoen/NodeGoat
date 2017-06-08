pipeline {
  agent any
  node {
    withEnv(["PATH+NODE=${tool name: 'node-5.10.1', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'}/bin"]) {
      sh 'node -v'
    }
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
