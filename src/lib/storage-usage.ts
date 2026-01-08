import { ref, listAll, getMetadata } from "firebase/storage";
import { storage } from "@/integrations/firebase/client";

const MAX_STORAGE_BYTES = 1 * 1024 * 1024 * 1024; // 1GB

export const checkStorageUsage = async (): Promise<{ used: number; available: number; isFull: boolean }> => {
  try {
    const storageRef = ref(storage, 'loan-images/');
    const result = await listAll(storageRef);
    
    let totalSize = 0;
    
    // Calcular tamaño total de todos los archivos
    for (const itemRef of result.items) {
      const metadata = await getMetadata(itemRef);
      totalSize += metadata.size;
    }
    
    const available = MAX_STORAGE_BYTES - totalSize;
    
    return {
      used: totalSize,
      available,
      isFull: totalSize >= MAX_STORAGE_BYTES
    };
  } catch (error) {
    console.error('Error checking storage usage:', error);
    // Si hay error, asumir que hay espacio disponible
    return {
      used: 0,
      available: MAX_STORAGE_BYTES,
      isFull: false
    };
  }
};

export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const checkStorageBeforeUpload = async (filesToUpload: File[]): Promise<{ canUpload: boolean; message: string }> => {
  const storage = await checkStorageUsage();
  const totalUploadSize = filesToUpload.reduce((total, file) => total + file.size, 0);
  
  if (storage.isFull) {
    return {
      canUpload: false,
      message: `Almacenamiento lleno. Espacio utilizado: ${formatBytes(storage.used)} / ${formatBytes(MAX_STORAGE_BYTES)}`
    };
  }
  
  if (totalUploadSize > storage.available) {
    return {
      canUpload: false,
      message: `Espacio insuficiente. Disponible: ${formatBytes(storage.available)}, Necesario: ${formatBytes(totalUploadSize)}`
    };
  }
  
  return {
    canUpload: true,
    message: `Espacio disponible: ${formatBytes(storage.available)}`
  };
};