import pandas as pd
from sqlalchemy import create_engine
import os
from dotenv import load_dotenv
import uuid
from datetime import datetime

# Load dotenv
load_dotenv()

# Config from dotenv
db_username = os.getenv('DB_USER')
db_password = os.getenv('DB_PASS')
db_host = os.getenv('DB_HOST')
db_name = os.getenv('DB_NAME')

# Excel route
excel_file_path = os.getenv('EXCEL_FILE_PATH')

# Connect
engine = create_engine(f'mysql://{db_username}:{db_password}@{db_host}/{db_name}')

# Read Excel file
df = pd.read_excel(excel_file_path)

# Add generic UUID
df['id'] = pd.Series([uuid.uuid4() for _ in range(len(df))])

# Obtén la fecha actual
current_datetime = datetime.now()

# Formatea la fecha como una cadena en el formato que desees
formatted_date = current_datetime.strftime('%Y-%m-%d %H:%M:%S')

# Agrega las columnas al DataFrame con la fecha formateada
df['createdAt'] = formatted_date
df['updatedAt'] = formatted_date

# Table name
table_name = 'equipment'

# Name columns
df.to_sql(table_name, engine, index=False, if_exists='append')

print('Datos insertados correctamente en la base de datos.')
