# Static IP Reverse Proxy for Vercel / Next.js

A lightweight Node.js reverse proxy built with Express and `http-proxy-middleware`. It secures incoming requests using JSON Web Tokens (JWT) and forwards them to a dedicated backend server.

## Why This Project Exists (The Problem)

When deploying Next.js applications on platforms like Vercel, requests to your backend originate from a vast, dynamic pool of changing IP addresses. 

Forcing your backend server to constantly negotiate new SSL/TLS handshakes and manage connections with hundreds of random Vercel IPs puts a heavy, unnecessary load on your backend's CPU and network resources.

## The Solution

By deploying this proxy on a hosting provider that offers a **Static IP** (such as AWS EC2, DigitalOcean, or Render), you can:

1. **Reduce Backend CPU/SSL Load:** Your backend only has to maintain connections with a single, predictable proxy IP, drastically cutting down on SSL handshake overhead.
2. **IP Whitelisting:** You can safely configure your backend firewall to *only* accept traffic from this proxy's static IP.
3. **Layered Security:** It acts as a gatekeeper, validating JWT tokens from the Next.js frontend before the request ever touches your core backend infrastructure.

---

## Features

- **JWT Authentication:** Automatically intercepts incoming requests, verifies the `Authorization` bearer token, and blocks unauthorized traffic.
- **Dynamic Proxying:** Forwarding rules seamlessly pass headers and payloads to your target backend.
- **Debug Logging:** Built-in debug logs to easily monitor proxy traffic and routing.

---

## Environment Variables

To run this proxy, you need to configure the following environment variables:

| Variable | Description |
| :--- | :--- |
| `JWT_SECRET` | The secret key used to verify incoming JSON Web Tokens from your Next.js app. |
| `TARGET_URL` | The absolute URL of your destination backend server (e.g., `https://api.yourbackend.com`). |

---
