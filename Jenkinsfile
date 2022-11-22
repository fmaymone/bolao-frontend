pipeline {
  agent any
  stages {
    stage('docker front-end image') {
      steps {
        sh 'docker build --build-arg REACT_APP_ENV=$REACT_PROFILE_ACTIVE . -t bolao-bebados-front:latest'
      }
    }

    stage('docker recreate front-end') {
      steps {
        sh 'docker rm -f bolao-bebados-front || exit 0'
        sh 'docker create -e REACT_APP_ENV=$REACT_PROFILE_ACTIVE --name bolao-bebados-front --network roboto-network --ip 172.21.0.4 --restart unless-stopped bolao-bebados-front:latest'
        sh 'docker start bolao-bebados-front'
      }
    }
  }
}