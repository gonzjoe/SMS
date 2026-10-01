/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Shield, 
  CheckCircle, 
  Printer, 
  Zap, 
  Network, 
  Code, 
  Database, 
  Video, 
  ShoppingBag, 
  Cloud, 
  Users, 
  Cpu, 
  DollarSign, 
  Building, 
  ArrowRight, 
  Calculator, 
  Mail, 
  Phone, 
  MapPin, 
  X, 
  Check, 
  Info, 
  FileText, 
  RefreshCcw, 
  TrendingUp, 
  Layers, 
  User, 
  Briefcase, 
  Sparkles,
  Menu,
  ChevronRight
} from 'lucide-react';

// Interfaces
interface ProductItem {
  id: string;
  title: string;
  category: 'productos' | 'soluciones' | 'financieros';
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  partners?: string[];
  specs?: string[];
}

interface Campaign {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  price: string;
  period: string;
  description: string;
  bulletPoints: string[];
  gradient: string;
  features: string[];
}

// Data Definition
const ALL_PRODUCTS: ProductItem[] = [
  // Productos
  {
    id: 'prod-impresion',
    title: 'Equipo de impresión',
    category: 'productos',
    description: 'Impresoras multifuncionales corporativas, plotters y equipos de alto volumen de última generación.',
    icon: Printer,
    partners: ['HP', 'Dell'],
    specs: ['Velocidades de hasta 65 ppm', 'Soporte de red e impresión en la nube', 'Mantenimiento preventivo incluido']
  },
  {
    id: 'prod-proteccion',
    title: 'Protección eléctrica',
    category: 'productos',
    description: 'No-breaks (UPS), reguladores y sistemas de respaldo de energía crítica para proteger tus servidores.',
    icon: Zap,
    partners: ['APC', 'Tripp-Lite'],
    specs: ['Respaldo de hasta 4 horas', 'Protección contra picos de voltaje', 'Monitoreo de red remota']
  },
  {
    id: 'prod-redes',
    title: 'Redes y conectividad',
    category: 'productos',
    description: 'Routers, switches, antenas de largo alcance, y cableado estructurado certificado para oficinas.',
    icon: Network,
    partners: ['Cisco', 'Linksys', 'Belden'],
    specs: ['Estándar Cat 6 y Fibra Óptica', 'Administración en la nube corporativa', 'Garantía de rendimiento']
  },
  {
    id: 'prod-software',
    title: 'Software',
    category: 'productos',
    description: 'Licenciamiento corporativo, herramientas de diseño, sistemas operativos y suites de productividad.',
    icon: Code,
    partners: ['Microsoft Azure', 'Symantec'],
    specs: ['Licenciamiento 100% legal', 'Renovaciones anuales automatizadas', 'Auditoría interna preventiva']
  },
  {
    id: 'prod-consumibles',
    title: 'Consumibles',
    category: 'productos',
    description: 'Tóners, cartuchos y papel de alta calidad con suministro programado directo a su oficina.',
    icon: Database,
    partners: ['HP', 'Dell'],
    specs: ['Suministro mensual automatizado', 'Tóners originales con garantía', 'Reciclaje ecológico de cartuchos']
  },
  {
    id: 'prod-videovigilancia',
    title: 'Videovigilancia',
    category: 'productos',
    description: 'Cámaras IP, NVRs de almacenamiento masivo y monitoreo en tiempo real desde dispositivos móviles.',
    icon: Video,
    partners: ['Fortinet', 'Palo Alto Networks'],
    specs: ['Resolución 4K Ultra HD', 'Visión nocturna por infrarrojo', 'Detección por Inteligencia Artificial']
  },
  {
    id: 'prod-pos',
    title: 'Punto de venta',
    category: 'productos',
    description: 'Terminales touch, lectores de códigos de barras, impresoras de tickets y cajones de dinero robustos.',
    icon: ShoppingBag,
    partners: ['Dell', 'Linksys'],
    specs: ['Pantallas touch capacitivas', 'Lectores de alta velocidad 2D', 'Sistemas operativos de grado industrial']
  },

  // Soluciones Tecnológicas
  {
    id: 'sol-office365',
    title: 'Office 365',
    category: 'soluciones',
    description: 'Colaboración empresarial en la nube con Word, Excel, PowerPoint, Teams y correos corporativos seguros.',
    icon: Users,
    partners: ['Microsoft Azure'],
    specs: ['Buzones de 50GB por usuario', 'OneDrive con 1TB de almacenamiento', 'Videollamadas HD ilimitadas']
  },
  {
    id: 'sol-nube',
    title: 'Infraestructura en la nube',
    category: 'soluciones',
    description: 'Servidores virtuales, respaldos remotos automatizados y bases de datos escalables con alta disponibilidad.',
    icon: Cloud,
    partners: ['Microsoft Azure', 'Amazon'],
    specs: ['Garantía de disponibilidad 99.99%', 'Migración sin fricciones', 'Backups encriptados de extremo a extremo']
  },
  {
    id: 'sol-active-directory',
    title: 'Directorio activo',
    category: 'soluciones',
    description: 'Control de accesos unificado, permisos centralizados y políticas de seguridad para computadoras corporativas.',
    icon: Shield,
    partners: ['Microsoft Azure', 'Symantec'],
    specs: ['Gestión de contraseñas segura', 'Single Sign-On (SSO)', 'Políticas de grupo automatizadas']
  },
  {
    id: 'sol-virtualizacion',
    title: 'Virtualización',
    category: 'soluciones',
    description: 'Consolidación de servidores físicos en entornos virtuales para reducir costos de energía y hardware.',
    icon: Cpu,
    partners: ['Microsoft Azure', 'Dell'],
    specs: ['Reducción de costos de hardware hasta 50%', 'Recuperación ante desastres en minutos', 'Aprovechamiento de CPU óptimo']
  },
  {
    id: 'sol-softpdv',
    title: 'Software admin. PDV',
    category: 'soluciones',
    description: 'Control absoluto de inventarios, cajas registradoras, cortes diarios, reportes fiscales y facturación.',
    icon: ShoppingBag,
    partners: ['Microsoft Azure', 'Dell'],
    specs: ['Facturación electrónica CFDI 4.0', 'Multi-sucursal en tiempo real', 'Alerta automática de stock bajo']
  },

  // Servicios Financieros
  {
    id: 'fin-financiamiento',
    title: 'Financiamiento',
    category: 'financieros',
    description: 'Planes de crédito corporativo flexibles adaptados a los flujos de efectivo de tu organización.',
    icon: DollarSign,
    partners: ['APC', 'Dell'],
    specs: ['Plazos de 6 a 48 meses', 'Tasas de interés competitivas fijas', 'Aprobación rápida en 48 horas']
  },
  {
    id: 'fin-comodato',
    title: 'Comodato',
    category: 'financieros',
    description: 'Uso de equipamiento sin costo de adquisición inicial. Ideal para proyectos de mediano plazo vinculados a consumibles.',
    icon: Building,
    partners: ['HP', 'Cisco'],
    specs: ['Cero inversión inicial en equipo', 'Soporte técnico integral incluido', 'Reemplazo tecnológico garantizado']
  },
  {
    id: 'fin-consignacion',
    title: 'Consignación',
    category: 'financieros',
    description: 'Disponibilidad de inventario crítico directo en tus instalaciones, pagando únicamente por lo consumido.',
    icon: Layers,
    partners: ['Dell', 'Belden'],
    specs: ['Stock de refacciones en su oficina', 'Pago mensual sobre consumos', 'Optimización de capital de trabajo']
  },
  {
    id: 'fin-arrendamiento',
    title: 'Arrendamiento puro',
    category: 'financieros',
    description: 'Renta mensual de hardware 100% deducible de impuestos (OPEX). Conserva liquidez y mantente actualizado.',
    icon: FileText,
    partners: ['HP', 'Dell', 'Cisco'],
    specs: ['Deducción fiscal mensual completa', 'Renovación de equipos cada 3 años', 'No afecta tus líneas de crédito']
  }
];

const CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-pos',
    title: 'Punto de Venta Completo',
    tagline: 'Ideal para comercios y retail en crecimiento',
    badge: 'MÁS POPULAR',
    price: '$65',
    period: 'pesos diarios*',
    description: 'Obtén una terminal punto de venta industrial con pantalla touch, cajón de efectivo, impresora de tickets, lector de códigos y software administrativo de inventarios. Todo con soporte técnico continuo y $0 de inversión inicial.',
    bulletPoints: [
      'Equipo industrial con garantía total',
      'Software de inventarios con nube incluido',
      'Soporte técnico telefónico y presencial',
      'Ideal para restaurantes, abarrotes y tiendas de ropa'
    ],
    gradient: 'from-blue-900 to-blue-700',
    features: ['Terminal Touch', 'Lector 2D', 'Impresora Térmica', 'Software PDV']
  },
  {
    id: 'camp-ssd',
    title: 'Actualización con SSD Kingston',
    tagline: 'Multiplica la velocidad de tus computadoras',
    badge: 'AHORRO CORPORATIVO',
    price: '$12',
    period: 'pesos al mes por equipo',
    description: 'No deseches tus equipos lentos. Renovamos el rendimiento físico de tus laptops y PCs de oficina instalando Unidades de Estado Sólido (SSD) Kingston de alta velocidad y realizando mantenimiento general sin detener tu operación.',
    bulletPoints: [
      'Arranque del sistema hasta 10 veces más rápido',
      'Soporte técnico y clonación de datos segura',
      'Instalación express fuera de horario laboral',
      'Extiende la vida útil de tus equipos por 3 años más'
    ],
    gradient: 'from-red-800 to-red-600',
    features: ['SSD Kingston 480GB/960GB', 'Mano de obra certificada', 'Limpieza física de ventiladores', 'Respaldo de información']
  },
  {
    id: 'camp-bigdata',
    title: 'Infraestructura Big Data',
    tagline: 'Almacenamiento masivo para toma de decisiones',
    badge: 'EMPRESARIAL',
    price: 'Personalizado',
    period: 'según necesidades',
    description: 'Diseñamos y montamos servidores de alto rendimiento físico y esquemas híbridos en la nube para el análisis y resguardo seguro de millones de datos comerciales. Protegido por los mejores esquemas de ciberseguridad.',
    bulletPoints: [
      'Servidores dedicados Dell o Azure',
      'Configuración de bases de datos de alta velocidad',
      'Cifrado de grado militar contra ciberataques',
      'Respaldos automáticos georredundantes'
    ],
    gradient: 'from-slate-900 to-slate-800',
    features: ['Bases de Datos SQL', 'Azure Enterprise', 'Firewall Fortinet', 'Backups Automáticos']
  },
  {
    id: 'camp-retail',
    title: 'El Futuro del Retail con SMS',
    tagline: 'Experiencia de compra omnicanal automatizada',
    badge: 'INNOVACIÓN',
    price: '$1,999',
    period: 'mensuales en arrendamiento',
    description: 'Revoluciona la experiencia de tus clientes. Integra quioscos de auto-pago, control de inventario por radiofrecuencia (RFID), cámaras con conteo de personas y pantallas publicitarias dinámicas controladas centralmente.',
    bulletPoints: [
      'Quioscos de cobro automático con terminal bancaria',
      'Control de merma en tiempo real',
      'Pantallas publicitarias Ultra HD con software CMS',
      'Analítica avanzada de zonas calientes en tienda'
    ],
    gradient: 'from-emerald-950 to-emerald-800',
    features: ['Kiosco de Auto-pago', 'RFID Tracking', 'Conteo de Visitantes', 'Señalización Digital']
  }
];

const STRATEGIC_PARTNERS = [
  { name: 'HP', color: 'hover:text-sky-500' },
  { name: 'Dell', color: 'hover:text-blue-600' },
  { name: 'Palo Alto', color: 'hover:text-orange-600' },
  { name: 'Microsoft Azure', color: 'hover:text-cyan-500' },
  { name: 'Amazon', color: 'hover:text-amber-500' },
  { name: 'APC', color: 'hover:text-emerald-500' },
  { name: 'Fortinet', color: 'hover:text-red-600' },
  { name: 'Cisco', color: 'hover:text-blue-500' },
  { name: 'Symantec', color: 'hover:text-yellow-600' },
  { name: 'Linksys', color: 'hover:text-blue-400' },
  { name: 'Tripp-Lite', color: 'hover:text-slate-600' },
  { name: 'Belden', color: 'hover:text-red-500' }
];

export default function App() {
  // State variables
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'productos' | 'soluciones' | 'financieros'>('all');
  const [selectedPartnerFilter, setSelectedPartnerFilter] = useState<string | null>(null);
  const [basket, setBasket] = useState<ProductItem[]>([]);
  const [activeCampaign, setActiveCampaign] = useState<Campaign | null>(null);
  
  // Calculator values
  const [equipmentCost, setEquipmentCost] = useState<number>(350000);
  const [leaseMonths, setLeaseMonths] = useState<number>(36);
  const [equipmentType, setEquipmentType] = useState<string>('cómputo');

  // Contact Form values
  const [companyName, setCompanyName] = useState('');
  const [companyRfc, setCompanyRfc] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  // General Modals
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter(item => {
      const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
      const partnerMatch = !selectedPartnerFilter || (item.partners && item.partners.includes(selectedPartnerFilter));
      return categoryMatch && partnerMatch;
    });
  }, [selectedCategory, selectedPartnerFilter]);

  // Calculator math
  const calculatorResults = useMemo(() => {
    // Standard leasing factor approx 0.032 to 0.038 depending on duration
    const factorMap: { [key: number]: number } = {
      12: 0.091,
      24: 0.048,
      36: 0.034,
      48: 0.027
    };
    const factor = factorMap[leaseMonths] || 0.034;
    const monthlyPayment = equipmentCost * factor;
    const totalLeasingPaid = monthlyPayment * leaseMonths;
    
    // Purchase math
    const purchaseInitialOutlay = equipmentCost;
    const opexTaxSavings = totalLeasingPaid * 0.30; // 30% corporate income tax rate in Mexico (ISR)
    const netLeasingCostAfterTax = totalLeasingPaid - opexTaxSavings;
    
    // Purchase depreciation: limited in Mexico (max $10,400 MXN deduction for computer hardware / year in traditional setups sometimes, or 30% per year)
    // But leasing is 100% deductible as an operational expense up to massive thresholds.
    const directPurchaseTaxSavings = equipmentCost * 0.30; 
    const netPurchaseCostAfterTax = equipmentCost - directPurchaseTaxSavings;

    return {
      monthlyPayment: Math.round(monthlyPayment),
      totalLeasingPaid: Math.round(totalLeasingPaid),
      purchaseInitialOutlay: Math.round(purchaseInitialOutlay),
      leasingInitialOutlay: 0, // $0 initial investment
      opexTaxSavings: Math.round(opexTaxSavings),
      netLeasingCostAfterTax: Math.round(netLeasingCostAfterTax),
      netPurchaseCostAfterTax: Math.round(netPurchaseCostAfterTax),
      capitalFreed: Math.round(equipmentCost)
    };
  }, [equipmentCost, leaseMonths]);

  // Basket control functions
  const toggleBasketItem = (item: ProductItem) => {
    if (basket.some(b => b.id === item.id)) {
      setBasket(basket.filter(b => b.id !== item.id));
    } else {
      setBasket([...basket, item]);
    }
  };

  const removeBasketItem = (id: string) => {
    setBasket(basket.filter(b => b.id !== id));
  };

  const clearBasket = () => {
    setBasket([]);
  };

  // Pre-fill form with a specific campaign and focus the form
  const applyCampaignToForm = (campaign: Campaign) => {
    // Add custom project description
    const customCampaignItem: ProductItem = {
      id: campaign.id,
      title: `Campaña: ${campaign.title}`,
      category: 'productos',
      description: campaign.tagline,
      icon: Sparkles,
      partners: []
    };
    
    if (!basket.some(b => b.id === campaign.id)) {
      setBasket([...basket, customCampaignItem]);
    }
    
    setContactMsg(prev => {
      const intro = `Me interesa la campaña: "${campaign.title}" (Costo aproximado: ${campaign.price} ${campaign.period}).`;
      if (prev.includes(intro)) return prev;
      return prev ? `${intro}\n\n${prev}` : intro;
    });

    setActiveCampaign(null); // Close Modal

    // Smooth scroll to contact form
    const formSec = document.getElementById('solicitud-cotizacion');
    if (formSec) {
      formSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Standard form submission validation and logic
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!companyName.trim()) errors.companyName = 'El nombre de la empresa es obligatorio.';
    if (!contactName.trim()) errors.contactName = 'El nombre del contacto es obligatorio.';
    if (!contactEmail.trim()) {
      errors.contactEmail = 'El correo electrónico es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(contactEmail)) {
      errors.contactEmail = 'Formato de correo inválido.';
    }
    if (!contactPhone.trim()) {
      errors.contactPhone = 'El teléfono es obligatorio.';
    } else if (!/^\d{10}$/.test(contactPhone.replace(/\D/g, ''))) {
      errors.contactPhone = 'El teléfono debe tener exactamente 10 dígitos.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Success
    setFormErrors({});
    const randomReceiptNum = 'SMS-' + Math.floor(100000 + Math.random() * 900000);
    const data = {
      receiptNumber: randomReceiptNum,
      companyName,
      companyRfc: companyRfc || 'XAXX010101000 (Genérico)',
      contactName,
      contactEmail,
      contactPhone,
      contactMsg,
      selectedItems: [...basket],
      calculatorEstimate: {
        cost: equipmentCost,
        months: leaseMonths,
        type: equipmentType,
        monthly: calculatorResults.monthlyPayment
      },
      date: new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })
    };

    setSubmittedData(data);
    setIsSubmitted(true);
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
    setCompanyName('');
    setCompanyRfc('');
    setContactName('');
    setContactEmail('');
    setContactPhone('');
    setContactMsg('');
    setBasket([]);
  };

  return (
    <div className="min-h-screen text-slate-800 flex flex-col selection:bg-red-600 selection:text-white">
      
      {/* 1. TOP NAV BAR (Strict Top Bar Contract: 3 Zones) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Zone 1: Brand Wordmark (Single dynamic text & color logo) */}
          <div className="flex items-center">
            <a href="#" className="flex flex-col group">
              <span className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold tracking-tighter text-[#0F3B74] group-hover:text-red-600 transition-colors">
                  SMS
                </span>
                <span className="text-xs font-bold text-red-600 tracking-wider">MÉXICO</span>
              </span>
              <span className="text-[9px] font-semibold text-slate-400 tracking-widest uppercase -mt-1 group-hover:text-slate-600 transition-colors">
                Storage Media Solutions
              </span>
            </a>
          </div>

          {/* Zone 2: Navigation Links (4-6 single-line links) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#" className="hover:text-[#0F3B74] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-[#0F3B74] hover:after:w-full after:transition-all">
              Inicio
            </a>
            <a href="#beneficios" className="hover:text-[#0F3B74] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-[#0F3B74] hover:after:w-full after:transition-all">
              Beneficios
            </a>
            <a href="#soluciones" className="hover:text-[#0F3B74] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-[#0F3B74] hover:after:w-full after:transition-all">
              Servicios corporativos
            </a>
            <a href="#calculador" className="hover:text-[#0F3B74] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-[#0F3B74] hover:after:w-full after:transition-all">
              Calculadora de Ahorro
            </a>
            <a href="#campanas" className="hover:text-[#0F3B74] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-[#0F3B74] hover:after:w-full after:transition-all">
              Promociones
            </a>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="hidden sm:flex items-center gap-4">
            {basket.length > 0 && (
              <a 
                href="#solicitud-cotizacion" 
                className="relative p-2 text-slate-600 hover:text-red-600 transition-colors flex items-center gap-2"
              >
                <div className="absolute top-0 right-0 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                  {basket.length}
                </div>
                <span className="text-xs font-semibold">Mi Solicitud</span>
              </a>
            )}
            <a 
              href="#solicitud-cotizacion" 
              className="px-5 py-2.5 bg-[#0F3B74] hover:bg-[#09264c] text-white text-xs font-bold rounded-lg transition-all shadow-md hover:shadow-lg active:scale-95 whitespace-nowrap"
            >
              Cotizar Proyecto
            </a>
          </div>

          {/* Mobile hamburger menu button */}
          <div className="lg:hidden flex items-center gap-4">
            {basket.length > 0 && (
              <a 
                href="#solicitud-cotizacion" 
                className="relative p-2 text-slate-600"
              >
                <div className="absolute top-0 right-0 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {basket.length}
                </div>
                <ShoppingBag className="w-5 h-5" />
              </a>
            )}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="p-2 text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#0F3B74] rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white py-4 px-6 space-y-3 shadow-inner">
            <a 
              href="#" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block py-2 text-slate-600 hover:text-[#0F3B74] font-medium"
            >
              Inicio
            </a>
            <a 
              href="#beneficios" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block py-2 text-slate-600 hover:text-[#0F3B74] font-medium"
            >
              Beneficios
            </a>
            <a 
              href="#soluciones" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block py-2 text-slate-600 hover:text-[#0F3B74] font-medium"
            >
              Servicios corporativos
            </a>
            <a 
              href="#calculador" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block py-2 text-slate-600 hover:text-[#0F3B74] font-medium"
            >
              Calculadora de Ahorro
            </a>
            <a 
              href="#campanas" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block py-2 text-slate-600 hover:text-[#0F3B74] font-medium"
            >
              Promociones
            </a>
            <div className="pt-2 border-t border-slate-100">
              <a 
                href="#solicitud-cotizacion" 
                onClick={() => setMobileMenuOpen(false)} 
                className="w-full text-center block px-4 py-3 bg-[#0F3B74] hover:bg-blue-900 text-white text-sm font-bold rounded-lg transition-colors"
              >
                Cotizar Proyecto
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden bg-[#0A192F] text-white">
        
        {/* Abstract futuristic grid / neural-net SVG illustration fallback background */}
        <div className="absolute inset-0 opacity-15">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Holographic lines */}
            <path d="M 0 100 Q 300 300 600 100 T 1200 400" fill="none" stroke="rgba(239,68,68,0.4)" strokeWidth="2" strokeDasharray="5,5" />
            <path d="M 100 900 Q 500 500 900 800 T 1500 300" fill="none" stroke="rgba(59,130,246,0.4)" strokeWidth="2" />
            
            {/* Dynamic nodes */}
            <circle cx="300" cy="200" r="4" fill="#EF4444" className="animate-ping" />
            <circle cx="300" cy="200" r="4" fill="#EF4444" />
            <circle cx="900" cy="250" r="4" fill="#3B82F6" />
            <circle cx="1200" cy="400" r="4" fill="#EF4444" />
          </svg>
        </div>

        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pt-24 md:pb-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Micro badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span className="text-xs font-semibold tracking-wider text-slate-200">
                  Infraestructura de TI y Servicios de Arrendamiento
                </span>
              </div>

              {/* Bold Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-wrap-balance">
                Tenemos la solución para la <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-400">adquisición</span> de equipos de TI
              </h1>

              {/* Value Proposition Statement */}
              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
                Impulsamos tu empresa con equipos de cómputo, impresión, videovigilancia y redes con <span className="font-bold text-white underline decoration-red-500 decoration-2">0% de inversión inicial</span> bajo esquemas flexibles de Arrendamiento, Comodato y Financiamiento.
              </p>

              {/* Action and Proof CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a 
                  href="#calculador" 
                  className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg hover:shadow-red-600/30 flex items-center justify-center gap-2 hover:translate-y-[-2px] active:translate-y-0"
                >
                  <Calculator className="w-4 h-4" />
                  Calcular Ahorro Corporativo
                </a>
                <a 
                  href="#soluciones" 
                  className="px-8 py-4 bg-white/10 hover:bg-white/15 border border-white/20 text-white text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  Ver Soluciones Tecnológicas
                  <ArrowRight className="w-4 h-4 text-red-500" />
                </a>
              </div>

              {/* Hero Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 max-w-lg">
                <div>
                  <div className="text-3xl font-extrabold font-mono text-white tracking-tight">$0</div>
                  <div className="text-xs text-slate-400 mt-1">Inversión Inicial en Hardware</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold font-mono text-white tracking-tight">100%</div>
                  <div className="text-xs text-slate-400 mt-1">Deducible de Impuestos (OPEX)</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold font-mono text-white tracking-tight">2Hrs</div>
                  <div className="text-xs text-slate-400 mt-1">Respuesta de Asistencia TI</div>
                </div>
              </div>

            </div>

            {/* Hero Right Visual Column - Replaces failing generated image with absolute premium SVG UI Dashboard */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-[420px] lg:max-w-none">
                
                {/* Background decorative square design element */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-red-600 to-blue-600 rounded-3xl blur-md opacity-20 group-hover:opacity-35 transition duration-1000"></div>
                
                {/* Main Interactive Visual Mockup (16:9 box equivalent in visual weight) */}
                <div className="relative bg-[#0d1e3d] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-6 overflow-hidden">
                  
                  {/* Decorative window bar */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-xs font-mono text-blue-300">sms_control_panel.sh</span>
                    <div className="w-4" />
                  </div>

                  {/* Schema illustration */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Arrendamiento de Infraestructura</span>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">Activo</span>
                    </div>

                    {/* Graph Visual */}
                    <div className="h-28 flex items-end gap-2 bg-slate-950/40 rounded-xl p-3 border border-white/5 relative">
                      <div className="absolute inset-0 flex flex-col justify-between p-3 pointer-events-none">
                        <div className="border-b border-white/5 w-full h-0" />
                        <div className="border-b border-white/5 w-full h-0" />
                        <div className="border-b border-white/5 w-full h-0" />
                      </div>
                      
                      {/* Interactive bar indicators */}
                      <div className="w-full flex items-end justify-between h-full relative z-10">
                        <div className="flex flex-col items-center w-8 group">
                          <div className="w-full bg-slate-800 rounded-t h-16 group-hover:bg-red-500 transition-colors"></div>
                          <span className="text-[9px] font-mono text-slate-500 mt-1">Adq. Directa</span>
                        </div>
                        <div className="flex flex-col items-center w-8 group">
                          <div className="w-full bg-slate-800 rounded-t h-20 group-hover:bg-blue-400 transition-colors"></div>
                          <span className="text-[9px] font-mono text-slate-500 mt-1">Crédito</span>
                        </div>
                        <div className="flex flex-col items-center w-8 group">
                          <div className="w-full bg-red-600 rounded-t h-6 group-hover:bg-red-500 transition-colors"></div>
                          <span className="text-[9px] font-mono text-red-400 font-bold mt-1">Arrend. SMS</span>
                        </div>
                      </div>
                    </div>

                    {/* Feature Indicators */}
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-white/5 rounded-lg p-2 border border-white/5 flex items-center gap-2">
                        <Printer className="w-4 h-4 text-red-500 shrink-0" />
                        <div>
                          <p className="font-bold text-white">Equipos</p>
                          <p className="text-[10px] text-slate-400">Originales de Fábrica</p>
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2 border border-white/5 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-blue-400 shrink-0" />
                        <div>
                          <p className="font-bold text-white">Seguridad</p>
                          <p className="text-[10px] text-slate-400">Protección Continua</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                        <span className="font-semibold text-slate-200">Próxima renovación de tecnología</span>
                      </div>
                      <span className="font-mono text-slate-400">Automatizada</span>
                    </div>

                  </div>
                </div>

                {/* Overlapping Absolute visual floating pills - NOT static, they explain interactive actions */}
                <div className="absolute -bottom-6 -left-6 bg-white text-slate-900 border border-slate-100 rounded-xl p-3 shadow-xl flex items-center gap-3 max-w-[200px] hidden sm:flex">
                  <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Ahorro Fiscal</p>
                    <p className="text-sm font-extrabold text-slate-900 font-mono">100% OPEX</p>
                  </div>
                </div>

                <div className="absolute -top-6 -right-6 bg-white text-slate-900 border border-slate-100 rounded-xl p-3 shadow-xl flex items-center gap-3 max-w-[210px] hidden sm:flex">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Check className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Soporte Técnico</p>
                    <p className="text-xs font-bold text-slate-800">Incluido Sin Costo</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Diagonal Angle Cut Ribbon - "Ventas institucionales" matching image perfectly */}
        <div className="bg-red-600 relative py-5 overflow-hidden">
          <div className="absolute inset-0 bg-[#0F3B74] transform -skew-y-2 origin-left scale-y-150 top-1/2 translate-y-1" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white uppercase italic">
              ✦ Ventas Institucionales e Infraestructura Tecnológica corporativa
            </span>
            <span className="text-xs sm:text-sm font-semibold bg-white text-red-700 px-4 py-1.5 rounded-lg shadow-sm font-mono whitespace-nowrap">
              CONTRATOS A NIVEL NACIONAL (MÉXICO)
            </span>
          </div>
        </div>

      </section>

      {/* 3. VALUE PROPOSITION BENEFITS SECTION */}
      <section id="beneficios" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-red-600 uppercase">La alternativa inteligente</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              ¿Por qué rentar con SMS México en lugar de comprar?
            </h2>
            <div className="w-20 h-1 bg-[#0F3B74] mx-auto rounded-full" />
            <p className="text-slate-600 text-lg">
              Analizamos la realidad financiera de las empresas mexicanas ante la adquisición tecnológica. Comprar hardware te descapitaliza; arrendar te impulsa.
            </p>
          </div>

          {/* Benefits Grid (Matching the 4 checkbox descriptions from the original image in premium cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card 1 */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0F3B74] group-hover:bg-red-600 transition-colors" />
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0F3B74] flex items-center justify-center shrink-0">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900">Mito del Costo Inicial Cero</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Hoy en día es muy común encontrarnos con promociones en donde se ofrecen equipos sin costo inicial, sin embargo no siempre resultan ser la mejor opción, especialmente si buscamos ahorrar a largo plazo bajo contratos tradicionales leoninos.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-red-600 group-hover:bg-blue-600 transition-colors" />
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900">Solución SMS: Sin Costo Financiero</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    En SMS México le entregamos equipamiento sin costo inicial. Esto le permite obtener de inmediato la infraestructura requerida para operar sin cargar con el costo de financiamiento directo que conlleva adquirir un activo productivo.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0F3B74] group-hover:bg-red-600 transition-colors" />
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0F3B74] flex items-center justify-center shrink-0">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900">Amortiguación del Gasto Operativo</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Al comprar, las empresas se ven obligadas a pagar un alto precio inmediato por el equipo. Aunque cuente con la capacidad financiera, suele ser inmensamente preferible amortiguar el gasto solicitando un arrendamiento como OPEX.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-red-600 group-hover:bg-blue-600 transition-colors" />
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900">Evite la Obsolescencia y Depreciación</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    En SMS México le ayudamos a evitar correr riesgos con la larga amortización contable a varios años. Los equipos pierden rápidamente su valor comercial en el mercado, generando un severo atraso tecnológico para su negocio.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. INTERACTIVE PRODUCTS & SOLUTIONS CATALOG (With Add to Quote features) */}
      <section id="soluciones" className="py-24 bg-slate-50 border-y border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-widest text-red-600 uppercase">Catálogo Integral</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Portafolio de Soluciones y Servicios TI
              </h2>
              <p className="text-slate-600 max-w-xl">
                Haz clic en cualquier categoría para filtrar. Puedes agregar productos directamente a tu canasta de solicitud de cotización formal.
              </p>
            </div>

            {/* Interactive Filters (Buttons for client-side state) */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-200/60 backdrop-blur rounded-xl border border-slate-200">
              <button 
                onClick={() => { setSelectedCategory('all'); setSelectedPartnerFilter(null); }}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${selectedCategory === 'all' ? 'bg-[#0F3B74] text-white shadow' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/50'}`}
              >
                Todos
              </button>
              <button 
                onClick={() => { setSelectedCategory('productos'); setSelectedPartnerFilter(null); }}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${selectedCategory === 'productos' ? 'bg-[#0F3B74] text-white shadow' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/50'}`}
              >
                Productos
              </button>
              <button 
                onClick={() => { setSelectedCategory('soluciones'); setSelectedPartnerFilter(null); }}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${selectedCategory === 'soluciones' ? 'bg-[#0F3B74] text-white shadow' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/50'}`}
              >
                Soluciones Tecnológicas
              </button>
              <button 
                onClick={() => { setSelectedCategory('financieros'); setSelectedPartnerFilter(null); }}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${selectedCategory === 'financieros' ? 'bg-[#0F3B74] text-white shadow' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/50'}`}
              >
                Servicios Financieros
              </button>
            </div>
          </div>

          {/* Partner Quick-Filter tags */}
          <div className="flex flex-wrap items-center gap-2 mb-8 text-xs text-slate-500">
            <span>Filtrar por Aliado Estratégico:</span>
            {STRATEGIC_PARTNERS.map(partner => (
              <button
                key={partner.name}
                onClick={() => {
                  if (selectedPartnerFilter === partner.name) {
                    setSelectedPartnerFilter(null);
                  } else {
                    setSelectedPartnerFilter(partner.name);
                  }
                }}
                className={`px-3 py-1 rounded-full border transition-all ${
                  selectedPartnerFilter === partner.name
                    ? 'bg-red-600 border-red-600 text-white font-bold'
                    : 'border-slate-300 hover:border-[#0F3B74] text-slate-700 bg-white'
                }`}
              >
                {partner.name}
              </button>
            ))}
            {selectedPartnerFilter && (
              <button 
                onClick={() => setSelectedPartnerFilter(null)}
                className="text-red-600 font-bold hover:underline shrink-0"
              >
                (Quitar Filtro)
              </button>
            )}
          </div>

          {/* Results Grid - Dynamic Cards with single-level elevation and visual restraint */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(item => {
              const IconComp = item.icon;
              const isAdded = basket.some(b => b.id === item.id);
              return (
                <div 
                  key={item.id} 
                  className={`bg-white border rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 ${
                    isAdded 
                      ? 'border-red-500 shadow-md ring-1 ring-red-500' 
                      : 'border-slate-100 hover:border-slate-300 hover:shadow-md'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Top zone */}
                    <div className="flex items-start justify-between">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        item.category === 'productos' ? 'bg-blue-50 text-[#0F3B74]' :
                        item.category === 'soluciones' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-700'
                      }`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      
                      {/* Zero-Pill category tag (Clean metadata text as per front-end design) */}
                      <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
                        {item.category === 'productos' ? 'Equipamiento' :
                         item.category === 'soluciones' ? 'TI Nube' : 'Esquema Financiero'}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed min-h-[60px]">
                        {item.description}
                      </p>
                    </div>

                    {/* Specs Bullet List */}
                    {item.specs && (
                      <ul className="space-y-1.5 pt-3 border-t border-slate-100 text-xs text-slate-500">
                        {item.specs.map((spec, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Footer & CTA block */}
                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                    {/* Partners association */}
                    <div className="flex flex-wrap gap-1 max-w-[50%]">
                      {item.partners?.map(p => (
                        <span key={p} className="text-[10px] bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded">
                          {p}
                        </span>
                      ))}
                    </div>

                    {/* Active Quote Selection button (Functional state trigger) */}
                    <button
                      onClick={() => toggleBasketItem(item)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                        isAdded 
                          ? 'bg-red-600 text-white hover:bg-red-700' 
                          : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                      }`}
                    >
                      {isAdded ? '✓ Seleccionado' : '+ Cotizar'}
                    </button>
                  </div>

                </div>
              );
            })}

            {/* Empty filter fallbacks */}
            {filteredProducts.length === 0 && (
              <div className="col-span-full bg-white border border-slate-100 rounded-2xl p-12 text-center space-y-4">
                <Info className="w-12 h-12 text-slate-300 mx-auto" />
                <h4 className="text-lg font-bold text-slate-900">No se encontraron soluciones</h4>
                <p className="text-slate-500 max-w-md mx-auto text-sm">
                  Prueba cambiando los filtros estratégicos o la categoría seleccionada para explorar el portafolio completo de SMS México.
                </p>
                <button 
                  onClick={() => { setSelectedCategory('all'); setSelectedPartnerFilter(null); }}
                  className="px-4 py-2 bg-[#0F3B74] text-white text-xs font-bold rounded-lg"
                >
                  Restablecer Filtros
                </button>
              </div>
            )}
          </div>

          {/* Floating selection basket drawer if items added */}
          {basket.length > 0 && (
            <div className="mt-12 bg-[#0F3B74] text-white rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Tienes {basket.length} {basket.length === 1 ? 'solución seleccionada' : 'soluciones seleccionadas'}</h4>
                  <p className="text-xs text-slate-300">
                    {basket.map(b => b.title).join('  ·  ')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <button 
                  onClick={clearBasket}
                  className="px-4 py-2 text-xs text-slate-300 hover:text-white transition-colors"
                >
                  Limpiar Todo
                </button>
                <a 
                  href="#solicitud-cotizacion"
                  className="flex-1 md:flex-initial text-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold rounded-lg transition-all whitespace-nowrap"
                >
                  Proceder a Cotización
                </a>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 5. INTERACTIVE LEASING & RETURN ON INVESTMENT CALCULATOR (Corporate differentiator) */}
      <section id="calculador" className="py-24 bg-white relative overflow-hidden">
        
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-50 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-50 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-red-600 uppercase">Simulador Financiero</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Calculadora de Arrendamiento vs Compra Directa
            </h2>
            <div className="w-20 h-1 bg-red-600 mx-auto rounded-full" />
            <p className="text-slate-600">
              Compara de forma interactiva el impacto de flujo de caja y los beneficios fiscales que ofrece el Arrendamiento Puro (OPEX) frente a la compra directa tradicional (CAPEX).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Calculator Inputs Left Panel */}
            <div className="lg:col-span-5 bg-slate-50 border border-slate-100 rounded-3xl p-8 flex flex-col justify-between space-y-6">
              
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Calculator className="w-6 h-6 text-[#0F3B74]" />
                  <h3 className="text-lg font-bold text-slate-900">Parámetros del Proyecto</h3>
                </div>

                {/* Input 1: Equipment type selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                    Tipo de equipamiento requerido:
                  </label>
                  <select 
                    value={equipmentType} 
                    onChange={(e) => setEquipmentType(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0F3B74] focus:outline-none"
                  >
                    <option value="cómputo">Computadoras y Servidores (Dell / HP)</option>
                    <option value="impresión">Multifuncionales e Impresión de volumen (HP)</option>
                    <option value="videovigilancia">Videovigilancia IP y CCTV (Fortinet)</option>
                    <option value="redes">Equipamiento de Redes y WiFi (Cisco)</option>
                    <option value="punto-de-venta">Terminales de Punto de Venta completas</option>
                  </select>
                </div>

                {/* Input 2: Project budget slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-600 uppercase tracking-wider">Costo Estimado de Equipos:</span>
                    <span className="font-mono font-bold text-lg text-[#0F3B74]">
                      ${equipmentCost.toLocaleString('es-MX')} MXN
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="30000" 
                    max="1500000" 
                    step="10000"
                    value={equipmentCost} 
                    onChange={(e) => setEquipmentCost(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>$30,000 MXN</span>
                    <span>$1.5 Millones MXN</span>
                  </div>
                </div>

                {/* Input 3: Lease months */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                    Plazo del contrato (Meses):
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[12, 24, 36, 48].map((months) => (
                      <button
                        key={months}
                        type="button"
                        onClick={() => setLeaseMonths(months)}
                        className={`py-3 rounded-xl text-xs font-mono font-bold transition-all ${
                          leaseMonths === months 
                            ? 'bg-[#0F3B74] text-white' 
                            : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {months} Meses
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Informational advice */}
              <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-2xl flex gap-3 text-xs text-blue-900 leading-relaxed">
                <Info className="w-5 h-5 text-blue-600 shrink-0" />
                <p>
                  <strong>¿Sabías qué?</strong> El arrendamiento de TI en México es 100% deducible de impuestos (ISR) de forma mensual, lo que reduce drásticamente el costo real neto comparado con la depreciación contable de la compra.
                </p>
              </div>

            </div>

            {/* Calculator Results Right Panel */}
            <div className="lg:col-span-7 bg-[#0d1e3d] text-white rounded-3xl p-8 flex flex-col justify-between space-y-8 shadow-2xl relative overflow-hidden">
              
              {/* Top ambient color patch */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 font-mono">PAGO MENSUAL ESTIMADO</span>
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mono text-white tracking-tight">
                      ${calculatorResults.monthlyPayment.toLocaleString('es-MX')} <span className="text-sm font-semibold text-slate-300">MXN + IVA</span>
                    </div>
                  </div>
                  <div className="bg-red-600/10 text-red-400 font-mono font-bold text-xs px-3.5 py-1.5 rounded-full border border-red-500/20">
                    Ahorro OPEX
                  </div>
                </div>

                {/* Compare Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/10">
                  
                  {/* Purchase details */}
                  <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-5 space-y-4">
                    <h4 className="text-sm font-bold text-slate-300 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-slate-400" />
                      Compra Directa (CAPEX)
                    </h4>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Desembolso Inicial:</span>
                        <span className="font-mono font-bold text-slate-100">${calculatorResults.purchaseInitialOutlay.toLocaleString('es-MX')}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Costo Financiero Neto:</span>
                        <span className="font-mono font-bold text-slate-100">${calculatorResults.netPurchaseCostAfterTax.toLocaleString('es-MX')}</span>
                      </div>
                      <div className="flex justify-between text-xs text-red-400">
                        <span>Depreciación / Obsolescencia:</span>
                        <span className="font-bold">Alta (100%)</span>
                      </div>
                    </div>
                  </div>

                  {/* Leasing details */}
                  <div className="bg-[#1b2c4d]/60 border border-red-500/20 rounded-2xl p-5 space-y-4 relative">
                    <div className="absolute -top-3 right-3 bg-red-600 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full">
                      RECOMENDADO
                    </div>
                    <h4 className="text-sm font-bold text-red-400 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      Arrendamiento SMS (OPEX)
                    </h4>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300">Desembolso Inicial:</span>
                        <span className="font-mono font-bold text-emerald-400">$0 MXN (¡Gratis!)</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300">Deducción de Impuestos:</span>
                        <span className="font-mono font-bold text-emerald-400">-${calculatorResults.opexTaxSavings.toLocaleString('es-MX')}</span>
                      </div>
                      <div className="flex justify-between text-xs text-[#60a5fa]">
                        <span>Capital Liberado para Operación:</span>
                        <span className="font-mono font-bold">${calculatorResults.capitalFreed.toLocaleString('es-MX')}</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Savings statement banner */}
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-center gap-3 text-sm text-emerald-300">
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <p>
                    Mantienes <strong className="text-white font-mono">${calculatorResults.capitalFreed.toLocaleString('es-MX')} MXN</strong> intactos en tu cuenta bancaria para capital de trabajo de tu empresa.
                  </p>
                </div>

              </div>

              {/* Pre-fill and scroll to Form Action */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-400">
                  *Cálculos informativos estimados sujetos a aprobación de crédito.
                </span>
                <button
                  type="button"
                  onClick={() => {
                    // Update form messages
                    setContactMsg(prev => {
                      const calcInfo = `Me interesa el arrendamiento de equipamiento de ${equipmentType} por un monto estimado de $${equipmentCost.toLocaleString('es-MX')} MXN a un plazo de ${leaseMonths} meses (Pago estimado mensual: $${calculatorResults.monthlyPayment.toLocaleString('es-MX')} MXN).`;
                      if (prev.includes(`equipamiento de ${equipmentType}`)) return prev;
                      return prev ? `${calcInfo}\n\n${prev}` : calcInfo;
                    });
                    
                    // Smooth scroll
                    const formSec = document.getElementById('solicitud-cotizacion');
                    if (formSec) {
                      formSec.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Solicitar esta cotización formal
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 6. RECENT CAMPAIGNS & PROMOTIONS */}
      <section id="campanas" className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-red-600 uppercase">Campañas Activas</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Promociones Especiales de Temporada
            </h2>
            <div className="w-20 h-1 bg-[#0F3B74] mx-auto rounded-full" />
            <p className="text-slate-600">
              Conoce nuestras ofertas empaquetadas más populares para arrancar o repotenciar tu negocio con cero fricción económica. Haz clic para conocer el detalle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CAMPAIGNS.map((camp) => (
              <div 
                key={camp.id} 
                className="bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                
                {/* Visual Header */}
                <div className={`p-6 bg-gradient-to-br ${camp.gradient} text-white space-y-4 relative`}>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {camp.badge}
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-red-200 uppercase font-semibold tracking-widest">Campaña Activa</span>
                    <h3 className="text-2xl font-extrabold tracking-tight">{camp.title}</h3>
                    <p className="text-slate-200 text-xs font-medium">{camp.tagline}</p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold font-mono text-[#0F3B74]">{camp.price}</span>
                      <span className="text-sm text-slate-500">{camp.period}</span>
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed">
                      {camp.description}
                    </p>

                    <div className="space-y-2 pt-4">
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">¿Qué incluye esta solución?</span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-500">
                        {camp.bulletPoints.map((bp, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0" />
                            <span>{bp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1 max-w-[50%]">
                      {camp.features.map(f => (
                        <span key={f} className="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                          {f}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveCampaign(camp)}
                      className="px-4 py-2 bg-[#0F3B74] hover:bg-[#09264c] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      Ver Detalle
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. HIGH-FIDELITY WEB INTERACTIVE CONTACT FORM & QUOTE BUILDER */}
      <section id="solicitud-cotizacion" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Visual Column / Brand Promises - With happy technician background equivalent */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#0F3B74] to-[#0A192F] rounded-3xl p-8 text-white flex flex-col justify-between relative overflow-hidden shadow-2xl">
              
              {/* Overlay graphics */}
              <div className="absolute top-1/4 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-[80px]" />
              
              <div className="space-y-6 relative z-10">
                <div className="inline-block bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  Atención Inmediata
                </div>
                <h3 className="text-3xl font-extrabold tracking-tight leading-tight">
                  ¿Listo para equipar tu empresa sin descapitalizarte?
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Completa el formulario en 1 minuto. Nuestro equipo comercial analizará tus necesidades tecnológicas para estructurar una propuesta económica a tu medida en menos de 2 horas hábiles.
                </p>

                {/* Interactive Thumbs-Up Technician Avatar Box with SVG to look premium */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
                  
                  {/* Styled Avatar */}
                  <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shrink-0 border-2 border-white/20 relative shadow-inner">
                    {/* Abstract smiling face/avatar SVG icon */}
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900 animate-pulse" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-white">Ing. Carlos Mendoza</p>
                    <p className="text-xs text-slate-400">Gerente de Soporte Técnico SMS</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-[10px] text-emerald-400 font-semibold">Tiempos de respuesta garantizados</span>
                    </div>
                  </div>
                </div>

                {/* Direct info list */}
                <div className="space-y-3 pt-4 border-t border-white/10 text-xs text-slate-300">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-red-500" />
                    <span>Línea Telefónica Nacional: +52 (55) 5555-8900</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-red-500" />
                    <span>Ventas Corporativas: ventas@smsmex.mx</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <span>Oficinas Centrales: CDMX, México</span>
                  </div>
                </div>

              </div>

              {/* Tactical Partner Logos Grid (Filtering & highlight interactively) */}
              <div className="pt-8 border-t border-white/10 space-y-3 relative z-10">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Aliados de Negocio</span>
                <div className="grid grid-cols-4 gap-3 text-center">
                  {STRATEGIC_PARTNERS.slice(0, 8).map((p) => (
                    <div 
                      key={p.name} 
                      onClick={() => setSelectedPartnerFilter(p.name)}
                      className={`text-[10px] font-bold font-mono py-1.5 rounded bg-white/5 border border-white/5 hover:bg-white/10 cursor-pointer hover:border-red-500/30 transition-all ${
                        selectedPartnerFilter === p.name ? 'border-red-500 bg-red-500/20 text-white font-extrabold' : 'text-slate-400'
                      }`}
                      title={`Clic para ver soluciones con ${p.name}`}
                    >
                      {p.name}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Interactive Form or Digital Invoice Receipt */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-100 rounded-3xl p-8 flex flex-col justify-center">
              
              {!isSubmitted ? (
                // FORM STATE
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  
                  <div className="border-b border-slate-200 pb-4">
                    <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">Solicitud de Cotización WEB</h3>
                    <p className="text-slate-500 text-sm mt-1">Completa los datos de tu empresa para formular tu cotización formal.</p>
                  </div>

                  {/* Show Selected Items Summary in Form */}
                  {basket.length > 0 && (
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Soluciones Seleccionadas ({basket.length})</span>
                        <button 
                          type="button"
                          onClick={clearBasket}
                          className="text-xs text-red-600 font-bold hover:underline"
                        >
                          Quitar Todas
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {basket.map(item => (
                          <div key={item.id} className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800">
                            <span>{item.title}</span>
                            <button 
                              type="button" 
                              onClick={() => removeBasketItem(item.id)}
                              className="text-slate-400 hover:text-red-600 focus:outline-none"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Input fields grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    {/* Company name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                        Nombre de la Empresa <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text"
                        placeholder="Ej. Comercializadora S.A. de C.V."
                        value={companyName}
                        onChange={(e) => {
                          setCompanyName(e.target.value);
                          if(formErrors.companyName) setFormErrors({...formErrors, companyName: ''});
                        }}
                        className={`w-full bg-white border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0F3B74] focus:outline-none transition-all ${
                          formErrors.companyName ? 'border-red-500 focus:ring-red-500' : 'border-slate-200'
                        }`}
                      />
                      {formErrors.companyName && (
                        <p className="text-red-600 text-xs font-semibold flex items-center gap-1 mt-1">
                          <Info className="w-3 h-3" /> {formErrors.companyName}
                        </p>
                      )}
                    </div>

                    {/* Company RFC */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                        RFC de la Empresa <span className="text-slate-400">(Opcional)</span>
                      </label>
                      <input 
                        type="text"
                        placeholder="Ej. ABC120101XYZ"
                        value={companyRfc}
                        onChange={(e) => setCompanyRfc(e.target.value.toUpperCase())}
                        maxLength={13}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0F3B74] focus:outline-none transition-all uppercase"
                      />
                    </div>

                    {/* Contact full name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                        Nombre del Contacto <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text"
                        placeholder="Ej. Lic. Alejandro Pérez"
                        value={contactName}
                        onChange={(e) => {
                          setContactName(e.target.value);
                          if(formErrors.contactName) setFormErrors({...formErrors, contactName: ''});
                        }}
                        className={`w-full bg-white border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0F3B74] focus:outline-none transition-all ${
                          formErrors.contactName ? 'border-red-500 focus:ring-red-500' : 'border-slate-200'
                        }`}
                      />
                      {formErrors.contactName && (
                        <p className="text-red-600 text-xs font-semibold flex items-center gap-1 mt-1">
                          <Info className="w-3 h-3" /> {formErrors.contactName}
                        </p>
                      )}
                    </div>

                    {/* Contact Corporate Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                        Correo Corporativo <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="email"
                        placeholder="Ej. aperez@miempresa.com"
                        value={contactEmail}
                        onChange={(e) => {
                          setContactEmail(e.target.value);
                          if(formErrors.contactEmail) setFormErrors({...formErrors, contactEmail: ''});
                        }}
                        className={`w-full bg-white border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0F3B74] focus:outline-none transition-all ${
                          formErrors.contactEmail ? 'border-red-500 focus:ring-red-500' : 'border-slate-200'
                        }`}
                      />
                      {formErrors.contactEmail && (
                        <p className="text-red-600 text-xs font-semibold flex items-center gap-1 mt-1">
                          <Info className="w-3 h-3" /> {formErrors.contactEmail}
                        </p>
                      )}
                    </div>

                    {/* Contact Phone (10 digits) */}
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                        Número Telefónico (10 Dígitos) <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="tel"
                        placeholder="Ej. 5512345678"
                        maxLength={10}
                        value={contactPhone}
                        onChange={(e) => {
                          setContactPhone(e.target.value.replace(/\D/g, ''));
                          if(formErrors.contactPhone) setFormErrors({...formErrors, contactPhone: ''});
                        }}
                        className={`w-full bg-white border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0F3B74] focus:outline-none transition-all ${
                          formErrors.contactPhone ? 'border-red-500 focus:ring-red-500' : 'border-slate-200'
                        }`}
                      />
                      {formErrors.contactPhone && (
                        <p className="text-red-600 text-xs font-semibold flex items-center gap-1 mt-1">
                          <Info className="w-3 h-3" /> {formErrors.contactPhone}
                        </p>
                      )}
                    </div>

                    {/* Message / Specifications text */}
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                        Especificaciones / Comentarios Adicionales:
                      </label>
                      <textarea 
                        rows={4}
                        placeholder="Mencione aquí detalles de marcas preferidas, número de puestos de trabajo a equipar, impresoras requeridas, etc."
                        value={contactMsg}
                        onChange={(e) => setContactMsg(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0F3B74] focus:outline-none transition-all resize-none"
                      />
                    </div>

                  </div>

                  {/* Form button action */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-slate-400">
                      Al enviar este formulario acepta los términos de nuestro <button type="button" onClick={() => setIsPrivacyModalOpen(true)} className="text-[#0F3B74] underline font-semibold">Aviso de Privacidad</button>.
                    </p>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg hover:shadow-red-600/20 whitespace-nowrap active:scale-95"
                    >
                      Enviar Solicitud de Cotización
                    </button>
                  </div>

                </form>
              ) : (
                // SUBMITTED CONFIRMATION DIALOGUE (PDF/Receipt Invoice view for outstanding fidelity)
                <div className="space-y-8 animate-fade-in-up">
                  
                  {/* Confirmed Banner */}
                  <div className="text-center space-y-3 bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <Check className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-emerald-800">¡Solicitud Procesada Exitosamente!</h3>
                    <p className="text-slate-600 text-sm max-w-md mx-auto">
                      Hemos registrado tus datos. Tu folio de seguimiento es <strong className="font-mono text-slate-800">{submittedData.receiptNumber}</strong>. Un especialista técnico se pondrá en contacto en menos de 2 horas.
                    </p>
                  </div>

                  {/* Digital invoice details layout */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-sm font-mono text-xs text-slate-700 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0F3B74]" />
                    
                    <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                      <div>
                        <p className="font-extrabold text-[#0F3B74] text-sm">SMS MÉXICO</p>
                        <p className="text-[10px] text-slate-400">Storage Media Solutions</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-900">FOLIO: {submittedData.receiptNumber}</p>
                        <p className="text-[10px] text-slate-400">FECHA: {submittedData.date}</p>
                      </div>
                    </div>

                    <div className="space-y-2 border-b border-slate-100 pb-4">
                      <p className="font-bold uppercase tracking-wider text-[10px] text-slate-400">DATOS DE LA EMPRESA</p>
                      <div className="grid grid-cols-2 gap-y-1">
                        <span className="text-slate-500">Razon Social:</span>
                        <span className="font-bold text-slate-900 text-right">{submittedData.companyName}</span>
                        <span className="text-slate-500">RFC:</span>
                        <span className="font-bold text-slate-900 text-right">{submittedData.companyRfc}</span>
                        <span className="text-slate-500">Contacto:</span>
                        <span className="font-bold text-slate-900 text-right">{submittedData.contactName}</span>
                        <span className="text-slate-500">Teléfono:</span>
                        <span className="font-bold text-slate-900 text-right">{submittedData.contactPhone}</span>
                      </div>
                    </div>

                    {/* Chosen Items */}
                    <div className="space-y-3 border-b border-slate-100 pb-4">
                      <p className="font-bold uppercase tracking-wider text-[10px] text-slate-400">SOLUCIONES ADQUIRIDAS</p>
                      <div className="space-y-1.5">
                        {submittedData.selectedItems.length > 0 ? (
                          submittedData.selectedItems.map((item: any) => (
                            <div key={item.id} className="flex justify-between">
                              <span className="text-slate-600">• {item.title}</span>
                              <span className="font-bold text-slate-900">$0.00 MXN (Renta)</span>
                            </div>
                          ))
                        ) : (
                          <div className="flex justify-between">
                            <span className="text-slate-600">• Consulta de Solución Integral</span>
                            <span className="font-bold text-slate-900">$0.00 MXN</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Estimates */}
                    <div className="bg-slate-50 p-4 rounded-xl space-y-2">
                      <div className="flex justify-between text-[10px] font-bold text-slate-500">
                        <span>EQUIPAMIENTO DE TI ESTIMADO</span>
                        <span>PLAZO</span>
                      </div>
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>Valor: ${submittedData.calculatorEstimate.cost.toLocaleString('es-MX')} MXN</span>
                        <span>{submittedData.calculatorEstimate.months} Meses</span>
                      </div>
                      <div className="flex justify-between font-extrabold text-red-600 text-sm pt-2 border-t border-slate-200">
                        <span>PAGO MENSUAL ESTIMADO (OPEX):</span>
                        <span>${submittedData.calculatorEstimate.monthly.toLocaleString('es-MX')} MXN</span>
                      </div>
                    </div>

                    {/* PDF action mock */}
                    <div className="text-center pt-2">
                      <span className="text-[10px] text-slate-400 italic">Documento pre-aprobado para emisión comercial</span>
                    </div>

                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        window.print();
                      }}
                      className="flex-1 px-6 py-3 bg-[#0F3B74] hover:bg-[#0d2f5a] text-white text-xs font-bold rounded-xl transition-all text-center"
                    >
                      Imprimir / Descargar PDF
                    </button>
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="flex-1 px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl transition-all text-center"
                    >
                      Solicitar Nueva Cotización
                    </button>
                  </div>

                </div>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* 8. PARTNER LOGOS CAROUSEL / CLOUD */}
      <section className="py-12 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Aliados de Negocio e Integración</span>
            <p className="text-slate-600 text-xs">Trabajamos exclusivamente con el licenciamiento y equipamiento de las mejores marcas del mercado.</p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 items-center justify-items-center opacity-65">
            {STRATEGIC_PARTNERS.map((p) => (
              <div 
                key={p.name}
                onClick={() => {
                  setSelectedPartnerFilter(p.name);
                  const solSec = document.getElementById('soluciones');
                  if (solSec) solSec.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`text-sm md:text-base font-extrabold font-mono text-slate-600 cursor-pointer select-none py-2 px-4 rounded-lg bg-white/50 border border-transparent hover:border-red-500/20 hover:bg-white hover:shadow-sm transition-all ${p.color}`}
                title={`Ver soluciones de ${p.name}`}
              >
                {p.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. QUIET FOOTER */}
      <footer className="bg-[#0A192F] text-white pt-20 pb-10 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            
            {/* Column 1: Brand details */}
            <div className="md:col-span-5 space-y-6">
              <a href="#" className="flex flex-col">
                <span className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tighter text-white">
                    SMS
                  </span>
                  <span className="text-xs font-bold text-red-500 tracking-wider">MÉXICO</span>
                </span>
                <span className="text-[10px] font-semibold text-slate-400 tracking-widest uppercase">
                  Storage Media Solutions
                </span>
              </a>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                Proveer esquemas de adquisición inteligente para infraestructura tecnológica empresarial en México. Integración de cómputo, redes, seguridad y licenciamiento.
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span>Made in Mexico</span>
                <span>·</span>
                <span>ISO 9001 Configured</span>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">Secciones</h4>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li><a href="#" className="hover:text-red-500 transition-colors">Inicio</a></li>
                <li><a href="#beneficios" className="hover:text-red-500 transition-colors">Beneficios</a></li>
                <li><a href="#soluciones" className="hover:text-red-500 transition-colors">Portafolio de TI</a></li>
                <li><a href="#calculador" className="hover:text-red-500 transition-colors">Simulador de Ahorro</a></li>
                <li><a href="#campanas" className="hover:text-red-500 transition-colors">Campañas de Temporada</a></li>
              </ul>
            </div>

            {/* Column 3: Contact details */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">Atención Nacional</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span>Av. Insurgentes Sur 1450, Col. Actipan, Benito Juárez, CDMX, C.P. 03230, México</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-5 h-5 text-red-500 shrink-0" />
                  <span>+52 (55) 5555-8900</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-5 h-5 text-red-500 shrink-0" />
                  <span>contacto@smsmex.mx</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright Zone */}
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              © {new Date().getFullYear()} SMS México (Storage Media Solutions S.A. de C.V.). Todos los derechos reservados.
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsPrivacyModalOpen(true)}
                className="hover:text-white hover:underline transition-colors focus:outline-none"
              >
                Aviso de privacidad
              </button>
              <span>·</span>
              <a href="#" className="hover:text-white hover:underline transition-colors">
                Términos y condiciones
              </a>
            </div>
          </div>

        </div>
      </footer>

      {/* Modal 1: Campaign details modal popup (dwell and user trigger) */}
      {activeCampaign && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-100 shadow-2xl overflow-hidden animate-zoom-in">
            
            {/* Header banner */}
            <div className={`p-8 bg-gradient-to-br ${activeCampaign.gradient} text-white relative`}>
              <button 
                onClick={() => setActiveCampaign(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
                  SOLUCIÓN EMPAQUETADA SMS
                </span>
                <h3 className="text-3xl font-extrabold tracking-tight">{activeCampaign.title}</h3>
                <p className="text-slate-200 text-sm">{activeCampaign.tagline}</p>
              </div>
            </div>

            {/* Body */}
            <div className="p-8 space-y-6">
              
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Detalles del Paquete</span>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {activeCampaign.description}
                </p>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Esquema Fiscal</span>
                  <p className="text-xs font-bold text-slate-800">100% OPEX Deducible Mensual</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Inversión Inicial</span>
                  <p className="text-xs font-bold text-emerald-600">$0 pesos (Sin cargos de apertura)</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Soporte Técnico</span>
                  <p className="text-xs font-bold text-slate-800">Garantía total de cambio físico</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Vigencia</span>
                  <p className="text-xs font-bold text-red-600">Al 31 de Diciembre del 2026</p>
                </div>
              </div>

              {/* What is included checklist */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Beneficios Clave del Contrato</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600">
                  {activeCampaign.bulletPoints.map((bp, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs">{bp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                <div className="text-left">
                  <p className="text-[9px] font-bold text-slate-400 uppercase">PRECIO MENSUAL REQUERIDO</p>
                  <p className="text-xl font-mono font-bold text-slate-950">{activeCampaign.price} <span className="text-xs text-slate-500">{activeCampaign.period}</span></p>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveCampaign(null)}
                    className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
                  >
                    Cerrar
                  </button>
                  <button
                    type="button"
                    onClick={() => applyCampaignToForm(activeCampaign)}
                    className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all shadow-md"
                  >
                    Solicitar esta campaña ahora
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Modal 2: Privacy Modal Popup */}
      {isPrivacyModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-100 shadow-2xl p-8 space-y-6 animate-zoom-in">
            
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Aviso de Privacidad de SMS México</h3>
                <p className="text-xs text-slate-400 mt-1">Última actualización: Octubre 2026</p>
              </div>
              <button 
                onClick={() => setIsPrivacyModalOpen(false)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400 transition-colors focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-600 space-y-4 max-h-80 overflow-y-auto pr-2 leading-relaxed">
              <p>
                De conformidad con lo establecido en la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, <strong>Storage Media Solutions S.A. de C.V.</strong> (en lo sucesivo "SMS México"), con domicilio en Av. Insurgentes Sur 1450, Col. Actipan, Benito Juárez, CDMX, es el responsable del uso y protección de sus datos personales.
              </p>
              <p>
                Sus datos personales serán utilizados para las siguientes finalidades primarias que son necesarias para el servicio solicitado:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Verificar y confirmar su identidad y representación legal de la empresa.</li>
                <li>Estructurar e integrar su cotización de arrendamiento puro, comodato o financiamiento de TI.</li>
                <li>Realizar los análisis internos de capacidad de crédito corporativo.</li>
                <li>Proporcionar el soporte técnico y suministro de hardware contratado.</li>
              </ul>
              <p>
                Para llevar a cabo las finalidades descritas en el presente aviso de privacidad, utilizaremos datos de contacto, datos de identificación, datos fiscales y datos financieros de la empresa.
              </p>
              <p>
                Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros o bases de datos cuando considere que la misma no está siendo utilizada adecuadamente (Cancelación); así como oponerse al uso de sus datos personales para fines específicos (Oposición). Estos derechos se conocen como derechos ARCO. Para su ejercicio, por favor envíe un correo electrónico a <strong>privacidad@smsmex.mx</strong>.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 text-right">
              <button
                type="button"
                onClick={() => setIsPrivacyModalOpen(false)}
                className="px-5 py-2.5 bg-[#0F3B74] hover:bg-blue-900 text-white text-xs font-bold rounded-xl transition-colors"
              >
                He leído y acepto
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
