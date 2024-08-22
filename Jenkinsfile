pipeline{
    agent any
    environment{
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKER_BUILDKIT = '1'
        TF_VAR_GCE_CREDENTIALS = credentials('gcp-service-account')
    }


    stages {
        stage('Build Docker Images') {
            steps{
                dir('./'){
                    script{
                        sh 'docker-compose build'
                    }
                }
            }
        }

        stage('Push the image to Dockerhub'){
            steps{
                script{
                    sh '''
                    echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin
                    docker-compose push
                    '''
                }
            }
        }

        stage('Provision VM with Terraform'){
            steps{
                dir('terraform'){
                    script{
                        withEnv(["GOOGLE_APPLICATION_CREDENTIALS=$TF_VAR_GCE_CREDENTIALS"])
                        {
                            sh 'terraform init'
                            sh 'terraform apply -auto-approve'
                        }
                    }
                }
            }
        }

        stage('Configure VM') {
            steps 
            {
                dir('ansible')
                {
                    script 
                    {
                        def publicIP = sh(returnStdout: true, script: 'terraform output -raw instance_ip').trim()
                        writeFile file: 'hosts.ini', text: "[web]\n${publicIP} ansible_user=vimal"
                        sh 'ansible-playbook -i hosts.ini default.yml'
                    }
                }
            }
        }


    }

}