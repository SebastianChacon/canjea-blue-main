# Configuración de EmailJS

Para que la funcionalidad de email funcione, necesitas configurar EmailJS con los siguientes pasos:

## 1. Crear cuenta en EmailJS
1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Regístrate y crea una cuenta gratuita

## 2. Configurar un servicio de email
1. En tu dashboard de EmailJS, ve a "Email Services"
2. Conecta tu servicio de email (Gmail, Outlook, etc.)
3. Anota el **Service ID** que se genera

## 3. Crear una plantilla de email
1. Ve a "Email Templates"
2. Crea una nueva plantilla con el siguiente contenido:

**Asunto:** Nueva Solicitud de Préstamo - {{from_name}}

**Contenido:**
```
Hola, has recibido una nueva solicitud de préstamo:

📋 Datos del solicitante:
• Nombre: {{from_name}}
• Email: {{from_email}}
• Teléfono: {{phone_number}}

📦 Detalles del préstamo:
• Tipo de objeto: {{object_type}}
• Cantidad solicitada: ${{loan_amount}}
• Ubicación: {{location}}
• Número de imágenes: {{images_count}}

📧 Responder a: {{reply_to}}
```

3. Anota el **Template ID** que se genera

## 4. Obtener tu Public Key
1. Ve a "Account" en tu dashboard de EmailJS
2. Copia tu **Public Key**

## 5. Configurar el proyecto
Reemplaza los siguientes valores en `src/lib/email.ts`:

```typescript
const EMAILJS_PUBLIC_KEY = 'TU_PUBLIC_KEY_AQUI';
const EMAILJS_SERVICE_ID = 'TU_SERVICE_ID_AQUI';
const EMAILJS_TEMPLATE_ID = 'TU_TEMPLATE_ID_AQUI';
```

## 6. Probar la funcionalidad
Una vez configurados los valores, ejecuta:
```bash
npm run dev
```

Y prueba enviando el formulario. Deberías recibir un email en xdmateo90@gmail.com con toda la información del formulario.