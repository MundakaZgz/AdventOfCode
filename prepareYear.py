import datetime
import os
from pathlib import Path

today = datetime.date.today()
year = str(today.year)

files = ['index.js','README.md']

yearExist = os.path.exists('src/' + year)
if not yearExist:
   os.makedirs('src/' + year)

for day in range(1,26):
  dayExists = os.path.exists('src/' + year + '/day' + str(day))
  if not dayExists:
    os.makedirs('src/' + year + '/day' + str(day))
  for file in files:
    Path('src/' + year + '/day' + str(day) + '/' + file).touch(exist_ok=True)
