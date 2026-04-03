pipeline {
    agent any

    stages {

        stage('Clone') {
            steps {
                git 'https://github.com/OmprakashMaurya16/Task-Manager.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                sh 'docker build -t task-backend ./Backend'
            }
        }

        stage('Build Frontend Image') {
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