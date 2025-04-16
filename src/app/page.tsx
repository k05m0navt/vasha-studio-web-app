import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-background text-foreground">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center bg-gradient-to-b from-primary/10 to-transparent">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Vasha Studio</h1>
        <p className="text-lg sm:text-xl mb-8 max-w-xl mx-auto">
          Современная фотостудия в центре города. Забронируйте удобное время онлайн и создайте незабываемые снимки!
        </p>
        <Button asChild size="lg" className="px-8 py-4 text-lg font-semibold">
          <Link href="/booking">Забронировать сейчас</Link>
        </Button>
      </section>

      {/* Gallery Preview */}
      <section className="py-12 px-4 bg-muted">
        <h2 className="text-2xl font-bold text-center mb-8">Наши работы</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <Image src="/gallery1.jpg" alt="Пример работы 1" width={400} height={300} className="rounded-lg object-cover w-full h-40" />
          <Image src="/gallery2.jpg" alt="Пример работы 2" width={400} height={300} className="rounded-lg object-cover w-full h-40" />
          <Image src="/gallery3.jpg" alt="Пример работы 3" width={400} height={300} className="rounded-lg object-cover w-full h-40" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Почему выбирают нас?</h2>
        <div className="grid sm:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-primary text-4xl mb-2">📸</div>
            <h3 className="font-semibold mb-1">Профессиональное оборудование</h3>
            <p className="text-muted-foreground">Только лучшие камеры и свет для качественных снимков.</p>
          </div>
          <div>
            <div className="text-primary text-4xl mb-2">🏠</div>
            <h3 className="font-semibold mb-1">Уютная атмосфера</h3>
            <p className="text-muted-foreground">Просторное помещение и стильные декорации.</p>
          </div>
          <div>
            <div className="text-primary text-4xl mb-2">🗓️</div>
            <h3 className="font-semibold mb-1">Удобное онлайн-бронирование</h3>
            <p className="text-muted-foreground">Быстро выбирайте дату и время прямо на сайте.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 px-4 bg-muted/50">
        <h2 className="text-2xl font-bold text-center mb-8">Как это работает?</h2>
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center max-w-3xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mb-2 text-xl font-bold">1</div>
            <span>Выберите дату</span>
          </div>
          <div className="hidden sm:block text-2xl">→</div>
          <div className="flex flex-col items-center">
            <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mb-2 text-xl font-bold">2</div>
            <span>Выберите время</span>
          </div>
          <div className="hidden sm:block text-2xl">→</div>
          <div className="flex flex-col items-center">
            <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mb-2 text-xl font-bold">3</div>
            <span>Заполните данные</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-muted-foreground text-sm border-t border-muted">
        <div> 2024 Vasha Studio · Все права защищены</div>
        <div className="mt-2">
          <a href="tel:+79999999999" className="hover:underline">+7 (999) 999-99-99</a> ·
          <a href="mailto:info@vasha.studio" className="hover:underline ml-2">info@vasha.studio</a>
        </div>
      </footer>
    </div>
  );
}
