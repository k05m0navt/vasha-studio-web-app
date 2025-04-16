"use client";
import * as React from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

const galleryImages = [
  { src: "/gallery1.jpg", alt: "Съемка в студии 1", category: "Творческие" },
  { src: "/gallery2.jpg", alt: "Портретная фотосессия", category: "Портреты" },
  { src: "/gallery3.jpg", alt: "Семейная фотосессия", category: "Семейные" },
  { src: "/gallery4.jpg", alt: "Детская фотосъемка", category: "Детские" },
  { src: "/gallery5.jpg", alt: "Творческая съемка", category: "Творческие" },
  { src: "/gallery6.jpg", alt: "Парная фотосессия", category: "Семейные" },
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
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-48 rounded-lg" />
            ))
          : filteredImages.map((img, idx) => {
              const realIdx = galleryImages.findIndex(g => g.src === img.src);
              return (
                <Dialog key={img.src} open={selected === realIdx} onOpenChange={(open: boolean) => setSelected(open ? realIdx : null)}>
                  <DialogTrigger asChild>
                    <button className="focus:outline-none group">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={600}
                        height={400}
                        className="rounded-lg object-cover w-full h-48 group-hover:scale-105 transition-transform"
                        priority={realIdx < 3}
                      />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="flex flex-col items-center bg-background p-0 max-w-2xl">
                    <DialogTitle className="sr-only">{img.alt}</DialogTitle>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={900}
                      height={600}
                      className="rounded-lg object-contain w-full h-auto"
                    />
                    <div className="p-4 text-center text-base">{img.alt}</div>
                  </DialogContent>
                </Dialog>
              );
            })}
      </div>
    </main>
  );
}
