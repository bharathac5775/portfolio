import urllib.request

urls = {
    'sonarqube': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sonarqube/sonarqube-original.svg',
    'trivy': 'https://raw.githubusercontent.com/aquasecurity/trivy/main/docs/imgs/logo.png',
    'snyk': 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/snyk.svg'
}

for name, url in urls.items():
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        ext = url.split('.')[-1]
        with urllib.request.urlopen(req) as response, open(f'assets/tech-logos/{name}.{ext}', 'wb') as out_file:
            out_file.write(response.read())
        print(f"Downloaded {name}.{ext}")
    except Exception as e:
        print(f"FAILED to download {name}: {e}")
