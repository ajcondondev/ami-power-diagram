<div align="center">

# AMI & Power Distribution — Interactive Architecture Diagram

**Electric utility infrastructure, visualized. Every node. Every flow. Every system.**

[![TypeScript](https://img.shields.io/badge/TypeScript-~6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Diagram](https://img.shields.io/badge/Diagram-Hand--authored_SVG-F97316)](https://developer.mozilla.org/en-US/docs/Web/SVG)
[![Output](https://img.shields.io/badge/Output-Static_HTML-22C55E)](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/Publishing_your_website)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

---

A professional, interactive web application that visualizes **electric power distribution** and **Advanced Metering Infrastructure (AMI)** — from power generation all the way through to billing, outage management, and analytics.

Built as a portfolio-quality, enterprise-style learning tool for engineers, product teams, and anyone studying modern utility infrastructure.

---

## 📸 Screenshots

<div align="center">

![AMI Diagram overview](screenshots/amiimage1.png)

![Node detail panel](screenshots/amiimage2.png)

![Flow toggles and path emphasis](screenshots/amiimage3.png)

</div>

---

## 🗺️ Overview

Modern electric utilities operate two parallel systems: a **physical power network** that delivers electricity, and a **digital AMI network** that reads meters, detects outages, and enables two-way communication with every customer endpoint. This diagram maps both systems and shows how they interconnect.

```
  Power Grid
  ──────────
  Generation → Transmission → Tx Substation → Dist Substation → Transformer → Smart Meter
                                                                                     │
  AMI Network                                                                        ↓
  ───────────                                                                    RF Mesh
                                                                                     │
                                                                             Collector / DCU
                                                                                     │
                                                                                 Backhaul
                                                                                     │
                                                              HES → MDMS → Billing / OMS / Analytics
```

> [!NOTE]
> The diagram above is a simplified flow overview. The interactive app renders all nodes with live connection paths, hover highlights, and per-node detail panels.

---

## ✨ Features

| Feature | Description |
|---|---|
| **Interactive node selection** | Click any component to see its role, upstream/downstream connections, and why it matters |
| **Power flow visualization** | Trace electricity from generation to end-use |
| **Data flow visualization** | Follow meter reads from device to back-office system |
| **Layer toggles** | Show/hide power flow and data flow independently |
| **Detail panel** | Per-node descriptions covering function, category, and significance |
| **Enterprise aesthetic** | Clean slate/blue palette, no chart-junk, readable at a glance |

---

## 🏗️ Architecture Coverage

### Power Infrastructure

| Node | Type | Description |
|---|---|---|
| Generation | Source | Power plant — coal, gas, nuclear, solar, wind |
| Transmission | Transport | High-voltage backbone (345 kV–765 kV) |
| Transmission Substation | Conversion | Steps voltage down for regional distribution |
| Distribution Substation | Conversion | Further steps down for neighborhoods (4–35 kV) |
| Transformer | Conversion | Pole/pad-mount unit stepping down to 120/240 V |
| Residential Meter | Endpoint | Smart endpoint at a home |
| Commercial Meter | Endpoint | Smart endpoint at a business |
| Industrial Meter | Endpoint | High-capacity smart endpoint at an industrial site |

### AMI Network

| Node | Type | Description |
|---|---|---|
| RF Mesh | RF Network | Short-range radio network linking meters to collectors |
| Collector / DCU | Aggregator | Data Concentrator Unit — aggregates reads from hundreds of meters |
| Backhaul | WAN | Cellular, fiber, or licensed RF link carrying data to the utility |
| HES | Ingestion | Head-End System — AMI ingestion engine, manages meter commands |
| MDMS | Data Store | Meter Data Management System — stores, validates, and processes interval data |
| Billing | Back Office | Revenue cycle system consuming validated usage data |
| Outage Management | Operations | OMS — correlates last-gasp signals to build outage maps |
| Analytics | Intelligence | Interval data analytics — load forecasting, demand response, loss detection |

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|---|---|---|
| UI Framework | React + TypeScript | `^19.2.4` / `~6.0.2` |
| Styling | Tailwind CSS (via `@tailwindcss/vite`) | `^4.2.2` |
| Diagram | Hand-authored SVG | No diagram library dependency |
| Bundler | Vite | `^8.0.4` |

> [!IMPORTANT]
> No backend. No database. No auth. **Purely static** — deploy anywhere static files are served.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install & run

```bash
git clone https://github.com/ajcondondev/ami-power-diagram.git
cd ami-power-diagram
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build for production

```bash
npm run build
```

> [!TIP]
> Output lands in `dist/` — ready to serve from any static host: Netlify, Vercel, GitHub Pages, or S3.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx              # App header with title and flow-type hints
│   ├── DiagramPlaceholder.tsx  # SVG diagram canvas
│   ├── DetailPanel.tsx         # Node detail sidebar
│   └── Legend.tsx              # Footer legend
├── data/                       # Node definitions and connection graph
├── types/                      # TypeScript interfaces
├── App.tsx
└── main.tsx
```

---

## 🗺️ Roadmap

| Phase | Status | Description |
|---|---|---|
| Phase 1 | ✅ Done | App shell: layout, header, placeholders, legend, styling |
| Phase 2 | ✅ Done | Core SVG diagram: all nodes positioned, labeled, flow arrows drawn |
| Phase 3 | ✅ Done | Interactivity: node click → detail panel with rich content |
| Phase 4 | ✅ Done | Layer toggles, hover highlights, selected path emphasis |
| Phase 5 | ✅ Done | Polish, concept callouts, responsiveness, portfolio-ready finish |

---

## 📚 Domain Concepts

> [!NOTE]
> These terms are also surfaced inline in the app's detail panel — click any node to see contextual definitions.

**AMI (Advanced Metering Infrastructure)** — the two-way communication network between utility back-office systems and smart meters at every customer endpoint. Enables remote reads, time-of-use rates, outage detection via last-gasp signals, and demand response programs.

**HES (Head-End System)** — the AMI ingestion layer. Schedules reads, pushes firmware updates, sends remote disconnect/reconnect commands, and surfaces meter events in real time.

**MDMS (Meter Data Management System)** — the system of record for interval data. Validates reads against expected patterns, fills estimated gaps, and exposes clean usage data to downstream systems (billing, analytics, CIS).

**Last Gasp** — a signal a smart meter transmits the instant it loses power, allowing the OMS to pinpoint outage locations before any customer calls.

---

## 📄 License

MIT

---

<div align="center">

Built by [Andrew Condon](https://github.com/ajcondondev) &nbsp;·&nbsp; React 19 &nbsp;·&nbsp; TypeScript &nbsp;·&nbsp; Tailwind CSS v4 &nbsp;·&nbsp; Hand-authored SVG

</div>
