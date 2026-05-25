import urllib.request
import os

urls = {
    'github': ('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUBwhMOxO7xHV9OqhDZ585TTapui1-kcj3dA&s', 'png'),
    'hermes-agent': ('https://hermes-agent.nousresearch.com/docs/img/logo.png', 'png'),
    'sapkyma': ('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTVEfe5C4JfmzNR8yOTgVG-pBUAZkfYmwwfQ&s', 'png'),
    'claude': ('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpFdyVpVeiHpaCdE4FL2M9YJZRPU-wbWgqRQ&s', 'png'),
    'gemini': ('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUs9Ja9iGTTD14d2fSueJSJeKubE9ftng8_w&s', 'png'),
    'loki': ('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrhnk-PAbEYKeBP2bc-FUfr9QGgJq3S6yKjg&s', 'png')
}

os.makedirs('assets/tech-logos', exist_ok=True)

for name, (url, ext) in urls.items():
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as response, open(f'assets/tech-logos/{name}.{ext}', 'wb') as out_file:
            out_file.write(response.read())
        print(f"Downloaded {name}")
    except Exception as e:
        print(f"FAILED to download {name}: {e}")
