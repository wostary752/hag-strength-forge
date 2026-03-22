import { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

function generateCaptcha() {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  return { question: `${a} + ${b} = ?`, answer: a + b };
}

const TELEGRAM_BOT_TOKEN = "8533492429:AAEgDXwpGDDweCo2_22GlGdow7DfnJCph8o";
const TELEGRAM_CHAT_ID = "1956426286";

async function sendToTelegram(data: { name: string; phone: string; email: string; product: string }) {
  const text = `🏋️ Новая заявка с сайта HAGL\n\n👤 Имя: ${data.name}\n📞 Телефон: ${data.phone}\n📧 Email: ${data.email}\n🏷 Товар: ${data.product}`;
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: "HTML" }),
  });
}

interface ContactFormDialogProps {
  children: React.ReactNode;
  defaultProduct?: string;
  onSubmitted?: () => void;
}

export default function ContactFormDialog({ children, defaultProduct = "" }: ContactFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha);
  const [captchaInput, setCaptchaInput] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", product: defaultProduct });

  const resetForm = useCallback(() => {
    setForm({ name: "", phone: "", email: "", product: defaultProduct });
    setCaptchaInput("");
    setCaptcha(generateCaptcha());
    setSubmitted(false);
  }, [defaultProduct]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(captchaInput) !== captcha.answer) {
      toast({ title: "Ошибка", description: "Неверный ответ на проверку", variant: "destructive" });
      setCaptcha(generateCaptcha());
      setCaptchaInput("");
      return;
    }
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      toast({ title: "Ошибка", description: "Заполните все обязательные поля", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      await sendToTelegram(form);
      setSubmitted(true);
    } catch {
      toast({ title: "Ошибка", description: "Не удалось отправить заявку. Попробуйте позже.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (v: boolean) => {
    setOpen(v);
    if (!v) setTimeout(resetForm, 300);
  };

  const inputClass = "w-full bg-background border border-border rounded px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl uppercase tracking-wider">
            {submitted ? "Заявка отправлена" : "Связаться с нами"}
          </DialogTitle>
        </DialogHeader>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-heading text-xl uppercase tracking-wider mb-3">Заявка отправлена</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Ваши данные переданы в обработку.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm">
              В ближайшее время с вами свяжутся.
            </p>
            <button
              onClick={() => handleOpenChange(false)}
              className="mt-6 bg-primary text-primary-foreground font-heading uppercase tracking-widest text-sm px-6 py-3 rounded hover:bg-primary/90 transition-colors"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <input
              type="text"
              placeholder="Имя *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
              maxLength={100}
              required
            />
            <input
              type="tel"
              placeholder="Телефон *"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={inputClass}
              maxLength={20}
              required
            />
            <input
              type="email"
              placeholder="Email *"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
              maxLength={255}
              required
            />
            <input
              type="text"
              placeholder="Какой товар заинтересовал?"
              value={form.product}
              onChange={(e) => setForm({ ...form, product: e.target.value })}
              className={inputClass}
              maxLength={200}
            />
            <div className="bg-background border border-border rounded p-3">
              <p className="text-xs text-muted-foreground mb-2">Проверка: {captcha.question}</p>
              <input
                type="text"
                placeholder="Ваш ответ"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                className={inputClass}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground font-heading uppercase tracking-widest text-sm px-6 py-3.5 rounded hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading ? "Отправка..." : "Отправить заявку"}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
