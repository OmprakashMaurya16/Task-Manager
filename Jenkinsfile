pipeline {
    agent any

    stages {

        stage('Build Backend') {
            steps {
                sh 'docker build -t task-backend ./Backend'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'docker build -t task-frontend ./Frontend'
            }
        }

        stage('Run Containers') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
}