import "server-only";
import mysql from "mysql2/promise";

/**
 * MySQL bağlantı katmanı.
 * DATABASE_URL tanımlı değilse hiçbir bağlantı kurulmaz; çağıran taraf
 * statik (site-data) içeriğe düşer → site DB olmadan da çalışır.
 */

let pool: mysql.Pool | null = null;
let schemaReady: Promise<void> | null = null;

export function isDbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      uri: process.env.DATABASE_URL,
      waitForConnections: true,
      connectionLimit: 5,
      namedPlaceholders: false,
      // Görseller LONGBLOB → daha büyük paket boyutu
      // (sürücü tarafında okuma; yazma sınırını sunucu belirler)
    });
  }
  return pool;
}

type SqlParam = string | number | null | Buffer;

export async function query<T = mysql.RowDataPacket[]>(
  sql: string,
  params: SqlParam[] = []
): Promise<T> {
  const [rows] = await getPool().execute(sql, params);
  return rows as T;
}

/** Tabloları oluşturur (idempotent) ve ilk kurulumda örnek veriyle doldurur. */
export async function ensureSchema(): Promise<void> {
  if (!isDbConfigured()) return;
  if (!schemaReady) {
    schemaReady = createSchema().catch((err) => {
      // Hata olursa bir sonraki istekte tekrar denensin
      schemaReady = null;
      throw err;
    });
  }
  return schemaReady;
}

async function createSchema(): Promise<void> {
  const p = getPool();

  await p.query(`CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(160) NOT NULL,
    email VARCHAR(190) NULL,
    phone VARCHAR(60) NULL,
    message TEXT NOT NULL,
    is_read TINYINT(1) NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);

  await p.query(`CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(190) NOT NULL UNIQUE,
    title VARCHAR(190) NOT NULL,
    category VARCHAR(190) NULL,
    year VARCHAR(12) NULL,
    description TEXT NULL,
    body MEDIUMTEXT NULL,
    gradient VARCHAR(190) NULL,
    accent VARCHAR(40) NULL,
    initial VARCHAR(8) NULL,
    cover_image_id INT NULL,
    featured TINYINT(1) NOT NULL DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'published',
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);

  await p.query(`CREATE TABLE IF NOT EXISTS images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NULL,
    data LONGBLOB NOT NULL,
    mime VARCHAR(80) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);

  await p.query(`CREATE TABLE IF NOT EXISTS packages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(190) NOT NULL,
    eyebrow VARCHAR(190) NULL,
    description TEXT NULL,
    points LONGTEXT NULL,
    sort_order INT NOT NULL DEFAULT 0
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);

  await p.query(`CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    no VARCHAR(8) NULL,
    title VARCHAR(190) NOT NULL,
    description TEXT NULL,
    dot VARCHAR(40) NULL,
    sort_order INT NOT NULL DEFAULT 0
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);

  await p.query(`CREATE TABLE IF NOT EXISTS faqs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(255) NOT NULL,
    answer TEXT NULL,
    sort_order INT NOT NULL DEFAULT 0
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);

  await p.query(`CREATE TABLE IF NOT EXISTS settings (
    \`key\` VARCHAR(120) PRIMARY KEY,
    value LONGTEXT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);

  await p.query(`CREATE TABLE IF NOT EXISTS testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(160) NOT NULL,
    role VARCHAR(190) NULL,
    quote TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'published',
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);

  await p.query(`CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(190) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT NULL,
    body MEDIUMTEXT NULL,
    cover_image_id INT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'draft',
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);

  await p.query(`CREATE TABLE IF NOT EXISTS page_views (
    id INT AUTO_INCREMENT PRIMARY KEY,
    path VARCHAR(255) NOT NULL,
    referrer VARCHAR(255) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);

  await seedIfEmpty();
}

async function seedIfEmpty(): Promise<void> {
  const { seedProjects, seedPackages, seedServices, seedFaqs, seedSettings } =
    await import("./seed");

  const [pRows] = await getPool().query(
    "SELECT COUNT(*) AS c FROM projects"
  );
  if ((pRows as { c: number }[])[0].c === 0) {
    for (const pr of seedProjects) {
      await query(
        `INSERT INTO projects (slug, title, category, year, description, gradient, accent, initial, featured, status, sort_order)
         VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
        [
          pr.slug,
          pr.title,
          pr.category,
          pr.year,
          pr.description,
          pr.gradient,
          pr.accent,
          pr.initial,
          1,
          "published",
          pr.sort_order,
        ]
      );
    }
  }

  const [pkRows] = await getPool().query("SELECT COUNT(*) AS c FROM packages");
  if ((pkRows as { c: number }[])[0].c === 0) {
    for (const pk of seedPackages) {
      await query(
        `INSERT INTO packages (title, eyebrow, description, points, sort_order) VALUES (?,?,?,?,?)`,
        [pk.title, pk.eyebrow, pk.description, JSON.stringify(pk.points), pk.sort_order]
      );
    }
  }

  const [sRows] = await getPool().query("SELECT COUNT(*) AS c FROM services");
  if ((sRows as { c: number }[])[0].c === 0) {
    for (const s of seedServices) {
      await query(
        `INSERT INTO services (no, title, description, dot, sort_order) VALUES (?,?,?,?,?)`,
        [s.no, s.title, s.description, s.dot, s.sort_order]
      );
    }
  }

  const [fRows] = await getPool().query("SELECT COUNT(*) AS c FROM faqs");
  if ((fRows as { c: number }[])[0].c === 0) {
    for (const f of seedFaqs) {
      await query(
        `INSERT INTO faqs (question, answer, sort_order) VALUES (?,?,?)`,
        [f.question, f.answer, f.sort_order]
      );
    }
  }

  const [setRows] = await getPool().query("SELECT COUNT(*) AS c FROM settings");
  if ((setRows as { c: number }[])[0].c === 0) {
    for (const [k, v] of Object.entries(seedSettings)) {
      await query(`INSERT INTO settings (\`key\`, value) VALUES (?,?)`, [
        k,
        JSON.stringify(v),
      ]);
    }
  }
}
