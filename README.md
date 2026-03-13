# Canjea

Plataforma web para solicitudes de préstamos, con autenticación de usuarios y gestión de solicitudes para administradores.

**Sitio en producción:** [canjea.online](https://canjea.online)

---

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **UI:** shadcn/ui, Tailwind CSS, Radix UI
- **Backend / DB:** Firebase (Auth + Firestore)
- **Email:** EmailJS
- **Deploy:** Vercel

---

## Desarrollo local

### Requisitos

- Node.js 18+
- npm

### Instalación

```bash
git clone https://github.com/SebastianChacon/canjea-blue-main.git
cd canjea-blue-main
npm install
```

### Variables de entorno

Copia `.env.example` y rellena con tus credenciales:

```bash
cp .env.example .env
```

| Variable | Descripción |
|---|---|
| `VITE_FIREBASE_API_KEY` | API Key del proyecto Firebase |
| `VITE_FIREBASE_AUTH_DOMAIN` | Auth Domain de Firebase |
| `VITE_FIREBASE_PROJECT_ID` | Project ID de Firebase |
| `VITE_FIREBASE_STORAGE_BUCKET` | Storage Bucket de Firebase |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Messaging Sender ID de Firebase |
| `VITE_FIREBASE_APP_ID` | App ID de Firebase |
| `VITE_EMAILJS_PUBLIC_KEY` | Public Key de EmailJS |
| `VITE_EMAILJS_SERVICE_ID` | Service ID de EmailJS |
| `VITE_EMAILJS_TEMPLATE_ID` | Template ID de EmailJS |

### Scripts

```bash
npm run dev        # Servidor de desarrollo (localhost:5173)
npm run build      # Build de producción
npm run preview    # Preview del build localmente
npm run lint       # Linter
```

---

## Deploy en Vercel

1. Importa el repositorio en [vercel.com](https://vercel.com)
2. Agrega todas las variables de entorno del `.env.example` en **Settings → Environment Variables**
3. Vercel hará el deploy automáticamente en cada push a `main`

> Las variables de entorno **nunca** deben subirse al repositorio. El archivo `.env` está en `.gitignore`.

---

## Estructura del proyecto

```
src/
├── components/       # Componentes reutilizables (Header, Footer, HeroSection, etc.)
├── pages/            # Páginas principales (Index, SignIn, LoanRequest, AdminRequests)
├── integrations/     # Configuración de Firebase
├── hooks/            # Custom hooks
└── lib/              # Utilidades
```

---

## Funcionalidades

- Autenticación de usuarios con Firebase Auth
- Formulario de solicitud de préstamo con notificación por email (EmailJS)
- Panel de administración para gestionar solicitudes
- Rutas protegidas para usuarios autenticados y administradores
