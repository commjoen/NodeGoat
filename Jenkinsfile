pipeline {
  tools {
  nodejs "LTS"
  }

  stages {
        stage('PreBuild') {
          echo 'started prebuild..'
        }

        stage('Build') {
          echo 'started build..'
        }
        stage('Integration Testing') {
          echo 'started integration testing..'
        }

        stage('ZAP-test') {
          echo 'started zaptesting..'
        }

        stage('Clean-up') {
            steps {
                //Optional Cleaning steps
                echo 'Cleaning..'
            }
        }
   }
}
