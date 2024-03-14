"""
This script collects TOC links from SITES and dumps them to stdout.

Usage:
1. Install requirements: `pip install beautifulsoup4`
2. Run: `./update-links.sh``
"""

import sys
from urllib.request import urlopen
from urllib.parse import urljoin
from bs4 import BeautifulSoup

SITES = [
    "https://docs.ankiweb.net/",
    "https://faqs.ankiweb.net/",
    "https://docs.ankimobile.net/",
]

for site in SITES:
    with urlopen(site) as response:
        soup = BeautifulSoup(response.read(), "html.parser")
        for chapter_anchor in soup.select(".chapter-item a[href]"):
            chapter_url = urljoin(site, chapter_anchor["href"])
            print(chapter_url)
            print(f"Extracting links from {chapter_url}", file=sys.stderr)
            with urlopen(chapter_url) as chapter_response:
                chapter_soup = BeautifulSoup(chapter_response.read(), "html.parser")
                for header_anchor in chapter_soup.select(".header")[1:]:  # skip h1
                    header_url = urljoin(chapter_url, header_anchor["href"])
                    print(header_url)
