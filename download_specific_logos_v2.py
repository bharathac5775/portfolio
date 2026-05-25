import urllib.request
import os

os.makedirs('assets/tech-logos', exist_ok=True)

# Sources:
# 1. Devicon (original versions usually have more colors)
# 2. SimpleIcons (usually flat)
# 3. Wikipedia/Raw GitHub links for specific brand logos

tech_map = {
    'GitHub': {'url': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', 'file': 'github'},
    'Shell': {'url': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg', 'file': 'shell'},
    'Hadoop': {'url': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/hadoop/hadoop-original.svg', 'file': 'hadoop'},
    'PySpark': {'url': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachespark/apachespark-original.svg', 'file': 'pyspark'},
    'Claude': {'url': 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/claude.svg', 'file': 'claude'},
    'Ollama': {'url': 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/ollama.svg', 'file': 'ollama'},
    'OpenTelemetry': {'url': 'https://raw.githubusercontent.com/open-telemetry/opentelemetry.io/main/static/img/logos/opentelemetry-horizontal-color.svg', 'file': 'opentelemetry'},
    'SAP': {'url': 'https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg', 'file': 'sap'}
}

for name, data in tech_map.items():
    req = urllib.request.Request(data['url'], headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as response, open(f"assets/tech-logos/{data['file']}.svg", 'wb') as out_file:
            out_file.write(response.read())
        print(f"Downloaded {name} successfully.")
    except Exception as e:
        print(f"FAILED to download {name}: {e}")
