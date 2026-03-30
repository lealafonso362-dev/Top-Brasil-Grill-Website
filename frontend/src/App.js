import React, { useState, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { Star, MapPin, Phone, Clock, Instagram, Facebook, Menu, X, ChevronRight, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Images from design guidelines
const IMAGES = {
  logo: "https://customer-assets.emergentagent.com/job_brasil-sabor/artifacts/kuwhfuv4_image_2026-03-30_144955180.png",
  hero: "https://static.prod-images.emergentagent.com/jobs/e37e1795-d1f6-48b2-b1ce-5d0991a50020/images/8deafcc03fa322d7b31645311606eaed07d022cdf6cadc5218221ad897819afc.png",
  interior: "https://static.prod-images.emergentagent.com/jobs/e37e1795-d1f6-48b2-b1ce-5d0991a50020/images/28f399f66e2140b559f3c9ead92f86996b10661fc6909f5bab1340d84c4ea5d8.png",
  leaves: "https://static.prod-images.emergentagent.com/jobs/e37e1795-d1f6-48b2-b1ce-5d0991a50020/images/726f564ef5204c7db690a0f8783a37f0ea4480d70eeb205b7c458ed11d2bb927.png",
  manicoba: "https://static.prod-images.emergentagent.com/jobs/e37e1795-d1f6-48b2-b1ce-5d0991a50020/images/215fb5f58612a38587423e05e5549e320107c76886abc07d14a4ef19d9138d57.png",
  acai: "https://images.pexels.com/photos/6637835/pexels-photo-6637835.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  coxinha: "https://images.unsplash.com/photo-1559141680-d0bd7bc5af84?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwzfHxicmF6aWxpYW4lMjBjaGVlc2UlMjBicmVhZHxlbnwwfHx8fDE3NzQ4Nzg5MjV8MA&ixlib=rb-4.1.0&q=85"
};

// Menu data
const menuData = {
  entradas: [
    { name: "Mini Coxinhas", description: "Coxinhas tradicionais brasileiras em tamanho aperitivo", price: "€6,50" },
    { name: "Pão de Queijo", description: "Autênticos pães de queijo mineiros quentinhos", price: "€5,00" },
    { name: "Bolinho de Bacalhau", description: "Bolinhos crocantes de bacalhau com especiarias", price: "€7,50" },
    { name: "Pastel de Carne", description: "Pastéis recheados com carne moída temperada", price: "€6,00" },
    { name: "Dadinhos de Tapioca", description: "Cubos crocantes de tapioca com geleia de pimenta", price: "€8,00" }
  ],
  pratos: [
    { name: "Tacacá", description: "Sopa amazônica tradicional com tucupi, jambu, camarão e goma", price: "€14,00" },
    { name: "Maniçoba", description: "Prato paraense com folhas de mandioca cozidas e carnes variadas", price: "€16,50" },
    { name: "Pato no Tucupi", description: "Pato cozido em tucupi com jambu - ícone do Pará", price: "€18,00" },
    { name: "Vatapá", description: "Creme baiano de camarão, pão, amendoim e leite de coco", price: "€15,00" },
    { name: "Moqueca de Peixe", description: "Ensopado de peixe fresco com leite de coco e dendê", price: "€17,50" },
    { name: "Feijoada Completa", description: "O clássico brasileiro com todas as carnes e acompanhamentos", price: "€19,00" },
    { name: "Picanha na Brasa", description: "Picanha grelhada no ponto com arroz, farofa e vinagrete", price: "€22,00" },
    { name: "Peixe Frito com Açaí", description: "Peixe da região frito com açaí e farinha d'água", price: "€16,00" }
  ],
  sobremesas: [
    { name: "Açaí com Tapioca", description: "Cremoso açaí da Amazônia com tapioca e granola", price: "€8,50" },
    { name: "Pudim de Leite", description: "Pudim cremoso de leite condensado", price: "€5,50" },
    { name: "Brigadeiro", description: "Doce brasileiro de chocolate com granulado", price: "€3,50" },
    { name: "Mousse de Maracujá", description: "Mousse leve e refrescante de maracujá", price: "€6,00" },
    { name: "Tapioca com Nutella", description: "Tapioca recheada com Nutella e banana", price: "€7,00" }
  ],
  bebidas: [
    { name: "Caipirinha Clássica", description: "Limão, cachaça, açúcar e gelo", price: "€7,00" },
    { name: "Guaraná Antarctica", description: "Refrigerante brasileiro tradicional", price: "€3,00" },
    { name: "Suco de Açaí", description: "Suco natural de açaí puro", price: "€5,00" },
    { name: "Suco de Cupuaçu", description: "Fruta amazônica refrescante", price: "€5,50" },
    { name: "Cerveja Brahma", description: "Cerveja brasileira gelada", price: "€4,00" }
  ]
};

// Reviews data
const reviews = [
  {
    name: "Amanda Letícia",
    text: "Nova experiência! Fomos hoje e simplesmente perfeito, ambiente acolhedor lembrando meu estado Pará 🤩❤️ A comida é autêntica e deliciosa!",
    rating: 5
  },
  {
    name: "Taís Rezende",
    text: "De entrada pedi mini coxinhas e depois um açaí com peixe frito e um tacacá. Delicioso! Voltarei com certeza.",
    rating: 5
  },
  {
    name: "Carlos Silva",
    text: "Melhor maniçoba fora do Brasil! O sabor é incrível e o atendimento é muito acolhedor. Recomendo a todos!",
    rating: 5
  },
  {
    name: "Maria Santos",
    text: "Finalmente encontrei comida paraense autêntica em Lisboa! O pato no tucupi estava divino. Ambiente muito agradável.",
    rating: 5
  },
  {
    name: "João Pereira",
    text: "Excelente restaurante! A feijoada de sábado é imperdível. Funcionários simpáticos e preços justos.",
    rating: 5
  }
];

// Star Rating Component
const StarRating = ({ rating }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        className={`w-5 h-5 ${i < rating ? 'fill-[#D4A017] text-[#D4A017]' : 'text-gray-300'}`} 
      />
    ))}
  </div>
);

// Header Component
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "#inicio", label: "Início" },
    { href: "#sobre", label: "Sobre" },
    { href: "#menu", label: "Menu" },
    { href: "#avaliacoes", label: "Avaliações" },
    { href: "#contacto", label: "Contacto" }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-header shadow-lg py-2' : 'bg-transparent py-4'
      }`}
      data-testid="main-header"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-3" data-testid="logo-link">
          <img 
            src={IMAGES.logo} 
            alt="Top Brasil Grill" 
            className="h-12 w-auto rounded-lg"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" data-testid="desktop-nav">
          {navLinks.map((link) => (
            <a 
              key={link.href}
              href={link.href}
              className={`nav-link font-montserrat ${!isScrolled ? 'text-white' : 'text-[#0B3D2E]'}`}
              data-testid={`nav-${link.label.toLowerCase()}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a 
            href="https://www.thefork.pt" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary text-sm"
            data-testid="header-reserve-btn"
          >
            Reservar Mesa
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2"
          data-testid="mobile-menu-btn"
        >
          {isMobileMenuOpen ? (
            <X className={`w-6 h-6 ${!isScrolled ? 'text-white' : 'text-[#0B3D2E]'}`} />
          ) : (
            <Menu className={`w-6 h-6 ${!isScrolled ? 'text-white' : 'text-[#0B3D2E]'}`} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#FFF6E5] shadow-xl"
          data-testid="mobile-menu"
        >
          <nav className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <a 
                key={link.href}
                href={link.href}
                className="nav-link text-[#0B3D2E] text-lg py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a 
              href="https://www.thefork.pt" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary text-center mt-4"
            >
              Reservar Mesa
            </a>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

// Hero Section
const HeroSection = () => (
  <section 
    id="inicio" 
    className="hero-section relative"
    data-testid="hero-section"
  >
    {/* Background Image */}
    <div 
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${IMAGES.hero})` }}
    />
    
    {/* Overlay */}
    <div className="hero-overlay" />
    
    {/* Content */}
    <div className="hero-content max-w-7xl mx-auto px-6 md:px-12">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl"
      >
        <span className="text-[#D4A017] font-montserrat text-sm uppercase tracking-[0.2em] font-bold mb-4 block">
          Saboreie a Amazónia em Lisboa
        </span>
        <h1 className="font-montserrat text-5xl md:text-6xl lg:text-7xl font-black text-[#FFF6E5] leading-tight mb-6 text-shadow">
          Descubra os Sabores Autênticos da Amazónia
        </h1>
        <p className="text-[#FFF6E5]/90 text-xl md:text-2xl font-lora leading-relaxed mb-8">
          Do Tacacá à Maniçoba, experimente o verdadeiro sabor do Brasil em cada mordida
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <a 
            href="https://www.thefork.pt" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center justify-center gap-2"
            data-testid="hero-reserve-btn"
          >
            <span>Reservar Mesa</span>
            <ChevronRight className="w-5 h-5" />
          </a>
          <a 
            href="https://www.ubereats.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center justify-center gap-2"
            data-testid="hero-order-btn"
          >
            <span>Pedir Online</span>
            <Utensils className="w-5 h-5" />
          </a>
        </div>
      </motion.div>
    </div>

    {/* Scroll indicator */}
    <motion.div 
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
    >
      <div className="w-6 h-10 border-2 border-[#FFF6E5]/50 rounded-full flex justify-center pt-2">
        <div className="w-1 h-3 bg-[#FFF6E5]/50 rounded-full" />
      </div>
    </motion.div>
  </section>
);

// About Section
const AboutSection = () => (
  <section id="sobre" className="py-24 md:py-32 bg-[#FFF6E5]" data-testid="about-section">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Image */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={IMAGES.interior} 
              alt="Interior do restaurante Top Brasil Grill"
              className="w-full h-[500px] object-cover"
            />
          </div>
          {/* Decorative element */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#D4A017]/20 rounded-2xl -z-10" />
        </motion.div>

        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-subtitle">A Nossa História</span>
          <h2 className="section-title mb-6">
            Um Sabor do Pará no Coração de Lisboa
          </h2>
          <div className="space-y-4 text-[#5C4033] text-lg leading-relaxed font-lora">
            <p>
              No <strong>Top Brasil Grill</strong>, trazemos os sabores autênticos da Amazónia para o seu prato. 
              Desde o tradicional Tacacá até à reconfortante Maniçoba, cada prato é preparado com carinho e amor, 
              tal como nas nossas casas no Brasil.
            </p>
            <p>
              A nossa cozinha é uma homenagem às tradições culinárias do Pará, usando ingredientes frescos 
              e receitas passadas de geração em geração. Venha descobrir porque somos o destino favorito 
              dos brasileiros e portugueses que buscam uma experiência gastronómica única.
            </p>
          </div>
          
          <div className="mt-8 grid grid-cols-3 gap-6">
            <div className="text-center">
              <span className="block text-4xl font-montserrat font-bold text-[#0B3D2E]">100%</span>
              <span className="text-sm text-[#5C4033]">Autêntico</span>
            </div>
            <div className="text-center">
              <span className="block text-4xl font-montserrat font-bold text-[#D4A017]">5★</span>
              <span className="text-sm text-[#5C4033]">Avaliação</span>
            </div>
            <div className="text-center">
              <span className="block text-4xl font-montserrat font-bold text-[#0B3D2E]">♥</span>
              <span className="text-sm text-[#5C4033]">Com Amor</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

// Menu Highlights Section
const MenuHighlights = () => (
  <section className="py-24 md:py-32 bg-[#F5E8D3]" data-testid="menu-highlights-section">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="section-subtitle">Os Nossos Destaques</span>
        <h2 className="section-title">Pratos Especiais</h2>
      </motion.div>

      {/* Bento Grid */}
      <div className="menu-grid">
        {/* Tacacá - Large Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="col-span-12 md:col-span-8 row-span-2 menu-card rounded-2xl overflow-hidden relative h-[400px] md:h-[500px]"
          data-testid="menu-highlight-tacaca"
        >
          <div className="card-image-container h-full">
            <img 
              src={IMAGES.hero} 
              alt="Tacacá"
              className="w-full h-full object-cover"
            />
            <div className="card-overlay" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
            <span className="text-[#D4A017] font-bold text-sm uppercase tracking-wider">Especialidade da Casa</span>
            <h3 className="font-montserrat text-3xl md:text-4xl font-bold mt-2">Tacacá</h3>
            <p className="text-white/80 mt-2 max-w-md">Sopa amazônica tradicional servida com tucupi, jambu, camarão seco e goma de tapioca</p>
            <span className="inline-block mt-4 text-2xl font-montserrat font-bold text-[#D4A017]">€14,00</span>
          </div>
        </motion.div>

        {/* Maniçoba */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="col-span-12 md:col-span-4 menu-card rounded-2xl overflow-hidden relative h-[240px]"
          data-testid="menu-highlight-manicoba"
        >
          <div className="card-image-container h-full">
            <img 
              src={IMAGES.manicoba} 
              alt="Maniçoba"
              className="w-full h-full object-cover"
            />
            <div className="card-overlay" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
            <h3 className="font-montserrat text-xl font-bold">Maniçoba</h3>
            <span className="text-[#D4A017] font-bold mt-1 block">€16,50</span>
          </div>
        </motion.div>

        {/* Açaí */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="col-span-12 md:col-span-4 menu-card rounded-2xl overflow-hidden relative h-[240px]"
          data-testid="menu-highlight-acai"
        >
          <div className="card-image-container h-full">
            <img 
              src={IMAGES.acai} 
              alt="Açaí com Tapioca"
              className="w-full h-full object-cover"
            />
            <div className="card-overlay" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
            <h3 className="font-montserrat text-xl font-bold">Açaí com Tapioca</h3>
            <span className="text-[#D4A017] font-bold mt-1 block">€8,50</span>
          </div>
        </motion.div>

        {/* Mini Coxinhas */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="col-span-12 md:col-span-4 menu-card rounded-2xl overflow-hidden relative h-[240px]"
          data-testid="menu-highlight-coxinha"
        >
          <div className="card-image-container h-full">
            <img 
              src={IMAGES.coxinha} 
              alt="Mini Coxinhas"
              className="w-full h-full object-cover"
            />
            <div className="card-overlay" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
            <h3 className="font-montserrat text-xl font-bold">Mini Coxinhas</h3>
            <span className="text-[#D4A017] font-bold mt-1 block">€6,50</span>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

// Full Digital Menu Section
const FullMenuSection = () => (
  <section id="menu" className="py-24 md:py-32 bg-[#FFF6E5]" data-testid="full-menu-section">
    <div className="max-w-5xl mx-auto px-6 md:px-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="section-subtitle">Cardápio Completo</span>
        <h2 className="section-title">O Nosso Menu</h2>
      </motion.div>

      <Tabs defaultValue="pratos" className="w-full">
        <TabsList className="w-full flex justify-center mb-8 bg-transparent gap-2 flex-wrap" data-testid="menu-tabs">
          <TabsTrigger 
            value="entradas" 
            className="menu-tab px-6 py-3 rounded-full bg-[#F5E8D3] data-[state=active]:bg-[#0B3D2E] data-[state=active]:text-[#FFF6E5] transition-all"
            data-testid="tab-entradas"
          >
            Entradas
          </TabsTrigger>
          <TabsTrigger 
            value="pratos" 
            className="menu-tab px-6 py-3 rounded-full bg-[#F5E8D3] data-[state=active]:bg-[#0B3D2E] data-[state=active]:text-[#FFF6E5] transition-all"
            data-testid="tab-pratos"
          >
            Pratos Principais
          </TabsTrigger>
          <TabsTrigger 
            value="sobremesas" 
            className="menu-tab px-6 py-3 rounded-full bg-[#F5E8D3] data-[state=active]:bg-[#0B3D2E] data-[state=active]:text-[#FFF6E5] transition-all"
            data-testid="tab-sobremesas"
          >
            Sobremesas
          </TabsTrigger>
          <TabsTrigger 
            value="bebidas" 
            className="menu-tab px-6 py-3 rounded-full bg-[#F5E8D3] data-[state=active]:bg-[#0B3D2E] data-[state=active]:text-[#FFF6E5] transition-all"
            data-testid="tab-bebidas"
          >
            Bebidas
          </TabsTrigger>
        </TabsList>

        {Object.entries(menuData).map(([category, items]) => (
          <TabsContent key={category} value={category}>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-[#0B3D2E]/10"
            >
              {items.map((item, index) => (
                <div key={index} className="menu-item group" data-testid={`menu-item-${category}-${index}`}>
                  <div className="flex-1">
                    <h4 className="menu-item-name group-hover:text-[#D4A017] transition-colors">{item.name}</h4>
                    <p className="menu-item-description">{item.description}</p>
                  </div>
                  <div className="dotted-leader hidden sm:block" />
                  <span className="menu-item-price">{item.price}</span>
                </div>
              ))}
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  </section>
);

// Reviews Section
const ReviewsSection = () => (
  <section id="avaliacoes" className="py-24 md:py-32 bg-[#F5E8D3]" data-testid="reviews-section">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="section-subtitle">Testemunhos</span>
        <h2 className="section-title">O Que Dizem os Nossos Clientes</h2>
      </motion.div>

      <Marquee 
        gradient={true}
        gradientColor="#F5E8D3"
        speed={40}
        pauseOnHover={true}
      >
        {reviews.map((review, index) => (
          <div 
            key={index}
            className="review-card mx-4 p-8 w-[350px] flex-shrink-0"
            data-testid={`review-card-${index}`}
          >
            <StarRating rating={review.rating} />
            <p className="mt-4 text-[#5C4033] font-lora italic leading-relaxed">
              "{review.text}"
            </p>
            <p className="mt-4 font-montserrat font-bold text-[#0B3D2E]">
              — {review.name}
            </p>
          </div>
        ))}
      </Marquee>
    </div>
  </section>
);

// CTA / Reservations Section
const ReservationsSection = () => (
  <section 
    className="cta-banner py-24 md:py-32 relative"
    style={{ backgroundImage: `url(${IMAGES.leaves})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    data-testid="reservations-section"
  >
    <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="text-[#D4A017] font-montserrat text-sm uppercase tracking-[0.2em] font-bold mb-4 block">
          Reserve Já
        </span>
        <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-[#FFF6E5] mb-6">
          Pronto Para Uma Experiência Amazônica?
        </h2>
        <p className="text-[#FFF6E5]/80 text-xl mb-10 max-w-2xl mx-auto font-lora">
          Reserve a sua mesa ou peça os nossos pratos para entrega. Sabores autênticos do Brasil à sua espera!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="https://www.thefork.pt" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center justify-center gap-2 text-lg"
            data-testid="cta-reserve-btn"
          >
            <span>Reservar no TheFork</span>
            <ChevronRight className="w-5 h-5" />
          </a>
          <a 
            href="https://www.ubereats.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center justify-center gap-2 text-lg"
            data-testid="cta-ubereats-btn"
          >
            <span>Pedir no Uber Eats</span>
            <Utensils className="w-5 h-5" />
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

// Location Section
const LocationSection = () => (
  <section id="contacto" className="py-24 md:py-32 bg-[#FFF6E5]" data-testid="location-section">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Map */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="map-container h-[400px] shadow-xl"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3109.8584768372687!2d-9.127857684679893!3d38.79744227958861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd19328adf68e0fd%3A0x41b4848ff!2sR.%20Guilherme%20Gomes%20Fernandes%2012%2C%202680-115%20Camarate!5e0!3m2!1sen!2spt!4v1680000000000!5m2!1sen!2spt"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização Top Brasil Grill"
          />
        </motion.div>

        {/* Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-subtitle">Visite-nos</span>
          <h2 className="section-title mb-8">Onde Estamos</h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#0B3D2E] rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-[#FFF6E5]" />
              </div>
              <div>
                <h4 className="font-montserrat font-bold text-[#0B3D2E] mb-1">Morada</h4>
                <p className="text-[#5C4033] font-lora">
                  R. Guilherme Gomes Fernandes 12<br />
                  2680-115 Camarate, Portugal
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#D4A017] rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-[#0B3D2E]" />
              </div>
              <div>
                <h4 className="font-montserrat font-bold text-[#0B3D2E] mb-1">Horário</h4>
                <p className="text-[#5C4033] font-lora">
                  Segunda a Sexta: 12h00 - 22h00<br />
                  Sábado e Domingo: 12h00 - 23h00
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#0B3D2E] rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-[#FFF6E5]" />
              </div>
              <div>
                <h4 className="font-montserrat font-bold text-[#0B3D2E] mb-1">Contacto</h4>
                <p className="text-[#5C4033] font-lora">
                  Telefone: +351 XXX XXX XXX<br />
                  Email: info@topbrasilgrill.pt
                </p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-8 pt-8 border-t border-[#0B3D2E]/10">
            <h4 className="font-montserrat font-bold text-[#0B3D2E] mb-4">Siga-nos</h4>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/topbrasilgrill/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-[#0B3D2E] rounded-full flex items-center justify-center hover:bg-[#D4A017] transition-colors"
                data-testid="social-instagram"
              >
                <Instagram className="w-6 h-6 text-[#FFF6E5]" />
              </a>
              <a 
                href="https://www.facebook.com/people/Topbrasil-Grill/100085253102792/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-[#0B3D2E] rounded-full flex items-center justify-center hover:bg-[#D4A017] transition-colors"
                data-testid="social-facebook"
              >
                <Facebook className="w-6 h-6 text-[#FFF6E5]" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

// Footer
const Footer = () => (
  <footer className="bg-[#0B3D2E] py-16" data-testid="footer">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-2">
          <img 
            src={IMAGES.logo} 
            alt="Top Brasil Grill" 
            className="h-16 w-auto rounded-lg mb-4"
          />
          <p className="text-[#FFF6E5]/70 font-lora max-w-md">
            Sabores autênticos da Amazónia no coração de Lisboa. 
            Venha descobrir a verdadeira culinária brasileira.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-montserrat font-bold text-[#D4A017] mb-4">Links Rápidos</h4>
          <nav className="flex flex-col gap-2">
            <a href="#inicio" className="footer-link">Início</a>
            <a href="#sobre" className="footer-link">Sobre Nós</a>
            <a href="#menu" className="footer-link">Menu</a>
            <a href="#avaliacoes" className="footer-link">Avaliações</a>
            <a href="#contacto" className="footer-link">Contacto</a>
          </nav>
        </div>

        {/* Social & Contact */}
        <div>
          <h4 className="font-montserrat font-bold text-[#D4A017] mb-4">Redes Sociais</h4>
          <div className="flex gap-3 mb-6">
            <a 
              href="https://www.instagram.com/topbrasilgrill/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://www.facebook.com/people/Topbrasil-Grill/100085253102792/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <a 
              href="https://www.thefork.pt" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4A017] font-bold hover:underline"
            >
              Reserve no TheFork →
            </a>
            <a 
              href="https://www.ubereats.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4A017] font-bold hover:underline"
            >
              Peça no Uber Eats →
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 pt-8 border-t border-[#FFF6E5]/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[#FFF6E5]/50 text-sm">
          © 2024 Top Brasil Grill. Todos os direitos reservados.
        </p>
        <p className="text-[#FFF6E5]/50 text-sm">
          Feito com ❤️ em Lisboa
        </p>
      </div>
    </div>
  </footer>
);

// Main Home Page
const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <Header />
      <HeroSection />
      <AboutSection />
      <MenuHighlights />
      <FullMenuSection />
      <ReviewsSection />
      <ReservationsSection />
      <LocationSection />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
