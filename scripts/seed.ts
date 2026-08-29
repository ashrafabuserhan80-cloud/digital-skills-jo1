import "dotenv/config";
import { sql, ensureSchema } from "../src/lib/db";

async function main() {
  console.log("Ensuring schema...");
  await ensureSchema();

  // Seed default admin/teacher/student if not present
  const users = [
    { email: "aabuserhan80@gmail.com", name: "مدير المنصة", role: "ADMIN", password: "admin123", grade: null, parent_name: null, parent_phone: null, phone: null },
    { email: "student@test.com", name: "طالب تجريبي", role: "STUDENT", password: "123456", grade: 7, parent_name: "ولي الأمر", parent_phone: "0790000000", phone: "0780000000" },
    { email: "teacher@test.com", name: "معلم تجريبي", role: "TEACHER", password: "123456", grade: null, parent_name: null, parent_phone: null, phone: null },
  ];

  for (const u of users) {
    const existing = await sql`SELECT id FROM users WHERE email = ${u.email}`;
    if (existing.length === 0) {
      await sql`
        INSERT INTO users (email, name, role, password, grade, parent_name, parent_phone, phone, status)
        VALUES (${u.email}, ${u.name}, ${u.role}, ${u.password}, ${u.grade}, ${u.parent_name}, ${u.parent_phone}, ${u.phone}, 'active')
      `;
      console.log(`Created user: ${u.email}`);
    } else {
      console.log(`User exists: ${u.email}`);
    }
  }

  console.log("Done!");
  await sql.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
