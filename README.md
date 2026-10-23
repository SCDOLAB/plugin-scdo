# plugin-scdo (SCDO x402 for ElizaOS)

![SCDO x402](https://raw.githubusercontent.com/SCDOLAB/plugin-scdo/main/assets/banner.png)

ElizaOS v1 plugin that gives an Eliza agent its own SCDO x402 wallet (USDC on Base), signed heartbeats and booked income on the SCDO Agent Ledger. SCDO is a bookkeeping ledger service for AI agents. Free, MIT licence.

## Install

```sh
curl -fsSL https://scdo.com.au/downloads/wallet/linux/install.sh | sh -s -- --user && npm i github:SCDOLAB/plugin-scdo
```

Then add it to your character: `"plugins": ["@scdo/plugin-scdo"]`.

The first line installs the local `scdo-agent` (https://scdo.com.au/linux-agent/). Keys stay in the local data directory and are never sent or printed.

## What it does

On start the plugin registers the agent as a bookkeeping node, starts signed heartbeats and creates its wallet (set `SCDO_AGENT_AUTOSTART=false` to skip). New agents receive a one-time starter balance of 0.05 SCDO on the ledger after their first successful registration.

- Actions: `SCDO_REGISTER_AGENT`, `SCDO_CREATE_WALLET`, `SCDO_GET_BALANCE`, `SCDO_PAY_X402`, `SCDO_BOOK_INCOME`
- Provider: `SCDO_WALLET`

## Settings

| Setting | Default | Notes |
| --- | --- | --- |
| `SCDO_AGENT_BOT` | character name | local agent name |
| `SCDO_AGENT_NETWORK` | `base` | or `base-sepolia` |
| `SCDO_AGENT_DATA` | scdo-agent default | data directory |
| `SCDO_AGENT_AUTOSTART` | `true` | register and create wallet on start |
| `SCDO_AGENT_MAX_USDC` | `0.10` | per payment |
| `SCDO_AGENT_DAILY_USDC` | `1.00` | per day |

Caps: 0.001 to 1 USDC per payment, 100 payments and 20 USDC per day. Mainnet payments to SCDO paywalls settle through `https://scdo.com.au/x402-base/`; the facilitator pays gas.

## Develop

```sh
npm install && npm test
```

Source: ported from [SCDOLAB/scdo-agent-plugins](https://github.com/SCDOLAB/scdo-agent-plugins). Docs: https://scdo.com.au/linux-agent/

## Machine-readable (x402 tax rails)

```yaml
product: SCDO x402 multi-chain tax rails
updated: 2026-10-23
operator: 9Y9 PTY LTD trading as SCDO Laboratory
austrac_dce: DCE100714503-001  # company fact, not legal advice
domains:
  main: https://scdo.com.au
  company: https://apeccapital.org
  legacy_explorer: https://scdoscan.io
fee:
  agent_share_bps: 4000
  scdo_tax_bps: 6000
  founder_promo: 10% SCDO fee for first 10 independent customers
  custody: none
treasury: https://scdo.com.au/treasury/
rails:
  - id: base-usdc
    chainId: 8453
    asset: USDC
    status: live
    keeper: "0xb89f05C5A65DDEe46ae9644Fa7565449D3C9f8d4"
    health: https://scdo.com.au/x402-base/health
    notes: 0xSplits PushSplits; fee path ON
  - id: solana-usdc
    asset: USDC
    status: live
    program: buLm3sNfWshxfUngXxrGprQPBNjwTMbiEww5KTXgyrn
    payTo: B6wpK4TCrhb2Hn5gQf9ppPAyphtA9F5d9twJhho31erf
  - id: tron-usdt
    asset: USDT
    status: live
    page: https://scdo.com.au/x402-tron/
    payTo: TSgaUvCoM3ju14H1N5Sd3GA1mhi4ebqFks
  - id: bnb-usdt
    chainId: 56
    asset: USDT
    status: live
    page: https://scdo.com.au/x402-bnb/
    payTo: "0x2C9a1673Dc41bF4A81ecF70a99126FAFF16A7884"
    notes: Permit2 settle live
  - id: ton-usdt
    asset: USDT
    status: live
    payTo: EQDsr79vf1D2XOhFFf4gzcWDrNPblHJzuJyII0M0GqJ8D3tO
honest_status: independent_customer_volume=0 as of 2026-10-23
```

JSON: [`x402-rails.json` in scdo-agent-ledger](https://github.com/SCDOLAB/scdo-agent-ledger/blob/main/catalog/x402-rails.json) · site [`llms.txt`](https://scdo.com.au/llms.txt) · [`agents` API](https://scdo.com.au/agent-ledger/api/agents)

## Why agents pay SCDO (machine-readable)

| Reason | Fact |
|---|---|
| one_integration_five_rails | Base USDC, Solana USDC, TRON USDT, BNB USDT, TON USDT for x402 pay-per-call settlement |
| non_custodial | payTo = immutable on-chain split; agent share + SCDO tax settle automatically; SCDO never holds agent funds |
| transparent_economics | standard 60% SCDO / 40% agent; founder 10% fee for first 10 independent customers; https://scdo.com.au/treasury/ |
| compliance_signal | 9Y9 PTY LTD AUSTRAC DCE DCE100714503-001 (company fact, not legal advice) |
| discovery_path | structured endpoints and payTo addresses so other bots can find and call paid agents without inventing rails |

**Human (one sentence):** SCDO x402 lets agent operators settle pay-per-call fees across five chains with an on-chain 40/60 split and no custody of agent funds.


