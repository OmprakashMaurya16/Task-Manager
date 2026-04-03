pipeline {
    agent any

    stages {

        stage('Build Backend') {
            steps {
                bat 'docker build -t task-backend ./Backend'
            }
        }

        stage('Build Frontend') {
            steps {
                bat 'docker build -t task-frontend ./Frontend'
            }
        }

        stage('Run Containers') {
            steps {
                bat 'docker-compose up -d'
            }
        }

         stage('Run Selenium Tests') {
            steps {
                bat 'cd tests && npm install'
                bat 'cd tests && node test.js'
            }
        }
    }
}