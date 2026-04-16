import type { NodeContent } from '../types/diagram'

export const NODE_CONTENT: Record<string, NodeContent> = {
  generation: {
    title: 'Generation',
    categoryLabel: 'Power Infrastructure',
    description:
      'Power plants convert fuel or renewable energy — coal, gas, nuclear, hydro, wind, solar — into three-phase AC electricity, typically at 10–30 kV before stepping up for transmission.',
    role: 'Produces bulk electrical energy and injects it onto the transmission network via step-up transformers at the plant boundary.',
    upstream: ['Fuel supply', 'Renewable resources'],
    downstream: ['Transmission'],
    whyItMatters:
      'The origin of all electrical energy in the grid. Generation capacity must match real-time consumer demand or grid frequency destabilizes — AMI demand data feeds the forecasting models that keep this balance.',
  },

  transmission: {
    title: 'Transmission',
    categoryLabel: 'Power Infrastructure',
    description:
      'High-voltage power lines (115–765 kV) carry bulk electricity hundreds of miles from generation plants to load centers with minimal resistive losses.',
    role: 'Long-distance bulk energy transport at high voltage, reducing resistive losses (P = I²R). Voltage is stepped up at generation and stepped down at the transmission substation.',
    upstream: ['Generation'],
    downstream: ['Transmission Substation'],
    whyItMatters:
      'Without high-voltage transmission, generation plants would need to be co-located with demand centers — technically and economically impractical at grid scale.',
  },

  trans_sub: {
    title: 'Transmission Substation',
    categoryLabel: 'Power Infrastructure',
    description:
      'Large facilities at the end of transmission lines that step voltage down from 115–765 kV to 26–69 kV for regional distribution.',
    role: 'Voltage step-down via power transformers. Also houses protection relays, circuit breakers, and SCADA monitoring for the transmission/distribution boundary.',
    upstream: ['Transmission'],
    downstream: ['Distribution Substation'],
    whyItMatters:
      'The handoff point between bulk transmission and regional distribution — a critical node for grid stability, fault protection, and switching operations during outage restoration.',
  },

  dist_sub: {
    title: 'Distribution Substation',
    categoryLabel: 'Power Infrastructure',
    description:
      'Neighborhood-level substations that step voltage down from 26–69 kV to 4–35 kV for distribution feeder lines serving local areas.',
    role: 'Voltage step-down, feeder protection, load switching, and automated fault isolation via reclosers. Each substation feeds multiple distribution feeders.',
    upstream: ['Transmission Substation'],
    downstream: ['Transformer'],
    whyItMatters:
      'The last major voltage conversion before power reaches homes and businesses. Fault isolation at this level limits outage scope — AMI load data informs feeder switching and restoration planning.',
  },

  transformer: {
    title: 'Transformer',
    categoryLabel: 'Power Infrastructure',
    description:
      'Pole-mounted or pad-mounted transformers that step 4–35 kV distribution voltage down to 120/240 V for direct customer use.',
    role: 'Final voltage step-down to customer-usable levels. A single transformer typically serves 5–15 residential premises.',
    upstream: ['Distribution Substation'],
    downstream: ['Residential Meter', 'Commercial Meter', 'Industrial Meter'],
    whyItMatters:
      'Failure here affects a small, localized group of customers. AMI last-gasp signals from the meters it serves allow the OMS to pinpoint which transformer has faulted before a crew is dispatched.',
  },

  res_meter: {
    title: 'Residential Meter',
    categoryLabel: 'Smart Meter',
    description:
      'AMI smart meter at a residential premise. Records consumption in 15- or 60-minute intervals and maintains a two-way communication link through the RF mesh network.',
    role: 'Measures kWh consumption, reports interval data on schedule, detects tamper events, transmits last-gasp outage signals on power loss, and supports remote disconnect/reconnect commands.',
    upstream: ['Transformer'],
    downstream: ['RF Mesh'],
    whyItMatters:
      'The data origin for billing, outage detection, and demand response programs. Each meter is a persistent edge sensor — its real-time signals can trigger outage alerts before any customer calls in.',
  },

  com_meter: {
    title: 'Commercial Meter',
    categoryLabel: 'Smart Meter',
    description:
      'AMI endpoint at commercial premises. Handles higher load capacity and typically records 15-minute interval data to support demand-based billing and time-of-use rates.',
    role: 'Same core functions as residential meters, plus demand measurement (kW peak) and support for multiple rate schedules. Often configured for on-demand reads during billing disputes.',
    upstream: ['Transformer'],
    downstream: ['RF Mesh'],
    whyItMatters:
      'Commercial demand peaks drive utility infrastructure investment. Accurate 15-minute interval data enables demand charge accuracy, better load forecasting, and targeted demand response recruitment.',
  },

  ind_meter: {
    title: 'Industrial Meter',
    categoryLabel: 'Smart Meter',
    description:
      'High-capacity AMI endpoint for industrial customers, often on dedicated distribution circuits. Records high-resolution interval data and may monitor power quality parameters.',
    role: 'Records 1–15 minute interval data, monitors power quality, enables real-time demand visibility, and supports load control programs and remote service management.',
    upstream: ['Transformer'],
    downstream: ['RF Mesh'],
    whyItMatters:
      'A small number of large industrial customers can represent 20–40% of total grid load. High-resolution data from these endpoints directly shapes generation dispatch decisions and infrastructure planning.',
  },

  rf_mesh: {
    title: 'RF Mesh',
    categoryLabel: 'AMI Network',
    description:
      'A self-healing, peer-to-peer radio mesh network (900 MHz or 2.4 GHz) connecting smart meters to Collector nodes across a service territory.',
    role: 'Routes meter-originated packets — reads, alarms, last-gasp signals — hop-by-hop through neighboring meters to the nearest Collector / DCU.',
    upstream: ['Residential Meter', 'Commercial Meter', 'Industrial Meter'],
    downstream: ['Collector / DCU'],
    whyItMatters:
      'The last-mile network fabric of AMI. Mesh topology means no single link failure interrupts coverage — packets re-route automatically around failed nodes, providing inherent resilience.',
  },

  collector: {
    title: 'Collector / DCU',
    categoryLabel: 'AMI Network',
    description:
      'Data Concentrator Units (DCUs) aggregate RF mesh traffic from hundreds of smart meters and relay it via backhaul to the utility network.',
    role: 'Acts as the RF mesh gateway — buffers scheduled reads, coordinates on-demand reads, relays HES commands to meters, and continuously monitors mesh network health.',
    upstream: ['RF Mesh'],
    downstream: ['Backhaul'],
    whyItMatters:
      'A single DCU typically concentrates 200–600 meters. If a DCU goes offline, reads from that entire segment are delayed. DCU health is a primary operational metric in AMI network monitoring.',
  },

  backhaul: {
    title: 'Backhaul',
    categoryLabel: 'AMI Network',
    description:
      'The wide-area network (WAN) link between field Collectors/DCUs and the utility\'s Head-End System. Commonly implemented via cellular (LTE/5G), licensed RF, or fiber.',
    role: 'Transports aggregated meter data and command traffic between field devices and the Head-End System at the utility\'s data center.',
    upstream: ['Collector / DCU'],
    downstream: ['HES'],
    whyItMatters:
      'Backhaul reliability is the bridge between field AMI and back-office systems. Latency or outages here delay outage notifications, on-demand reads, and remote disconnect commands.',
  },

  hes: {
    title: 'HES',
    categoryLabel: 'AMI Network',
    description:
      'The Head-End System is the central AMI ingestion engine. It manages all field device communications, schedules reads, and surfaces real-time meter events to back-office systems.',
    role: 'Schedules routine and on-demand meter reads, pushes firmware updates, issues remote connect/disconnect commands, manages device registration, and forwards data to MDMS.',
    upstream: ['Backhaul'],
    downstream: ['MDMS'],
    whyItMatters:
      'The command-and-control hub of the AMI system. All meter communications route through the HES — it is the single system that can trigger an on-demand read, push a firmware patch, or remotely disconnect service.',
  },

  mdms: {
    title: 'MDMS',
    categoryLabel: 'Back-Office Systems',
    description:
      'The Meter Data Management System is the system of record for all interval meter data. It validates, stores, and distributes usage reads to every downstream business system.',
    role: 'Receives raw reads from HES, applies VEE rules (Validation, Estimation, Editing), fills data gaps with estimates, maintains the complete usage history, and serves clean data to billing, OMS, and analytics.',
    upstream: ['HES'],
    downstream: ['Billing', 'Outage Management', 'Analytics'],
    whyItMatters:
      'Without MDMS, downstream systems would consume raw, unvalidated data — producing billing errors, inaccurate outage maps, and flawed load forecasts. It is the data quality gate of the entire AMI pipeline.',
  },

  billing: {
    title: 'Billing',
    categoryLabel: 'Back-Office Systems',
    description:
      'The revenue cycle system that consumes validated interval data from MDMS to calculate customer charges, apply rate schedules, and generate invoices.',
    role: 'Applies flat, time-of-use, or demand rate schedules to validated usage data, generates customer bills, and feeds the Customer Information System (CIS).',
    upstream: ['MDMS'],
    downstream: ['Customer invoices', 'CIS'],
    whyItMatters:
      'AMI enables time-of-use and demand billing that was impractical with monthly manual reads. This unlocks more accurate revenue recovery, dynamic rate design, and customer energy management programs.',
  },

  oms: {
    title: 'Outage Management',
    categoryLabel: 'Back-Office Systems',
    description:
      'The Outage Management System (OMS) correlates last-gasp signals, AMI pings, and customer calls to build real-time outage maps and coordinate field crew dispatch.',
    role: 'Receives last-gasp events from meters via HES/MDMS, confirms outages via ping-back attempts, determines outage boundaries on the network model, and estimates restoration times.',
    upstream: ['MDMS', 'HES (real-time events)'],
    downstream: ['Field crew dispatch', 'Customer notifications'],
    whyItMatters:
      'AMI-integrated OMS can detect and map outages before a single customer calls. Reduced mean time to restore (MTTR) and proactive notifications directly improve customer satisfaction and regulatory outcomes.',
  },

  analytics: {
    title: 'Analytics',
    categoryLabel: 'Back-Office Systems',
    description:
      'The interval data analytics platform that processes high-volume meter reads for load forecasting, loss detection, demand response, and long-term grid planning.',
    role: 'Analyzes consumption patterns, detects anomalies (non-technical losses, tampering), models demand response capacity, supports customer segmentation, and feeds infrastructure planning.',
    upstream: ['MDMS'],
    downstream: ['Operations', 'Grid planning', 'Demand response programs'],
    whyItMatters:
      'The intelligence layer of AMI — turning billions of interval reads into actionable insight. Loss detection alone can recover millions in unbilled energy annually; load forecasting reduces costly over-procurement.',
  },
}
