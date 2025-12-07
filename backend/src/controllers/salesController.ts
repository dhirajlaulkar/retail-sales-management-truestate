import { Request, Response } from 'express';
import { getDB } from '../services/db';

export const getSales = async (req: Request, res: Response) => {
    try {
        const db = await getDB();
        const {
            page = 1,
            limit = 10,
            search,
            sortBy = 'date',
            sortOrder = 'desc',
            region,
            gender,
            minAge,
            maxAge,
            category,
            tags,
            paymentMethod,
            startDate,
            endDate
        } = req.query;

        const offset = (Number(page) - 1) * Number(limit);
        const conditions: string[] = [];
        const params: any[] = [];

        // Search
        if (search) {
            conditions.push('(lower(customer_name) LIKE ? OR phone_number LIKE ?)');
            const searchTerm = `%${String(search).toLowerCase()}%`;
            params.push(searchTerm, searchTerm);
        }

        // Filters
        if (region) {
            const regions = String(region).split(',');
            conditions.push(`customer_region IN (${regions.map(() => '?').join(',')})`);
            params.push(...regions);
        }
        if (gender) {
            const genders = String(gender).split(',');
            conditions.push(`gender IN (${genders.map(() => '?').join(',')})`);
            params.push(...genders);
        }
        if (category) {
            const categories = String(category).split(',');
            conditions.push(`product_category IN (${categories.map(() => '?').join(',')})`);
            params.push(...categories);
        }
        if (paymentMethod) {
            const methods = String(paymentMethod).split(',');
            conditions.push(`payment_method IN (${methods.map(() => '?').join(',')})`);
            params.push(...methods);
        }
        if (tags) {
            const tagList = String(tags).split(',');
            const tagConditions = tagList.map(() => 'tags LIKE ?');
            conditions.push(`(${tagConditions.join(' OR ')})`);
            tagList.forEach(t => params.push(`%${t}%`));
        }
        if (minAge) {
            conditions.push('age >= ?');
            params.push(minAge);
        }
        if (maxAge) {
            conditions.push('age <= ?');
            params.push(maxAge);
        }
        if (startDate) {
            conditions.push('date >= ?');
            params.push(startDate);
        }
        if (endDate) {
            conditions.push('date <= ?');
            params.push(endDate);
        }

        const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

        // Count Total
        const countResult = await db.get(`SELECT count(*) as count FROM sales ${whereClause}`, params);
        const total = countResult.count;

        // Fetch Data
        const allowedSorts = ['date', 'quantity', 'customer_name', 'total_amount'];
        const safeSortBy = allowedSorts.includes(String(sortBy)) ? String(sortBy) : 'date';
        const safeSortOrder = String(sortOrder).toLowerCase() === 'asc' ? 'ASC' : 'DESC';

        const sql = `
      SELECT * FROM sales
      ${whereClause}
      ORDER BY ${safeSortBy} ${safeSortOrder}
      LIMIT ? OFFSET ?
    `;

        const sales = await db.all(sql, [...params, limit, offset]);

        res.json({
            data: sales,
            meta: {
                total,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(total / Number(limit))
            }
        });

    } catch (error) {
        console.error('Error fetching sales:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getFilterOptions = async (req: Request, res: Response) => {
    try {
        const db = await getDB();

        const [regions, categories, methods, genders] = await Promise.all([
            db.all('SELECT DISTINCT customer_region FROM sales ORDER BY customer_region'),
            db.all('SELECT DISTINCT product_category FROM sales ORDER BY product_category'),
            db.all('SELECT DISTINCT payment_method FROM sales ORDER BY payment_method'),
            db.all('SELECT DISTINCT gender FROM sales ORDER BY gender'),
        ]);

        res.json({
            regions: regions.map((r: any) => r.customer_region),
            categories: categories.map((c: any) => c.product_category),
            methods: methods.map((m: any) => m.payment_method),
            genders: genders.map((g: any) => g.gender)
        });

    } catch (error) {
        console.error('Error fetching filter options:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
