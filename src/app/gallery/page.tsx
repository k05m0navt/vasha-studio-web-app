"use client";
import * as React from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";

const galleryImages = [
  { src: "/gallery1.jpg", alt: "Съемка в студии 1" },
  { src: "/gallery2.jpg", alt: "Портретная фотосессия" },
  { src: "/gallery3.jpg", alt: "Семейная фотосессия" },
  { src: "/gallery4.jpg", alt: "Детская фотосъемка" },
  { src: "/gallery5.jpg", alt: "Творческая съемка" },
  { src: "/gallery6.jpg", alt: "Парная фотосессия" },
];

export default function GalleryPage() {
  const [selected, setSelected] = React.useState<number | null>(null);

  return (
    <main className="min-h-screen bg-background py-16 px-4">
      <h1 className="text-3xl font-bold mb-10 text-center">Галерея работ Vasha Studio</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {galleryImages.map((img, idx) => (
          <Dialog key={img.src} open={selected === idx} onOpenChange={(open: boolean) => setSelected(open ? idx : null)}>
            <DialogTrigger asChild>
              <button className="focus:outline-none group">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={400}
                  className="rounded-lg object-cover w-full h-48 group-hover:scale-105 transition-transform"
                  priority={idx < 3}
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
        ))}
      </div>
    </main>
  );
}
