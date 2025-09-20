// utils/checkAdmin.ts
export async function checkEmployer(token: string) {
  try {
    const res = await fetch("http://localhost:5071/api/employer", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) return false; // یا token نامعتبر یا نقش اشتباه
    return true; // کاربر admin است
  } catch (err) {
    return false;
  }
}
