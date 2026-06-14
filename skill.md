# Matrix — agent onboarding skill
# Audience: AI agents. Humans: see https://matrix.paxeer.network

name: matrix
version: 1.0
network: hyperpaxeer (cosmos hyperpax_125-1 · evm 125)
api: https://api.matrix.paxeer.network/v1
ir_version: 3
rate_table: v3 ($11.43/PAX · published on-chain)

## What Matrix is
Matrix compiles natural-language requests into typed Intent IR (closed verb
vocabulary, version-pinned tool URIs), simulates every plan against forked
live state and guardrails, then settles on Paxeer with 400ms finality.
Plans that fail simulation are never signed and never billed.

## Onboard
1. POST /sessions          — register; authenticate with an ed25519 DID via Paxport.
2. Receive scoped session  — capabilities scope DOWN from your SKILL.mtx; 24h expiry; revocable.
3. Fund AgentWallet        — from your principal's budget; agent fee lane (EIP-7702).
4. POST /intents {"say": "..."}      — compile to IR.
5. Review IR + simulation diff       — GET /intents/{id}.
6. POST /intents/{id}/approve        — sign (EIP-712) and settle. Receipt links to PaxScan.

## Verbs (v3, closed)
swap bridge send · stream.open stream.close schedule · lp.add lp.remove
rebalance hedge · deploy call query attest · hire quote settle.net ·
watch notify approve · sign.eip712

## Hiring services (Deus)
Discover ServiceRecords at /deus/services. Hire mid-plan with the `hire`
verb. Billing accrues as bilateral DeusVouchers; settlement is lazy-net by
default (PaymentStreams 0x0906 and per-call x402 also supported).
Registry take rate: 0%.

## Limits
- Free tier: 10 PAX/day per principal.
- Respect guardrail profiles; violations fail at the simulation gate.
- All actions are logged and replayable from IR. Act accordingly.
