"use client";
import * as React from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

const galleryImages = [
  { src: "/gallery1.jpeg", alt: "Съемка в студии 1", category: "Детские" },
  { src: "/gallery2.jpeg", alt: "Портретная фотосессия", category: "Портреты" },
  { src: "/gallery3.jpeg", alt: "Семейная фотосессия", category: "Семейные" },
];

const categories = ["Все", "Портреты", "Семейные", "Детские", "Творческие"];

export default function GalleryPage() {
  const [selected, setSelected] = React.useState<number | null>(null);
  const [filter, setFilter] = React.useState("Все");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [filter]);

  const filteredImages = filter === "Все"
    ? galleryImages
    : galleryImages.filter((img) => img.category === filter);

  return (
    <main className="min-h-screen bg-background py-16 px-4">
      <h1 className="text-3xl font-bold mb-10 text-center">Галерея работ Vasha Studio</h1>
      <div className="flex gap-3 justify-center mb-8 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full border transition-colors text-sm font-medium
              ${filter === cat ? "bg-primary text-primary-foreground border-primary" : "bg-background border-muted text-muted-foreground hover:bg-muted"}`}
            onClick={() => setFilter(cat)}
            aria-pressed={filter === cat}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {loading
          ? [0, 1, 2, 3, 4, 5].map(i => (
              <Skeleton key={i} className="w-full h-[250px] sm:h-[300px] md:h-[350px] rounded-xl object-cover" style={{ aspectRatio: '3/2' }} />
            ))
          : filteredImages.map((img, idx) => {
              const realIdx = galleryImages.findIndex(g => g.src === img.src);
              return (
                <Dialog key={img.src} open={selected === realIdx} onOpenChange={(open: boolean) => setSelected(open ? realIdx : null)}>
                  <DialogTrigger asChild>
                    <button className="focus:outline-none group rounded-xl overflow-hidden shadow-lg focus:ring-4 focus:ring-primary/50 transition">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={900}
                        height={600}
                        className="w-full h-[250px] sm:h-[300px] md:h-[350px] group-hover:scale-105 transition-transform duration-200"
                        priority={realIdx < 3}
                      />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="flex flex-col items-center bg-background p-0 max-w-3xl rounded-2xl shadow-2xl overflow-hidden">
                    <DialogTitle className="sr-only">{img.alt}</DialogTitle>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={1400}
                      height={900}
                      className="object-contain w-full h-auto"
                    />
                    <div className="p-4 text-center text-base font-medium">{img.alt}</div>
                  </DialogContent>
                </Dialog>
              );
            })}
      </div>
    </main>
  );
}
