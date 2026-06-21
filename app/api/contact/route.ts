import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  // Honeypot — botlar doldurur, gerçek kullanıcı görmez
  company?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  let data: ContactPayload;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot dolduysa sessizce başarılı dön (botu oyala)
  if (data.company && data.company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const phone = (data.phone ?? "").trim();
  const message = (data.message ?? "").trim();

  if (!name || !message || (!email && !phone)) {
    return NextResponse.json(
      { ok: false, error: "missing_fields" },
      { status: 422 }
    );
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const text = [
    "<b>🚀 Yeni proje talebi — BCD</b>",
    "",
    `<b>İsim:</b> ${escapeHtml(name)}`,
    email ? `<b>E-posta:</b> ${escapeHtml(email)}` : null,
    phone ? `<b>Telefon:</b> ${escapeHtml(phone)}` : null,
    "",
    `<b>Mesaj:</b>\n${escapeHtml(message)}`,
  ]
    .filter(Boolean)
    .join("\n");

  // Telegram henüz bağlanmadıysa: hatasız geç, sunucu loguna düş.
  if (!token || !chatId) {
    console.warn("[contact] Telegram env yok — mesaj loglandı:\n", text);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      }
    );

    if (!res.ok) {
      console.error("[contact] Telegram hata:", await res.text());
      return NextResponse.json(
        { ok: false, error: "telegram_failed" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] Telegram istek hatası:", err);
    return NextResponse.json(
      { ok: false, error: "telegram_error" },
      { status: 502 }
    );
  }
}
