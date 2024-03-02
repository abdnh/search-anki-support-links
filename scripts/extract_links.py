"""
This script collects TOC links from SITES and dumps them to stdout.

Usage:
1. Install requirements: `pip install beautifulsoup4`
2. Run: `python scripts/extract_links.py > links.txt`
"""

SITES = [
    "https://docs.ankiweb.net/",
    "https://faqs.ankiweb.net/",
    "https://docs.ankimobile.net/",
]

from urllib.request import urlopen
from urllib.parse import urljoin
from bs4 import BeautifulSoup

for site in SITES:
    with urlopen(site) as response:
        soup = BeautifulSoup(response.read(), "html.parser")
        for link in soup.select(".chapter-item a[href]"):
            print(urljoin(site, link["href"]))
