# EcoBox-back

[![Run on Ainize](https://ainize.ai/static/images/run_on_ainize_button.svg)](https://ainize.web.app/redirect?git_repo=github.com/ecobox-team/ecobox-back)

https://ecobox-github-josuekim.endpoint.ainize.ai/

# How to build
EcoBox API server는 Dockerfile이 정의 되어 있어서 docker 커맨드를 이용하여 빌드하고 실행시킬 수 있습니다.

## Docker Build

    docker build -t ecobox-back
    
## Docker Run    

    docker run -p 80:80 ecobox-back

API 서버가 잘 동작하는지 테스트
- http://localhost/api/restaurants

## Docker Hub Upload

    docker tag ecobox-back ${DOCKERHUB_USER_ID}/ecobox-back
    
    docker push ${DOCKERHUB_USER_ID}/ecobox-back

## Ainize Deploy (Optional)
- Ainize 사이트( https://ainize.ai/ )에 DockerHub에 업로드 된 image 등록