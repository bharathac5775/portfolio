import urllib.request
import os

icons = {
    'sap': 'sap', 'jenkins': 'jenkins', 'docker': 'docker', 'kubernetes': 'kubernetes',
    'helm': 'helm', 'terraform': 'terraform', 'pulumi': 'pulumi', 'ansible': 'ansible',
    'github': 'github', 'gitlab': 'gitlab', 'circleci': 'circleci', 'argocd': 'argo',
    'istio': 'istio', 'backstage': 'backstage', 'vault': 'vault', 'aws': 'amazonaws',
    'azure': 'microsoftazure', 'gcp': 'googlecloud', 'linux': 'linux', 'nginx': 'nginx',
    'java': 'openjdk', 'opentelemetry': 'opentelemetry', 'prometheus': 'prometheus',
    'grafana': 'grafana', 'fluentd': 'fluentd', 'elasticsearch': 'elasticsearch',
    'datadog': 'datadog', 'jaeger': 'jaeger', 'python': 'python',
    'postgresql': 'postgresql', 'mongodb': 'mongodb', 'redis': 'redis', 'kafka': 'apachekafka',
    'langchain': 'langchain', 'openai': 'openai', 'anthropic': 'anthropic',
    'hugging-face': 'huggingface', 'pytorch': 'pytorch', 'tensorflow': 'tensorflow',
    'cloudfoundry': 'cloudfoundry', 'shell': 'gnubash',
    's3': 'amazons3', 'lambda': 'awslambda', 'ec2': 'amazonec2'
}

color = "14b8a6" # Teal color

for name, icon_slug in icons.items():
    url = f"https://cdn.simpleicons.org/{icon_slug}/{color}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as response, open(f"assets/tech-logos/{name}.svg", 'wb') as out_file:
            out_file.write(response.read())
        print(f"Downloaded {name}.svg")
    except Exception as e:
        print(f"Failed to download {name}: {e}")

