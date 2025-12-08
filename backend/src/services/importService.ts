import fs from 'fs';
import path from 'path';
import https from 'https';
import csv from 'csv-parser';
import { getDB } from './db';

const DATA_DIR = path.join(__dirname, '../../data');
const CSV_FILE = path.join(DATA_DIR, 'truestate_assignment_dataset.csv');
const DOWNLOAD_URL = 'https://drive.google.com/uc?id=1tzbyuxBmrBwMSXbL22r33FUMtO0V_lxb&export=download';

const downloadFile = (url: string, dest: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 302 || response.statusCode === 303) {
                downloadFile(response.headers.location!, dest).then(resolve).catch(reject);
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => { });
            reject(err);
        });
    });
};

export const importData = async () => {
    const db = await getDB();

    const countResult = await db.get('SELECT count(*) as count FROM sales');
    if (countResult.count > 0) {
        console.log('Data already exists in DB. Skipping import.');
        return;
    }

    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR);
    }

    if (!fs.existsSync(CSV_FILE)) {
        console.log('Downloading CSV dataset...');
        await downloadFile(DOWNLOAD_URL, CSV_FILE);
        console.log('Download complete.');
    }

    console.log('Starting CSV Import...');
    const results: any[] = [];

    const MAX_ROWS = 10000;
    let rowCount = 0;

    return new Promise<void>((resolve, reject) => {
        const stream = fs.createReadStream(CSV_FILE).pipe(csv());

        stream.on('data', (data) => {
            if (rowCount < MAX_ROWS) {
                results.push(data);
                rowCount++;
            } else {
                stream.destroy();
            }
        });

        const onFinish = async () => {
            try {
                // If stream destroyed early, we might have partial data which is fine.
                // We proceed to insert whatever we have.
                console.log(`Parsed ${results.length} rows. Inserting into DB...`);

                await db.run('BEGIN TRANSACTION');
                const stmt = await db.prepare(`
            INSERT INTO sales (
              customer_id, customer_name, phone_number, gender, age, customer_region, customer_type,
              product_id, product_name, brand, product_category, tags,
              quantity, price_per_unit, discount_percentage, total_amount, final_amount,
              date, payment_method, order_status, delivery_type,
              store_id, store_location, salesperson_id, employee_name
            ) VALUES (
              ?, ?, ?, ?, ?, ?, ?,
              ?, ?, ?, ?, ?,
              ?, ?, ?, ?, ?,
              ?, ?, ?, ?,
              ?, ?, ?, ?
            )
          `);

                for (const row of results) {
                    await stmt.run(
                        row['Customer ID'], row['Customer Name'], row['Phone Number'], row['Gender'], parseInt(row['Age']), row['Customer Region'], row['Customer Type'],
                        row['Product ID'], row['Product Name'], row['Brand'], row['Product Category'], row['Tags'],
                        parseInt(row['Quantity']), parseFloat(row['Price per Unit']), parseFloat(row['Discount Percentage']), parseFloat(row['Total Amount']), parseFloat(row['Final Amount']),
                        row['Date'], row['Payment Method'], row['Order Status'], row['Delivery Type'],
                        row['Store ID'], row['Store Location'], row['Salesperson ID'], row['Employee Name']
                    );
                }
                await stmt.finalize();
                await db.run('COMMIT');
                console.log('Import complete.');
                resolve();
            } catch (error) {
                await db.run('ROLLBACK');
                console.error('Import failed:', error);
                reject(error);
            }
        };

        // If stream ends naturally or is destroyed (which emits close)
        stream.on('end', onFinish);
        stream.on('close', onFinish);
        stream.on('error', (err) => reject(err));
    });
};
