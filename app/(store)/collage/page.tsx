import Link from "next/link"
import { Button } from "@/components/ui/button"

const collageItems = [
  {
    id: 1,
    title: "Street Culture",
    subtitle: "Authentic urban lifestyle",
    image: "/urban-lifestyle-street-culture-photography-wide-ba.jpg",
    category: "streetwear",
    span: "md:col-span-2",
    height: "h-64 md:h-80",
  },
  {
    id: 2,
    title: "Skate Life",
    subtitle: "Board culture",
    image: "/skateboard-culture-lifestyle-photography.jpg",
    category: "skateboard",
    span: "",
    height: "h-64 md:h-96",
  },
  {
    id: 3,
    title: "Winter Vibes",
    subtitle: "Mountain ready",
    image: "/winter-sports-snowboard-mountain-lifestyle.jpg",
    category: "snowboard",
    span: "",
    height: "h-64 md:h-96",
  },
  {
    id: 4,
    title: "Complete Your Look",
    subtitle: "Premium accessories and gear",
    image: "/streetwear-fashion-accessories-lifestyle-photograp.jpg",
    category: "accessori",
    span: "md:col-span-2",
    height: "h-64 md:h-80",
  },
]

export function PhotoCollage() {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
          {collageItems.map((item) => (
            <Link
              key={item.id}
              href={`/categories/${item.category}`}
              className={`group relative ${item.height} overflow-hidden rounded-lg ${item.span}`}
            >
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300" />

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button variant="secondary" className="bg-white/90 text-black hover:bg-white font-semibold">
                  View All Products
                </Button>
              </div>

              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="font-serif text-xl md:text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm opacity-90">{item.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
