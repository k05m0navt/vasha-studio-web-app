"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import * as React from "react";
import { FaUserCircle, FaRegSmile, FaRegGrinStars } from "react-icons/fa";

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

const testimonialIcons = [
  <FaUserCircle className="text-primary" size={48} key="user" />,
  <FaRegSmile className="text-primary" size={48} key="smile" />,
  <FaRegGrinStars className="text-primary" size={48} key="star" />,
];

function ContactForm() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [errors, setErrors] = React.useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [submitting, setSubmitting] = React.useState(false);

  const validate = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!name.trim()) newErrors.name = "Введите имя";
    if (!email.trim()) newErrors.email = "Введите email";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      newErrors.email = "Введите корректный email";
    if (!message.trim()) newErrors.message = "Введите сообщение";
    return newErrors;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    setSubmitting(true);
    setTimeout(() => {
      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
      setSubmitting(false);
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-8 bg-background rounded-lg shadow"
    >
      <Input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Имя"
        className="w-full mb-2"
        aria-label="Имя"
      />
      {errors.name && (
        <p className="text-red-500 text-sm mb-2">{errors.name}</p>
      )}
      <Input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email"
        className="w-full mb-2"
        aria-label="Email"
      />
      {errors.email && (
        <p className="text-red-500 text-sm mb-2">{errors.email}</p>
      )}
      <Input
        type="text"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Сообщение"
        className="w-full mb-2"
        aria-label="Сообщение"
      />
      {errors.message && (
        <p className="text-red-500 text-sm mb-2">{errors.message}</p>
      )}
      <Button type="submit" className="w-full mt-2" disabled={submitting}>
        {submitting ? "Отправка..." : "Отправить"}
      </Button>
      {success && <p className="text-green-500 mt-4">Сообщение отправлено!</p>}
    </form>
  );
}

export default function Home() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState(false);
  // React.useEffect(() => {
  //   const timer = setTimeout(() => setLoading(false), 1000);
  //   return () => clearTimeout(timer);
  // }, []);
  return (
    <div className="flex flex-col min-h-screen font-sans bg-background text-foreground">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center bg-gradient-to-b from-primary/10 to-transparent opacity-0 animate-fade-in-down">
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
      <section className="py-12 px-4 bg-muted opacity-0 animate-fade-in">
        <h2 className="text-2xl font-bold text-center mb-8">Наши работы</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {loading
            ? [0, 1, 2].map((i) => (
                <Skeleton
                  key={i}
                  className="w-full h-[300px] rounded-xl object-cover"
                  style={{ aspectRatio: "4/3" }}
                />
              ))
            : [
                <Link href="/gallery" key="gallery-link-1">
                  <Image
                    src="/gallery1.jpeg"
                    alt="Съемка в студии 1"
                    width={1200}
                    height={900}
                    className="rounded-xl object-cover w-full h-[300px] sm:h-[350px] md:h-[400px] hover:scale-105 transition-transform shadow-lg"
                  />
                </Link>,
                <Link href="/gallery" key="gallery-link-2">
                  <Image
                    src="/gallery2.jpeg"
                    alt="Портретная фотосессия"
                    width={1200}
                    height={900}
                    className="rounded-xl object-cover w-full h-[300px] sm:h-[350px] md:h-[400px] hover:scale-105 transition-transform shadow-lg"
                  />
                </Link>,
                <Link href="/gallery" key="gallery-link-3">
                  <Image
                    src="/gallery3.jpeg"
                    alt="Семейная фотосессия"
                    width={1200}
                    height={900}
                    className="rounded-xl object-cover w-full h-[300px] sm:h-[350px] md:h-[400px] hover:scale-105 transition-transform shadow-lg"
                  />
                </Link>,
              ]}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 max-w-4xl mx-auto opacity-0 animate-fade-in">
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
      <section className="py-12 px-4 bg-muted/50 opacity-0 animate-fade-in">
        <h2 className="text-2xl font-bold text-center mb-8">Отзывы клиентов</h2>
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-stretch max-w-4xl mx-auto">
          {testimonials.map(({ name, text }, i) => (
            <div
              key={i}
              className="flex flex-col items-center bg-background rounded-lg shadow p-6 flex-1"
            >
              {testimonialIcons[i % testimonialIcons.length]}
              <div className="italic mb-2 mt-2">“{text}”</div>
              <div className="font-semibold">{name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 px-4 opacity-0 animate-fade-in">
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
      <section className="py-12 px-4 bg-muted/50 opacity-0 animate-fade-in">
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

      {/* Contact Form Section */}
      <section className="py-12 px-4 opacity-0 animate-fade-in">
        <h2 className="text-2xl font-bold text-center mb-8">
          Связаться с нами
        </h2>
        <ContactForm />
      </section>
    </div>
  );
}
