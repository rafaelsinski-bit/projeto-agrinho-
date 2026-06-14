import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, token, functionsVersion, appBaseUrl } = appParams;

//Create a client with authentication required
export const base44 = createClient({
  appId,
  token,
  functionsVersion,
  serverUrl: '',
  requiresAuth: false,
  appBaseUrl
});
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Check, ExternalLink } from "lucide-react";

export default function ActionCard({ icon: Icon, title, description, steps, image, delay }) {
  const [expanded, setExpanded] = useState(false);
  const [adopted, setAdopted] = useState([]);

  const toggleAdopt = (idx) => {
    setAdopted((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className="group relative"
    >
      <div
        onClick={() => setExpanded(!expanded)}
        className={`cursor-pointer rounded-3xl overflow-hidden border border-border/60 transition-all duration-500 ${
          expanded ? "bg-card shadow-2xl shadow-primary/5" : "bg-card/60 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5"
        }`}
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          <div className="absolute bottom-4 left-5">
            <div className="bg-primary/10 backdrop-blur-md rounded-xl p-2.5 border border-primary/20">
              <Icon className="w-5 h-5 text-primary" />
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-heading text-xl font-semibold text-foreground">
              {title}
            </h3>
            <ChevronRight
              className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${
                expanded ? "rotate-90" : ""
              }`}
            />
          </div>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="px-6 pb-6"
          >
            <div className="border-t border-border pt-4">
              <p className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-4">
                Micro-Passos para começar
              </p>
              <div className="space-y-3">
                {steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 group/step"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleAdopt(idx);
                      }}
                      className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                        adopted.includes(idx)
                          ? "bg-primary border-primary"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {adopted.includes(idx) && (
                        <Check className="w-3.5 h-3.5 text-primary-foreground" />
                      )}
                    </button>
                    <span
                      className={`font-body text-sm transition-all ${
                        adopted.includes(idx)
                          ? "text-muted-foreground line-through"
                          : "text-foreground"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Zap, Recycle } from "lucide-react";
import ActionCard from "./ActionCard";

const actions = [
  {
    icon: ShoppingBag,
    title: "Consumo Consciente",
    description:
      "Repense o que você compra. Cada produto carrega uma história de recursos extraídos e energia consumida.",
    steps: [
      "Prefira produtos locais e sazonais",
      "Leve sacolas reutilizáveis ao mercado",
      "Escolha embalagens recicláveis ou a granel",
      "Doe ou venda roupas que não usa mais",
    ],
  },
  {
    icon: Zap,
    title: "Energia Inteligente",
    description:
      "Cada watt economizado é um passo em direção a um planeta mais limpo e um futuro energético renovável.",
    steps: [
      "Troque lâmpadas por LED de alta eficiência",
      "Desligue aparelhos da tomada quando não usar",
      "Aproveite a luz natural ao máximo",
      "Considere fontes de energia solar para sua casa",
    ],
  },
  {
    icon: Recycle,
    title: "Resíduo Zero",
    description:
      "Apenas 8% dos resíduos são reciclados no Brasil (ABREMA 2024). O lixo de hoje pode ser o recurso de amanhã.",
    steps: [
      "Separe resíduos recicláveis do orgânico",
      "Comece uma composteira doméstica",
      "Evite descartáveis de uso único",
      "Reutilize potes e embalagens de vidro",
    ],
  },
];

export default function ActionGuide({ images }) {
  return (
    <section id="acoes" className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent ml-8 md:ml-16 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 max-w-2xl"
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Matriz de Transição
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6">
            Pequenas ações,{" "}
            <span className="text-primary">impacto imenso</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            Você não precisa mudar tudo de uma vez. Comece por um micro-passo.
            Cada hábito sustentável cria um efeito cascata que transforma
            comunidades inteiras.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {actions.map((action, i) => (
            <ActionCard
              key={i}
              {...action}
              image={images[i]}
              delay={i * 0.12}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
import React from "react";
import { motion } from "framer-motion";
import { Building2, Trash2, Recycle, Droplets, Flame, Home, TrendingDown, Factory, BarChart3 } from "lucide-react";

const dataCards = [
  {
    icon: Flame,
    value: "2,145 bi",
    unit: "toneladas CO₂e",
    label: "Emissões do Brasil em 2024",
    detail: "Queda de 16,7% — a 2ª maior redução desde 1990",
    source: "Observatório do Clima / SEEG (2026)",
    trend: "down",
  },
  {
    icon: Trash2,
    value: "80 milhões",
    unit: "toneladas/ano",
    label: "Lixo produzido no Brasil",
    detail: "382 kg por pessoa ao ano. Somos o 5º maior gerador mundial",
    source: "ABREMA — Panorama dos Resíduos Sólidos (2024)",
    trend: "up",
  },
  {
    icon: Recycle,
    value: "8%",
    unit: "dos resíduos",
    label: "Taxa de reciclagem no Brasil",
    detail: "Chile recicla 14%. Países desenvolvidos passam de 25%",
    source: "ABREMA (2024)",
    trend: "neutral",
  },
  {
    icon: Home,
    value: "93,1%",
    unit: "dos domicílios",
    label: "Com coleta de lixo em 2024",
    detail: "Mas 4,7 milhões de lares ainda queimam resíduos",
    source: "IBGE — PNAD Contínua (2024)",
    trend: "up",
  },
  {
    icon: Droplets,
    value: "70,4%",
    unit: "dos domicílios",
    label: "Com acesso à rede de esgoto",
    detail: "Apenas 9,4% na zona rural. Norte: 31,2%",
    source: "IBGE — PNAD Contínua (2024)",
    trend: "up",
  },
  {
    icon: Factory,
    value: "89,1%",
    unit: "das indústrias",
    label: "Têm práticas ambientais",
    detail: "Empresas com +100 funcionários. Resíduos sólidos lideram",
    source: "IBGE — PINTEC (2023)",
    trend: "up",
  },
];

const trendColors = {
  up: "text-[#006D77] bg-[#D8F3DC]",
  down: "text-[#006D77] bg-[#D8F3DC]",
  neutral: "text-amber-600 bg-amber-50",
};

const trendLabels = {
  up: "Em crescimento",
  down: "Em queda (positivo)",
  neutral: "Precisa melhorar",
};

export default function DataPanel() {
  return (
    <section className="relative py-24 md:py-36 bg-gradient-to-b from-background via-[#F0F7F5] to-background overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D8F3DC]/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-5 h-5 text-primary" />
            <p className="font-body text-sm tracking-[0.3em] uppercase text-primary">
              Dados reais
            </p>
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6">
            O Brasil em números:{" "}
            <span className="text-primary">o que os dados oficiais revelam</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            Informações do IBGE, Observatório do Clima e ABREMA mostram avanços
            importantes — e desafios urgentes que dependem de cada um de nós.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group bg-card/80 backdrop-blur-sm border border-border/60 rounded-2xl p-6 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-primary/5 border border-primary/10">
                  <card.icon className="w-5 h-5 text-primary" />
                </div>
                <span
                  className={`text-[10px] font-heading font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider ${trendColors[card.trend]}`}
                >
                  {trendLabels[card.trend]}
                </span>
              </div>

              <div className="mb-3">
                <span className="font-heading text-3xl font-bold text-foreground">
                  {card.value}
                </span>
                <span className="font-body text-sm text-muted-foreground ml-2">
                  {card.unit}
                </span>
              </div>

              <p className="font-heading text-sm font-semibold text-foreground mb-2">
                {card.label}
              </p>

              <p className="font-body text-xs text-muted-foreground leading-relaxed mb-4">
                {card.detail}
              </p>

              <div className="pt-3 border-t border-border/40">
                <p className="font-body text-[10px] text-muted-foreground/60 italic">
                  Fonte: {card.source}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="font-body text-sm text-muted-foreground">
            Dados compilados de fontes oficiais: IBGE, Observatório do Clima
            (SEEG), ABREMA e Agência Brasil. Atualizados em 2024-2025.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Heart, Zap, Trophy, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCcw, Play } from "lucide-react";

const CANVAS_W = 600;
const CANVAS_H = 500;
const DRONE_SIZE = 36;
const ITEM_SIZE = 28;
const PEST_SIZE = 32;
const GAME_SPEED_BASE = 1.8;

export default function DroneGame() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const gameState = useRef({
    drone: { x: CANVAS_W / 2, y: CANVAS_H / 2 },
    items: [],
    pests: [],
    score: 0,
    lives: 3,
    gameOver: false,
    started: false,
    keys: {},
  });

  const [ui, setUi] = useState({
    score: 0,
    lives: 3,
    gameOver: false,
    started: false,
    highScore: 0,
  });

  // Generate random position along edges
  const spawnFromEdge = (size) => {
    const edge = Math.floor(Math.random() * 4);
    switch (edge) {
      case 0: return { x: Math.random() * CANVAS_W, y: -size };
      case 1: return { x: CANVAS_W + size, y: Math.random() * CANVAS_H };
      case 2: return { x: Math.random() * CANVAS_W, y: CANVAS_H + size };
      case 3: return { x: -size, y: Math.random() * CANVAS_H };
      default: return { x: 0, y: 0 };
    }
  };

  // Draw drone
  const drawDrone = (ctx, x, y) => {
    ctx.save();
    ctx.translate(x, y);

    // Shadow
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.beginPath();
    ctx.ellipse(4, 6, 16, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Body
    ctx.fillStyle = "#006D77";
    ctx.beginPath();
    ctx.roundRect(-14, -10, 28, 20, 6);
    ctx.fill();

    // Body highlight
    ctx.fillStyle = "#2A9D8F";
    ctx.beginPath();
    ctx.roundRect(-10, -8, 20, 8, 4);
    ctx.fill();

    // Arms
    ctx.strokeStyle = "#004D57";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-18, -4);
    ctx.lineTo(-28, -18);
    ctx.moveTo(18, -4);
    ctx.lineTo(28, -18);
    ctx.moveTo(-18, 4);
    ctx.lineTo(-28, 18);
    ctx.moveTo(18, 4);
    ctx.lineTo(28, 18);
    ctx.stroke();

    // Propellers (rotating)
    const t = performance.now() * 0.02;
    for (let dx of [-28, 28]) {
      for (let dy of [-18, 18]) {
        ctx.save();
        ctx.translate(dx, dy);
        ctx.rotate(t);
        ctx.fillStyle = "#95D5B2";
        ctx.fillRect(-8, -1, 16, 2);
        ctx.fillRect(-1, -8, 2, 16);
        ctx.restore();
      }
    }

    // Camera/eye
    ctx.fillStyle = "#FFC857";
    ctx.beginPath();
    ctx.arc(0, -2, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#1A1A1A";
    ctx.beginPath();
    ctx.arc(0, -2, 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  // Draw collectible sustainability item
  const drawItem = (ctx, x, y, type) => {
    ctx.save();
    ctx.translate(x, y);

    // Glow
    ctx.shadowColor = "#95D5B2";
    ctx.shadowBlur = 12;

    if (type === "leaf") {
      ctx.fillStyle = "#4CAF50";
      ctx.beginPath();
      ctx.ellipse(0, 0, 10, 6, 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#388E3C";
      ctx.lineWidth = 1;
      ctx.stroke();
      // Leaf vein
      ctx.beginPath();
      ctx.moveTo(-6, 0);
      ctx.lineTo(8, 0);
      ctx.stroke();
    } else if (type === "recycle") {
      ctx.strokeStyle = "#2A9D8F";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(0, -3, 7, Math.PI * 0.8, Math.PI * 1.8);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(6, 4, 7, Math.PI * 1.8, Math.PI * 0.8);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(-6, 4, 7, Math.PI * 0.8, Math.PI * 1.8);
      ctx.stroke();
      // Arrow heads
      ctx.fillStyle = "#2A9D8F";
      ctx.beginPath();
      ctx.moveTo(2, -8);
      ctx.lineTo(-2, -10);
      ctx.lineTo(4, -6);
      ctx.fill();
    } else if (type === "sun") {
      const pulse = Math.sin(performance.now() * 0.005) * 2 + 10;
      ctx.fillStyle = "#FFC857";
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const r = i % 2 === 0 ? pulse : 6;
        const px = Math.cos(angle) * r;
        const py = Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    } else if (type === "drop") {
      ctx.fillStyle = "#4FC3F7";
      ctx.beginPath();
      ctx.moveTo(0, -9);
      ctx.bezierCurveTo(6, -3, 6, 4, 0, 9);
      ctx.bezierCurveTo(-6, 4, -6, -3, 0, -9);
      ctx.fill();
    }

    ctx.restore();
  };

  // Draw pesticide obstacle
  const drawPest = (ctx, x, y) => {
    ctx.save();
    ctx.translate(x, y);

    // Glow
    ctx.shadowColor = "#E53935";
    ctx.shadowBlur = 8;

    // Skull-like shape
    ctx.fillStyle = "#D32F2F";
    ctx.beginPath();
    ctx.roundRect(-10, -8, 20, 16, 5);
    ctx.fill();

    // Darker band
    ctx.fillStyle = "#B71C1C";
    ctx.beginPath();
    ctx.roundRect(-10, 4, 20, 4, 2);
    ctx.fill();

    // Eyes
    ctx.fillStyle = "#FFF";
    ctx.beginPath();
    ctx.arc(-4, -2, 3, 0, Math.PI * 2);
    ctx.arc(4, -2, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#1A1A1A";
    ctx.beginPath();
    ctx.arc(-4, -2, 1.5, 0, Math.PI * 2);
    ctx.arc(4, -2, 1.5, 0, Math.PI * 2);
    ctx.fill();

    // X mouth
    ctx.strokeStyle = "#FFF";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-3, 3);
    ctx.lineTo(1, 5);
    ctx.moveTo(1, 3);
    ctx.lineTo(-3, 5);
    ctx.stroke();

    ctx.restore();
  };

  // Draw particles
  const drawParticles = (ctx, particles) => {
    for (const p of particles) {
      ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  // Particle system
  let particles = [];

  const spawnParticles = (x, y, color) => {
    for (let i = 0; i < 8; i++) {
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        size: Math.random() * 3 + 1,
        alpha: 1,
        r: color.r,
        g: color.g,
        b: color.b,
      });
    }
  };

  // Game loop
  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const gs = gameState.current;

    if (!gs.started || gs.gameOver) {
      animationRef.current = requestAnimationFrame(gameLoop);
      return;
    }

    // Update drone position
    const speed = 3.5;
    if (gs.keys["ArrowLeft"] || gs.keys["a"]) gs.drone.x -= speed;
    if (gs.keys["ArrowRight"] || gs.keys["d"]) gs.drone.x += speed;
    if (gs.keys["ArrowUp"] || gs.keys["w"]) gs.drone.y -= speed;
    if (gs.keys["ArrowDown"] || gs.keys["s"]) gs.drone.y += speed;

    // Clamp drone
    gs.drone.x = Math.max(DRONE_SIZE, Math.min(CANVAS_W - DRONE_SIZE, gs.drone.x));
    gs.drone.y = Math.max(DRONE_SIZE, Math.min(CANVAS_H - DRONE_SIZE, gs.drone.y));

    // Spawn items
    if (Math.random() < 0.025) {
      const types = ["leaf", "recycle", "sun", "drop"];
      const pos = spawnFromEdge(ITEM_SIZE);
      const targetX = gs.drone.x + (Math.random() - 0.5) * 200;
      const targetY = gs.drone.y + (Math.random() - 0.5) * 200;
      gs.items.push({
        x: pos.x,
        y: pos.y,
        type: types[Math.floor(Math.random() * types.length)],
        speed: 1 + Math.random() * 1.5,
        targetX,
        targetY,
      });
    }

    // Spawn pests
    const pestRate = 0.015 + gs.score * 0.0003;
    if (Math.random() < pestRate) {
      const pos = spawnFromEdge(PEST_SIZE);
      const angle = Math.atan2(gs.drone.y - pos.y, gs.drone.x - pos.x);
      gs.pests.push({
        x: pos.x,
        y: pos.y,
        vx: Math.cos(angle) * GAME_SPEED_BASE,
        vy: Math.sin(angle) * GAME_SPEED_BASE,
      });
    }

    // Update items
    for (let i = gs.items.length - 1; i >= 0; i--) {
      const item = gs.items[i];
      const dx = item.targetX - item.x;
      const dy = item.targetY - item.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 1) {
        item.x += (dx / dist) * item.speed;
        item.y += (dy / dist) * item.speed;
      }

      // Collision with drone
      const dd = Math.hypot(item.x - gs.drone.x, item.y - gs.drone.y);
      if (dd < DRONE_SIZE / 2 + ITEM_SIZE / 2) {
        gs.score += 10;
        spawnParticles(item.x, item.y, { r: 149, g: 213, b: 178 });
        gs.items.splice(i, 1);
      } else if (
        item.x < -50 || item.x > CANVAS_W + 50 ||
        item.y < -50 || item.y > CANVAS_H + 50
      ) {
        gs.items.splice(i, 1);
      }
    }

    // Update pests
    for (let i = gs.pests.length - 1; i >= 0; i--) {
      const pest = gs.pests[i];
      pest.x += pest.vx;
      pest.y += pest.vy;

      // Collision with drone
      const dd = Math.hypot(pest.x - gs.drone.x, pest.y - gs.drone.y);
      if (dd < DRONE_SIZE / 2 + PEST_SIZE / 2) {
        gs.lives--;
        spawnParticles(pest.x, pest.y, { r: 229, g: 57, b: 53 });
        gs.pests.splice(i, 1);
        if (gs.lives <= 0) {
          gs.gameOver = true;
        }
      } else if (
        pest.x < -50 || pest.x > CANVAS_W + 50 ||
        pest.y < -50 || pest.y > CANVAS_H + 50
      ) {
        gs.pests.splice(i, 1);
      }
    }

    // Update particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.03;
      if (p.alpha <= 0) particles.splice(i, 1);
    }

    // Update UI state periodically (throttled)
    const newHigh = Math.max(ui.highScore, gs.score);
    if (
      gs.score !== ui.score ||
      gs.lives !== ui.lives ||
      gs.gameOver !== ui.gameOver ||
      newHigh !== ui.highScore
    ) {
      setUi({
        score: gs.score,
        lives: gs.lives,
        gameOver: gs.gameOver,
        started: gs.started,
        highScore: newHigh,
      });
    }

    // Render
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
    bgGrad.addColorStop(0, "#0A1A17");
    bgGrad.addColorStop(0.5, "#0D2823");
    bgGrad.addColorStop(1, "#081410");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // Grid lines (farm fields)
    ctx.strokeStyle = "rgba(149, 213, 178, 0.04)";
    ctx.lineWidth = 1;
    for (let x = 0; x < CANVAS_W; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, CANVAS_H);
      ctx.stroke();
    }
    for (let y = 0; y < CANVAS_H; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(CANVAS_W, y);
      ctx.stroke();
    }

    // Draw items
    for (const item of gs.items) drawItem(ctx, item.x, item.y, item.type);

    // Draw pests
    for (const pest of gs.pests) drawPest(ctx, pest.x, pest.y);

    // Draw drone
    drawDrone(ctx, gs.drone.x, gs.drone.y);

    // Draw particles
    drawParticles(ctx, particles);

    animationRef.current = requestAnimationFrame(gameLoop);
  }, []);

  // Keyboard handlers
  useEffect(() => {
    const handleKeyDown = (e) => {
      gameState.current.keys[e.key] = true;
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
      }
    };
    const handleKeyUp = (e) => {
      gameState.current.keys[e.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Start game loop
  useEffect(() => {
    animationRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [gameLoop]);

  const startGame = () => {
    gameState.current = {
      drone: { x: CANVAS_W / 2, y: CANVAS_H / 2 },
      items: [],
      pests: [],
      score: 0,
      lives: 3,
      gameOver: false,
      started: true,
      keys: gameState.current.keys,
    };
    setUi({ score: 0, lives: 3, gameOver: false, started: true, highScore: ui.highScore });
  };

  const restartGame = () => {
    gameState.current = {
      drone: { x: CANVAS_W / 2, y: CANVAS_H / 2 },
      items: [],
      pests: [],
      score: 0,
      lives: 3,
      gameOver: false,
      started: true,
      keys: gameState.current.keys,
    };
    setUi({ score: 0, lives: 3, gameOver: false, started: true, highScore: ui.highScore });
  };

  return (
    <section id="drone-game" className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-[#081410]" />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #95D5B2 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-[#006D77]/20 border border-[#006D77]/30 rounded-full px-5 py-2 mb-6">
            <Gamepad2 className="w-4 h-4 text-[#95D5B2]" />
            <span className="font-body text-xs font-semibold text-[#95D5B2] tracking-wider uppercase">
              Jogo Interativo
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
            Drone da{" "}
            <span className="text-[#95D5B2]">Sustentabilidade</span>
          </h2>
          <p className="font-body text-base text-white/60 max-w-lg mx-auto leading-relaxed">
            Pilote o drone, colete itens sustentáveis e desvie dos agrotóxicos!
          </p>
        </motion.div>

        {/* Game UI overlay */}
        <div className="flex items-center justify-between mb-4 max-w-[600px] mx-auto">
          <div className="flex items-center gap-2 bg-white/[0.06] border border-white/[0.08] rounded-full px-4 py-2">
            <Zap className="w-4 h-4 text-[#FFC857]" />
            <span className="font-heading font-semibold text-white">{ui.score}</span>
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart
                key={i}
                className={`w-5 h-5 ${i < ui.lives ? "text-red-400 fill-red-400" : "text-white/20"}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2 bg-white/[0.06] border border-white/[0.08] rounded-full px-4 py-2">
            <Trophy className="w-4 h-4 text-[#95D5B2]" />
            <span className="font-heading font-semibold text-white/60 text-sm">{ui.highScore}</span>
          </div>
        </div>

        {/* Canvas */}
        <div className="relative max-w-[600px] mx-auto rounded-2xl overflow-hidden border-2 border-white/[0.08] shadow-2xl shadow-black/30">
          <canvas
            ref={canvasRef}
            width={CANVAS_W}
            height={CANVAS_H}
            className="w-full h-auto block"
            style={{ background: "#081410" }}
          />

          {/* Start overlay */}
          <AnimatePresence>
            {!ui.started && !ui.gameOver && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-[#081410]/80 backdrop-blur-sm"
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl mb-4"
                >
                  🚁
                </motion.div>
                <button
                  onClick={startGame}
                  className="group inline-flex items-center gap-3 bg-[#006D77] hover:bg-[#005A63] text-white rounded-full px-8 py-4 font-heading font-semibold text-lg shadow-xl shadow-[#006D77]/30 hover:shadow-2xl hover:shadow-[#006D77]/40 hover:scale-105 transition-all duration-300"
                >
                  <Play className="w-5 h-5 group-hover:animate-pulse" />
                  Iniciar Jogo
                </button>
                <p className="font-body text-sm text-white/40 mt-4">
                  Use as setas ou WASD para pilotar
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Game Over overlay */}
          <AnimatePresence>
            {ui.gameOver && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-[#081410]/85 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="text-center"
                >
                  <p className="text-5xl mb-3">💥</p>
                  <h3 className="font-heading text-3xl font-bold text-white mb-2">
                    Fim de Jogo!
                  </h3>
                  <p className="font-heading text-xl text-[#95D5B2] mb-1">
                    {ui.score} pontos
                  </p>
                  {ui.score >= ui.highScore && ui.score > 0 && (
                    <p className="font-body text-sm text-[#FFC857] mb-4">
                      🏆 Novo recorde!
                    </p>
                  )}
                  <button
                    onClick={restartGame}
                    className="inline-flex items-center gap-2 bg-[#006D77] hover:bg-[#005A63] text-white rounded-full px-6 py-3 font-heading font-semibold transition-all duration-200 shadow-lg shadow-[#006D77]/20 mt-4"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Jogar Novamente
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Controls hint */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <div className="flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2">
            <ArrowUp className="w-3.5 h-3.5 text-white/40" />
            <ArrowDown className="w-3.5 h-3.5 text-white/40" />
            <ArrowLeft className="w-3.5 h-3.5 text-white/40" />
            <ArrowRight className="w-3.5 h-3.5 text-white/40" />
          </div>
          <span className="font-body text-xs text-white/40">ou WASD para mover</span>
        </div>
      </div>
    </section>
  );
}
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, TreePine, Droplets, Wind } from "lucide-react";

const pulseData = [
  { icon: TreePine, label: "Árvores plantadas hoje", value: 847293, suffix: "" },
  { icon: Droplets, label: "Litros de água preservados", value: 2140000, suffix: "" },
  { icon: Wind, label: "Toneladas de CO₂ evitadas", value: 15842, suffix: "" },
];

function AnimatedCounter({ target }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = target;
    const duration = 2500;
    const step = Math.max(1, Math.floor(end / (duration / 16)));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{count.toLocaleString("pt-BR")}</span>;
}

export default function HeroSection({ heroImage }) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Gota de orvalho em folha ao amanhecer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/20 to-background" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <p className="font-body text-sm md:text-base tracking-[0.3em] uppercase text-white/70 mb-6">
            Simbiose Vital
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6">
            O futuro não é<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D8F3DC] to-[#95D5B2]">
              herdado.
            </span>
            <br />
            É cultivado.
          </h1>
          <p className="font-body text-lg md:text-xl text-white/80 max-w-xl leading-relaxed mb-10">
            Cada escolha consciente é uma semente. Descubra como pequenas
            mudanças no seu dia a dia podem regenerar o planeta inteiro.
          </p>
          <button
            onClick={() =>
              document.querySelector("#acoes")?.scrollIntoView({ behavior: "smooth" })
            }
            className="group inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-8 py-4 text-white font-heading font-medium hover:bg-white/20 transition-all duration-300"
          >
            Comece sua jornada
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl"
        >
          {pulseData.map((item, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5"
            >
              <item.icon className="w-5 h-5 text-[#95D5B2] mb-3" />
              <p className="font-heading text-2xl font-bold text-white">
                <AnimatedCounter target={item.value} />
                {item.suffix}
              </p>
              <p className="font-body text-xs text-white/60 mt-1">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Leaf, ArrowRight, Mail, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const footerLinks = [
  {
    title: "Explorar",
    links: ["Início", "Guia de Ações", "Calculadora de Impacto", "Sobre Nós"],
  },
  {
    title: "Aprender",
    links: ["Blog Sustentável", "Pesquisas Científicas", "Glossário Verde", "Perguntas Frequentes"],
  },
  {
    title: "Agir",
    links: ["Voluntariado", "Parcerias", "Doações", "Comunidade"],
  },
];

export default function ImmersiveFooter({ bgImage }) {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      toast.success("Bem-vindo(a) à nossa comunidade! 🌱");
      setEmail("");
    }
  };

  return (
    <footer id="contato" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={bgImage}
          alt="Nascer do sol sobre o oceano"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A19] via-[#0F1A19]/85 to-[#0F1A19]/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-36 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <Leaf className="w-7 h-7 text-[#95D5B2]" />
              <span className="font-heading text-2xl font-bold text-white">
                Futuro Verde
              </span>
            </div>
            <p className="font-body text-base text-white/60 leading-relaxed mb-8 max-w-sm">
              Um manifesto vivo pela regeneração do planeta. Cada ação conta,
              cada escolha importa, cada pessoa faz a diferença.
            </p>

            <form onSubmit={handleSubscribe} className="relative max-w-sm">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <Input
                  type="email"
                  placeholder="seu.email@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11 pr-14 py-6 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-full font-body focus:border-[#95D5B2]/50 focus:ring-[#95D5B2]/20"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#006D77] hover:bg-[#006D77]/80 rounded-full p-2.5 transition-colors"
                >
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
              <p className="font-body text-xs text-white/30 mt-3 ml-4">
                Receba inspirações semanais para um futuro sustentável
              </p>
            </form>
          </motion.div>

          {footerLinks.map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i + 1) * 0.1 }}
            >
              <p className="font-heading text-xs uppercase tracking-[0.25em] text-white/40 mb-6">
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <button className="font-body text-sm text-white/60 hover:text-[#95D5B2] transition-colors">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/30">
            © {new Date().getFullYear()} Futuro Verde. Feito com propósito.
          </p>
          <p className="font-body text-xs text-white/30 flex items-center gap-1.5">
            Construído com <Heart className="w-3 h-3 text-[#95D5B2]" /> pela preservação do amanhã
          </p>
        </div>
      </div>
    </footer>
  );
}
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { TreePine, Droplets, Flame } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const habits = [
  {
    id: "transport",
    label: "Transporte sustentável",
    description: "% de deslocamentos a pé, bicicleta ou transporte público",
    co2Factor: 3.6,
    waterFactor: 0,
    treesFactor: 0.03,
    source: "Mobilidade limpa reduz até 3,6 ton CO₂/ano — SEEG/OC",
  },
  {
    id: "food",
    label: "Alimentação consciente",
    description: "% de refeições com ingredientes locais e vegetais",
    co2Factor: 2.8,
    waterFactor: 200,
    treesFactor: 0.02,
    source: "Agropecuária = 29% das emissões BR — SEEG 2024",
  },
  {
    id: "energy",
    label: "Eficiência energética",
    description: "% de redução no consumo de energia",
    co2Factor: 4.2,
    waterFactor: 60,
    treesFactor: 0.04,
    source: "Setor de energia emitiu 424 MtCO₂e em 2024 — SEEG",
  },
  {
    id: "waste",
    label: "Redução de resíduos",
    description: "% de lixo reciclado ou compostado",
    co2Factor: 2.2,
    waterFactor: 100,
    treesFactor: 0.02,
    source: "Setor de resíduos = 96 MtCO₂e em 2024 — SEEG",
  },
];

export default function ImpactCalculator({ bgImage }) {
  const [values, setValues] = useState({
    transport: 30,
    food: 25,
    energy: 20,
    waste: 35,
  });

  const totalScore = useMemo(() => {
    return Math.round(
      Object.entries(values).reduce((sum, [, v]) => sum + v, 0) / habits.length
    );
  }, [values]);

  const impact = useMemo(() => {
    let co2 = 0,
      water = 0,
      trees = 0;
    habits.forEach((h) => {
      const v = values[h.id];
      co2 += v * h.co2Factor;
      water += v * h.waterFactor;
      trees += v * h.treesFactor;
    });
    return {
      co2: Math.round(co2),
      water: Math.round(water),
      trees: Math.round(trees * 10) / 10,
    };
  }, [values]);

  const chartData = useMemo(() => {
    const years = [];
    for (let i = 0; i <= 10; i++) {
      const factor = 1 + (totalScore / 100) * (i / 10);
      years.push({
        year: `${2025 + i}`,
        impacto: Math.round(totalScore * factor),
        baseline: totalScore,
      });
    }
    return years;
  }, [totalScore]);

  const bgHue = 140 + totalScore * 0.4;
  const bgSat = 20 + totalScore * 0.3;

  return (
    <section
      id="impacto"
      className="relative py-24 md:py-36 overflow-hidden transition-colors duration-1000"
      style={{
        backgroundColor: `hsl(${bgHue}, ${bgSat}%, 96%)`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Visualizador de Legado
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6">
            Veja o futuro que{" "}
            <span className="text-primary">você pode criar</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            Ajuste os controles abaixo para descobrir como seus hábitos atuais
            impactam o planeta ao longo de uma década.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {habits.map((habit) => (
              <div key={habit.id} className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-heading text-base font-semibold text-foreground">
                      {habit.label}
                    </p>
                    <p className="font-body text-xs text-muted-foreground">
                      {habit.description}
                    </p>
                  </div>
                  <span className="font-heading text-lg font-bold text-primary min-w-[3rem] text-right">
                    {values[habit.id]}%
                  </span>
                </div>
                <Slider
                  value={[values[habit.id]]}
                  onValueChange={(v) =>
                    setValues((prev) => ({ ...prev, [habit.id]: v[0] }))
                  }
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-5 border border-border/60 text-center">
                <Flame className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="font-heading text-2xl font-bold text-foreground">
                  {impact.co2}
                </p>
                <p className="font-body text-xs text-muted-foreground mt-1">
                  kg CO₂/ano evitados
                </p>
              </div>
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-5 border border-border/60 text-center">
                <Droplets className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="font-heading text-2xl font-bold text-foreground">
                  {impact.water.toLocaleString("pt-BR")}
                </p>
                <p className="font-body text-xs text-muted-foreground mt-1">
                  litros de água salvos
                </p>
              </div>
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-5 border border-border/60 text-center">
                <TreePine className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="font-heading text-2xl font-bold text-foreground">
                  {impact.trees}
                </p>
                <p className="font-body text-xs text-muted-foreground mt-1">
                  árvores equivalentes
                </p>
              </div>
            </div>

            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/60">
              <p className="font-heading text-sm font-semibold text-foreground mb-4">
                Seu rastro de vida — projeção em 10 anos
              </p>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="impactGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(183,100%,23%)" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="hsl(183,100%,23%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="year"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: "hsl(170,10%,40%)" }}
                    />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(160,15%,98%)",
                        border: "1px solid hsl(160,15%,88%)",
                        borderRadius: "12px",
                        fontSize: 12,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="baseline"
                      stroke="hsl(160,15%,80%)"
                      strokeDasharray="4 4"
                      fill="none"
                      strokeWidth={1}
                    />
                    <Area
                      type="monotone"
                      dataKey="impacto"
                      stroke="hsl(183,100%,23%)"
                      fill="url(#impactGrad)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="text-center">
              <div
                className="inline-flex items-center gap-3 rounded-full px-6 py-3 border transition-all duration-500"
                style={{
                  borderColor: `hsl(${140 + totalScore}, 60%, 40%)`,
                  backgroundColor: `hsl(${140 + totalScore}, 40%, 95%)`,
                }}
              >
                <div
                  className="w-3 h-3 rounded-full animate-pulse"
                  style={{
                    backgroundColor: `hsl(${140 + totalScore}, 60%, 40%)`,
                  }}
                />
                <span className="font-heading text-sm font-semibold" style={{ color: `hsl(${140 + totalScore}, 60%, 25%)` }}>
                  Índice de sustentabilidade: {totalScore}%
                </span>
              </div>
            </div>

            <p className="font-body text-xs text-muted-foreground text-center max-w-md mx-auto leading-relaxed">
              Cálculo baseado em fatores do SEEG (Sistema de Estimativas de
              Emissões de Gases de Efeito Estufa) e dados do Observatório do
              Clima. O Brasil emitiu 2,145 bilhões de toneladas de CO₂e em
              2024 — cada escolha individual reduz essa conta.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, XCircle, Trophy, ArrowRight, RotateCcw, Lightbulb, Brain } from "lucide-react";

const questions = [
  {
    question: "Quantas toneladas de CO₂ equivalente o Brasil emitiu em 2024?",
    options: ["1,2 bilhão", "2,145 bilhões", "3,5 bilhões", "800 milhões"],
    correct: 1,
    explanation: "Foram 2,145 bilhões de toneladas — uma queda de 16,7% em relação a 2023, a 2ª maior redução desde 1990. Fonte: Observatório do Clima / SEEG.",
  },
  {
    question: "Qual a porcentagem de resíduos reciclados no Brasil atualmente?",
    options: ["25%", "15%", "8%", "32%"],
    correct: 2,
    explanation: "Apenas 8% dos resíduos são reciclados. O Chile recicla 14% e países desenvolvidos passam de 25%. Fonte: ABREMA 2024.",
  },
  {
    question: "Quantos domicílios brasileiros ainda queimam lixo na própria moradia?",
    options: ["1 milhão", "2,3 milhões", "4,7 milhões", "8 milhões"],
    correct: 2,
    explanation: "4,7 milhões de lares (6,1%) ainda queimam lixo. Na zona rural, mais da metade das propriedades (50,5%) usa essa prática. Fonte: IBGE/PNAD Contínua 2024.",
  },
  {
    question: "Qual setor mais emitiu gases de efeito estufa no Brasil em 2024?",
    options: ["Energia", "Agropecuária", "Resíduos", "Processos industriais"],
    correct: 1,
    explanation: "A agropecuária liderou com 626 milhões de toneladas de CO₂e (29,2% do total), seguida por energia (424 Mt), resíduos (96 Mt) e indústria (94 Mt). Fonte: SEEG 2024.",
  },
  {
    question: "Quantos quilos de lixo cada brasileiro produz por ano, em média?",
    options: ["250 kg", "382 kg", "510 kg", "175 kg"],
    correct: 1,
    explanation: "382 kg por pessoa ao ano. O Brasil produz 80 milhões de toneladas de lixo anualmente, sendo o 5º maior gerador mundial. Fonte: ABREMA.",
  },
  {
    question: "Qual a porcentagem de empresas brasileiras (+100 funcionários) com práticas ambientais?",
    options: ["45%", "62%", "75%", "89%"],
    correct: 3,
    explanation: "89,1% das indústrias com 100+ funcionários têm ao menos uma prática ambiental. Resíduos sólidos (79,6%) é a área mais comum. Fonte: IBGE/PINTEC 2023.",
  },
  {
    question: "Quantos milhões de toneladas de lixo vão para lixões a céu aberto no Brasil?",
    options: ["15 milhões", "29 milhões", "41 milhões", "55 milhões"],
    correct: 2,
    explanation: "Cerca de 41% dos resíduos (≈29 milhões de toneladas) vão para lixões irregulares, que deveriam ter sido extintos até 2014. Fonte: ABREMA/IBGE.",
  },
  {
    question: "Qual estado brasileiro tem a maior emissão de CO₂ por habitante?",
    options: ["São Paulo", "Pará", "Mato Grosso", "Minas Gerais"],
    correct: 2,
    explanation: "Mato Grosso lidera com 60 toneladas por habitante — quase 3x a emissão per capita da Arábia Saudita. Fonte: Observatório do Clima / SEEG 2024.",
  },
];

export default function SustainabilityQuiz() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = useCallback(
    (idx) => {
      if (revealed) return;
      setSelected(idx);
      setRevealed(true);
      if (idx === questions[current].correct) {
        setScore((s) => s + 1);
      }
    },
    [revealed, current]
  );

  const nextQuestion = () => {
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setRevealed(false);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setRevealed(false);
    setStarted(false);
  };

  const scorePercent = Math.round((score / questions.length) * 100);
  const gradeEmoji = scorePercent >= 80 ? "🌿" : scorePercent >= 50 ? "🌱" : "🌍";
  const gradeText =
    scorePercent >= 80
      ? "Você é um Guardião do Planeta!"
      : scorePercent >= 50
      ? "Bom começo! Continue aprendendo."
      : "Hora de se conectar mais com a causa!";

  if (!started) {
    return (
      <section id="quiz" className="relative py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-[#0A1A17]" />
        {/* subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #95D5B2 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-[#006D77]/20 border border-[#006D77]/30 rounded-full px-5 py-2 mb-8"
          >
            <Brain className="w-4 h-4 text-[#95D5B2]" />
            <span className="font-body text-xs font-semibold text-[#95D5B2] tracking-wider uppercase">
              Quiz Interativo
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-heading text-4xl md:text-6xl font-bold text-white mb-6"
          >
            O quanto você sabe sobre{" "}
            <span className="text-[#95D5B2]">sustentabilidade?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-body text-lg text-white/60 mb-10 leading-relaxed"
          >
            8 perguntas baseadas em dados reais do IBGE, Observatório do Clima e
            ABREMA. Teste seus conhecimentos sobre o Brasil e o planeta.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onClick={() => setStarted(true)}
            className="group inline-flex items-center gap-3 bg-[#006D77] hover:bg-[#005A63] text-white rounded-full px-10 py-5 font-heading font-semibold text-xl shadow-xl shadow-[#006D77]/30 hover:shadow-2xl hover:shadow-[#006D77]/40 hover:scale-105 transition-all duration-300"
          >
            <Sparkles className="w-6 h-6 group-hover:animate-pulse" />
            Começar o Quiz
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 grid grid-cols-3 gap-4 text-center"
          >
            {[
              { num: "8", label: "Perguntas" },
              { num: "🇧🇷", label: "Dados do Brasil" },
              { num: "📊", label: "Fontes oficiais" },
            ].map((item, i) => (
              <div key={i} className="bg-white/[0.06] backdrop-blur-sm rounded-2xl p-5 border border-white/[0.08]">
                <p className="font-heading text-2xl font-bold text-white mb-1">
                  {item.num}
                </p>
                <p className="font-body text-xs text-white/50">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="quiz" className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-[#0A1A17]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #95D5B2 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="relative max-w-2xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.div
              key={`q-${current}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-3xl p-8 md:p-10"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Brain className="w-5 h-5 text-[#95D5B2]" />
                  <span className="font-heading text-sm font-semibold text-[#95D5B2]">
                    Pergunta {current + 1}/{questions.length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-heading text-sm text-white/60">
                    Acertos: {score}
                  </span>
                </div>
              </div>

              <div className="w-full bg-white/[0.08] rounded-full h-2.5 mb-10">
                <motion.div
                  className="bg-[#006D77] h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((current + 1) / questions.length) * 100}%`,
                  }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-8 leading-snug">
                {questions[current].question}
              </h3>

              <div className="space-y-4 mb-8">
                {questions[current].options.map((opt, i) => {
                  let bg = "bg-white/[0.05] border-white/[0.10] hover:border-[#95D5B2]/50 hover:bg-white/[0.08]";
                  let textCls = "text-white";
                  if (revealed) {
                    if (i === questions[current].correct) {
                      bg = "bg-[#006D77]/30 border-[#006D77]";
                      textCls = "text-white";
                    } else if (i === selected && i !== questions[current].correct) {
                      bg = "bg-red-500/15 border-red-400/50";
                      textCls = "text-white/80";
                    } else {
                      bg = "bg-white/[0.02] border-white/[0.04]";
                      textCls = "text-white/40";
                    }
                  }

                  return (
                    <motion.button
                      key={i}
                      whileTap={!revealed ? { scale: 0.98 } : {}}
                      onClick={() => handleSelect(i)}
                      disabled={revealed}
                      className={`w-full flex items-center gap-5 rounded-2xl border p-5 text-left transition-all duration-200 ${bg} ${
                        revealed ? "cursor-default" : "cursor-pointer"
                      }`}
                    >
                      <span
                        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-heading font-semibold text-base ${
                          revealed && i === questions[current].correct
                            ? "bg-[#006D77] text-white"
                            : revealed && i === selected && i !== questions[current].correct
                            ? "bg-red-400/40 text-red-200"
                            : "bg-white/[0.10] text-white/60"
                        }`}
                      >
                        {revealed && i === questions[current].correct ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : revealed &&
                          i === selected &&
                          i !== questions[current].correct ? (
                          <XCircle className="w-5 h-5" />
                        ) : (
                          String.fromCharCode(65 + i)
                        )}
                      </span>
                      <span className={`font-body text-base flex-1 ${textCls}`}>
                        {opt}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              <AnimatePresence>
                {revealed && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#006D77]/10 border border-[#006D77]/30 rounded-2xl p-5 mb-6"
                  >
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-[#95D5B2] flex-shrink-0 mt-0.5" />
                      <p className="font-body text-sm text-white/80 leading-relaxed">
                        {questions[current].explanation}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {revealed && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={nextQuestion}
                  className="w-full inline-flex items-center justify-center gap-3 bg-[#006D77] hover:bg-[#005A63] text-white rounded-full px-6 py-4 font-heading font-semibold text-lg transition-all duration-200 shadow-lg shadow-[#006D77]/20"
                >
                  {current + 1 < questions.length ? (
                    <>
                      Próxima pergunta
                      <ArrowRight className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      Ver resultado
                      <Trophy className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-3xl p-10 md:p-14"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2,
                }}
                className="text-7xl mb-6"
              >
                {gradeEmoji}
              </motion.div>

              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
                {gradeText}
              </h2>

              <div className="inline-flex items-center gap-3 bg-white/[0.06] border border-white/[0.10] rounded-2xl px-8 py-5 mb-6">
                <Trophy className="w-7 h-7 text-[#95D5B2]" />
                <span className="font-heading text-3xl font-bold text-[#95D5B2]">
                  {score}/{questions.length}
                </span>
                <span className="font-body text-base text-white/60">
                  acertos ({scorePercent}%)
                </span>
              </div>

              <p className="font-body text-base text-white/60 max-w-md mx-auto mb-10 leading-relaxed">
                {scorePercent >= 80
                  ? "Incrível! Você está super informado sobre os desafios ambientais do Brasil. Continue inspirando outras pessoas!"
                  : scorePercent >= 50
                  ? "Você tem uma boa base. Que tal se aprofundar nos dados do IBGE e Observatório do Clima para ir ainda mais longe?"
                  : "Todo especialista já foi iniciante. Os dados estão aqui no site — explore as seções e volte para tentar de novo!"}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={restart}
                  className="inline-flex items-center gap-2 bg-[#006D77] hover:bg-[#005A63] text-white rounded-full px-8 py-4 font-heading font-semibold transition-all duration-200 shadow-lg shadow-[#006D77]/20"
                >
                  <RotateCcw className="w-4 h-4" />
                  Tentar novamente
                </button>
                <button
                  onClick={() => document.querySelector("#acoes")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.12] hover:border-[#95D5B2]/50 rounded-full px-8 py-4 font-heading font-medium text-white transition-all duration-200"
                >
                  Ver guia de ações
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
import React from "react";
import { motion } from "framer-motion";

export default function TransitionDivider({ text }) {
  return (
    <div className="relative py-16 flex items-center justify-center overflow-hidden">
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      {text && (
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-background px-6 font-body text-xs tracking-[0.4em] uppercase text-muted-foreground"
        >
          {text}
            import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Leaf } from "lucide-react";

const navLinks = [
  { label: "Início", href: "#hero" },
  { label: "Ações", href: "#acoes" },
  { label: "Impacto", href: "#impacto" },
  { label: "Contato", href: "#contato" },
];

export default function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-4 z-50 transition-all duration-500 ${
          scrolled
            ? "left-4 w-14 h-14 rounded-full"
            : "left-4 right-4 md:left-6 md:right-auto md:w-auto md:min-w-[320px] rounded-2xl"
        }`}
      >
        <div
          className={`h-full backdrop-blur-xl border border-white/20 shadow-lg transition-all duration-500 flex items-center ${
            scrolled
              ? "rounded-full bg-foreground/80 justify-center cursor-pointer px-0"
              : "rounded-2xl bg-background/70 justify-between px-6 py-3"
          }`}
          onClick={() => scrolled && setMenuOpen(true)}
        >
          {!scrolled && (
            <>
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-primary" />
                <span className="font-heading font-semibold text-foreground tracking-tight">
                  Futuro Verde
                </span>
              </div>
              <div className="hidden md:flex items-center gap-8 ml-10">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
              <button
                className="md:hidden text-foreground"
                onClick={() => setMenuOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
            </>
          )}
          {scrolled && (
            <Menu className="w-5 h-5 text-primary-foreground" />
          )}
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] backdrop-blur-2xl bg-background/90 flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-foreground"
            >
              <X className="w-8 h-8" />
            </button>
            <nav className="flex flex-col items-center gap-10">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => scrollTo(link.href)}
                  className="font-heading text-4xl md:text-5xl font-semibold text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
        </motion.span>
      )}
    </div>
  );
}
import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}>
      {children}
      <ChevronDown
        className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}>
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogPortal = AlertDialogPrimitive.Portal

const AlertDialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref} />
))
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

const AlertDialogContent = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props} />
  </AlertDialogPortal>
))
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

const AlertDialogHeader = ({
  className,
  ...props
}) => (
  <div
    className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}
    {...props} />
)
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogFooter = ({
  className,
  ...props
}) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props} />
)
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
))
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

const AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props} />
))
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName

const AlertDialogAction = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action ref={ref} className={cn(buttonVariants(), className)} {...props} />
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

const AlertDialogCancel = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)}
    {...props} />
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
import * as React from "react"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props} />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props} />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props} />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

const AspectRatio = AspectRatioPrimitive.Root

export { AspectRatio }
"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props} />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props} />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props} />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
import * as React from "react"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}) {
  return (<div className={cn(badgeVariants({ variant }), className)} {...props} />);
}

export { Badge, badgeVariants }
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

const Breadcrumb = React.forwardRef(
  ({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />
)
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = React.forwardRef(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className
    )}
    {...props} />
))
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props} />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"

  return (
    (<Comp
      ref={ref}
      className={cn("transition-colors hover:text-foreground", className)}
      {...props} />)
  );
})
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal text-foreground", className)}
    {...props} />
))
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:w-3.5 [&>svg]:h-3.5", className)}
    {...props}>
    {children ?? <ChevronRight />}
  </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = ({
  className,
  ...props
}) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}>
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
)
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis"

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return (
    (<DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-4 w-4", className)} {...props} />
        ),
      }}
      {...props} />)
  );
}
Calendar.displayName = "Calendar"

export { Calendar }
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-xl border bg-card text-card-foreground shadow", className)}
    {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props} />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
import * as React from "react"
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const CarouselContext = React.createContext(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef((
  {
    orientation = "horizontal",
    opts,
    setApi,
    plugins,
    className,
    children,
    ...props
  },
  ref
) => {
  const [carouselRef, api] = useEmblaCarousel({
    ...opts,
    axis: orientation === "horizontal" ? "x" : "y",
  }, plugins)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const onSelect = React.useCallback((api) => {
    if (!api) {
      return
    }

    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback((event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      scrollPrev()
    } else if (event.key === "ArrowRight") {
      event.preventDefault()
      scrollNext()
    }
  }, [scrollPrev, scrollNext])

  React.useEffect(() => {
    if (!api || !setApi) {
      return
    }

    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) {
      return
    }

    onSelect(api)
    api.on("reInit", onSelect)
    api.on("select", onSelect)

    return () => {
      api?.off("select", onSelect)
    };
  }, [api, onSelect])

  return (
    (<CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}>
      <div
        ref={ref}
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        {...props}>
        {children}
      </div>
    </CarouselContext.Provider>)
  );
})
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    (<div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props} />
    </div>)
  );
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    (<div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props} />)
  );
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    (<Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn("absolute  h-8 w-8 rounded-full", orientation === "horizontal"
        ? "-left-12 top-1/2 -translate-y-1/2"
        : "-top-12 left-1/2 -translate-x-1/2 rotate-90", className)}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}>
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>)
  );
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    (<Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn("absolute h-8 w-8 rounded-full", orientation === "horizontal"
        ? "-right-12 top-1/2 -translate-y-1/2"
        : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90", className)}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}>
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>)
  );
})
CarouselNext.displayName = "CarouselNext"

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };
"use client";
import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = {
  light: "",
  dark: ".dark"
}

const ChartContext = React.createContext(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

const ChartContainer = React.forwardRef(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    (<ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}>
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>)
  );
})
ChartContainer.displayName = "Chart"

const ChartStyle = ({
  id,
  config
}) => {
  const colorConfig = Object.entries(config).filter(([, config]) => config.theme || config.color)

  if (!colorConfig.length) {
    return null
  }

  return (
    (<style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
.map(([key, itemConfig]) => {
const color =
  itemConfig.theme?.[theme] ||
  itemConfig.color
return color ? `  --color-${key}: ${color};` : null
})
.join("\n")}
}
`)
          .join("\n"),
      }} />)
  );
}

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef((
  {
    active,
    payload,
    className,
    indicator = "dot",
    hideLabel = false,
    hideIndicator = false,
    label,
    labelFormatter,
    labelClassName,
    formatter,
    color,
    nameKey,
    labelKey,
  },
  ref
) => {
  const { config } = useChart()

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null
    }

    const [item] = payload
    const key = `${labelKey || item.dataKey || item.name || "value"}`
    const itemConfig = getPayloadConfigFromPayload(config, item, key)
    const value =
      !labelKey && typeof label === "string"
        ? config[label]?.label || label
        : itemConfig?.label

    if (labelFormatter) {
      return (
        (<div className={cn("font-medium", labelClassName)}>
          {labelFormatter(value, payload)}
        </div>)
      );
    }

    if (!value) {
      return null
    }

    return <div className={cn("font-medium", labelClassName)}>{value}</div>;
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey,
  ])

  if (!active || !payload?.length) {
    return null
  }

  const nestLabel = payload.length === 1 && indicator !== "dot"

  return (
    (<div
      ref={ref}
      className={cn(
        "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
        className
      )}>
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || "value"}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)
          const indicatorColor = color || item.payload.fill || item.color

          return (
            (<div
              key={item.dataKey}
              className={cn(
                "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                indicator === "dot" && "items-center"
              )}>
              {formatter && item?.value !== undefined && item.name ? (
                formatter(item.value, item.name, item, index, item.payload)
              ) : (
                <>
                  {itemConfig?.icon ? (
                    <itemConfig.icon />
                  ) : (
                    !hideIndicator && (
                      <div
                        className={cn("shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]", {
                          "h-2.5 w-2.5": indicator === "dot",
                          "w-1": indicator === "line",
                          "w-0 border-[1.5px] border-dashed bg-transparent":
                            indicator === "dashed",
                          "my-0.5": nestLabel && indicator === "dashed",
                        })}
                        style={
                          {
                            "--color-bg": indicatorColor,
                            "--color-border": indicatorColor
                          }
                        } />
                    )
                  )}
                  <div
                    className={cn(
                      "flex flex-1 justify-between leading-none",
                      nestLabel ? "items-end" : "items-center"
                    )}>
                    <div className="grid gap-1.5">
                      {nestLabel ? tooltipLabel : null}
                      <span className="text-muted-foreground">
                        {itemConfig?.label || item.name}
                      </span>
                    </div>
                    {item.value && (
                      <span className="font-mono font-medium tabular-nums text-foreground">
                        {item.value.toLocaleString()}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>)
          );
        })}
      </div>
    </div>)
  );
})
ChartTooltipContent.displayName = "ChartTooltip"

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef((
  { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
  ref
) => {
  const { config } = useChart()

  if (!payload?.length) {
    return null
  }

  return (
    (<div
      ref={ref}
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}>
      {payload.map((item) => {
        const key = `${nameKey || item.dataKey || "value"}`
        const itemConfig = getPayloadConfigFromPayload(config, item, key)

        return (
          (<div
            key={item.value}
            className={cn(
              "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
            )}>
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{
                  backgroundColor: item.color,
                }} />
            )}
            {itemConfig?.label}
          </div>)
        );
      })}
    </div>)
  );
})
ChartLegendContent.displayName = "ChartLegend"

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config,
  payload,
  key
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey = key

  if (
    key in payload &&
    typeof payload[key] === "string"
  ) {
    configLabelKey = payload[key]
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key] === "string"
  ) {
    configLabelKey = payloadPayload[key]
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key];
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}
import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}>
    <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const Command = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    )}
    {...props} />
))
Command.displayName = CommandPrimitive.displayName

const CommandDialog = ({
  children,
  ...props
}) => {
  return (
    (<Dialog {...props}>
      <DialogContent className="overflow-hidden p-0">
        <Command
          className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>)
  );
}

const CommandInput = React.forwardRef(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props} />
  </div>
))

CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props} />
))

CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef((props, ref) => (
  <CommandPrimitive.Empty ref={ref} className="py-6 text-center text-sm" {...props} />
))

CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props} />
))

CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator ref={ref} className={cn("-mx-1 h-px bg-border", className)} {...props} />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className
    )}
    {...props} />
))

CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({
  className,
  ...props
}) => {
  return (
    (<span
      className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
      {...props} />)
  );
}
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
import * as React from "react"
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const ContextMenu = ContextMenuPrimitive.Root

const ContextMenuTrigger = ContextMenuPrimitive.Trigger

const ContextMenuGroup = ContextMenuPrimitive.Group

const ContextMenuPortal = ContextMenuPrimitive.Portal

const ContextMenuSub = ContextMenuPrimitive.Sub

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

const ContextMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    )}
    {...props}>
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </ContextMenuPrimitive.SubTrigger>
))
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName

const ContextMenuSubContent = React.forwardRef(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props} />
))
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName

const ContextMenuContent = React.forwardRef(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props} />
  </ContextMenuPrimitive.Portal>
))
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName

const ContextMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props} />
))
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName

const ContextMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}>
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
))
ContextMenuCheckboxItem.displayName =
  ContextMenuPrimitive.CheckboxItem.displayName

const ContextMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}>
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="h-4 w-4 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
))
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName

const ContextMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold text-foreground",
      inset && "pl-8",
      className
    )}
    {...props} />
))
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName

const ContextMenuSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props} />
))
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName

const ContextMenuShortcut = ({
  className,
  ...props
}) => {
  return (
    (<span
      className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
      {...props} />)
  );
}
ContextMenuShortcut.displayName = "ContextMenuShortcut"

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}
"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props} />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}>
      {children}
      <DialogPrimitive.Close
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}) => (
  <div
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
    {...props} />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props} />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props} />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props} />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
)
Drawer.displayName = "Drawer"

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props} />
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className
      )}
      {...props}>
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
))
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({
  className,
  ...props
}) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props} />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({
  className,
  ...props
}) => (
  <div className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props} />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = React.forwardRef(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props} />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}>
    {children}
    <ChevronRight className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props} />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props} />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props} />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}>
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName
"use client";
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { Controller, FormProvider, useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

const FormFieldContext = React.createContext({})

const FormField = (
  {
    ...props
  }
) => {
  return (
    (<FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>)
  );
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

const FormItemContext = React.createContext({})

const FormItem = React.forwardRef(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    (<FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>)
  );
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    (<Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props} />)
  );
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    (<Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props} />)
  );
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    (<p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props} />)
  );
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    (<p
      ref={ref}
      id={formMessageId}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}>
      {body}
    </p>)
  );
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
"use client"

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

import { cn } from "@/lib/utils"

const HoverCard = HoverCardPrimitive.Root

const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardContent = React.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props} />
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardTrigger, HoverCardContent }
"use client"

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

import { cn } from "@/lib/utils"

const HoverCard = HoverCardPrimitive.Root

const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardContent = React.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props} />
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardTrigger, HoverCardContent }
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    (<input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props} />)
  );
})
Input.displayName = "Input"

export { Input }
