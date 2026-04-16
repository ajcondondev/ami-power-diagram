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
    concepts: [
      {
        title: 'Electrical Fundamentals',
        content:
          'Voltage (V) is electrical pressure — the force that pushes current through a circuit. Current (I, in amps) is the flow of charge; resistance (R, in ohms) opposes it. Ohm\'s Law: V = I × R. Power is the rate of energy delivery: P = V × I (watts); energy is power over time — a 1 kW device running one hour consumes 1 kWh.',
      },
      {
        title: 'How Generators Work',
        content:
          'Most plants spin a turbine connected to a generator rotor — steam from burning fuel, nuclear fission, or flowing water drives the spin; wind drives it directly. The rotating magnetic field induces AC current in the surrounding stator windings. Solar PV is the exception: it converts sunlight to DC, which an inverter converts to AC before grid injection.',
      },
      {
        title: 'Base Load vs Peaking',
        content:
          'Base load plants (nuclear, coal, large hydro) run continuously to meet minimum grid demand. Peaking plants (gas turbines) spin up quickly during high-demand periods. The mix shapes electricity prices and the grid\'s carbon profile.',
      },
      {
        title: 'ISO / RTO Role',
        content:
          'An Independent System Operator (ISO) or Regional Transmission Organization (RTO) coordinates the bulk power grid across multiple utilities. It dispatches generation in real-time and runs wholesale electricity markets. Load forecasts that drive generation dispatch draw directly on interval data from AMI meters.',
      },
    ],
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
    concepts: [
      {
        title: 'AC vs DC / 60 Hz',
        content:
          'The grid runs on alternating current (AC) — voltage and current reverse direction 60 times per second (60 Hz in North America). AC dominates because transformers can step it up or down efficiently. High-voltage DC (HVDC) is used only for special long-distance or undersea links.',
      },
      {
        title: 'Single-Phase vs Three-Phase',
        content:
          'Single-phase power uses one AC waveform and supplies most homes at 120/240V. Three-phase power uses three staggered waveforms, delivering power more smoothly and efficiently — it is standard for all transmission and most commercial and industrial circuits. The final transformer taps off one or three phases depending on the premises it serves.',
      },
    ],
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
    concepts: [
      {
        title: 'The Electric Grid',
        content:
          'The grid is the interconnected network of generation, transmission, and distribution infrastructure that delivers electricity in real time. Unlike most commodities, electricity must be consumed the instant it is generated — supply and demand must match continuously or frequency deviates from 60 Hz. Peak demand events (hot summer afternoons, cold mornings) put the greatest stress on the system, driving both infrastructure investment and demand response programs.',
      },
    ],
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
    concepts: [
      {
        title: 'Service Drop',
        content:
          'The service drop is the final connection from the utility\'s distribution system to a customer\'s premise. Overhead drops run conductors from the pole transformer to a weatherhead on the building; underground services use a buried lateral from a pad-mounted transformer. This is the physical boundary between utility-owned infrastructure and customer-owned wiring.',
      },
    ],
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
    concepts: [
      {
        title: 'AMI vs AMR',
        content:
          'AMR (Automatic Meter Reading) sends usage data one-way, typically via a monthly drive-by collection. AMI (Advanced Metering Infrastructure) communicates two-way in near real-time, enabling remote commands, on-demand reads, and interval data. AMI replaced AMR as the utility standard.',
      },
      {
        title: 'Register vs Interval Data',
        content:
          'A register read is the meter\'s total accumulated kWh — like an odometer. Interval data records usage in discrete time slots (15 or 60 minutes), showing exactly when energy was consumed. Interval data enables TOU billing, demand analysis, and granular exception detection.',
      },
      {
        title: 'Net Metering',
        content:
          'Net metering lets customers with solar or other on-site generation export excess power back to the grid. The meter tracks both import and export, and the customer is billed on the net difference. AMI smart meters can record bidirectional flow in real time.',
      },
    ],
  },

  com_meter: {
    title: 'Commercial Meter',
    categoryLabel: 'Smart Meter',
    description:
      'AMI endpoint at commercial premises. Handles higher load capacity and typically records 15-minute interval data to support demand-based billing and time-of-use rates.',
    role: 'Measures kWh consumption and peak demand (kW), supports multiple rate schedules, and is frequently configured for on-demand reads to resolve billing disputes.',
    upstream: ['Transformer'],
    downstream: ['RF Mesh'],
    whyItMatters:
      'Commercial demand peaks drive utility infrastructure investment. Accurate 15-minute interval data enables demand charge accuracy, better load forecasting, and targeted demand response recruitment.',
    concepts: [
      {
        title: 'CT/PT Ratios & Multipliers',
        content:
          'Large meters use Current Transformers (CTs) and Potential Transformers (PTs) to scale high currents or voltages down to measurable levels. The ratio (e.g., 400:5 CT) is a multiplier applied to the raw reading to get actual consumption. A wrong multiplier causes systematic billing errors that compound over every cycle.',
      },
      {
        title: 'Power Factor',
        content:
          'Power factor is the ratio of real power (kW) to apparent power (kVA) drawn from the grid. A power factor below 1.0 means extra current is flowing to drive reactive loads like motors and transformers — wasting grid capacity. Utilities typically charge commercial customers a penalty if power factor falls below 0.85–0.90.',
      },
    ],
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
      'Central AMI ingestion engine that manages all field device communications, schedules reads, and surfaces real-time meter events to back-office systems.',
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
      'System of record for all interval meter data. Validates, stores, and distributes usage reads to every downstream business system.',
    role: 'Receives raw reads from HES, applies VEE rules (Validation, Estimation, Editing), fills data gaps with estimates, maintains the complete usage history, and serves clean data to billing, OMS, and analytics.',
    upstream: ['HES'],
    downstream: ['Billing', 'Outage Management', 'Analytics'],
    whyItMatters:
      'Without MDMS, downstream systems would consume raw, unvalidated data — producing billing errors, inaccurate outage maps, and flawed load forecasts. It is the data quality gate of the entire AMI pipeline.',
    concepts: [
      {
        title: 'Common Validation Exceptions',
        content:
          'An exception is any read that fails a VEE check and requires analyst review before it can flow to billing. Missing reads arrive when no data comes in for a scheduled window; spikes and drops exceed statistical thresholds (e.g., 3× rolling average); zero reads flag active accounts with no consumption. Negative consumption may indicate tamper or reverse installation; stale data (repeated identical reads) points to a stuck register or frozen comms.',
      },
      {
        title: 'Estimation Methods',
        content:
          'When a read is missing or rejected, MDMS fills the gap with an estimate so billing is not blocked. Common methods include interpolation (averaging between valid reads surrounding the gap) and profile-based estimation (applying the account\'s own historical usage pattern for the same time period). Estimates are flagged distinctly in the data so analysts and auditors can distinguish them from actual meter reads.',
      },
      {
        title: 'Exception Resolution Workflow',
        content:
          'When VEE flags an exception, the analyst reviews the raw read, comm logs, and account history to determine root cause. Options include accepting the system estimate, requesting an on-demand read via HES, or escalating for field investigation. Exceptions must be resolved and documented before data is released to billing.',
      },
    ],
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
    concepts: [
      {
        title: 'Billing Determinants',
        content:
          'Billing determinants are the calculated values derived from interval data that directly drive a customer\'s charge — total kWh consumed, peak demand (kW), on-peak vs off-peak kWh splits, and reactive demand (kVAR) for some commercial accounts. Each rate schedule specifies which determinants apply and how they are priced. An MDMS error in any determinant flows directly into an incorrect invoice.',
      },
      {
        title: 'TOU Pricing',
        content:
          'Time-of-Use (TOU) rates charge more during peak-demand hours (typically summer afternoons) and less off-peak, incentivizing customers to shift discretionary loads. TOU billing requires AMI interval data — without 15-minute reads, on-peak vs off-peak consumption cannot be separated. An unresolved MDMS exception during a peak window can significantly overstate or understate a TOU bill.',
      },
      {
        title: 'Utility Types & Regulation',
        content:
          'Investor-owned utilities (IOUs) are for-profit companies regulated by state public utility commissions; municipal utilities and rural electric cooperatives are non-profit and customer-owned. In deregulated states, generation is a competitive market while transmission and distribution remain regulated monopolies — a customer\'s energy supplier may differ from their distribution utility. Utilities earn revenue through tariff rates approved in formal rate cases; accurate metering is the foundation of that regulated revenue stream.',
      },
    ],
  },

  oms: {
    title: 'Outage Management',
    categoryLabel: 'Back-Office Systems',
    description:
      'Correlates last-gasp signals, AMI pings, and customer calls to build real-time outage maps and coordinate field crew dispatch.',
    role: 'Receives last-gasp events from meters via HES/MDMS, confirms outages via ping-back attempts, determines outage boundaries on the network model, and estimates restoration times.',
    upstream: ['MDMS', 'HES (real-time events)'],
    downstream: ['Field crew dispatch', 'Customer notifications'],
    whyItMatters:
      'AMI-integrated OMS can detect and map outages before a single customer calls. Reduced mean time to restore (MTTR) and proactive notifications directly improve customer satisfaction and regulatory outcomes.',
    concepts: [
      {
        title: 'Power Restoration Signals',
        content:
          'When power returns to a meter after an outage, the meter transmits a power-restoration ("power-up") signal back through the AMI network to the HES. OMS uses these signals to confirm restoration has reached individual endpoints — not just that a crew closed a switch upstream. This lets utilities identify customers still without power despite upstream restoration, eliminating unnecessary crew dispatches.',
      },
    ],
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
    concepts: [
      {
        title: 'Demand Response',
        content:
          'Demand response (DR) programs pay customers to reduce or shift consumption during peak-demand events, relieving grid stress without building new generation. AMI enables targeted DR recruitment by identifying customers with the highest on-peak usage, and real-time reads confirm load reduction during DR events. Analytics quantifies the total load curtailment achieved and helps utilities meet capacity obligations with regulators.',
      },
    ],
  },
}
