import sqlite3
from datetime import datetime

DB_NAME = "patients.db"

def init_db():
    """Creates the patients table if it doesn't exist."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS patients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            age INTEGER,
            gender TEXT,
            diagnosis TEXT,
            confidence REAL,
            date TEXT
        )
    ''')
    conn.commit()
    conn.close()

def add_patient_record(name, age, gender, diagnosis, confidence):
    """Saves a new diagnosis record."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    date_str = datetime.now().strftime("%Y-%m-%d %H:%M")
    cursor.execute('''
        INSERT INTO patients (name, age, gender, diagnosis, confidence, date)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (name, age, gender, diagnosis, confidence, date_str))
    conn.commit()
    conn.close()

def get_all_patients():
    """Fetches all patient records."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM patients ORDER BY id DESC')
    rows = cursor.fetchall()
    conn.close()
    
    # Convert tuple rows to dictionary list
    patients = []
    for row in rows:
        patients.append({
            "id": row[0],
            "name": row[1],
            "age": row[2],
            "gender": row[3],
            "diagnosis": row[4],
            "confidence": row[5],
            "date": row[6]
        })
    return patients