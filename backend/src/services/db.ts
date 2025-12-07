import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

let db: Database | null = null;

export const getDB = async () => {
    if (db) return db;
    db = await open({
        filename: path.join(__dirname, '../../database.sqlite'),
        driver: sqlite3.Database
    });
    return db;
};

export const initDB = async () => {
    const database = await getDB();
    await database.exec(`
    CREATE TABLE IF NOT EXISTS sales (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id TEXT,
      customer_name TEXT,
      phone_number TEXT,
      gender TEXT,
      age INTEGER,
      customer_region TEXT,
      customer_type TEXT,
      product_id TEXT,
      product_name TEXT,
      brand TEXT,
      product_category TEXT,
      tags TEXT,
      quantity INTEGER,
      price_per_unit REAL,
      discount_percentage REAL,
      total_amount REAL,
      final_amount REAL,
      date TEXT,
      payment_method TEXT,
      order_status TEXT,
      delivery_type TEXT,
      store_id TEXT,
      store_location TEXT,
      salesperson_id TEXT,
      employee_name TEXT
    );
  `);

    // Create indices for frequent search/filter columns
    await database.exec(`
    CREATE INDEX IF NOT EXISTS idx_customer_name ON sales(customer_name);
    CREATE INDEX IF NOT EXISTS idx_phone_number ON sales(phone_number);
    CREATE INDEX IF NOT EXISTS idx_customer_region ON sales(customer_region);
    CREATE INDEX IF NOT EXISTS idx_product_category ON sales(product_category);
    CREATE INDEX IF NOT EXISTS idx_date ON sales(date);
    CREATE INDEX IF NOT EXISTS idx_payment_method ON sales(payment_method);
  `);

    console.log('Database initialized');
};
