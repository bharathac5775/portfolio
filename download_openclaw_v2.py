import urllib.request
url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYIA6aP7c8oWKOF_BUwlZMdKHLi8HiyhDHqA&s'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response, open('assets/tech-logos/openclaw.png', 'wb') as out_file:
        out_file.write(response.read())
    print("Successfully replaced openclaw.png!")
except Exception as e:
    print(f"Failed to download new openclaw: {e}")
