import urllib.request
url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBdcgkdcDy5z4PYGx_kDJB1AvvC_x1pCBbbQ&s'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response, open('assets/tech-logos/openai.png', 'wb') as out_file:
        out_file.write(response.read())
    print("Downloaded openai.png successfully!")
except Exception as e:
    print(f"Failed to download openai: {e}")
