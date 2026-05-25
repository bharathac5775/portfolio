import urllib.request

urls = {
    'snyk': 'https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/2/snyk-mflyucnwpd98puwq2k70f.png/snyk-argj9w9zgahaf04t4nlky.png?_a=DATAiZAAZAA0',
    'trivy': 'https://miro.medium.com/1*9wfqoLh3xOGS5srRpesJcA.png'
}

for name, url in urls.items():
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as response, open(f'assets/tech-logos/{name}.png', 'wb') as out_file:
            out_file.write(response.read())
        print(f"Downloaded {name}.png")
    except Exception as e:
        print(f"FAILED to download {name}: {e}")
