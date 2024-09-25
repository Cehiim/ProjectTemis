pipeline {
    agent any
    stages {
	stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/Cehiim/ProjectTemis'
      }
    }



        stage('Build') {
            steps {
		cd Front-end
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh './jenkins/scripts/test.sh'
            }
        }
        stage('Deliver') { 
            steps {
                sh './jenkins/scripts/deliver.sh' 
                input message: 'Finished using the web site? (Click "Proceed" to continue)' 
                sh './jenkins/scripts/kill.sh' 
            }
        }
    }
}
