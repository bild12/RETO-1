# RETO PRÁCTICO: Plan de Modernización Tecnológica
## Programa: Arquitectura Tecnológica y Decisiones Estratégicas para CTOs
**Autora:** Ivette Lopez

---

## 📋 Descripción del Proyecto

Este repositorio contiene la entrega completa del **Reto Práctico: Plan de Modernización Tecnológica** para la cooperativa de ahorro y crédito ficticia **FinanEU**. El proyecto aborda la mitigación de la deuda técnica acumulada de 18 años de operación, asegurando el cumplimiento regulatorio antes de diciembre del presente año y habilitando el crecimiento comercial de la cooperativa mediante canales digitales.

El plan estratégico está diseñado bajo las siguientes restricciones de negocio y equipo:
* 💰 **Presupuesto Máximo:** USD $200,000 para el primer año.
* 👥 **Equipo de TI Disponible:** 8 personas (1 Director de TI, 2 Desarrolladores, 1 DBA, 1 Especialista en Infraestructura, 3 Soporte).
* ⏳ **Plazo Límite de la Directiva:** 18 meses para migración total a la nube.

---

## 🗂️ Contenido de este Repositorio

El repositorio está estructurado con los siguientes archivos clave:

1. 📓 **[README.md](file:///c:/Users/bild1/OneDrive/Documentos/Learning/CTO/Tarea/Reto%201/README.md):** (Este archivo) Documentación de presentación general del proyecto.
2. 🗺️ **[mapa-arquitectura-as-is.pdf](file:///c:/Users/bild1/OneDrive/Documentos/Learning/CTO/Tarea/Reto%201/mapa-arquitectura-as-is.pdf):** Representación gráfica de la arquitectura inicial (As-Is). Detalla las aplicaciones de canal, el CORE financiero, la red y la reportería en producción mediante macros, clasificando la severidad de los riesgos en crítico, alto riesgo y estable.
3. 📝 **[RoadmapModernización.md](file:///c:/Users/bild1/OneDrive/Documentos/Learning/CTO/Tarea/Reto%201/RoadmapModernizaci%C3%B3n.md):** El entregable estratégico completo de la modernización (Entregable 4), el cual responde a las siguientes preguntas críticas:
   * **¿Qué se moderniza primero y por qué?** Criterio de priorización basado en riesgo regulatorio (cyberseguridad y disponibilidad antes de diciembre) vs. valor de negocio.
   * **Patrón Arquitectónico Propuesto:** Justificación del enfoque híbrido (**Monolito Modular** para el CORE `CORE-01` y **Serverless/Cloud-Native** para canales `APP-01` y `APP-04`).
   * **Sistemas sin Soporte:** Estrategias específicas de migración para el CORE (`CORE-01`) mediante rehosting y desacoplamiento con *API Gateway* (`API-01`), y reemplazo total de la nómina (`APP-03`) mediante un software SaaS en la nube (`SaaS-01`).
   * **Balance Operativo (Run vs. Change):** Estructuración de dedicación del equipo y asignación de presupuesto (USD $40K) para apoyo de un *Partner de Nube externo (MSP)*.
   * **Plan de Fases a 18 Meses:** Cronograma detallado en fases y diagrama de Gantt en formato **Mermaid**.