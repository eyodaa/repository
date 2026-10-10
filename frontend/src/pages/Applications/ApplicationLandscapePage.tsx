import React from "react";

export const ApplicationLandscape: React.FC = () => {
  return (
    <div style={{ width: "100%", overflowX: "auto", background: "#ffffff" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1600 2050"
        width="100%"
        height="100%"
        style={{
          backgroundColor: "#ffffff",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        <defs>
          <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="3"
              floodColor="#000000"
              floodOpacity="0.06"
            />
          </filter>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="5"
            refY="3"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 6 L 5 0 L 10 6 z" fill="#64748B" />
          </marker>
        </defs>

        {/* ==================== HEADER ==================== */}
        <text
          x="60"
          y="48"
          fontSize="26"
          fontWeight="800"
          fill="#0F172A"
          letterSpacing="-0.5"
        >
          DASHEN BANK — ENTERPRISE APPLICATION LANDSCAPE
        </text>
        <text x="60" y="74" fontSize="13" fontWeight="500" fill="#64748B">
          Complete Technology-Kind Categorization (Channels, Core Apps, Integrations, Security, Infrastructure &amp; Tooling)
        </text>

        {/* ==================== TOP LEGEND ==================== */}
        <g transform="translate(60, 92)">
          <rect
            x="0"
            y="0"
            width="1480"
            height="42"
            rx="8"
            fill="#F8FAFC"
            stroke="#E2E8F0"
            strokeWidth="1.5"
          />
          <text
            x="20"
            y="26"
            fontSize="11"
            fontWeight="800"
            fill="#334155"
            letterSpacing="0.5"
          >
            LIFECYCLE STATUS LEGEND:
          </text>

          <rect x="210" y="14" width="14" height="14" rx="3" fill="#22C55E" />
          <text x="232" y="26" fontSize="12" fontWeight="600" fill="#334155">
            Active / Strategic (69)
          </text>

          <rect x="400" y="14" width="14" height="14" rx="3" fill="#F59E0B" />
          <text x="422" y="26" fontSize="12" fontWeight="600" fill="#334155">
            Need Upgrade (1)
          </text>

          <rect x="560" y="14" width="14" height="14" rx="3" fill="#8B5CF6" />
          <text x="582" y="26" fontSize="12" fontWeight="600" fill="#334155">
            Duplicate / Redundant (1)
          </text>

          <rect x="765" y="14" width="14" height="14" rx="3" fill="#EF4444" />
          <text x="787" y="26" fontSize="12" fontWeight="600" fill="#334155">
            EOL / Decommissioned (5)
          </text>

          <line
            x1="975"
            y1="8"
            x2="975"
            y2="34"
            stroke="#CBD5E1"
            strokeWidth="1.5"
          />

          <circle cx="1005" cy="21" r="5" fill="#DC2626" />
          <text x="1018" y="25" fontSize="11" fontWeight="600" fill="#475569">
            Mission-Critical (32)
          </text>

          <circle cx="1175" cy="21" r="5" fill="#2563EB" />
          <text x="1188" y="25" fontSize="11" fontWeight="600" fill="#475569">
            High-Value (20)
          </text>

          <circle cx="1310" cy="21" r="5" fill="#64748B" />
          <text x="1323" y="25" fontSize="11" fontWeight="600" fill="#475569">
            Supporting (24)
          </text>
        </g>

        {/* ==================== LEFT VERTICAL TOWERS ==================== */}
        <g transform="translate(60, 150)">
          <rect
            x="0"
            y="0"
            width="70"
            height="1625"
            rx="14"
            fill="#2563EB"
            filter="url(#shadow)"
          />
          <text
            transform="rotate(-90 35 812)"
            x="35"
            y="812"
            textAnchor="middle"
            fontSize="13"
            fontWeight="800"
            fill="#FFFFFF"
            letterSpacing="2"
          >
            ENTERPRISE SYSTEM ADMINISTRATION &amp; SUPPORT
          </text>
        </g>

        <g transform="translate(140, 150)">
          <rect
            x="0"
            y="0"
            width="70"
            height="1625"
            rx="14"
            fill="#1D4ED8"
            filter="url(#shadow)"
          />
          <text
            transform="rotate(-90 35 812)"
            x="35"
            y="812"
            textAnchor="middle"
            fontSize="13"
            fontWeight="800"
            fill="#FFFFFF"
            letterSpacing="2"
          >
            SECURITY, RISK &amp; COMPLIANCE GOVERNANCE
          </text>
        </g>

        {/* ==================== TIER 1: CHANNEL & DIGITAL TOUCHPOINTS ==================== */}
        <g transform="translate(230, 150)">
          <rect
            x="0"
            y="0"
            width="1310"
            height="155"
            rx="14"
            fill="#FFEDD5"
            stroke="#FDBA74"
            strokeWidth="1.8"
            filter="url(#shadow)"
          />
          <rect x="18" y="12" width="280" height="24" rx="5" fill="#EA580C" />
          <text
            x="28"
            y="28"
            fontSize="11"
            fontWeight="800"
            fill="#FFFFFF"
            letterSpacing="0.5"
          >
            1. CHANNELS &amp; DIGITAL TOUCHPOINTS
          </text>
          <text x="310" y="29" fontSize="11" fontWeight="600" fill="#9A3412">
            Mobile Apps, Portals, Customer Facing &amp; Self-Service Channels
          </text>

          {/* Row 1 */}
          <g transform="translate(18, 45)">
            <rect x="0" y="0" width="165" height="34" rx="7" fill="#F97316" />
            <circle cx="12" cy="17" r="3.5" fill="#FFFFFF" />
            <text x="22" y="21" fontSize="10.5" fontWeight="700" fill="#FFFFFF">
              Dashen Super App
            </text>
          </g>
          <g transform="translate(191, 45)">
            <rect x="0" y="0" width="175" height="34" rx="7" fill="#F97316" />
            <circle cx="12" cy="17" r="3.5" fill="#FFFFFF" />
            <text x="22" y="21" fontSize="10.5" fontWeight="700" fill="#FFFFFF">
              Dashen Internet Banking
            </text>
          </g>
          <g transform="translate(374, 45)">
            <rect x="0" y="0" width="155" height="34" rx="7" fill="#F97316" />
            <circle cx="12" cy="17" r="3.5" fill="#FFFFFF" />
            <text x="22" y="21" fontSize="10.5" fontWeight="700" fill="#FFFFFF">
              Dashen Mobile Plus
            </text>
          </g>
          <g transform="translate(537, 45)">
            <rect x="0" y="0" width="145" height="34" rx="7" fill="#F97316" />
            <circle cx="12" cy="17" r="3.5" fill="#FFFFFF" />
            <text x="22" y="21" fontSize="10.5" fontWeight="700" fill="#FFFFFF">
              USSD Application
            </text>
          </g>
          <g transform="translate(690, 45)">
            <rect x="0" y="0" width="165" height="34" rx="7" fill="#FB923C" />
            <circle cx="12" cy="17" r="3.5" fill="#1E3A8A" />
            <text x="22" y="21" fontSize="10.5" fontWeight="700" fill="#FFFFFF">
              Digital On Boarding
            </text>
          </g>
          <g transform="translate(863, 45)">
            <rect x="0" y="0" width="155" height="34" rx="7" fill="#F97316" />
            <circle cx="12" cy="17" r="3.5" fill="#FFFFFF" />
            <text x="22" y="21" fontSize="10.5" fontWeight="700" fill="#FFFFFF">
              ATM &amp; POS App
            </text>
          </g>
          <g transform="translate(1026, 45)">
            <rect x="0" y="0" width="145" height="34" rx="7" fill="#FB923C" />
            <circle cx="12" cy="17" r="3.5" fill="#1E3A8A" />
            <text x="22" y="21" fontSize="10.5" fontWeight="700" fill="#FFFFFF">
              SMS Application
            </text>
          </g>
          <g transform="translate(1179, 45)">
            <rect x="0" y="0" width="115" height="34" rx="7" fill="#FED7AA" />
            <text x="10" y="21" fontSize="10" fontWeight="600" fill="#7C2D12">
              Dashen Website
            </text>
          </g>

          {/* Row 2 */}
          <g transform="translate(18, 90)">
            <rect x="0" y="0" width="185" height="34" rx="7" fill="#F97316" />
            <circle cx="12" cy="17" r="3.5" fill="#FFFFFF" />
            <text x="22" y="21" fontSize="10.5" fontWeight="700" fill="#FFFFFF">
              Amole Customer Recruiters
            </text>
          </g>
          <g transform="translate(211, 90)">
            <rect x="0" y="0" width="195" height="34" rx="7" fill="#FB923C" />
            <circle cx="12" cy="17" r="3.5" fill="#1E3A8A" />
            <text x="22" y="21" fontSize="10.5" fontWeight="700" fill="#FFFFFF">
              Card App Tracking &amp; Proc.
            </text>
          </g>
          <g transform="translate(414, 90)">
            <rect x="0" y="0" width="180" height="34" rx="7" fill="#FED7AA" />
            <text x="12" y="21" fontSize="10" fontWeight="600" fill="#7C2D12">
              Event Ticket Sales Mgmt
            </text>
          </g>
          <g transform="translate(602, 90)">
            <rect x="0" y="0" width="165" height="34" rx="7" fill="#FED7AA" />
            <text x="12" y="21" fontSize="10" fontWeight="600" fill="#7C2D12">
              School Fee Info System
            </text>
          </g>
          <g transform="translate(775, 90)">
            <rect x="0" y="0" width="165" height="34" rx="7" fill="#FED7AA" />
            <text x="12" y="21" fontSize="10" fontWeight="600" fill="#7C2D12">
              Loyalty Prog. (Walia)
            </text>
          </g>
          <g transform="translate(948, 90)">
            <rect
              x="0"
              y="0"
              width="180"
              height="34"
              rx="7"
              fill="#FDE68A"
              stroke="#F59E0B"
              strokeWidth="2"
            />
            <rect x="10" y="11" width="12" height="12" rx="2" fill="#F59E0B" />
            <text x="28" y="21" fontSize="10.5" fontWeight="700" fill="#78350F">
              Call Center [Need Upgrade]
            </text>
          </g>
          <g transform="translate(1136, 90)">
            <rect
              x="0"
              y="0"
              width="158"
              height="34"
              rx="7"
              fill="#FEE2E2"
              stroke="#EF4444"
              strokeWidth="2"
            />
            <text x="12" y="21" fontSize="10" fontWeight="800" fill="#B91C1C">
              Ekub [EOL Sunset]
            </text>
          </g>
        </g>

        {/* Connectors */}
        <line
          x1="500"
          y1="335"
          x2="500"
          y2="310"
          stroke="#64748B"
          strokeWidth="2.5"
          markerEnd="url(#arrow)"
        />
        <line
          x1="1000"
          y1="335"
          x2="1000"
          y2="310"
          stroke="#64748B"
          strokeWidth="2.5"
          markerEnd="url(#arrow)"
        />

        {/* ==================== TIER 2: INTEGRATION & MIDDLEWARE SERVICES ==================== */}
        <g transform="translate(230, 335)">
          <rect
            x="0"
            y="0"
            width="1310"
            height="95"
            rx="12"
            fill="#F3E8FF"
            stroke="#D8B4FE"
            strokeWidth="1.8"
            filter="url(#shadow)"
          />
          <text x="18" y="24" fontSize="11" fontWeight="800" fill="#581C87">
            2. INTEGRATION, API GATEWAYS &amp; MESSAGING MIDDLEWARE
          </text>

          <g transform="translate(18, 38)">
            <rect x="0" y="0" width="195" height="40" rx="8" fill="#9333EA" />
            <circle cx="12" cy="20" r="4" fill="#FFFFFF" />
            <text x="22" y="20" fontSize="10.5" fontWeight="700" fill="#FFFFFF">
              IBM Cloud Pak (ESB)
            </text>
            <text x="22" y="32" fontSize="8.5" fontWeight="500" fill="#E9D5FF">
              Enterprise Service Bus
            </text>
          </g>
          <g transform="translate(221, 38)">
            <rect x="0" y="0" width="175" height="40" rx="8" fill="#9333EA" />
            <circle cx="12" cy="20" r="4" fill="#FFFFFF" />
            <text x="22" y="20" fontSize="10.5" fontWeight="700" fill="#FFFFFF">
              DataPower Gateway
            </text>
            <text x="22" y="32" fontSize="8.5" fontWeight="500" fill="#E9D5FF">
              Fintech Integration
            </text>
          </g>
          <g transform="translate(404, 38)">
            <rect x="0" y="0" width="170" height="40" rx="8" fill="#9333EA" />
            <circle cx="12" cy="20" r="4" fill="#FFFFFF" />
            <text x="22" y="20" fontSize="10.5" fontWeight="700" fill="#FFFFFF">
              IBM MQ Middleware
            </text>
            <text x="22" y="32" fontSize="8.5" fontWeight="500" fill="#E9D5FF">
              Messaging Backbone
            </text>
          </g>
          <g transform="translate(582, 38)">
            <rect x="0" y="0" width="185" height="40" rx="8" fill="#9333EA" />
            <circle cx="12" cy="20" r="4" fill="#FFFFFF" />
            <text x="22" y="20" fontSize="10.5" fontWeight="700" fill="#FFFFFF">
              FlexCube CBS Web Serv.
            </text>
            <text x="22" y="32" fontSize="8.5" fontWeight="500" fill="#E9D5FF">
              3rd Party Interfacing
            </text>
          </g>
          <g transform="translate(775, 38)">
            <rect x="0" y="0" width="180" height="40" rx="8" fill="#9333EA" />
            <circle cx="12" cy="20" r="4" fill="#FFFFFF" />
            <text x="22" y="20" fontSize="10.5" fontWeight="700" fill="#FFFFFF">
              Bankworld Channels
            </text>
            <text x="22" y="32" fontSize="8.5" fontWeight="500" fill="#E9D5FF">
              Online Integration Tool
            </text>
          </g>
          <g transform="translate(963, 38)">
            <rect x="0" y="0" width="165" height="40" rx="8" fill="#9333EA" />
            <circle cx="12" cy="20" r="4" fill="#FFFFFF" />
            <text x="22" y="20" fontSize="10.5" fontWeight="700" fill="#FFFFFF">
              SFTP Batch Engine
            </text>
            <text x="22" y="32" fontSize="8.5" fontWeight="500" fill="#E9D5FF">
              File Batch Integration
            </text>
          </g>
          <g transform="translate(1136, 38)">
            <rect x="0" y="0" width="158" height="40" rx="8" fill="#9333EA" />
            <circle cx="12" cy="20" r="4" fill="#FFFFFF" />
            <text x="22" y="20" fontSize="10.5" fontWeight="700" fill="#FFFFFF">
              HTTP Web Services
            </text>
            <text x="22" y="32" fontSize="8.5" fontWeight="500" fill="#E9D5FF">
              Middleware Host
            </text>
          </g>
        </g>

        {/* Connectors */}
        <line
          x1="500"
          y1="460"
          x2="500"
          y2="435"
          stroke="#64748B"
          strokeWidth="2.5"
          markerEnd="url(#arrow)"
        />
        <line
          x1="1000"
          y1="460"
          x2="1000"
          y2="435"
          stroke="#64748B"
          strokeWidth="2.5"
          markerEnd="url(#arrow)"
        />

        {/* ==================== TIER 3: CORE APPLICATION ASSETS & DOMAINS ==================== */}
        <g transform="translate(230, 460)">
          <rect
            x="0"
            y="0"
            width="1310"
            height="715"
            rx="14"
            fill="#FAF5FF"
            stroke="#E9D5FF"
            strokeWidth="2"
            filter="url(#shadow)"
          />
          <text
            x="460"
            y="28"
            fontSize="14"
            fontWeight="800"
            fill="#581C87"
            letterSpacing="0.5"
          >
            3. CORE TRANSACTION PROCESSING &amp; BUSINESS CAPABILITY APPLICATIONS
          </text>

          {/* 3A: Core Banking, Switches & Payment Gateways */}
          <g transform="translate(20, 42)">
            <rect
              x="0"
              y="0"
              width="1270"
              height="150"
              rx="10"
              fill="#FFFFFF"
              stroke="#D8B4FE"
              strokeWidth="1.5"
            />
            <text x="18" y="22" fontSize="11" fontWeight="800" fill="#6B21A8">
              3A. CORE BANKING, SWITCHING &amp; SETTLEMENT (MISSION-CRITICAL TRANS)
            </text>

            {/* Row 1 */}
            <g transform="translate(18, 35)">
              <rect x="0" y="0" width="220" height="44" rx="8" fill="#7E22CE" />
              <rect x="10" y="10" width="10" height="10" rx="2" fill="#22C55E" />
              <text x="28" y="22" fontSize="11" fontWeight="800" fill="#FFFFFF">
                Flex Cube CBS V12.x
              </text>
              <text x="28" y="36" fontSize="9" fontWeight="500" fill="#E9D5FF">
                Branch &amp; HO Core Engine
              </text>
            </g>
            <g transform="translate(246, 35)">
              <rect x="0" y="0" width="175" height="44" rx="8" fill="#7E22CE" />
              <rect x="10" y="10" width="10" height="10" rx="2" fill="#22C55E" />
              <text x="28" y="22" fontSize="11" fontWeight="800" fill="#FFFFFF">
                Base24-eps
              </text>
              <text x="28" y="36" fontSize="9" fontWeight="500" fill="#E9D5FF">
                ATM/POS Txn Switch
              </text>
            </g>
            <g transform="translate(429, 35)">
              <rect x="0" y="0" width="185" height="44" rx="8" fill="#7E22CE" />
              <rect x="10" y="10" width="10" height="10" rx="2" fill="#22C55E" />
              <text x="28" y="22" fontSize="11" fontWeight="800" fill="#FFFFFF">
                Cheque Truncation (CTS)
              </text>
              <text x="28" y="36" fontSize="9" fontWeight="500" fill="#E9D5FF">
                Inter-Bank Clearing
              </text>
            </g>
            <g transform="translate(622, 35)">
              <rect x="0" y="0" width="195" height="44" rx="8" fill="#9333EA" />
              <rect x="10" y="10" width="10" height="10" rx="2" fill="#22C55E" />
              <text x="28" y="22" fontSize="11" fontWeight="800" fill="#FFFFFF">
                Ethiopia Automated (EATS)
              </text>
              <text x="28" y="36" fontSize="9" fontWeight="500" fill="#E9D5FF">
                National Bank Clearing
              </text>
            </g>
            <g transform="translate(825, 35)">
              <rect x="0" y="0" width="165" height="44" rx="8" fill="#7E22CE" />
              <rect x="10" y="10" width="10" height="10" rx="2" fill="#22C55E" />
              <text x="28" y="22" fontSize="11" fontWeight="800" fill="#FFFFFF">
                Ethiopian Commod.(ECX)
              </text>
              <text x="28" y="36" fontSize="9" fontWeight="500" fill="#E9D5FF">
                Commodity Settlement
              </text>
            </g>
            <g transform="translate(998, 35)">
              <rect x="0" y="0" width="135" height="44" rx="8" fill="#9333EA" />
              <rect x="10" y="10" width="10" height="10" rx="2" fill="#22C55E" />
              <text x="28" y="22" fontSize="11" fontWeight="800" fill="#FFFFFF">
                SWIFT Alliance 2
              </text>
              <text x="28" y="36" fontSize="9" fontWeight="500" fill="#E9D5FF">
                Public Cloud Inbound
              </text>
            </g>
            <g transform="translate(1141, 35)">
              <rect x="0" y="0" width="115" height="44" rx="8" fill="#7E22CE" />
              <rect x="8" y="10" width="8" height="8" rx="2" fill="#22C55E" />
              <text x="20" y="22" fontSize="10.5" fontWeight="800" fill="#FFFFFF">
                IMT System
              </text>
              <text x="20" y="36" fontSize="8.5" fontWeight="500" fill="#E9D5FF">
                Money Transfer
              </text>
            </g>

            {/* Row 2 */}
            <g transform="translate(18, 90)">
              <rect x="0" y="0" width="195" height="44" rx="8" fill="#7E22CE" />
              <text x="14" y="22" fontSize="11" fontWeight="800" fill="#FFFFFF">
                Card Personalization Sys.
              </text>
              <text x="14" y="36" fontSize="9" fontWeight="500" fill="#E9D5FF">
                Chip Encoding &amp; Emboss
              </text>
            </g>
            <g transform="translate(221, 90)">
              <rect x="0" y="0" width="175" height="44" rx="8" fill="#9333EA" />
              <text x="14" y="22" fontSize="11" fontWeight="800" fill="#FFFFFF">
                Instant Card Mgmt
              </text>
              <text x="14" y="36" fontSize="9" fontWeight="500" fill="#E9D5FF">
                Decentralized Issuance
              </text>
            </g>
            <g transform="translate(404, 90)">
              <rect x="0" y="0" width="180" height="44" rx="8" fill="#9333EA" />
              <text x="14" y="22" fontSize="10.5" fontWeight="700" fill="#FFFFFF">
                Merchant Terminal Mgmt
              </text>
              <text x="14" y="36" fontSize="8.5" fontWeight="500" fill="#E9D5FF">
                Configuration &amp; Txn
              </text>
            </g>
            <g transform="translate(592, 90)">
              <rect x="0" y="0" width="165" height="44" rx="8" fill="#9333EA" />
              <text x="14" y="22" fontSize="10.5" fontWeight="700" fill="#FFFFFF">
                Settlement File Mgmt
              </text>
              <text x="14" y="36" fontSize="8.5" fontWeight="500" fill="#E9D5FF">
                Interchange Networks
              </text>
            </g>
            <g transform="translate(765, 90)">
              <rect x="0" y="0" width="165" height="44" rx="8" fill="#9333EA" />
              <text x="14" y="22" fontSize="10.5" fontWeight="700" fill="#FFFFFF">
                Reconciliation System
              </text>
              <text x="14" y="36" fontSize="8.5" fontWeight="500" fill="#E9D5FF">
                Transaction Matching
              </text>
            </g>
            <g transform="translate(938, 90)">
              <rect x="0" y="0" width="170" height="44" rx="8" fill="#9333EA" />
              <text x="14" y="22" fontSize="10.5" fontWeight="700" fill="#FFFFFF">
                Remittance Mgmt (Old)
              </text>
              <text x="14" y="36" fontSize="8.5" fontWeight="500" fill="#E9D5FF">
                Swift Message Parsing
              </text>
            </g>
            <g transform="translate(1116, 90)">
              <rect x="0" y="0" width="140" height="44" rx="8" fill="#DDD6FE" />
              <text x="12" y="22" fontSize="10.5" fontWeight="700" fill="#581C87">
                Dispute &amp; Settlement
              </text>
              <text x="12" y="36" fontSize="8.5" fontWeight="500" fill="#6B21A8">
                Central Repository
              </text>
            </g>
          </g>

          {/* 3B: Enterprise Operations, ERP, HRMS & Branch Workflow */}
          <g transform="translate(20, 205)">
            <rect
              x="0"
              y="0"
              width="1270"
              height="150"
              rx="10"
              fill="#FFFFFF"
              stroke="#D8B4FE"
              strokeWidth="1.5"
            />
            <text x="18" y="22" fontSize="11" fontWeight="800" fill="#6B21A8">
              3B. ENTERPRISE ERP, WORKFLOW, HUMAN CAPITAL &amp; BRANCH OPERATIONS
            </text>

            {/* Row 1 */}
            <g transform="translate(18, 35)">
              <rect x="0" y="0" width="165" height="44" rx="8" fill="#7E22CE" />
              <circle cx="12" cy="18" r="4" fill="#FFFFFF" />
              <text x="24" y="22" fontSize="11" fontWeight="800" fill="#FFFFFF">
                Enterprise ERP
              </text>
              <text x="24" y="36" fontSize="8.5" fontWeight="500" fill="#E9D5FF">
                Multi-Module Suite
              </text>
            </g>
            <g transform="translate(191, 35)">
              <rect x="0" y="0" width="165" height="44" rx="8" fill="#9333EA" />
              <circle cx="12" cy="18" r="4" fill="#FFFFFF" />
              <text x="24" y="22" fontSize="11" fontWeight="800" fill="#FFFFFF">
                HRMS &amp; Employee ESS
              </text>
              <text x="24" y="36" fontSize="8.5" fontWeight="500" fill="#E9D5FF">
                Talent Development
              </text>
            </g>
            <g transform="translate(364, 35)">
              <rect x="0" y="0" width="165" height="44" rx="8" fill="#9333EA" />
              <circle cx="12" cy="18" r="4" fill="#FFFFFF" />
              <text x="24" y="22" fontSize="11" fontWeight="800" fill="#FFFFFF">
                Biometrics Attendance
              </text>
              <text x="24" y="36" fontSize="8.5" fontWeight="500" fill="#E9D5FF">
                Employee Clock-In
              </text>
            </g>
            <g transform="translate(537, 35)">
              <rect x="0" y="0" width="165" height="44" rx="8" fill="#9333EA" />
              <circle cx="12" cy="18" r="4" fill="#FFFFFF" />
              <text x="24" y="22" fontSize="11" fontWeight="800" fill="#FFFFFF">
                BOCPMS Operations
              </text>
              <text x="24" y="36" fontSize="8.5" fontWeight="500" fill="#E9D5FF">
                Central Processing
              </text>
            </g>
            <g transform="translate(710, 35)">
              <rect x="0" y="0" width="165" height="44" rx="8" fill="#7E22CE" />
              <circle cx="12" cy="18" r="4" fill="#FFFFFF" />
              <text x="24" y="22" fontSize="11" fontWeight="800" fill="#FFFFFF">
                Spring Flow KYC
              </text>
              <text x="24" y="36" fontSize="8.5" fontWeight="500" fill="#E9D5FF">
                Branch &amp; HO Web App
              </text>
            </g>
            <g transform="translate(883, 35)">
              <rect x="0" y="0" width="185" height="44" rx="8" fill="#7E22CE" />
              <circle cx="12" cy="18" r="4" fill="#FFFFFF" />
              <text x="24" y="22" fontSize="11" fontWeight="800" fill="#FFFFFF">
                Audit Findings Mgmt
              </text>
              <text x="24" y="36" fontSize="8.5" fontWeight="500" fill="#E9D5FF">
                Internal Audit System
              </text>
            </g>
            <g transform="translate(1076, 35)">
              <rect x="0" y="0" width="180" height="44" rx="8" fill="#9333EA" />
              <circle cx="12" cy="18" r="4" fill="#FFFFFF" />
              <text x="24" y="22" fontSize="11" fontWeight="800" fill="#FFFFFF">
                Loan Committee Reg.
              </text>
              <text x="24" y="36" fontSize="8.5" fontWeight="500" fill="#E9D5FF">
                Meeting Minutes &amp; Appr
              </text>
            </g>

            {/* Row 2 */}
            <g transform="translate(18, 90)">
              <rect x="0" y="0" width="165" height="44" rx="8" fill="#DDD6FE" />
              <text x="14" y="22" fontSize="10.5" fontWeight="700" fill="#581C87">
                Credit Mgmt System
              </text>
              <text x="14" y="36" fontSize="8.5" fontWeight="500" fill="#6B21A8">
                Appraisal &amp; Analysis
              </text>
            </g>
            <g transform="translate(191, 90)">
              <rect x="0" y="0" width="165" height="44" rx="8" fill="#C084FC" />
              <text x="14" y="22" fontSize="10.5" fontWeight="700" fill="#FFFFFF">
                Cash Load &amp; Count
              </text>
              <text x="14" y="36" fontSize="8.5" fontWeight="500" fill="#FAF5FF">
                Vault Reconciliation
              </text>
            </g>
            <g transform="translate(364, 90)">
              <rect x="0" y="0" width="165" height="44" rx="8" fill="#C084FC" />
              <text x="14" y="22" fontSize="10.5" fontWeight="700" fill="#FFFFFF">
                Project Cost Mon.
              </text>
              <text x="14" y="36" fontSize="8.5" fontWeight="500" fill="#FAF5FF">
                Solutions Program
              </text>
            </g>
            <g transform="translate(537, 90)">
              <rect x="0" y="0" width="165" height="44" rx="8" fill="#C084FC" />
              <text x="14" y="22" fontSize="10.5" fontWeight="700" fill="#FFFFFF">
                Import Export Permits
              </text>
              <text x="14" y="36" fontSize="8.5" fontWeight="500" fill="#FAF5FF">
                FCY Sector Mgt
              </text>
            </g>
            <g transform="translate(710, 90)">
              <rect x="0" y="0" width="165" height="44" rx="8" fill="#DDD6FE" />
              <text x="14" y="22" fontSize="10.5" fontWeight="700" fill="#581C87">
                Generic Collection
              </text>
              <text x="14" y="36" fontSize="8.5" fontWeight="500" fill="#6B21A8">
                Deployed Not Active
              </text>
            </g>
            <g transform="translate(883, 90)">
              <rect x="0" y="0" width="185" height="44" rx="8" fill="#DDD6FE" />
              <text x="14" y="22" fontSize="10.5" fontWeight="700" fill="#581C87">
                Haji Fee Collection
              </text>
              <text x="14" y="36" fontSize="8.5" fontWeight="500" fill="#6B21A8">
                EIASC Server Sync
              </text>
            </g>
            <g transform="translate(1076, 90)">
              <rect
                x="0"
                y="0"
                width="180"
                height="44"
                rx="8"
                fill="#FEE2E2"
                stroke="#EF4444"
                strokeWidth="1.8"
              />
              <text x="14" y="20" fontSize="10" fontWeight="800" fill="#B91C1C">
                Smart Service Desk
              </text>
              <text x="14" y="34" fontSize="8.5" fontWeight="700" fill="#DC2626">
                [EOL Decommissioned]
              </text>
            </g>
          </g>

          {/* 3C: Collateral, Legal, Facility & Internal Services */}
          <g transform="translate(20, 368)">
            <rect
              x="0"
              y="0"
              width="1270"
              height="155"
              rx="10"
              fill="#FFFFFF"
              stroke="#D8B4FE"
              strokeWidth="1.5"
            />
            <text x="18" y="22" fontSize="11" fontWeight="800" fill="#6B21A8">
              3C. COLLATERAL VALUATION, LEGAL &amp; INTERNAL CORPORATE SERVICES
            </text>

            {/* Row 1 */}
            <g transform="translate(18, 35)">
              <rect
                x="0"
                y="0"
                width="165"
                height="44"
                rx="8"
                fill="#DDD6FE"
                stroke="#8B5CF6"
                strokeWidth="1.5"
              />
              <text x="14" y="21" fontSize="10.5" fontWeight="700" fill="#4C1D95">
                Property Valuation V3
              </text>
              <text x="14" y="34" fontSize="8.5" fontWeight="600" fill="#6D28D9">
                At UAT (Strategic)
              </text>
            </g>
            <g transform="translate(191, 35)">
              <rect
                x="0"
                y="0"
                width="165"
                height="44"
                rx="8"
                fill="#EDE9FE"
                stroke="#8B5CF6"
                strokeWidth="1.5"
              />
              <text x="14" y="21" fontSize="10.5" fontWeight="700" fill="#5B21B6">
                Property Val. V2
              </text>
              <text x="14" y="34" fontSize="8" fontWeight="700" fill="#7C3AED">
                [DUPLICATE OVERLAP]
              </text>
            </g>
            <g transform="translate(364, 35)">
              <rect x="0" y="0" width="165" height="44" rx="8" fill="#F3E8FF" />
              <text x="14" y="21" fontSize="10" fontWeight="600" fill="#581C87">
                Fleet Management
              </text>
              <text x="14" y="34" fontSize="8" fontWeight="500" fill="#6B21A8">
                Automotive Facility
              </text>
            </g>
            <g transform="translate(537, 35)">
              <rect x="0" y="0" width="165" height="44" rx="8" fill="#F3E8FF" />
              <text x="14" y="21" fontSize="10" fontWeight="600" fill="#581C87">
                Building Management
              </text>
              <text x="14" y="34" fontSize="8" fontWeight="500" fill="#6B21A8">
                Facility Dept.
              </text>
            </g>
            <g transform="translate(710, 35)">
              <rect x="0" y="0" width="165" height="44" rx="8" fill="#F3E8FF" />
              <text x="14" y="21" fontSize="10" fontWeight="600" fill="#581C87">
                Document Mgmt
              </text>
              <text x="14" y="34" fontSize="8" fontWeight="500" fill="#6B21A8">
                Electronic Archival
              </text>
            </g>
            <g transform="translate(883, 35)">
              <rect x="0" y="0" width="185" height="44" rx="8" fill="#F3E8FF" />
              <text x="14" y="21" fontSize="10" fontWeight="600" fill="#581C87">
                Lease Contract Mgmt
              </text>
              <text x="14" y="34" fontSize="8" fontWeight="500" fill="#6B21A8">
                IFRS-16 Standards
              </text>
            </g>
            <g transform="translate(1076, 35)">
              <rect x="0" y="0" width="180" height="44" rx="8" fill="#F3E8FF" />
              <text x="14" y="21" fontSize="10" fontWeight="600" fill="#581C87">
                Stock Receiving/Issuing
              </text>
              <text x="14" y="34" fontSize="8" fontWeight="500" fill="#6B21A8">
                Inventory Store
              </text>
            </g>

            {/* Row 2 */}
            <g transform="translate(18, 92)">
              <rect x="0" y="0" width="165" height="44" rx="8" fill="#F3E8FF" />
              <text x="12" y="21" fontSize="10" fontWeight="600" fill="#581C87">
                Legal Advisory Sys
              </text>
              <text x="12" y="34" fontSize="8" fontWeight="500" fill="#6B21A8">
                Advisory &amp; Research
              </text>
            </g>
            <g transform="translate(191, 92)">
              <rect x="0" y="0" width="165" height="44" rx="8" fill="#F3E8FF" />
              <text x="12" y="21" fontSize="10" fontWeight="600" fill="#581C87">
                Legal Person Customer
              </text>
              <text x="12" y="34" fontSize="8" fontWeight="500" fill="#6B21A8">
                NBE Compliance
              </text>
            </g>
            <g transform="translate(364, 92)">
              <rect x="0" y="0" width="165" height="44" rx="8" fill="#F3E8FF" />
              <text x="12" y="21" fontSize="10" fontWeight="600" fill="#581C87">
                Blacklisted Accounts
              </text>
              <text x="12" y="34" fontSize="8" fontWeight="500" fill="#6B21A8">
                Delinquent Account
              </text>
            </g>
            <g transform="translate(537, 92)">
              <rect x="0" y="0" width="165" height="44" rx="8" fill="#F3E8FF" />
              <text x="12" y="21" fontSize="10" fontWeight="600" fill="#581C87">
                Dishonored Registration
              </text>
              <text x="12" y="34" fontSize="8" fontWeight="500" fill="#6B21A8">
                Cheque Bounce Track
              </text>
            </g>
            <g transform="translate(710, 92)">
              <rect x="0" y="0" width="165" height="44" rx="8" fill="#F3E8FF" />
              <text x="12" y="21" fontSize="10" fontWeight="600" fill="#581C87">
                Payment &amp; Settlement
              </text>
              <text x="12" y="34" fontSize="8" fontWeight="500" fill="#6B21A8">
                Follow Up System
              </text>
            </g>
            <g transform="translate(883, 92)">
              <rect x="0" y="0" width="185" height="44" rx="8" fill="#F3E8FF" />
              <text x="12" y="21" fontSize="10" fontWeight="600" fill="#581C87">
                Service Cost Mgmt
              </text>
              <text x="12" y="34" fontSize="8" fontWeight="500" fill="#6B21A8">
                Facilities Costing
              </text>
            </g>
            <g transform="translate(1076, 92)">
              <rect x="0" y="0" width="180" height="44" rx="8" fill="#F3E8FF" />
              <text x="12" y="21" fontSize="10" fontWeight="600" fill="#581C87">
                Batch Update
              </text>
              <text x="12" y="34" fontSize="8" fontWeight="500" fill="#6B21A8">
                Credit Team Records
              </text>
            </g>
          </g>

          {/* 3D: Talent, Employee Experience & Productivity Suite */}
          <g transform="translate(20, 535)">
            <rect
              x="0"
              y="0"
              width="1270"
              height="155"
              rx="10"
              fill="#FFFFFF"
              stroke="#D8B4FE"
              strokeWidth="1.5"
            />
            <text x="18" y="22" fontSize="11" fontWeight="800" fill="#6B21A8">
              3D. TALENT, EMPLOYEE EXPERIENCE &amp; PRODUCTIVITY SUITE
            </text>

            {/* Row 1 */}
            <g transform="translate(18, 35)">
              <rect x="0" y="0" width="165" height="44" rx="8" fill="#9333EA" />
              <circle cx="12" cy="18" r="4" fill="#FFFFFF" />
              <text
                x="24"
                y="22"
                fontSize="10.5"
                fontWeight="800"
                fill="#FFFFFF"
              >
                Office 365 E1
              </text>
              <text x="24" y="35" fontSize="8" fontWeight="500" fill="#E9D5FF">
                Email &amp; Collab Suite
              </text>
            </g>
            <g transform="translate(191, 35)">
              <rect x="0" y="0" width="165" height="44" rx="8" fill="#F3E8FF" />
              <text x="14" y="22" fontSize="10" fontWeight="600" fill="#581C87">
                Learning Mgmt (LMS)
              </text>
              <text x="14" y="35" fontSize="8" fontWeight="500" fill="#6B21A8">
                Talent Training Courses
              </text>
            </g>
            <g transform="translate(364, 35)">
              <rect x="0" y="0" width="165" height="44" rx="8" fill="#F3E8FF" />
              <text x="14" y="22" fontSize="10" fontWeight="600" fill="#581C87">
                Exam Management
              </text>
              <text x="14" y="35" fontSize="8" fontWeight="500" fill="#6B21A8">
                Internal Online Exams
              </text>
            </g>
            <g transform="translate(537, 35)">
              <rect x="0" y="0" width="165" height="44" rx="8" fill="#F3E8FF" />
              <text x="14" y="22" fontSize="10" fontWeight="600" fill="#581C87">
                Speak Up Whistleblow
              </text>
              <text x="14" y="35" fontSize="8" fontWeight="500" fill="#6B21A8">
                Ethics Complaints
              </text>
            </g>
            <g transform="translate(710, 35)">
              <rect x="0" y="0" width="165" height="44" rx="8" fill="#F3E8FF" />
              <text x="14" y="22" fontSize="10" fontWeight="600" fill="#581C87">
                Complaint Management
              </text>
              <text x="14" y="35" fontSize="8" fontWeight="500" fill="#6B21A8">
                Customer &amp; Employee
              </text>
            </g>
            <g transform="translate(883, 35)">
              <rect x="0" y="0" width="185" height="44" rx="8" fill="#F3E8FF" />
              <text x="14" y="22" fontSize="10" fontWeight="600" fill="#581C87">
                Shareholder Data Mgmt
              </text>
              <text x="14" y="35" fontSize="8" fontWeight="500" fill="#6B21A8">
                Finance &amp; Share Events
              </text>
            </g>
            <g transform="translate(1076, 35)">
              <rect x="0" y="0" width="180" height="44" rx="8" fill="#F3E8FF" />
              <text x="14" y="22" fontSize="10" fontWeight="600" fill="#581C87">
                Innovative Idea Collect
              </text>
              <text x="14" y="35" fontSize="8" fontWeight="500" fill="#6B21A8">
                Digital Banking Innov.
              </text>
            </g>

            {/* Row 2 */}
            <g transform="translate(18, 92)">
              <rect x="0" y="0" width="165" height="44" rx="8" fill="#F3E8FF" />
              <text x="12" y="21" fontSize="10" fontWeight="600" fill="#581C87">
                Ticket Printing Sys
              </text>
              <text x="12" y="34" fontSize="8" fontWeight="500" fill="#6B21A8">
                Events &amp; Transport
              </text>
            </g>
            <g transform="translate(191, 92)">
              <rect x="0" y="0" width="165" height="44" rx="8" fill="#F3E8FF" />
              <text x="12" y="21" fontSize="10" fontWeight="600" fill="#581C87">
                Signature Tracing
              </text>
              <text x="12" y="34" fontSize="8" fontWeight="500" fill="#6B21A8">
                Manage Signatures
              </text>
            </g>
            <g transform="translate(364, 92)">
              <rect x="0" y="0" width="165" height="44" rx="8" fill="#F3E8FF" />
              <text x="12" y="21" fontSize="10" fontWeight="600" fill="#581C87">
                Telephone Mgmt
              </text>
              <text x="12" y="34" fontSize="8" fontWeight="500" fill="#6B21A8">
                Office &amp; Mobile Track
              </text>
            </g>
            <g transform="translate(537, 92)">
              <rect x="0" y="0" width="165" height="44" rx="8" fill="#F3E8FF" />
              <text x="12" y="21" fontSize="10" fontWeight="600" fill="#581C87">
                Project Mgmt System
              </text>
              <text x="12" y="34" fontSize="8" fontWeight="500" fill="#6B21A8">
                ADS Internal Tracking
              </text>
            </g>
            <g transform="translate(710, 92)">
              <rect x="0" y="0" width="165" height="44" rx="8" fill="#F3E8FF" />
              <text x="12" y="21" fontSize="10" fontWeight="600" fill="#581C87">
                Report Mgmt System
              </text>
              <text x="12" y="34" fontSize="8" fontWeight="500" fill="#6B21A8">
                Operational Reports
              </text>
            </g>
            <g transform="translate(883, 92)">
              <rect x="0" y="0" width="185" height="44" rx="8" fill="#F3E8FF" />
              <text x="12" y="21" fontSize="10" fontWeight="600" fill="#581C87">
                Landing Project
              </text>
              <text x="12" y="34" fontSize="8" fontWeight="500" fill="#6B21A8">
                ADS Landing App
              </text>
            </g>
            <g transform="translate(1076, 92)">
              <rect x="0" y="0" width="180" height="44" rx="8" fill="#F3E8FF" />
              <text x="12" y="21" fontSize="10" fontWeight="600" fill="#581C87">
                Unified Communication
              </text>
              <text x="12" y="34" fontSize="8" fontWeight="500" fill="#6B21A8">
                Cisco IP Phone &amp; Video
              </text>
            </g>
          </g>
        </g>

        {/* Connectors */}
        <line
          x1="500"
          y1="1200"
          x2="500"
          y2="1180"
          stroke="#64748B"
          strokeWidth="2.5"
          markerEnd="url(#arrow)"
        />
        <line
          x1="1000"
          y1="1200"
          x2="1000"
          y2="1180"
          stroke="#64748B"
          strokeWidth="2.5"
          markerEnd="url(#arrow)"
        />

        {/* ==================== TIER 4: SECURITY, FRAUD, COMPLIANCE & ANALYTICS ==================== */}
        <g transform="translate(230, 1205)">
          {/* 4A: Cyber Security & IAM (Left) */}
          <g transform="translate(0, 0)">
            <rect
              x="0"
              y="0"
              width="645"
              height="235"
              rx="12"
              fill="#EFF6FF"
              stroke="#BFDBFE"
              strokeWidth="1.8"
              filter="url(#shadow)"
            />
            <text x="18" y="24" fontSize="12" fontWeight="800" fill="#1E40AF">
              4A. CYBER SECURITY, IAM &amp; CRYPTOGRAPHIC CONTROL
            </text>

            {/* Row 1 */}
            <g transform="translate(18, 38)">
              <rect x="0" y="0" width="195" height="40" rx="8" fill="#2563EB" />
              <circle cx="12" cy="20" r="4" fill="#FFFFFF" />
              <text
                x="24"
                y="21"
                fontSize="10.5"
                fontWeight="700"
                fill="#FFFFFF"
              >
                Hardware Sec. (HSM)
              </text>
              <text x="24" y="33" fontSize="8" fontWeight="500" fill="#DBEAFE">
                PIN Auth &amp; Crypto
              </text>
            </g>
            <g transform="translate(221, 38)">
              <rect x="0" y="0" width="200" height="40" rx="8" fill="#2563EB" />
              <circle cx="12" cy="20" r="4" fill="#FFFFFF" />
              <text
                x="24"
                y="21"
                fontSize="10.5"
                fontWeight="700"
                fill="#FFFFFF"
              >
                Imperva WAF Firewall
              </text>
              <text x="24" y="33" fontSize="8" fontWeight="500" fill="#DBEAFE">
                Web App Security
              </text>
            </g>
            <g transform="translate(429, 38)">
              <rect x="0" y="0" width="200" height="40" rx="8" fill="#2563EB" />
              <circle cx="12" cy="20" r="4" fill="#FFFFFF" />
              <text
                x="24"
                y="21"
                fontSize="10.5"
                fontWeight="700"
                fill="#FFFFFF"
              >
                Imperva DAM Activity
              </text>
              <text x="24" y="33" fontSize="8" fontWeight="500" fill="#DBEAFE">
                DB Activity Monitor
              </text>
            </g>

            {/* Row 2 */}
            <g transform="translate(18, 86)">
              <rect x="0" y="0" width="195" height="40" rx="8" fill="#3B82F6" />
              <circle cx="12" cy="20" r="4" fill="#FFFFFF" />
              <text
                x="24"
                y="21"
                fontSize="10.5"
                fontWeight="700"
                fill="#FFFFFF"
              >
                Keycloak (HTTPS)
              </text>
              <text x="24" y="33" fontSize="8" fontWeight="500" fill="#DBEAFE">
                SSO User Management
              </text>
            </g>
            <g transform="translate(221, 86)">
              <rect x="0" y="0" width="200" height="40" rx="8" fill="#3B82F6" />
              <circle cx="12" cy="20" r="4" fill="#FFFFFF" />
              <text
                x="24"
                y="21"
                fontSize="10.5"
                fontWeight="700"
                fill="#FFFFFF"
              >
                Keycloak (HTTP)
              </text>
              <text x="24" y="33" fontSize="8" fontWeight="500" fill="#DBEAFE">
                SSO User Management
              </text>
            </g>
            <g transform="translate(429, 86)">
              <rect x="0" y="0" width="200" height="40" rx="8" fill="#2563EB" />
              <circle cx="12" cy="20" r="4" fill="#FFFFFF" />
              <text
                x="24"
                y="21"
                fontSize="10.5"
                fontWeight="700"
                fill="#FFFFFF"
              >
                Privileged Access (PAM)
              </text>
              <text x="24" y="33" fontSize="8" fontWeight="500" fill="#DBEAFE">
                Privileged Credentials
              </text>
            </g>

            {/* Row 3 */}
            <g transform="translate(18, 134)">
              <rect x="0" y="0" width="195" height="40" rx="8" fill="#3B82F6" />
              <circle cx="12" cy="20" r="4" fill="#FFFFFF" />
              <text
                x="24"
                y="21"
                fontSize="10.5"
                fontWeight="700"
                fill="#FFFFFF"
              >
                Microsoft Active Direct.
              </text>
              <text x="24" y="33" fontSize="8" fontWeight="500" fill="#DBEAFE">
                Domain Controller / AD
              </text>
            </g>
            <g transform="translate(221, 134)">
              <rect x="0" y="0" width="200" height="40" rx="8" fill="#2563EB" />
              <circle cx="12" cy="20" r="4" fill="#FFFFFF" />
              <text
                x="24"
                y="21"
                fontSize="10.5"
                fontWeight="700"
                fill="#FFFFFF"
              >
                IBM QRadar SIEM
              </text>
              <text x="24" y="33" fontSize="8" fontWeight="500" fill="#DBEAFE">
                Cyber Security Incident
              </text>
            </g>
            <g transform="translate(429, 134)">
              <rect x="0" y="0" width="200" height="40" rx="8" fill="#2563EB" />
              <circle cx="12" cy="20" r="4" fill="#FFFFFF" />
              <text
                x="24"
                y="21"
                fontSize="10.5"
                fontWeight="700"
                fill="#FFFFFF"
              >
                Vulnerability Scanner
              </text>
              <text x="24" y="33" fontSize="8" fontWeight="500" fill="#DBEAFE">
                App Security Analysis
              </text>
            </g>

            {/* Row 4 */}
            <g transform="translate(18, 182)">
              <rect
                x="0"
                y="0"
                width="195"
                height="38"
                rx="8"
                fill="#DBEAFE"
                stroke="#93C5FD"
                strokeWidth="1.2"
              />
              <text
                x="14"
                y="19"
                fontSize="10"
                fontWeight="700"
                fill="#1E40AF"
              >
                Email Security Gateway
              </text>
              <text
                x="14"
                y="31"
                fontSize="7.5"
                fontWeight="500"
                fill="#2563EB"
              >
                Inbound/Outbound Mail
              </text>
            </g>
            <g transform="translate(221, 182)">
              <rect
                x="0"
                y="0"
                width="200"
                height="38"
                rx="8"
                fill="#DBEAFE"
                stroke="#93C5FD"
                strokeWidth="1.2"
              />
              <text
                x="14"
                y="19"
                fontSize="10"
                fontWeight="700"
                fill="#1E40AF"
              >
                Kaspersky / FIM Tool
              </text>
              <text
                x="14"
                y="31"
                fontSize="7.5"
                fontWeight="500"
                fill="#2563EB"
              >
                Endpoint &amp; File Integrity
              </text>
            </g>
            <g transform="translate(429, 182)">
              <rect
                x="0"
                y="0"
                width="200"
                height="38"
                rx="8"
                fill="#FEE2E2"
                stroke="#EF4444"
                strokeWidth="1.8"
              />
              <text
                x="14"
                y="19"
                fontSize="10"
                fontWeight="800"
                fill="#B91C1C"
              >
                SOAR Automation
              </text>
              <text
                x="14"
                y="31"
                fontSize="7.5"
                fontWeight="700"
                fill="#DC2626"
              >
                [EOL / Decommissioned]
              </text>
            </g>
          </g>

          {/* 4B: Fraud Detection, Risk, AML & Analytics (Right) */}
          <g transform="translate(665, 0)">
            <rect
              x="0"
              y="0"
              width="645"
              height="235"
              rx="12"
              fill="#F0FDF4"
              stroke="#BBF7D0"
              strokeWidth="1.8"
              filter="url(#shadow)"
            />
            <text x="18" y="24" fontSize="12" fontWeight="800" fill="#166534">
              4B. FRAUD DETECTION, RISK, AML &amp; BUSINESS INTELLIGENCE
            </text>

            {/* Row 1 */}
            <g transform="translate(18, 38)">
              <rect x="0" y="0" width="295" height="40" rx="8" fill="#15803D" />
              <circle cx="12" cy="20" r="4" fill="#FFFFFF" />
              <text
                x="24"
                y="21"
                fontSize="10.5"
                fontWeight="700"
                fill="#FFFFFF"
              >
                Enterprise Fraud Monitoring
              </text>
              <text x="24" y="33" fontSize="8" fontWeight="500" fill="#DCFCE7">
                Real-Time Channel Detection
              </text>
            </g>
            <g transform="translate(325, 38)">
              <rect x="0" y="0" width="300" height="40" rx="8" fill="#15803D" />
              <circle cx="12" cy="20" r="4" fill="#FFFFFF" />
              <text
                x="24"
                y="21"
                fontSize="10.5"
                fontWeight="700"
                fill="#FFFFFF"
              >
                Financial Intelligence Center (FIC)
              </text>
              <text x="24" y="33" fontSize="8" fontWeight="500" fill="#DCFCE7">
                Suspicious Txn Monitoring
              </text>
            </g>

            {/* Row 2 */}
            <g transform="translate(18, 86)">
              <rect x="0" y="0" width="295" height="40" rx="8" fill="#16A34A" />
              <circle cx="12" cy="20" r="4" fill="#FFFFFF" />
              <text
                x="24"
                y="21"
                fontSize="10.5"
                fontWeight="700"
                fill="#FFFFFF"
              >
                Proactive Risk Management
              </text>
              <text x="24" y="33" fontSize="8" fontWeight="500" fill="#DCFCE7">
                Fraud Analysis Engine
              </text>
            </g>
            <g transform="translate(325, 86)">
              <rect x="0" y="0" width="300" height="40" rx="8" fill="#15803D" />
              <circle cx="12" cy="20" r="4" fill="#FFFFFF" />
              <text
                x="24"
                y="21"
                fontSize="10.5"
                fontWeight="700"
                fill="#FFFFFF"
              >
                Oracle Financial Services (OFSAA)
              </text>
              <text x="24" y="33" fontSize="8" fontWeight="500" fill="#DCFCE7">
                Analytical Alert Generation
              </text>
            </g>

            {/* Row 3 */}
            <g transform="translate(18, 134)">
              <rect x="0" y="0" width="295" height="40" rx="8" fill="#22C55E" />
              <circle cx="12" cy="20" r="4" fill="#1E3A8A" />
              <text
                x="24"
                y="21"
                fontSize="10.5"
                fontWeight="700"
                fill="#FFFFFF"
              >
                Oracle Business Intelligence
              </text>
              <text x="24" y="33" fontSize="8" fontWeight="500" fill="#F0FDF4">
                Enterprise Data Warehouse
              </text>
            </g>
            <g transform="translate(325, 134)">
              <rect x="0" y="0" width="300" height="40" rx="8" fill="#22C55E" />
              <circle cx="12" cy="20" r="4" fill="#1E3A8A" />
              <text
                x="24"
                y="21"
                fontSize="10.5"
                fontWeight="700"
                fill="#FFFFFF"
              >
                Microsoft Business Intelligence
              </text>
              <text x="24" y="33" fontSize="8" fontWeight="500" fill="#F0FDF4">
                Transaction Reporting &amp; PowerBI
              </text>
            </g>

            {/* Row 4 */}
            <g transform="translate(18, 182)">
              <rect x="0" y="0" width="295" height="38" rx="8" fill="#DCFCE7" />
              <text
                x="14"
                y="19"
                fontSize="10"
                fontWeight="700"
                fill="#14532D"
              >
                Online Cash Txn Reporting
              </text>
              <text
                x="14"
                y="31"
                fontSize="7.5"
                fontWeight="500"
                fill="#166534"
              >
                ADS Cash System
              </text>
            </g>
            <g transform="translate(325, 182)">
              <rect x="0" y="0" width="160" height="38" rx="8" fill="#DCFCE7" />
              <text
                x="12"
                y="19"
                fontSize="9.5"
                fontWeight="700"
                fill="#14532D"
              >
                Risk &amp; Loss Reg.
              </text>
              <text
                x="12"
                y="31"
                fontSize="7.5"
                fontWeight="500"
                fill="#166534"
              >
                Active Risk Tool
              </text>
            </g>
            <g transform="translate(493, 182)">
              <rect
                x="0"
                y="0"
                width="132"
                height="38"
                rx="8"
                fill="#FEE2E2"
                stroke="#EF4444"
                strokeWidth="1.8"
              />
              <text
                x="10"
                y="18"
                fontSize="9"
                fontWeight="800"
                fill="#B91C1C"
              >
                Risk Reg. System
              </text>
              <text
                x="10"
                y="31"
                fontSize="7.5"
                fontWeight="700"
                fill="#DC2626"
              >
                [EOL Sunset]
              </text>
            </g>
          </g>
        </g>

        {/* Connectors */}
        <line
          x1="500"
          y1="1465"
          x2="500"
          y2="1445"
          stroke="#64748B"
          strokeWidth="2.5"
          markerEnd="url(#arrow)"
        />
        <line
          x1="1000"
          y1="1465"
          x2="1000"
          y2="1445"
          stroke="#64748B"
          strokeWidth="2.5"
          markerEnd="url(#arrow)"
        />

        {/* ==================== TIER 5: APPLICATION RUNTIME, WORKLOAD & CLUSTERS ==================== */}
        <g transform="translate(230, 1470)">
          <rect
            x="0"
            y="0"
            width="1310"
            height="85"
            rx="12"
            fill="#ECFDF5"
            stroke="#A7F3D0"
            strokeWidth="1.8"
            filter="url(#shadow)"
          />
          <text x="18" y="24" fontSize="11" fontWeight="800" fill="#065F46">
            5. APPLICATION RUNTIMES, WORKFLOW SUITE &amp; DATABASE REPLICATION
          </text>

          <g transform="translate(18, 36)">
            <rect x="0" y="0" width="225" height="38" rx="8" fill="#059669" />
            <circle cx="12" cy="19" r="3.5" fill="#FFFFFF" />
            <text x="24" y="20" fontSize="10.5" fontWeight="700" fill="#FFFFFF">
              WebLogic Suite for Oracle
            </text>
            <text x="24" y="32" fontSize="8" fontWeight="500" fill="#D1FAE5">
              CBS Clustering Engine
            </text>
          </g>
          <g transform="translate(251, 36)">
            <rect x="0" y="0" width="190" height="38" rx="8" fill="#059669" />
            <circle cx="12" cy="19" r="3.5" fill="#FFFFFF" />
            <text x="24" y="20" fontSize="10.5" fontWeight="700" fill="#FFFFFF">
              WebSphere Application
            </text>
            <text x="24" y="32" fontSize="8" fontWeight="500" fill="#D1FAE5">
              Enterprise Runtime
            </text>
          </g>
          <g transform="translate(449, 36)">
            <rect x="0" y="0" width="205" height="38" rx="8" fill="#059669" />
            <circle cx="12" cy="19" r="3.5" fill="#FFFFFF" />
            <text x="24" y="20" fontSize="10.5" fontWeight="700" fill="#FFFFFF">
              Oracle Golden Gate Repl.
            </text>
            <text x="24" y="32" fontSize="8" fontWeight="500" fill="#D1FAE5">
              Real-Time DB Sync
            </text>
          </g>
          <g transform="translate(662, 36)">
            <rect x="0" y="0" width="195" height="38" rx="8" fill="#059669" />
            <circle cx="12" cy="19" r="3.5" fill="#FFFFFF" />
            <text x="24" y="20" fontSize="10.5" fontWeight="700" fill="#FFFFFF">
              Workload Scheduler
            </text>
            <text x="24" y="32" fontSize="8" fontWeight="500" fill="#D1FAE5">
              Task &amp; Batch Automation
            </text>
          </g>
          <g transform="translate(865, 36)">
            <rect x="0" y="0" width="225" height="38" rx="8" fill="#059669" />
            <circle cx="12" cy="19" r="3.5" fill="#FFFFFF" />
            <text x="24" y="20" fontSize="10.5" fontWeight="700" fill="#FFFFFF">
              Unified BPM Suite (Oracle)
            </text>
            <text x="24" y="32" fontSize="8" fontWeight="500" fill="#D1FAE5">
              Enterprise BPM / Workflow
            </text>
          </g>
          <g transform="translate(1098, 36)">
            <rect x="0" y="0" width="195" height="38" rx="8" fill="#059669" />
            <circle cx="12" cy="19" r="3.5" fill="#FFFFFF" />
            <text x="24" y="20" fontSize="10.5" fontWeight="700" fill="#FFFFFF">
              Web Center Imaging
            </text>
            <text x="24" y="32" fontSize="8" fontWeight="500" fill="#D1FAE5">
              Content &amp; Document Mgmt
            </text>
          </g>
        </g>

        {/* Connectors */}
        <line
          x1="700"
          y1="1580"
          x2="700"
          y2="1560"
          stroke="#64748B"
          strokeWidth="2.5"
          markerEnd="url(#arrow)"
        />

        {/* ==================== TIER 6: INFRASTRUCTURE, TOOLS & OBSERVABILITY ==================== */}
        <g transform="translate(230, 1585)">
          <rect
            x="0"
            y="0"
            width="1310"
            height="95"
            rx="12"
            fill="#F1F5F9"
            stroke="#CBD5E1"
            strokeWidth="1.8"
            filter="url(#shadow)"
          />
          <text x="18" y="24" fontSize="11" fontWeight="800" fill="#334155">
            6. INFRASTRUCTURE MONITORING, CI/CD PIPELINE &amp; DEV TOOLS
          </text>

          <g transform="translate(18, 38)">
            <rect
              x="0"
              y="0"
              width="165"
              height="42"
              rx="8"
              fill="#E2E8F0"
              stroke="#94A3B8"
              strokeWidth="1.5"
            />
            <circle cx="10" cy="12" r="3" fill="#DC2626" />
            <text x="20" y="18" fontSize="10.5" fontWeight="800" fill="#1E293B">
              F5 Big IP Proxy
            </text>
            <text x="20" y="32" fontSize="8.5" fontWeight="500" fill="#64748B">
              Load Balancer &amp; IMT
            </text>
          </g>
          <g transform="translate(191, 38)">
            <rect
              x="0"
              y="0"
              width="180"
              height="42"
              rx="8"
              fill="#E2E8F0"
              stroke="#94A3B8"
              strokeWidth="1.5"
            />
            <text x="12" y="18" fontSize="10.5" fontWeight="800" fill="#1E293B">
              Redhat OpenShift EFK
            </text>
            <text x="12" y="32" fontSize="8.5" fontWeight="500" fill="#64748B">
              API Log &amp; Metrics
            </text>
          </g>
          <g transform="translate(379, 38)">
            <rect
              x="0"
              y="0"
              width="170"
              height="42"
              rx="8"
              fill="#E2E8F0"
              stroke="#94A3B8"
              strokeWidth="1.5"
            />
            <text x="12" y="18" fontSize="10.5" fontWeight="800" fill="#1E293B">
              Solar Winds Mon.
            </text>
            <text x="12" y="32" fontSize="8.5" fontWeight="500" fill="#64748B">
              Network Operations
            </text>
          </g>
          <g transform="translate(557, 38)">
            <rect
              x="0"
              y="0"
              width="180"
              height="42"
              rx="8"
              fill="#E2E8F0"
              stroke="#94A3B8"
              strokeWidth="1.5"
            />
            <text x="12" y="18" fontSize="10.5" fontWeight="800" fill="#1E293B">
              App Performance Mon.
            </text>
            <text x="12" y="32" fontSize="8.5" fontWeight="500" fill="#64748B">
              Public Cloud APM
            </text>
          </g>
          <g transform="translate(745, 38)">
            <rect
              x="0"
              y="0"
              width="180"
              height="42"
              rx="8"
              fill="#E2E8F0"
              stroke="#94A3B8"
              strokeWidth="1.5"
            />
            <text x="12" y="18" fontSize="10.5" fontWeight="800" fill="#1E293B">
              ATM / POS Monitor
            </text>
            <text x="12" y="32" fontSize="8.5" fontWeight="500" fill="#64748B">
              Hardware Availability
            </text>
          </g>
          <g transform="translate(933, 38)">
            <rect
              x="0"
              y="0"
              width="195"
              height="42"
              rx="8"
              fill="#E2E8F0"
              stroke="#94A3B8"
              strokeWidth="1.5"
            />
            <text x="12" y="18" fontSize="10.5" fontWeight="800" fill="#1E293B">
              GitLab (EE &amp; CE) / Azure
            </text>
            <text x="12" y="32" fontSize="8.5" fontWeight="500" fill="#64748B">
              Source Code &amp; CI/CD
            </text>
          </g>
          <g transform="translate(1136, 38)">
            <rect
              x="0"
              y="0"
              width="158"
              height="42"
              rx="8"
              fill="#FEE2E2"
              stroke="#EF4444"
              strokeWidth="1.8"
            />
            <text x="12" y="18" fontSize="10" fontWeight="800" fill="#B91C1C">
              Jira [EOL Sunset]
            </text>
            <text x="12" y="32" fontSize="8.5" fontWeight="700" fill="#DC2626">
              Project Tracking
            </text>
          </g>
        </g>

        {/* ==================== TIER 7: HOSTING LOCATION & CLOUD BASE ==================== */}
        <g transform="translate(60, 1710)">
          <rect
            x="0"
            y="0"
            width="1480"
            height="65"
            rx="14"
            fill="#FEF08A"
            stroke="#FACC15"
            strokeWidth="2"
            filter="url(#shadow)"
          />
          <text
            x="740"
            y="28"
            textAnchor="middle"
            fontSize="13"
            fontWeight="800"
            fill="#854D0E"
            letterSpacing="1"
          >
            HOSTING INFRASTRUCTURE &amp; HYBRID CLOUD BASE
          </text>
          <text
            x="740"
            y="48"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="#A16207"
          >
            Primary Tier-3 On-Premise Datacenter (83 Apps) • Disaster Recovery (DR) Replication • Private Cloud (Call Center) • Authorized Public Cloud (SWIFT Alliance &amp; APM)
          </text>
        </g>

        {/* ==================== RIGHT SIDE BRACKETS ==================== */}
        <path
          d="M 1550 150 C 1565 150, 1565 225, 1575 225 C 1565 225, 1565 305, 1550 305"
          fill="none"
          stroke="#475569"
          strokeWidth="2"
        />
        <text x="1585" y="230" fontSize="12" fontWeight="700" fill="#1E293B">
          Channel Tier
        </text>

        <path
          d="M 1550 340 C 1565 340, 1565 750, 1575 750 C 1565 750, 1565 1175, 1550 1175"
          fill="none"
          stroke="#475569"
          strokeWidth="2"
        />
        <text x="1585" y="755" fontSize="12" fontWeight="700" fill="#1E293B">
          Core Processing Apps
        </text>

        <path
          d="M 1550 1210 C 1565 1210, 1565 1320, 1575 1320 C 1565 1320, 1565 1440, 1550 1440"
          fill="none"
          stroke="#475569"
          strokeWidth="2"
        />
        <text x="1585" y="1325" fontSize="12" fontWeight="700" fill="#1E293B">
          Security &amp; Analytics
        </text>

        <path
          d="M 1550 1475 C 1565 1475, 1565 1580, 1575 1580 C 1565 1580, 1565 1680, 1550 1680"
          fill="none"
          stroke="#475569"
          strokeWidth="2"
        />
        <text x="1585" y="1585" fontSize="12" fontWeight="700" fill="#1E293B">
          Platform &amp; Tools
        </text>

        {/* ==================== BOTTOM ARCHITECTURAL SUMMARY ==================== */}
        <g transform="translate(60, 1800)">
          <rect
            x="0"
            y="0"
            width="1480"
            height="210"
            rx="10"
            fill="#F8FAFC"
            stroke="#E2E8F0"
            strokeWidth="1.5"
          />
          <text
            x="25"
            y="28"
            fontSize="13"
            fontWeight="800"
            fill="#0F172A"
          >
            TOTAL INVENTORY ANALYSIS &amp; ARCHITECTURAL CATEGORIZATION BREAKDOWN
          </text>

          <text
            x="25"
            y="55"
            fontSize="11.5"
            fontWeight="600"
            fill="#334155"
          >
            1. Channels &amp; Client Touchpoints (14 Apps):{" "}
            <tspan fontWeight="400">
              Dashen Super App, Mobile Plus, Internet Banking, USSD, Digital Onboarding, SMS, ATM/POS App, CTS, Website, Amole Award, Ticket Sales, School Fee, Walia Loyalty, Call Center.
            </tspan>
          </text>

          <text
            x="25"
            y="78"
            fontSize="11.5"
            fontWeight="600"
            fill="#334155"
          >
            2. Integration &amp; Middleware Services (7 Apps):{" "}
            <tspan fontWeight="400">
              IBM Cloud Pak (ESB), IBM DataPower Gateway, IBM MQ, FlexCube CBS Web Service, Bankworld, SFTP Batch Integration, HTTP Application Web Services.
            </tspan>
          </text>

          <text
            x="25"
            y="101"
            fontSize="11.5"
            fontWeight="600"
            fill="#334155"
          >
            3. Core Transaction &amp; Business Applications (35 Apps):{" "}
            <tspan fontWeight="400">
              Flex Cube CBS V12.x, Base24-eps, EATS, ECX, SWIFT Alliance, IMT, Card Personalization, Instant Card, Merchant Terminal, Reconciliation, Settlement File, ERP, HRMS, BOCPMS, Spring Flow KYC, Credit Mgmt, Property Valuation V2/V3, Fleet, Building, Legal, Lease, Stock, LMS, Exams, Whistleblow, Shareholder, etc.
            </tspan>
          </text>

          <text
            x="25"
            y="124"
            fontSize="11.5"
            fontWeight="600"
            fill="#334155"
          >
            4. Security, IAM, Fraud &amp; Risk Analytics (19 Apps):{" "}
            <tspan fontWeight="400">
              Hardware Security Module (HSM), Imperva WAF, Imperva DAM, Keycloak (HTTPS/HTTP), Privileged Access Management (PAM), Active Directory, IBM QRadar SIEM, Vulnerability Scanner, Email Security, Kaspersky, Enterprise Fraud Monitoring, FIC, Proactive Risk, OFSAA, Oracle BI, Microsoft BI, SOAR (EOL), Risk Reg (EOL).
            </tspan>
          </text>

          <text
            x="25"
            y="147"
            fontSize="11.5"
            fontWeight="600"
            fill="#334155"
          >
            5. Runtimes, Middleware Engines &amp; Workload (6 Apps):{" "}
            <tspan fontWeight="400">
              Oracle WebLogic Suite V12.x, WebSphere Application Server, Oracle GoldenGate DB Replication, Workload Scheduler, Unified BPM Suite for Oracle, Web Center Imaging.
            </tspan>
          </text>

          <text
            x="25"
            y="170"
            fontSize="11.5"
            fontWeight="600"
            fill="#334155"
          >
            6. Observability, Infrastructure &amp; DevOps Tooling (7 Apps):{" "}
            <tspan fontWeight="400">
              F5 Big-IP Proxy, Red Hat OpenShift EFK Stack, SolarWinds, Application Performance Monitoring (APM), ATM &amp; POS Monitoring, GitLab (EE/CE), Azure DevOps, Jira (EOL).
            </tspan>
          </text>

          <text
            x="25"
            y="193"
            fontSize="11.5"
            fontWeight="700"
            fill="#B91C1C"
          >
            Governing Lifecycle Actions:{" "}
            <tspan fontWeight="400" fill="#334155">
              Decommission the 5 EOL applications (SOAR, Smart Service Desk, Ekub, Jira, Risk Reg EOL)[cite: 5] • Consolidate Property Valuation V2 to V3 (at UAT)[cite: 5] • Upgrade Private Cloud Call Center[cite: 5].
            </tspan>
          </text>
        </g>
      </svg>
    </div>
  );
};

export default ApplicationLandscape;