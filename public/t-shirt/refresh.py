import json
import requests
url="https://www.googleapis.com/oauth2/v4/token"
params = {
    "clientId": "826450531725-7li2vbpd3bpu3b5lr3bpcbidsdpmqhtk.apps.googleusercontent.com",
    "clientSecret": "",
    "refreshToken": "AGEhc0DYCeSjJ-Y0Px-Roa3hPVMwUQTENmm0nVHJOm4c4d6qG9OV00idfZ--MtncgWpZjMItMJUAq7t8G_jFVz-BMSc_N6dDkHcBiyXJOXtHs8Ljtpty5vrSWoW5mEZwE8A_FOOI6foK3ebKS88YxThsT_fsi5dbF9mHsTNRRZw-dihtMvfV5DHoNy1884d9IzvfdUf86CzD3ImXNqqSiGzYuYPH9nAmKPkh0SGCegqqA54wbpBJ-DJXV_HwwJke4xshCFZ8NRNt1k_2Bk11Ji-vevtKNo-Rn9ObVRl2D6bG6hSYYW-FTRlNU2bUkASmUF2PRBk_9VJV-t4uRyyM321K9dN3WwS7VlG65NM0VWbPQgzzoB9aQaXmkYfTD8GBJJ5w6iBBvOlMDIBLqKQvflLYOY1bUwr_2g40P9rSY8iYR0nbGw4lTE4",
    "grant_type": "refresh_token"
}
data=params
response=requests.post(url,params=params,data=json.dumps(data))
print(response.status_code)
print(response.text)
print(response.url)