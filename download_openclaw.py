import urllib.request

url = 'https://www.binance.com/bapi/fe/resource/image?image=aHR0cHM6Ly9wdWJsaWMuYm5ic3RhdGljLmNvbS9zdGF0aWMvYWNhZGVteS91cGxvYWRzLW9yaWdpbmFsL2U5NWRjZTNlNDM1OTRlNmI4ZGNhMTUxNDgyNzVhMTE3LnBuZw==&level=lg'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response, open('assets/tech-logos/openclaw.png', 'wb') as out_file:
        out_file.write(response.read())
    print("Downloaded openclaw.png successfully!")
except Exception as e:
    print(f"FAILED to download openclaw: {e}")
