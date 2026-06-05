import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ChevronDown, Linkedin, Instagram, Facebook, Youtube, Menu, X } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import "../styles/matriz360-energia-sustentavel.css";

export default function Home() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successLeadName, setSuccessLeadName] = useState("");
  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const submitLeadMutation = trpc.leads.submitLead.useMutation({
    onSuccess: () => {
      setSuccessLeadName(leadForm.name);
      setShowSuccessModal(true);
      setLeadForm({ name: "", email: "", phone: "" });
      setTimeout(() => setShowSuccessModal(false), 5000);
    },
    onError: (error: any) => {
      toast.error("Erro ao cadastrar lead: " + error.message);
    },
  });

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.email || !leadForm.phone) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }
    submitLeadMutation.mutate(leadForm);
  };

  const faqItems = [
    {
      question: "Quais regiões a Matrix 360 atende?",
      answer:
        "Qualquer consumidor com contas a partir de 260 kWh/mês (em média, R$300/mês) atendidos nas seguintes regiões e distribuidoras: PR – Copel; SP – CPFL Paulista e Energisa Sul Sudeste; ES – EDP; MG – CEMIG; GO – Equatorial; BA – Coelba; PE – Neoenergia; RN – Neoenergia; CE – ENEL. Consumidores com contas acima de R$5 mil atendidos nas seguintes regiões e distribuidoras: Equatorial (AL, PA, MA e PI) e Energisa (MS, MT e TO).",
    },
    {
      question: "Como faço para me cadastrar?",
      answer:
        "Para ser consultor Matrix 360 é simples: entre em contato através dos canais abaixo, faça seu cadastro e pague a taxa de adesão. Depois disso, liberamos seu acesso à plataforma com treinamentos, materiais e suporte completo para você começar a vender e construir sua rede.",
    },
    {
      question: "Quais produtos posso vender e para quem?",
      answer:
        "Na Matrix 360, você trabalha com Energia solar por Assinatura, ajudando clientes a economizarem até 25% na conta de luz, sem investimento. Residências e comércios do Grupo B, com contas a partir de 260 kWh/mês (em média, acima de R$300/mês) podem aderir.",
    },
    {
      question: "Como funciona a remuneração?",
      answer:
        "São até 8 possibilidades de ganhos diferentes, incluindo vendas e bônus da sua rede. Você começa a receber logo após as primeiras ativações de clientes e consultores.",
    },
    {
      question: "A Matrix 360 oferece treinamentos?",
      answer:
        "Sim, disponibilizamos tudo o que você precisa para vender e aumentar sua rede de consultores. Treinamentos exclusivos, dicas dos nossos especialistas comerciais e materiais de venda completos.",
    },
    {
      question: "Em quanto tempo posso começar a vender?",
      answer:
        "Após ativar sua conta, você ganha acesso a treinamentos exclusivos. Depois, você já pode iniciar suas vendas e cadastrar novos consultores em sua rede.",
    },
  ];

  return (
    <div className="matriz360-energia-sustentavel-page">
      {/* Header */}
      <header className="matriz360-energia-sustentavel-header">
        <div className="matriz360-energia-sustentavel-container">
          <div className="matriz360-energia-sustentavel-header__content">
            <a href="/" className="matriz360-energia-sustentavel-header__logo">
              <img
                src="https://cdn-sites-assets.mziq.com/wp-content/uploads/sites/1555/2025/12/matrix-360-logo.png"
                alt="Matrix 360"
              />
            </a>
            <nav className="matriz360-energia-sustentavel-header__nav">
              <a href="#platform">Como funciona</a>
              <a href="#faq">Perguntas frequentes</a>
            </nav>
            <div className="matriz360-energia-sustentavel-header__buttons">
              <a href="https://wa.me/5547997442391?text=Ol%C3%A1%21%20Gostaria%20de%20saber%20mais%20sobre%20como%20ser%20consultor%20Matrix%20360%20e%20ganhar%20renda%20com%20energia%20renovável." target="_blank" rel="noopener noreferrer" className="matriz360-energia-sustentavel-btn matriz360-energia-sustentavel-btn--outline">
                Quero ser um consultor
              </a>
              <a href="https://wa.me/5547997442391?text=Ol%C3%A1%21%20Gostaria%20de%20conhecer%20como%20economizar%20na%20minha%20conta%20de%20luz%20com%20a%20Matrix%20360." target="_blank" rel="noopener noreferrer" className="matriz360-energia-sustentavel-btn matriz360-energia-sustentavel-btn--primary">
                Desconto na conta de luz
              </a>
            </div>
            <button className="matriz360-energia-sustentavel-header__mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          {mobileMenuOpen && (
            <nav className="matriz360-energia-sustentavel-header__mobile-menu">
              <a href="#platform" onClick={() => setMobileMenuOpen(false)}>Como funciona</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)}>Perguntas frequentes</a>
              <a href="https://wa.me/5547997442391?text=Ol%C3%A1%21%20Gostaria%20de%20saber%20mais%20sobre%20como%20ser%20consultor%20Matrix%20360%20e%20ganhar%20renda%20com%20energia%20renovável." target="_blank" rel="noopener noreferrer">Quero ser um consultor</a>
              <a href="https://wa.me/5547997442391?text=Ol%C3%A1%21%20Gostaria%20de%20conhecer%20como%20economizar%20na%20minha%20conta%20de%20luz%20com%20a%20Matrix%20360." target="_blank" rel="noopener noreferrer">Desconto na conta de luz</a>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="matriz360-energia-sustentavel-hero">
        <img
          src="https://cdn-sites-assets.mziq.com/wp-content/uploads/sites/1555/2025/12/Header-5.webp"
          alt="Hero Background"
          className="matriz360-energia-sustentavel-hero__background"
        />
        <div className="matriz360-energia-sustentavel-container">
          <div className="matriz360-energia-sustentavel-hero__content">
            <h1 className="matriz360-energia-sustentavel-hero__title">Seja Matrix 360</h1>
            <p className="matriz360-energia-sustentavel-hero__subtitle">
              Onde energia renovável<br />
              se transforma em <strong>renda<br />e economia</strong>
            </p>
            <a href="https://wa.me/5547997442391?text=Ol%C3%A1%21%20Gostaria%20de%20saber%20mais%20sobre%20como%20ser%20consultor%20Matrix%20360%20e%20ganhar%20renda%20com%20energia%20renovável." target="_blank" rel="noopener noreferrer" className="matriz360-energia-sustentavel-btn matriz360-energia-sustentavel-btn--dark">
              Quero ser um consultor
            </a>
          </div>
        </div>
      </section>

      {/* Energy Benefits */}
      <section className="matriz360-energia-sustentavel-benefits">
        <div className="matriz360-energia-sustentavel-container">
          <h2 className="matriz360-energia-sustentavel-benefits__title">Energia solar por Assinatura:</h2>
          <p className="matriz360-energia-sustentavel-benefits__subtitle">renovável, mais barata e sem investimento</p>
          <div className="matriz360-energia-sustentavel-benefits__grid">
            <div className="matriz360-energia-sustentavel-benefits__item">
              <div className="matriz360-energia-sustentavel-benefits__item__icon">
                <img src="https://cdn-sites-assets.mziq.com/wp-content/uploads/sites/1555/2025/12/piggy-bank-1-1.png" alt="Economia" />
              </div>
              <p className="matriz360-energia-sustentavel-benefits__item__text">Até <strong>25% de economia</strong></p>
            </div>
            <div className="matriz360-energia-sustentavel-benefits__item">
              <div className="matriz360-energia-sustentavel-benefits__item__icon">
                <img src="https://cdn-sites-assets.mziq.com/wp-content/uploads/sites/1555/2025/12/hand-coins-1.png" alt="Investimento" />
              </div>
              <p className="matriz360-energia-sustentavel-benefits__item__text"><strong>Zero investimento</strong></p>
            </div>
            <div className="matriz360-energia-sustentavel-benefits__item">
              <div className="matriz360-energia-sustentavel-benefits__item__icon">
                <img src="https://cdn-sites-assets.mziq.com/wp-content/uploads/sites/1555/2025/12/piggy-bank-1-1.png" alt="Renovável" />
              </div>
              <p className="matriz360-energia-sustentavel-benefits__item__text">100% <strong>renovável</strong></p>
            </div>
            <div className="matriz360-energia-sustentavel-benefits__item">
              <div className="matriz360-energia-sustentavel-benefits__item__icon">
                <img src="https://cdn-sites-assets.mziq.com/wp-content/uploads/sites/1555/2025/12/hand-coins-1.png" alt="Sem obras" />
              </div>
              <p className="matriz360-energia-sustentavel-benefits__item__text"><strong>Sem obras</strong>, manutenção ou instalação de placas</p>
            </div>
            <div className="matriz360-energia-sustentavel-benefits__item">
              <div className="matriz360-energia-sustentavel-benefits__item__icon">
                <img src="https://cdn-sites-assets.mziq.com/wp-content/uploads/sites/1555/2025/12/piggy-bank-1-1.png" alt="Proteção" />
              </div>
              <p className="matriz360-energia-sustentavel-benefits__item__text"><strong>Proteção</strong> contra bandeiras tarifárias</p>
            </div>
            <div className="matriz360-energia-sustentavel-benefits__item">
              <div className="matriz360-energia-sustentavel-benefits__item__icon">
                <img src="https://cdn-sites-assets.mziq.com/wp-content/uploads/sites/1555/2025/12/hand-coins-1.png" alt="Fidelidade" />
              </div>
              <p className="matriz360-energia-sustentavel-benefits__item__text"><strong>Sem fidelidade</strong></p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Section */}
      <section className="matriz360-energia-sustentavel-platform" id="platform">
        <div className="matriz360-energia-sustentavel-container">
          <h2 className="matriz360-energia-sustentavel-platform__title">
            Matrix 360: plataforma de <strong>consultores da Matrix Energia</strong>
          </h2>
          <div className="matriz360-energia-sustentavel-platform__grid">
            <div className="matriz360-energia-sustentavel-platform__item">
              <p className="matriz360-energia-sustentavel-platform__item__text"><strong>Plataforma completa</strong> de soluções energéticas</p>
            </div>
            <div className="matriz360-energia-sustentavel-platform__item">
              <p className="matriz360-energia-sustentavel-platform__item__text"><strong>Maior comercializadora</strong> varejista independente</p>
            </div>
            <div className="matriz360-energia-sustentavel-platform__item">
              <p className="matriz360-energia-sustentavel-platform__item__text"><strong>Top 15 comercializadoras</strong> de energia renovável</p>
            </div>
            <div className="matriz360-energia-sustentavel-platform__item">
              <p className="matriz360-energia-sustentavel-platform__item__text"><strong>+10 anos</strong> no setor</p>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Section */}
      <section className="matriz360-energia-sustentavel-digital">
        <div className="matriz360-energia-sustentavel-container">
          <h2 className="matriz360-energia-sustentavel-digital__title">Assinatura 100% Digital</h2>
          <div className="matriz360-energia-sustentavel-digital__steps">
            <div className="matriz360-energia-sustentavel-digital__step">
              <div className="matriz360-energia-sustentavel-digital__step__number">Passo 1</div>
              <p className="matriz360-energia-sustentavel-digital__step__text">O cliente contrata o serviço</p>
            </div>
            <div className="matriz360-energia-sustentavel-digital__step">
              <div className="matriz360-energia-sustentavel-digital__step__number">Passo 2</div>
              <p className="matriz360-energia-sustentavel-digital__step__text">As usinas parceiras geram energia solar e créditos de energia</p>
            </div>
            <div className="matriz360-energia-sustentavel-digital__step">
              <div className="matriz360-energia-sustentavel-digital__step__number">Passo 3</div>
              <p className="matriz360-energia-sustentavel-digital__step__text">A energia gerada é injetada na rede elétrica e a distribuidora leva até o cliente</p>
            </div>
            <div className="matriz360-energia-sustentavel-digital__step">
              <div className="matriz360-energia-sustentavel-digital__step__number">Passo 4</div>
              <p className="matriz360-energia-sustentavel-digital__step__text">Pronto! Ao final do mês, os créditos de energia viram desconto na conta de luz</p>
            </div>
          </div>
          <p className="matriz360-energia-sustentavel-digital__disclaimer">
            <strong>Residências e comércios com consumo a partir de 260kWh/mês (em média, R$300 mensais)</strong> podem garantir uma <strong>conta de luz mais barata</strong> com <strong>energia renovável</strong>, de forma <strong>100% digital</strong>!
          </p>
        </div>
      </section>

      {/* Why Matrix Section */}
      <section className="matriz360-energia-sustentavel-why">
        <div className="matriz360-energia-sustentavel-container">
          <h2 className="matriz360-energia-sustentavel-why__title">A Matrix 360 é pra você que decide ser protagonista da própria história</h2>
          <div className="matriz360-energia-sustentavel-why__grid">
            <div className="matriz360-energia-sustentavel-why__card">
              <h3>Ganhos ilimitados</h3>
              <p>Crescimento sem limites, premiações exclusivas e bônus mensais com 8x multiplicadores</p>
            </div>
            <div className="matriz360-energia-sustentavel-why__card">
              <h3>Esteja entre os grandes</h3>
              <p>Aprenda com os líderes do marketing direto</p>
            </div>
            <div className="matriz360-energia-sustentavel-why__card">
              <h3>Do seu jeito, no seu ritmo</h3>
              <p>Tenha liberdade para empreender: quanto maior a sua determinação, mais alto pode chegar</p>
            </div>
            <div className="matriz360-energia-sustentavel-why__card">
              <h3>Suporte completo</h3>
              <p>Treinamentos exclusivos e um time de especialistas à sua disposição</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bonuses Section */}
      <section className="matriz360-energia-sustentavel-bonuses">
        <div className="matriz360-energia-sustentavel-container">
          <h2 className="matriz360-energia-sustentavel-bonuses__title">8x oportunidades de multiplicar sua renda</h2>
          <p className="matriz360-energia-sustentavel-bonuses__subtitle">Aqui, seu ganho é mensal, ilimitado e sustentável</p>
          <div className="matriz360-energia-sustentavel-bonuses__grid">
            <div className="matriz360-energia-sustentavel-bonuses__item">
              <span className="matriz360-energia-sustentavel-bonuses__item__badge">Bônus direto</span>
              <h3>Conexão de Clientes</h3>
              <p>Ganhe sobre a 1ª conta de cada cliente que contratar a Matrix</p>
            </div>
            <div className="matriz360-energia-sustentavel-bonuses__item">
              <span className="matriz360-energia-sustentavel-bonuses__item__badge">Bônus direto</span>
              <h3>Recorrência de Clientes</h3>
              <p>Lucre com contas pagas de seus clientes indicados</p>
            </div>
            <div className="matriz360-energia-sustentavel-bonuses__item">
              <span className="matriz360-energia-sustentavel-bonuses__item__badge">Bônus direto</span>
              <h3>Indicação de Consultor</h3>
              <p>Tenha bônus por cada consultor cadastrado em seu link</p>
            </div>
            <div className="matriz360-energia-sustentavel-bonuses__item">
              <span className="matriz360-energia-sustentavel-bonuses__item__badge">Bônus da rede</span>
              <h3>Expansão Indireta</h3>
              <p>Receba por cada consultor cadastrado por membros da sua rede</p>
            </div>
            <div className="matriz360-energia-sustentavel-bonuses__item">
              <span className="matriz360-energia-sustentavel-bonuses__item__badge">Bônus da rede</span>
              <h3>Conexão Indireta de Clientes</h3>
              <p>Ganhe sobre a 1ª conta de clientes conectados por consultores da sua rede</p>
            </div>
            <div className="matriz360-energia-sustentavel-bonuses__item">
              <span className="matriz360-energia-sustentavel-bonuses__item__badge">Bônus da rede</span>
              <h3>Recorrência Indireta</h3>
              <p>Lucre com contas pagas de clientes indicados por seus consultores</p>
            </div>
            <div className="matriz360-energia-sustentavel-bonuses__item">
              <span className="matriz360-energia-sustentavel-bonuses__item__badge">Bônus da rede</span>
              <h3>Ativação Mensal</h3>
              <p>Mantenha-se ativo e ganhe bônus sobre sua equipe</p>
            </div>
            <div className="matriz360-energia-sustentavel-bonuses__item">
              <span className="matriz360-energia-sustentavel-bonuses__item__badge">Bônus da rede</span>
              <h3>Pool Executivo</h3>
              <p>Participe de uma cota exclusiva do faturamento do negócio</p>
            </div>
          </div>
          <div className="matriz360-energia-sustentavel-bonuses__stats">
            <div className="matriz360-energia-sustentavel-bonuses__stat">
              <p className="matriz360-energia-sustentavel-bonuses__stat__value">Centenas de consultores</p>
              <p className="matriz360-energia-sustentavel-bonuses__stat__label">conectados</p>
            </div>
            <div className="matriz360-energia-sustentavel-bonuses__stat">
              <p className="matriz360-energia-sustentavel-bonuses__stat__value">+R$2 milhões</p>
              <p className="matriz360-energia-sustentavel-bonuses__stat__label">em faturas de clientes</p>
            </div>
            <div className="matriz360-energia-sustentavel-bonuses__stat">
              <p className="matriz360-energia-sustentavel-bonuses__stat__value">+50.000 clientes</p>
              <p className="matriz360-energia-sustentavel-bonuses__stat__label">atendidos</p>
            </div>
            <div className="matriz360-energia-sustentavel-bonuses__stat">
              <p className="matriz360-energia-sustentavel-bonuses__stat__value">+1,9 bi de economia</p>
              <p className="matriz360-energia-sustentavel-bonuses__stat__label">gerada para nossos clientes</p>
            </div>
          </div>
          <p className="matriz360-energia-sustentavel-bonuses__description">
            Seu cliente economiza e, ao mesmo tempo, você constrói uma fonte de renda sólida para você e sua rede
          </p>
          <div className="matriz360-energia-sustentavel-bonuses__cta">
            <a href="https://wa.me/5547997442391?text=Ol%C3%A1%21%20Vi%20os%20b%C3%B4nus%20da%20Matrix%20360%20e%20gostaria%20de%20saber%20mais%20sobre%20como%20ganhar%20renda%20com%20energia%20renov%C3%A1vel." target="_blank" rel="noopener noreferrer" className="matriz360-energia-sustentavel-btn matriz360-energia-sustentavel-btn--primary">
              Quero ser um consultor
            </a>
          </div>
        </div>
      </section>

      {/* Career Section */}
      <section className="matriz360-energia-sustentavel-career">
        <div className="matriz360-energia-sustentavel-container">
          <h2 className="matriz360-energia-sustentavel-career__title">Crescimento sem limites</h2>
          <p className="matriz360-energia-sustentavel-career__subtitle">O plano de carreira que leva você ao topo</p>
          <div className="matriz360-energia-sustentavel-career__grid">
            {["Consultor", "Consultor Sênior", "Supervisor", "Coordenador", "Gestor", "Diretor", "VP", "Presidente"].map((level, idx) => (
              <div key={idx} className="matriz360-energia-sustentavel-career__item">
                <span className="matriz360-energia-sustentavel-career__item__number">{idx + 1}</span>
                <p className="matriz360-energia-sustentavel-career__item__text">{level}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How You Earn Section */}
      <section className="matriz360-energia-sustentavel-earn">
        <div className="matriz360-energia-sustentavel-container">
          <h2 className="matriz360-energia-sustentavel-earn__title">Como você ganha?</h2>
          <p className="matriz360-energia-sustentavel-earn__subtitle">Dê o primeiro passo para um futuro de sucesso</p>
          <div className="matriz360-energia-sustentavel-earn__steps">
            <div className="matriz360-energia-sustentavel-earn__step">
              <div className="matriz360-energia-sustentavel-earn__step__number">1</div>
              <h3>Cadastro</h3>
              <p>Inscreva-se em nossa plataforma de consultores de energia</p>
            </div>
            <div className="matriz360-energia-sustentavel-earn__step">
              <div className="matriz360-energia-sustentavel-earn__step__number">2</div>
              <h3>Conecte-se à sua rede</h3>
              <p>A Matrix 360 te ajuda a encontrar o grupo de consultores que mais combina com seu perfil: aqui, quem faz a diferença soma forças para crescer junto.</p>
            </div>
            <div className="matriz360-energia-sustentavel-earn__step">
              <div className="matriz360-energia-sustentavel-earn__step__number">3</div>
              <h3>Treinamento</h3>
              <p>Aprenda sobre nossas soluções e treine suas técnicas de venda</p>
            </div>
            <div className="matriz360-energia-sustentavel-earn__step">
              <div className="matriz360-energia-sustentavel-earn__step__number">4</div>
              <h3>Pronto!</h3>
              <p>Agora é com você: é hora de fazer história. Divulgue em sua redes sociais, venda nas ruas e transforme cada contato em oportunidade de renda</p>
            </div>
          </div>
          <div className="matriz360-energia-sustentavel-earn__description">
            Conheça nosso plano de negócios inovador e faça parte do movimento onde <strong>energia vira renda pra você</strong>
          </div>
          <div className="matriz360-energia-sustentavel-earn__cta">
            <a href="https://wa.me/5547997442391?text=Ol%C3%A1%21%20Estou%20interessado%20em%20conhecer%20o%20plano%20de%20neg%C3%B3cios%20da%20Matrix%20360%20e%20como%20posso%20come%C3%A7ar%20a%20ganhar%20renda." target="_blank" rel="noopener noreferrer" className="matriz360-energia-sustentavel-btn matriz360-energia-sustentavel-btn--primary">
              Quero ser um consultor
            </a>
          </div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section className="matriz360-energia-sustentavel-lead-capture" id="cta">
        <div className="matriz360-energia-sustentavel-container">
          <h2 className="matriz360-energia-sustentavel-lead-capture__title">Comece Sua Jornada Agora</h2>
          <div className="matriz360-energia-sustentavel-lead-capture__form-wrapper">
            <form onSubmit={handleLeadSubmit} className="matriz360-energia-sustentavel-lead-capture__form">
              <div className="matriz360-energia-sustentavel-lead-capture__field">
                <label>Nome Completo</label>
                <Input
                  type="text"
                  placeholder="Seu nome"
                  value={leadForm.name}
                  onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="matriz360-energia-sustentavel-lead-capture__field">
                <label>E-mail</label>
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={leadForm.email}
                  onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                  required
                />
              </div>
              <div className="matriz360-energia-sustentavel-lead-capture__field">
                <label>Telefone</label>
                <Input
                  type="tel"
                  placeholder="(47) 99744-2391"
                  value={leadForm.phone}
                  onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                  required
                />
              </div>
              <button
                type="submit"
                className="matriz360-energia-sustentavel-btn matriz360-energia-sustentavel-btn--primary matriz360-energia-sustentavel-lead-capture__submit"
                disabled={submitLeadMutation.isPending}
              >
                {submitLeadMutation.isPending ? "Enviando..." : "Enviar"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="matriz360-energia-sustentavel-faq" id="faq">
        <div className="matriz360-energia-sustentavel-container">
          <h2 className="matriz360-energia-sustentavel-faq__title">Perguntas Frequentes</h2>
          <div className="matriz360-energia-sustentavel-faq__items">
            {faqItems.map((item, idx) => (
              <div key={idx} className="matriz360-energia-sustentavel-faq__item">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="matriz360-energia-sustentavel-faq__item__trigger"
                >
                  <span>{item.question}</span>
                  <ChevronDown className={`matriz360-energia-sustentavel-faq__item__icon ${expandedFaq === idx ? "expanded" : ""}`} />
                </button>
                {expandedFaq === idx && (
                  <div className="matriz360-energia-sustentavel-faq__item__content">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="matriz360-energia-sustentavel-footer">
        <div className="matriz360-energia-sustentavel-container">
          <div className="matriz360-energia-sustentavel-footer__content">
            <div className="matriz360-energia-sustentavel-footer__section">
              <a href="/" className="matriz360-energia-sustentavel-footer__logo">
                <img
                  src="https://cdn-sites-assets.mziq.com/wp-content/uploads/sites/1555/2025/12/matrix-360-logo.png"
                  alt="Matrix 360"
                />
              </a>
              <p>Energia renovável transformada em renda e economia</p>
            </div>
            <div className="matriz360-energia-sustentavel-footer__section">
              <h3>Links Rápidos</h3>
              <ul>
                <li><a href="#platform">Como funciona</a></li>
                <li><a href="#faq">Perguntas frequentes</a></li>
                <li><a href="#cta">Quero ser consultor</a></li>
              </ul>
            </div>
            <div className="matriz360-energia-sustentavel-footer__section">
              <h3>Redes Sociais</h3>
              <div className="matriz360-energia-sustentavel-footer__social">
                <a href="https://www.linkedin.com/showcase/soumatrix360" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn-sites-assets.mziq.com/wp-content/themes/mziq_matrix-360_lp/assets/img/social-media/icon-linkedin.png" alt="LinkedIn" />
                </a>
                <a href="https://www.instagram.com/consultormatrix360/" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn-sites-assets.mziq.com/wp-content/themes/mziq_matrix-360_lp/assets/img/social-media/icon-instagram.png" alt="Instagram" />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61589870593045" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn-sites-assets.mziq.com/wp-content/themes/mziq_matrix-360_lp/assets/img/social-media/icon-facebook.png" alt="Facebook" />
                </a>
                <a href="https://www.youtube.com/@soumatrix360" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn-sites-assets.mziq.com/wp-content/themes/mziq_matrix-360_lp/assets/img/social-media/icon-youtube.png" alt="YouTube" />
                </a>
              </div>
            </div>
          </div>
          <div className="matriz360-energia-sustentavel-footer__bottom">
            <p>&copy; 2026 consultormatrix360 consultor independente</p>
          </div>
        </div>
      </footer>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="matriz360-energia-sustentavel-success-modal-overlay">
          <div className="matriz360-energia-sustentavel-success-modal">
            <div className="matriz360-energia-sustentavel-success-modal__icon">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="40" fill="var(--matrix-primary)" />
                <path d="M30 40L36 46L50 32" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="matriz360-energia-sustentavel-success-modal__title">Parabéns, {successLeadName}!</h2>
            <p className="matriz360-energia-sustentavel-success-modal__message">
              Seu cadastro foi realizado com sucesso!
            </p>
            <p className="matriz360-energia-sustentavel-success-modal__submessage">
              Entraremos em contato em breve pelo WhatsApp ou e-mail.
            </p>
            <a href="https://wa.me/5547997442391" target="_blank" rel="noopener noreferrer" className="matriz360-energia-sustentavel-btn matriz360-energia-sustentavel-btn--primary">
              Conversar no WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
