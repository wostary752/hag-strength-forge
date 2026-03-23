import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import PageSEO from "@/components/PageSEO";
import rackLiteMain from "@/assets/rack-lite-main.jpg";
import discRackNew from "@/assets/disc-rack-new.png";
import barbellRackLoaded from "@/assets/barbell-rack-loaded.png";
import bench45 from "@/assets/bench-45.png";
import latPulldownMain from "@/assets/lat-pulldown-main.png";
import { Dumbbell, Heart, Zap, SlidersHorizontal, X } from "lucide-react";

const allProducts = [
  {
    id: "rack-lite",
    title: "RACK LITE",
    image: rackLiteMain,
    description: "Стойка для приседаний. Болтовая сборка, сталь 20 и 09Г2С. Надёжный партнёр для серьёзных тренировок.",
    price: "152 000 ₽",
    numericPrice: 152000,
    category: "Силовые тренажеры",
    href: "/product/rack-lite",
  },
  {
    id: "lat-pulldown",
    title: "Тяга верхнего блока HGL294",
    image: latPulldownMain,
    description: "Грузоблочный тренажёр для широчайших мышц спины. Стек 100 кг, шаг 5 кг.",
    price: "185 000 ₽",
    numericPrice: 185000,
    category: "Силовые тренажеры",
    href: "/product/lat-pulldown",
  },
  {
    id: "disc-rack-8",
    title: "Стойка для дисков HGL01",
    image: discRackNew,
    description: "Сталь 3 мм, восемь держателей 50 мм. Компактная — подойдёт и залу, и дому.",
    price: "34 800 ₽",
    numericPrice: 34800,
    category: "Вспомогательное оборудование",
    href: "/product/disc-rack-8",
    imageNaturalSize: true,
  },
  {
    id: "barbell-rack-10",
    title: "Стойка для 10 грифов HGL02",
    image: barbellRackLoaded,
    description: "Надёжная стойка для хранения до 10 грифов. Каркас из стали 20, А-образная конструкция.",
    price: "65 000 ₽",
    numericPrice: 65000,
    category: "Вспомогательное оборудование",
    href: "/product/barbell-rack-10",
    imageNaturalSize: true,
  },
  {
    id: "bench-universal",
    title: "Скамья универсальная HGL03",
    image: bench45,
    description: "Регулируемая скамья для жима и силовых упражнений. Угол наклона до 90°, вес всего 20 кг.",
    price: "35 000 ₽",
    numericPrice: 35000,
    category: "Вспомогательное оборудование",
    href: "/product/bench-universal",
    imageNaturalSize: true,
  },
];

const categoryOptions = ["Все", "Силовые тренажеры", "Вспомогательное оборудование"];
const priceRanges = [
  { label: "Все цены", min: 0, max: Infinity },
  { label: "До 40 000 ₽", min: 0, max: 40000 },
  { label: "40 000 — 100 000 ₽", min: 40000, max: 100000 },
  { label: "100 000 — 200 000 ₽", min: 100000, max: 200000 },
  { label: "От 200 000 ₽", min: 200000, max: Infinity },
];

const comingSoon = [
  { title: "Кардио тренажеры", icon: Heart, description: "Беговые дорожки, велотренажеры, эллипсы", href: "/products/cardio" },
  { title: "Функциональный тренинг", icon: Zap, description: "Канатные машины, TRX, кроссоверы", href: "/products/functional" },
];

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      if (selectedCategory !== "Все" && p.category !== selectedCategory) return false;
      const range = priceRanges[selectedPriceRange];
      if (p.numericPrice === 0) return true; // "По запросу" always shown
      return p.numericPrice >= range.min && p.numericPrice <= range.max;
    });
  }, [selectedCategory, selectedPriceRange]);

  const hasFilters = selectedCategory !== "Все" || selectedPriceRange !== 0;

  return (
    <Layout>
      <PageSEO
        title="Каталог спортивного оборудования HAGL — силовые рамы, стойки, скамьи"
        description="Полный каталог профессионального спортивного оборудования HAGL. Силовые рамы, тяга верхнего блока, стойки для дисков и грифов, скамьи для жима. Купить тренажёры с доставкой по России."
        path="/catalog"
      />
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'2\' fill=\'white\'/%3E%3C/svg%3E")', backgroundSize: '40px 40px' }} />
        <div className="container mx-auto relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-6xl uppercase tracking-wider text-center mb-4"
          >
            Весь <span className="text-primary">ассортимент</span>
          </motion.h1>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Полный каталог оборудования HAGL — от силовых рам до стоек для хранения
          </p>

          {/* Filters */}
          <div className="mb-8">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 text-sm font-heading uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Фильтры
              {hasFilters && (
                <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  !
                </span>
              )}
            </button>

            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-card border border-border rounded-lg p-6 space-y-4"
              >
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Тип оборудования</p>
                  <div className="flex flex-wrap gap-2">
                    {categoryOptions.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded text-sm font-heading uppercase tracking-wide transition-colors ${
                          selectedCategory === cat
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-foreground hover:bg-secondary/80 border border-border"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Цена</p>
                  <div className="flex flex-wrap gap-2">
                    {priceRanges.map((range, i) => (
                      <button
                        key={range.label}
                        onClick={() => setSelectedPriceRange(i)}
                        className={`px-4 py-2 rounded text-sm font-heading uppercase tracking-wide transition-colors ${
                          selectedPriceRange === i
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-foreground hover:bg-secondary/80 border border-border"
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>
                {hasFilters && (
                  <button
                    onClick={() => { setSelectedCategory("Все"); setSelectedPriceRange(0); }}
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-3 w-3" /> Сбросить фильтры
                  </button>
                )}
              </motion.div>
            )}
          </div>

          {/* Available products */}
          <h2 className="font-heading text-2xl uppercase tracking-wider mb-6">
            В <span className="text-primary">наличии</span>
            <span className="text-sm text-muted-foreground ml-3 normal-case">({filteredProducts.length})</span>
          </h2>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>Нет товаров, соответствующих фильтрам</p>
              <button
                onClick={() => { setSelectedCategory("Все"); setSelectedPriceRange(0); }}
                className="text-primary hover:underline mt-2"
              >
                Сбросить фильтры
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {filteredProducts.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <ProductCard
                    title={p.title}
                    image={p.image}
                    description={p.description}
                    price={p.price}
                    href={p.href}
                    imageNaturalSize={p.imageNaturalSize}
                  />
                </motion.div>
              ))}
            </div>
          )}

          {/* Coming soon categories */}
          <h2 className="font-heading text-2xl uppercase tracking-wider mb-6">
            Скоро в <span className="text-primary">каталоге</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {comingSoon.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={cat.href}
                  className="block bg-card border border-border rounded-lg p-8 text-center hover-lift group"
                >
                  <cat.icon className="h-12 w-12 mx-auto mb-4 text-primary transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="font-heading text-xl uppercase tracking-wide mb-2">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground">{cat.description}</p>
                  <span className="inline-block mt-4 text-xs text-muted-foreground/60 font-heading uppercase tracking-widest">В разработке</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
