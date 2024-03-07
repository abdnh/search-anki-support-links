#!/bin/bash

(python3 scripts/extract_links.py; cat extra.txt) > links.txt
