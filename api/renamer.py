import os
import random
import string
from pathlib import Path

def random_string(length=6):
    letters = string.ascii_lowercase + string.digits
    return ''.join(random.choice(letters) for _ in range(length))

def rename_files_in_directory(directory_path, extension=".png"):
    directory = Path(directory_path)

    for file in directory.glob(f'*{extension}'):
        random_name = random_string()
        new_file_name = f"{random_name}{extension}"
        new_file_path = file.parent / new_file_name
        os.rename(file, new_file_path)
        print(new_file_name[0:6])

# Replace 'your_directory_path' with the actual path to your directory containing the PNG files
your_directory_path = "../img"
rename_files_in_directory(your_directory_path)

