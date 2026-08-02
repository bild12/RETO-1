// Lógica e Interactividad - Plan de Modernización FinanEU

// Base de Datos de Componentes (Nomenclatura del Mapa As-Is)
const componentData = {
  "CH-01": {
    name: "CH-01: Asesores / Empleados",
    status: "stable",
    statusText: "Estabilizado (To-Be)",
    desc: "1,200 colaboradores en oficinas y sede central que acceden al sistema para atender clientes.",
    risks: [
      "Operación en red LAN local sin segmentación robusta.",
      "Sin Single Sign-On (SSO): obliga a loguearse individualmente en cada aplicativo.",
      "Duplicación manual de datos en CRM Comercial por falta de integración."
    ],
    solution: [
      "Implementación de conexión segura (VPN / Zero Trust) para trabajadores en red interna y externa.",
      "Integración del CRM con el CORE a través de APIs de API-01, eliminando la duplicación manual.",
      "Habilitación de SSO para autenticación centralizada en fases futuras."
    ]
  },
  "CH-02": {
    name: "CH-02: Asociados",
    status: "risk",
    statusText: "Alto Riesgo (As-Is)",
    desc: "85,000 usuarios activos distribuidos en 12 departamentos que consultan saldos y solicitan crédito.",
    risks: [
      "Tasa de abandono del 35% en solicitudes de crédito en línea debido a lentitud y caídas en días de quincena.",
      "Único canal de autoservicio disponible, lo que satura la atención si el portal falla."
    ],
    solution: [
      "Reconstrucción del portal web en arquitectura Serverless elástica en la Fase 2.",
      "Lanzamiento de la nueva APP-04 Móvil MVP dedicada a asociados jóvenes para descongestionar el portal web y captar nuevos clientes."
    ]
  },
  "APP-01": {
    name: "APP-01: Portal Web Transaccional",
    status: "critical",
    statusText: "Crítico (As-Is)",
    desc: "Portal web de cara al asociado construido en PHP 5.6 (sin soporte de seguridad desde 2018).",
    risks: [
      "Consultas directas (SQL queries) a la base de datos de producción del CORE sin capa de servicios.",
      "Sin caché ni balanceo de carga: caídas continuas en días de pago.",
      "Alto riesgo de inyección SQL y vulnerabilidades del lenguaje PHP obsoleto."
    ],
    solution: [
      "Desacoplamiento total en la Fase 2. El nuevo Portal Web se reconstruye sobre tecnología serverless cloud.",
      "Se prohíben las conexiones directas a base de datos. Todo el portal consume APIs seguras del API-01 Gateway.",
      "Cumplimiento automático de estándares de ciberseguridad exigidos por el ente regulador."
    ]
  },
  "APP-02": {
    name: "APP-02: CRM Comercial",
    status: "risk",
    statusText: "Alto Riesgo (As-Is)",
    desc: "Plataforma comercial para la gestión de campañas y seguimiento de solicitudes de crédito on-premise.",
    risks: [
      "Aislado del CORE Financiero: sin API de conexión directa.",
      "Obliga a los asesores comerciales a transcribir datos de solicitudes manualmente (doble digitación).",
      "Riesgo alto de desincronización de datos de clientes."
    ],
    solution: [
      "Migración o integración en la Fase 2 a través de conexiones de API con el API-01 Gateway.",
      "Automatización de la sincronización de clientes y solicitudes con el CORE, eliminando la digitación manual.",
      "Reducción del tiempo de procesamiento de crédito en un 60%."
    ]
  },
  "CORE-01": {
    name: "CORE-01: CORE Financiero (SistemaCoop)",
    status: "critical",
    statusText: "Crítico (As-Is)",
    desc: "Sistema principal que gestiona la cartera de crédito, las cuentas de ahorro y la contabilidad central de la cooperativa.",
    risks: [
      "Base de datos SQL Server 2008 alojada en un servidor dedicado físico on-premise.",
      "Sin parches de seguridad de sistema operativo ni motor de BD desde 2021.",
      "El proveedor original desapareció del mercado (sin soporte de evolución ni parches).",
      "Punto único de falla del negocio (SPOF): si el servidor falla, se detiene toda la cooperativa."
    ],
    solution: [
      "Fase 1: Migración Lift-and-Shift (Rehost) a nube administrada compatible (e.g. Azure SQL Managed Instance o AWS RDS SQL Server) en modo de compatibilidad de base de datos para obtener soporte de seguridad inmediato.",
      "Fase 1: Encapsulamiento detrás de un API-01 Gateway (Patrón Strangler Fig).",
      "Fase 3: Separación lógica en un Monolito Modular (módulos independientes de Cartera, Ahorros y Contabilidad) para facilitar futuras actualizaciones con el equipo reducido de TI."
    ]
  },
  "APP-03": {
    name: "APP-03: NominaSoft (Sistema de Nómina)",
    status: "critical",
    statusText: "Crítico (As-Is)",
    desc: "Aplicación de escritorio para la liquidación mensual de la nómina de 1,200 empleados de la cooperativa.",
    risks: [
      "Funciona sobre Windows Server 2008 R2 (sin parches de seguridad).",
      "Conocido y administrado por una sola persona en todo el equipo de TI (dependencia operativa extrema).",
      "Sin plan de recuperación ante desastres documentado."
    ],
    solution: [
      "Fase 1: Reemplazo absoluto y firma de contrato con un proveedor de software como servicio en la nube (SaaS-01 Nómina Cloud).",
      "Esto elimina la carga técnica de soporte de servidores obsoletos, garantiza el cumplimiento normativo fiscal de forma nativa y libera tiempo del equipo de TI."
    ]
  },
  "NET-01": {
    name: "NET-01: Red y Conectividad",
    status: "critical",
    statusText: "Crítico (As-Is)",
    desc: "Infraestructura física de conectividad LAN y WAN de la sede central y sucursales.",
    risks: [
      "Switches Cisco de 7 años de antigüedad que alcanzaron su fin de soporte (EoS).",
      "Enlace WAN único de internet sin redundancia: si el enlace cae, las sucursales quedan incomunicadas con el Datacenter local.",
      "Segmentación de red inalámbrica y cableada muy limitada."
    ],
    solution: [
      "Fase 1: Contratación inmediata de un enlace de internet redundante (fibra óptica dual) y renovación de switches críticos Cisco.",
      "Implementación de arquitectura SD-WAN básica en sucursales para conmutación de tráfico automática.",
      "Alineación con la exigencia regulatoria financiera sobre disponibilidad de canales antes de diciembre."
    ]
  },
  "DAT-01": {
    name: "DAT-01: Reportería en Excel",
    status: "risk",
    statusText: "Alto Riesgo (As-Is)",
    desc: "Conjunto de plantillas y hojas de cálculo con macros ODBC que los directivos utilizan para generar estados financieros.",
    risks: [
      "Las macros consultan directamente la base de datos transaccional de producción de CORE-01.",
      "Genera bloqueos de tablas y degradación severa en el CORE durante las ejecuciones.",
      "El cierre contable mensual tarda hasta 3 días de procesamiento manual.",
      "Sin gobierno de datos, auditoría o trazabilidad de la información."
    ],
    solution: [
      "Fase 1: Redireccionamiento de las macros ODBC a una réplica de lectura en la nube (Read Replica) de CORE-01, eliminando la carga sobre producción.",
      "Fase 3: Migración de las macros a un Data Warehouse básico (DAT-02) y software de BI para dashboards gerenciales automatizados en tiempo real."
    ]
  },
  "APP-04": {
    name: "APP-04: App Móvil (MVP)",
    status: "stable",
    statusText: "Estable / Nuevo (To-Be)",
    desc: "Nueva aplicación móvil nativa/híbrida para los asociados de la cooperativa.",
    risks: [
      "Inexistente en la arquitectura As-Is actual.",
      "Pérdida de mercado ante un competidor digital que atrae a los asociados jóvenes."
    ],
    solution: [
      "Fase 2: Lanzamiento de un MVP móvil enfocado en asociados jóvenes para consultas rápidas, saldos y pagos básicos.",
      "Construido sobre servicios API que se comunican directamente a través de API-01 (API Gateway).",
      "Permite captar nuevos perfiles de asociados y mitiga la carga transaccional del portal web."
    ]
  },
  "API-01": {
    name: "API-01: API Gateway (Middleware)",
    status: "stable",
    statusText: "Estable / Nuevo (To-Be)",
    desc: "Capa intermedia de integración y seguridad implementada en la nube.",
    risks: [
      "Inexistente en la arquitectura As-Is (lo que permitía consultas directas de red al CORE)."
    ],
    solution: [
      "Fase 1: Implementación del Gateway para actuar como fachada segura frente al CORE-01.",
      "Maneja el control de acceso, verificación de tokens JWT, caching de consultas frecuentes y balanceo de carga.",
      "Habilita el desacoplamiento de canales y resuelve la exigencia de ciberseguridad del ente de control."
    ]
  },
  "DAT-02": {
    name: "DAT-02: Data Warehouse & BI Cloud",
    status: "stable",
    statusText: "Estable / Nuevo (To-Be)",
    desc: "Arquitectura analítica centralizada en la nube que sustituye al proceso de reportes en Excel.",
    risks: [
      "Inexistente en el As-Is (se usaba DAT-01 con macros directas)."
    ],
    solution: [
      "Fase 3: Carga incremental de datos a un almacén de datos (DWH) en la nube mediante tuberías básicas de datos.",
      "Visualización en paneles interactivos de BI para directivos en tiempo real.",
      "Eliminación definitiva del proceso manual de 3 días de cierre."
    ]
  },
  "SaaS-01": {
    name: "SaaS-01: Nómina SaaS Cloud",
    status: "stable",
    statusText: "Estable / Nuevo (To-Be)",
    desc: "Solución externa de administración de nómina y recursos humanos en la nube que reemplaza a NominaSoft.",
    risks: [
      "Inexistente en el As-Is."
    ],
    solution: [
      "Fase 1: Firma y despliegue del SaaS. Toda la nómina se gestiona fuera de los servidores de la cooperativa.",
      "La sincronización contable se realiza de forma automática y segura una vez al mes por API hacia el CORE contable."
    ]
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // Navigation tabs logic
  const navButtons = document.querySelectorAll(".nav-btn");
  const viewPanels = document.querySelectorAll(".view-panel");
  const viewTitle = document.getElementById("view-title");
  const viewSubtitle = document.getElementById("view-subtitle");
  
  const viewMeta = {
    "arquitectura": {
      title: "Mapa de Arquitectura (As-Is vs To-Be)",
      subtitle: "Explora los diagramas técnicos e interactúa con los componentes para ver detalles del cambio."
    },
    "priorizacion": {
      title: "Matriz de Priorización de Proyectos",
      subtitle: "Secuencia de proyectos basada en la mitigación del riesgo técnico y el cumplimiento antes de diciembre."
    },
    "patrones": {
      title: "Decisiones de Patrón Arquitectónico",
      subtitle: "Fundamentos de la elección de Monolito Modular y Serverless en lugar de microservicios."
    },
    "obsoletos": {
      title: "Transición de Sistemas Heredados e Integraciones",
      subtitle: "Cómo el plan erradica las integraciones manuales o por consultas directas a base de datos de producción."
    },
    "equipo": {
      title: "Balance Operativo (Estrategia Run vs Change)",
      subtitle: "Estructura de dedicación del equipo interno y la mitigación con un partner especializado (MSP) de USD $40K."
    },
    "roadmap": {
      title: "Hojas de Ruta y Diagrama de Gantt",
      subtitle: "Fases y presupuestos definidos a 18 meses para ejecutar la modernización completa."
    }
  };

  navButtons.forEach(button => {
    button.addEventListener("click", () => {
      const view = button.getAttribute("data-view");
      
      // Deactivate all buttons
      navButtons.forEach(btn => btn.classList.remove("active"));
      // Activate clicked
      button.classList.add("active");
      
      // Toggle views
      viewPanels.forEach(panel => {
        panel.classList.remove("active");
        if (panel.id === `view-${view}`) {
          panel.classList.add("active");
        }
      });
      
      // Update titles
      if (viewMeta[view]) {
        viewTitle.textContent = viewMeta[view].title;
        viewSubtitle.textContent = viewMeta[view].subtitle;
      }
    });
  });

  // Theme Switcher Logic
  const themeToggle = document.getElementById("theme-toggle");
  const htmlTag = document.documentElement;

  // Restore theme preference
  const savedTheme = localStorage.getItem("theme") || "dark";
  htmlTag.setAttribute("data-theme", savedTheme);
  updateThemeButton(savedTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = htmlTag.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    htmlTag.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeButton(newTheme);
  });

  function updateThemeButton(theme) {
    if (theme === "dark") {
      themeToggle.innerHTML = '<span class="mode-icon">☀️</span> Modo Claro';
    } else {
      themeToggle.innerHTML = '<span class="mode-icon">🌙</span> Modo Oscuro';
    }
  }

  // Diagram Switching (As-Is vs To-Be)
  const btnAsis = document.getElementById("btn-asis");
  const btnTobe = document.getElementById("btn-tobe");
  const svgAsis = document.getElementById("svg-asis");
  const svgTobe = document.getElementById("svg-tobe");

  btnAsis.addEventListener("click", () => {
    btnAsis.classList.add("active");
    btnTobe.classList.remove("active");
    svgAsis.style.display = "flex";
    svgTobe.style.display = "none";
    resetDetails();
  });

  btnTobe.addEventListener("click", () => {
    btnTobe.classList.add("active");
    btnAsis.classList.remove("active");
    svgAsis.style.display = "none";
    svgTobe.style.display = "flex";
    resetDetails();
  });

  // Interactive Nodes Detail Extraction
  const detailEmpty = document.getElementById("detail-empty");
  const detailCard = document.getElementById("detail-card");
  const detId = document.getElementById("det-id");
  const detStatus = document.getElementById("det-status");
  const detName = document.getElementById("det-name");
  const detDesc = document.getElementById("det-desc");
  const detRisks = document.getElementById("det-risks");
  const detSolution = document.getElementById("det-solution");

  // Attach click listener to nodes
  const nodes = document.querySelectorAll(".interactive-node");
  nodes.forEach(node => {
    node.addEventListener("click", () => {
      // Find clean component ID from SVG node ID
      const fullId = node.id;
      let cleanId = fullId.replace("node-", "").replace("-tb", "");
      
      const data = componentData[cleanId];
      if (data) {
        showDetails(cleanId, data);
      }
    });
  });

  function showDetails(id, data) {
    // Fill text
    detId.textContent = id;
    detName.textContent = data.name;
    detDesc.textContent = data.desc;
    detStatus.textContent = data.statusText;
    
    // Status color badge class
    detStatus.className = "status-badge";
    if (data.status === "critical") {
      detStatus.classList.add("critical");
    } else if (data.status === "risk") {
      detStatus.classList.add("risk");
    } else {
      detStatus.classList.add("stable");
    }

    // Fill lists
    detRisks.innerHTML = "";
    data.risks.forEach(risk => {
      const li = document.createElement("li");
      li.textContent = risk;
      detRisks.appendChild(li);
    });

    detSolution.innerHTML = "";
    data.solution.forEach(sol => {
      const li = document.createElement("li");
      li.textContent = sol;
      detSolution.appendChild(li);
    });

    // Toggle panels
    detailEmpty.style.display = "none";
    detailCard.style.display = "block";
    detailCard.classList.add("active");
  }

  function resetDetails() {
    detailCard.style.display = "none";
    detailCard.classList.remove("active");
    detailEmpty.style.display = "flex";
  }
});
