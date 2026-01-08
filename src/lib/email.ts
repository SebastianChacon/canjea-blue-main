import emailjs from '@emailjs/browser';

// Configuración de EmailJS
const EMAILJS_PUBLIC_KEY = 'NlyZ1R1vp97e_oySX';
const EMAILJS_SERVICE_ID = 'service_bvtr4a7';
const EMAILJS_TEMPLATE_ID = 'template_vvl3mac';

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
    throw new Error('No se pudo enviar la notificación por email');
  }
};

// Función para inicializar EmailJS (llamarla al inicio de la app)
export const initEmailJS = () => {
  emailjs.init(EMAILJS_PUBLIC_KEY);
};