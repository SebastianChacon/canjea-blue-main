import emailjs from '@emailjs/browser';

// Configuración de EmailJS desde variables de entorno
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

interface EmailData {
  fullName: string;
  phoneNumber: string;
  email: string;
  objectType: string;
  loanAmount: string;
  location: string;
  images?: string[];
}

export const sendEmailNotification = async (data: EmailData): Promise<void> => {
  try {
    // Verificar que las variables de entorno estén configuradas
    if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
      console.error('Variables de entorno de EmailJS no configuradas');
      return; // Silenciosamente continuar sin enviar email
    }

    const templateParams = {
      to_email: 'canjeaecuador@outlook.com',
      from_name: data.fullName,
      from_email: data.email,
      phone_number: data.phoneNumber,
      object_type: data.objectType,
      loan_amount: data.loanAmount,
      location: data.location,
      images_count: data.images?.length || 0,
      reply_to: data.email,
    };

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log('Email enviado exitosamente');
  } catch (error) {
    console.error('Error al enviar email:', error);
    // No lanzar error para no detener el proceso
    // El usuario no notificará el fallo del email
  }
};

// Función para inicializar EmailJS (llamarla al inicio de la app)
export const initEmailJS = () => {
  emailjs.init(EMAILJS_PUBLIC_KEY);
};