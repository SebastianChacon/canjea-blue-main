# Resumen del Proyecto: Canjea Blue

Este documento proporciona una descripción general del proyecto Canjea Blue, su stack tecnológico, estructura y funcionalidad principal.

## 1. Visión General

El proyecto es una aplicación web moderna construida con React y TypeScript. Su propósito principal es permitir a los usuarios solicitar préstamos, proporcionando detalles sobre el artículo que ofrecen como garantía. La aplicación cuenta con una página de inicio (landing page) y un formulario de solicitud de préstamo. Utiliza Supabase como backend para la gestión de la base de datos y el almacenamiento de archivos.

## 2. Stack Tecnológico

- **Frontend Framework:** React 18
- **Lenguaje:** TypeScript
- **Bundler/Build Tool:** Vite
- **Estilos:** Tailwind CSS con `tailwindcss-animate`.
- **Componentes UI:** [shadcn/ui](https://ui.shadcn.com/) (evidenciado por las dependencias de Radix UI, la estructura de `src/components/ui` y la configuración de `tailwind.config.ts`).
- **Enrutamiento:** `react-router-dom`.
- **Gestión de Formularios:** `react-hook-form` con `zod` para validación de esquemas.
- **Backend as a Service (BaaS):** Supabase.
  - **Base de Datos:** PostgreSQL a través de Supabase.
  - **Almacenamiento:** Supabase Storage.
- **Gestor de Paquetes:** La presencia de `bun.lockb` indica el uso de Bun, aunque también existe un `package-lock.json`.

## 3. Estructura del Proyecto

- **`src/`**: Contiene todo el código fuente de la aplicación.
  - **`main.tsx`**: Punto de entrada de la aplicación React.
  - **`App.tsx`**: Componente raíz donde se configura el enrutamiento principal.
  - **`pages/`**: Componentes que representan las páginas completas de la aplicación.
    - `Index.tsx`: La página de inicio o landing page.
    - `LoanRequest.tsx`: La página que contiene el formulario para solicitar un préstamo.
    - `NotFound.tsx`: Página 404.
  - **`components/`**: Componentes reutilizables de React.
    - `ui/`: Componentes base de shadcn/ui.
    - `LoanRequestForm.tsx`: El formulario específico para la solicitud de préstamos.
    - Otros componentes para las secciones de la landing page (`HeroSection`, `Benefits`, etc.).
  - **`integrations/supabase/`**: Configuración de la conexión con Supabase.
    - `client.ts`: Inicializa y exporta el cliente de Supabase.
    - `types.ts`: Tipos de la base de datos generados por Supabase.
  - **`hooks/`**: Hooks personalizados de React.
  - **`lib/`**: Funciones de utilidad (`utils.ts`).
- **`public/`**: Archivos estáticos servidos directamente por el servidor.
- **`supabase/`**: Configuración para el desarrollo local con Supabase.
  - **`migrations/`**: Contiene las migraciones de la base de datos.
    - `... .sql`: Define el esquema de la tabla `loan_requests` y las políticas de seguridad de la base de datos y el almacenamiento.

## 4. Funcionalidad Principal

### 4.1. Solicitud de Préstamo

- Los usuarios pueden navegar a la ruta `/solicitar` para acceder al formulario de solicitud de préstamo.
- El formulario captura la siguiente información:
  - Nombre completo (`full_name`)
  - Número de teléfono (`phone_number`)
  - Correo electrónico (`email`)
  - Tipo de objeto (`object_type`)
  - Monto del préstamo (`loan_amount`)
  - Ubicación (`location`)
  - Imágenes (`images`)
- Las solicitudes se guardan en la tabla `loan_requests` en la base de datos de Supabase.
- Las imágenes subidas se almacenan en un bucket de Supabase Storage llamado `loan-images`.

### 4.2. Base de Datos y Almacenamiento (Supabase)

- **Tabla `loan_requests`**:
  - Almacena los datos de cada solicitud de préstamo.
  - Incluye un campo `status` (por defecto 'pending') para rastrear el estado de la solicitud.
  - La política de seguridad (RLS) está habilitada y configurada para permitir que cualquier persona inserte nuevas solicitudes sin necesidad de autenticación.
- **Bucket `loan-images`**:
  - Almacena las imágenes de los artículos.
  - Las políticas están configuradas para permitir la subida y lectura pública de imágenes.

## 5. Scripts Disponibles

- **`npm run dev`**: Inicia el servidor de desarrollo de Vite en `localhost:8080`.
- **`npm run build`**: Compila la aplicación para producción.
- **`npm run lint`**: Ejecuta ESLint para analizar el código en busca de errores y problemas de estilo.
- **`npm run preview`**: Sirve la compilación de producción localmente.
