import requests
import json
import os

url = "https://cwiwxqbpfyxdggpshsur.supabase.co/rest/v1/products"
headers = {
    "apikey": "sb_publishable_-EeJMwbrQR3HbSlE2JiCng_Kin0EMqd",
    "Authorization": "Bearer sb_publishable_-EeJMwbrQR3HbSlE2JiCng_Kin0EMqd"
}

try:
    response = requests.get(url, headers=headers)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
