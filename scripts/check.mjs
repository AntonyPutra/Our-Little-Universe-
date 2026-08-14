import pg from 'pg';
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
async function main() {
  const tables = ['Memory', 'Letter', 'Song'];
  for (const t of tables) {
    try {
      const res = await pool.query(`SELECT COUNT(*) FROM "${t}"`);
      console.log(`${t}: ${res.rows[0].count}`);
    } catch (e) {
      console.log(`${t}: error ${e.message}`);
    }
  }
}
main().finally(() => pool.end());
