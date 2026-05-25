import urllib.request
import os

os.makedirs('assets/tech-logos', exist_ok=True)

# Define the tech names exactly as they are in the JS array, and their corresponding SimpleIcons slug
# For simpleicons: https://cdn.simpleicons.org/[slug]
# For devicon: https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/[slug].svg

tech_map = {
    # Replacements requested
    'OpenAI': {'si': 'openai'},
    'OpenTelemetry': {'si': 'opentelemetry'},
    'S3': {'si': 'amazons3'},
    'Anthropic': {'si': 'anthropic'},
    'CircleCI': {'si': 'circleci'},
    'Datadog': {'si': 'datadog'},
    'GitHub': {'si': 'github'},
    'Shell': {'si': 'gnubash'},
    'Kafka': {'si': 'apachekafka'},
    
    # New additions
    'Gemini': {'si': 'googlegemini'},
    'GitHubActions': {'si': 'githubactions'},
    'Kibana': {'si': 'kibana'},
    'Ollama': {'si': 'ollama'},
    'Loki': {'si': 'grafana'}, # simpleicons grafana might be closest, or let's try loki
    'SAPKyma': {'si': 'sap'}, # no kyma, use sap
    'CrewAI': {'si': 'crewai'}, 
    'ChromaDB': {'si': 'chroma'}, 
    'Claude': {'si': 'anthropic'},
    'SQL': {'di': 'mysql/mysql-original'},
    'Apache': {'si': 'apache'},
    'LangGraph': {'si': 'langchain'}, # fallback to langchain
}

for name, sources in tech_map.items():
    safe_name = name.lower().replace(' ', '-').replace('/', '-')
    file_path = f'assets/tech-logos/{safe_name}.svg'
    
    success = False
    
    if 'si' in sources:
        url = f"https://cdn.simpleicons.org/{sources['si']}"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        try:
            with urllib.request.urlopen(req) as response, open(file_path, 'wb') as out_file:
                out_file.write(response.read())
            print(f"Downloaded {name} from SimpleIcons")
            success = True
        except:
            pass
            
    if not success and 'di' in sources:
        url = f"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/{sources['di']}.svg"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        try:
            with urllib.request.urlopen(req) as response, open(file_path, 'wb') as out_file:
                out_file.write(response.read())
            print(f"Downloaded {name} from Devicon")
            success = True
        except:
            pass
            
    if not success:
        print(f"FAILED to download {name}")

