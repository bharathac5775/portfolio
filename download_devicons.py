import urllib.request
import os

os.makedirs('assets/tech-logos', exist_ok=True)

# Map our tech list to devicon slugs
devicon_map = {
    'jenkins': 'jenkins/jenkins-original',
    'docker': 'docker/docker-original',
    'kubernetes': 'kubernetes/kubernetes-plain',
    'helm': 'helm/helm-original',
    'terraform': 'terraform/terraform-original',
    'ansible': 'ansible/ansible-original',
    'github': 'github/github-original',
    'gitlab': 'gitlab/gitlab-original',
    'circleci': 'circleci/circleci-plain',
    'argocd': 'argocd/argocd-original',
    'linux': 'linux/linux-original',
    'nginx': 'nginx/nginx-original',
    'java': 'java/java-original',
    'prometheus': 'prometheus/prometheus-original',
    'grafana': 'grafana/grafana-original',
    'python': 'python/python-original',
    'postgresql': 'postgresql/postgresql-original',
    'mongodb': 'mongodb/mongodb-original',
    'redis': 'redis/redis-original',
    'kafka': 'apachekafka/apachekafka-original',
    'aws': 'amazonwebservices/amazonwebservices-original-wordmark',
    'azure': 'azure/azure-original',
    'gcp': 'googlecloud/googlecloud-original',
    'elasticsearch': 'elasticsearch/elasticsearch-original',
    'pytorch': 'pytorch/pytorch-original',
    'tensorflow': 'tensorflow/tensorflow-original',
}

for name, slug in devicon_map.items():
    url = f'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/{slug}.svg'
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as response, open(f'assets/tech-logos/{name}.svg', 'wb') as out_file:
            out_file.write(response.read())
        print(f'Downloaded {name}')
    except Exception as e:
        print(f'{name} failed: {e}')

