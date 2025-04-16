"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import * as React from "react";

const testimonials = [
  {
    name: "Анна К.",
    text: "Очень уютная студия и приятный персонал! Фотографии получились просто супер. Буду рекомендовать друзьям!",
    avatar: "/avatar1.jpg",
  },
  {
    name: "Игорь П.",
    text: "Быстро забронировал время онлайн, всё прошло отлично. Профессиональное оборудование и классная атмосфера.",
    avatar: "/avatar2.jpg",
  },
  {
    name: "Мария С.",
    text: "Спасибо за чудесную фотосессию! Очень понравилось оформление студии и отношение к клиентам.",
    avatar: "/avatar3.jpg",
  },
];

const socials = [
  {
    href: "https://instagram.com/yourstudio",
    icon: "/instagram.svg",
    label: "Instagram",
  },
  { href: "https://t.me/yourstudio", icon: "/telegram.svg", label: "Telegram" },
  { href: "https://vk.com/yourstudio", icon: "/vk.svg", label: "VK" },
];

const faqs = [
  {
    question: "Как отменить или перенести бронь?",
    answer:
      "Свяжитесь с нами по телефону или в мессенджере не позднее чем за 24 часа до бронирования, и мы поможем вам перенести или отменить запись.",
  },
  {
    question: "Что взять с собой на фотосессию?",
    answer:
      "Возьмите сменную обувь, любимые аксессуары и хорошее настроение! Если нужны дополнительные реквизиты — уточните у администратора.",
  },
  {
    question: "Можно ли прийти с детьми или животными?",
    answer:
      "Да, конечно! Просто предупредите нас заранее, чтобы мы подготовили всё необходимое.",
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);
  return (
    <div className="flex flex-col min-h-screen font-sans bg-background text-foreground">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center bg-gradient-to-b from-primary/10 to-transparent">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Vasha Studio</h1>
        <p className="text-lg sm:text-xl mb-8 max-w-xl mx-auto">
          Современная фотостудия в центре города. Забронируйте удобное время
          онлайн и создайте незабываемые снимки!
        </p>
        <Button asChild size="lg" className="px-8 py-4 text-lg font-semibold">
          <Link href="/booking">Забронировать сейчас</Link>
        </Button>
      </section>

      {/* Gallery Preview */}
      <section className="py-12 px-4 bg-muted">
        <h2 className="text-2xl font-bold text-center mb-8">Наши работы</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <Link href="/gallery">
            <Image
              src="/gallery1.jpg"
              alt="Пример работы 1"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-40 hover:scale-105 transition-transform"
            />
          </Link>
          <Link href="/gallery">
            <Image
              src="/gallery2.jpg"
              alt="Пример работы 2"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-40 hover:scale-105 transition-transform"
            />
          </Link>
          <Link href="/gallery">
            <Image
              src="/gallery3.jpg"
              alt="Пример работы 3"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-40 hover:scale-105 transition-transform"
            />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">
          Почему выбирают нас?
        </h2>
        <div className="grid sm:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-primary text-4xl mb-2">📸</div>
            <h3 className="font-semibold mb-1">
              Профессиональное оборудование
            </h3>
            <p className="text-muted-foreground">
              Только лучшие камеры и свет для качественных снимков.
            </p>
          </div>
          <div>
            <div className="text-primary text-4xl mb-2">🏠</div>
            <h3 className="font-semibold mb-1">Уютная атмосфера</h3>
            <p className="text-muted-foreground">
              Просторное помещение и стильные декорации.
            </p>
          </div>
          <div>
            <div className="text-primary text-4xl mb-2">🗓️</div>
            <h3 className="font-semibold mb-1">Удобное онлайн-бронирование</h3>
            <p className="text-muted-foreground">
              Быстро выбирайте дату и время прямо на сайте.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 px-4 bg-muted/50">
        <h2 className="text-2xl font-bold text-center mb-8">Отзывы клиентов</h2>
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-stretch max-w-4xl mx-auto">
          {testimonials.map(({ name, text, avatar }, i) => (
            <div
              key={i}
              className="bg-background rounded-xl shadow p-6 flex flex-col items-center flex-1"
            >
              <Image
                src={avatar}
                alt={name}
                width={64}
                height={64}
                className="rounded-full mb-4"
              />
              <p className="italic mb-2">“{text}”</p>
              <span className="font-semibold text-primary">{name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 px-4">
        <h2 className="text-2xl font-bold text-center mb-8">
          Как это работает?
        </h2>
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center max-w-3xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mb-2 text-xl font-bold">
              1
            </div>
            <span>Выберите дату</span>
          </div>
          <div className="hidden sm:block text-2xl">→</div>
          <div className="flex flex-col items-center">
            <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mb-2 text-xl font-bold">
              2
            </div>
            <span>Выберите время</span>
          </div>
          <div className="hidden sm:block text-2xl">→</div>
          <div className="flex flex-col items-center">
            <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mb-2 text-xl font-bold">
              3
            </div>
            <span>Заполните данные</span>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4 bg-muted/50">
        <h2 className="text-2xl font-bold text-center mb-8">
          Часто задаваемые вопросы
        </h2>
        <div className="max-w-2xl mx-auto divide-y divide-muted-foreground/20 rounded-lg bg-background shadow">
          {faqs.map((faq, idx) => (
            <div key={idx}>
              <button
                className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary text-base font-medium"
                aria-expanded={openFaq === idx}
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <span>{faq.question}</span>
                <span
                  className={`ml-2 transition-transform ${
                    openFaq === idx ? "rotate-90" : "rotate-0"
                  }`}
                >
                  ▶
                </span>
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-4 text-muted-foreground animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-muted-foreground text-sm border-t border-muted flex flex-col items-center gap-2">
        <div> 2024 Vasha Studio · Все права защищены</div>
        <div className="flex gap-4 justify-center mt-2">
          {socials.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="hover:opacity-80"
            >
              <Image src={s.icon} alt={s.label} width={28} height={28} />
            </a>
          ))}
        </div>
        <div className="mt-2">
          <a href="tel:+79999999999" className="hover:underline">
            +7 (999) 999-99-99
          </a>{" "}
          ·
          <a href="mailto:info@vasha.studio" className="hover:underline ml-2">
            info@vasha.studio
          </a>
        </div>
      </footer>
    </div>
  );
}
