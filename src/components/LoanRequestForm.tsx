import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { db, storage } from "@/integrations/firebase/client";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Upload, X, Loader2 } from "lucide-react";
import { Controller } from "react-hook-form";
import { sendEmailNotification } from "@/lib/email";
import { checkStorageBeforeUpload } from "@/lib/storage-usage";

const formSchema = z.object({
  fullName: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  phoneNumber: z.string().min(8, "Número de teléfono inválido"),
  email: z.string().email("Correo electrónico inválido"),
  objectType: z.string().min(1, "Selecciona un tipo de objeto"),
  loanAmount: z.string().min(1, "Ingresa la cantidad del préstamo"),
  location: z.string().min(3, "Ingresa tu ubicación"),
  images: z.array(z.custom<File>()).min(1, "Debes subir al menos una imagen"),
});

type FormData = z.infer<typeof formSchema>;

const objectTypes = [
  "Celular/Tablet",
  "Laptop/Computadora",
  "Consola de videojuegos",
  "Televisor",
  "Electrodomésticos",
  "Joyería/Relojes",
  "Instrumentos musicales",
  "Herramientas",
  "Bicicleta/Scooter",
  "Otro",
];

const MAX_FILE_SIZE_KB = 300;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_KB * 1024; // 300KB

const LoanRequestForm = () => {
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      objectType: "",
      loanAmount: "",
      location: "",
      images: [],
    },
  });

  const watchedImages = watch("images");

const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const filesArray = Array.from(files).slice(0, 5 - images.length);
    
    const newValidFiles: File[] = [];
    const newValidPreviews: string[] = [];

    // Procesar archivos sincrónicamente para máxima velocidad
    for (const file of filesArray) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        toast({
          title: "Error de archivo",
          description: `La imagen "${file.name}" excede el tamaño máximo de ${MAX_FILE_SIZE_KB}KB.`,
          variant: "destructive",
        });
        continue;
      }
      newValidFiles.push(file);
      // Crear preview instantáneo
      const preview = URL.createObjectURL(file);
      newValidPreviews.push(preview);
    }

    // Actualizar estado inmediatamente
    setImages((prev) => [...prev, ...newValidFiles]);
    setImagePreviews((prev) => [...prev, ...newValidPreviews]);
    
    // Actualizar formulario con las imágenes
    setValue("images", [...images, ...newValidFiles]);
    
    // Verificar storage en background (no bloquea UI)
    checkStorageBeforeUpload(filesArray).then(storageCheck => {
      if (!storageCheck.canUpload) {
        // Remover las imágenes si no hay espacio
        setImages((prev) => prev.slice(0, -newValidFiles.length));
        setImagePreviews((prev) => prev.slice(0, -newValidPreviews.length));
      }
    });
  };

const removeImage = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index]);
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreviews(newPreviews);
    setValue("images", newImages);
  };

const uploadImages = async (): Promise<string[]> => {
    if (images.length === 0) return [];

    // Verificar límite de almacenamiento antes de subir
    const storageCheck = await checkStorageBeforeUpload(images);
    if (!storageCheck.canUpload) {
      return []; // Retornar vacío si no hay espacio
    }

    const uploadedUrls: string[] = [];

    for (const file of images) {
      try {
        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(7)}-${file.name}`;
        const imageRef = ref(storage, `loan-images/${fileName}`);
        await uploadBytes(imageRef, file);
        const downloadURL = await getDownloadURL(imageRef);
        uploadedUrls.push(downloadURL);
      } catch (error) {
        console.error("Error uploading image:", error);
        // Continuar con las demás imágenes si una falla
      }
    }

    return uploadedUrls;
  };

  const onSubmit = async (data: FormData) => {
    // Validación adicional
    if (!data.objectType) {
      toast({
        title: "Error",
        description: "Por favor selecciona un tipo de objeto",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Subir imágenes
      const imageUrls = await uploadImages();

      // Preparar datos para Firebase
      const loanData = {
        full_name: data.fullName,
        phone_number: data.phoneNumber,
        email: data.email,
        object_type: data.objectType,
        loan_amount: parseFloat(data.loanAmount),
        location: data.location,
        images: imageUrls,
        status: "pending",
        created_at: serverTimestamp(),
      };

// Guardar en Firestore
      const docRef = await addDoc(collection(db, "loan_requests"), loanData);

      // Enviar email de notificación
      try {
        await sendEmailNotification({
          fullName: data.fullName,
          phoneNumber: data.phoneNumber,
          email: data.email,
          objectType: data.objectType,
          loanAmount: data.loanAmount,
          location: data.location,
          images: imageUrls,
        });
      } catch (emailError) {
        console.error("Error al enviar email:", emailError);
        // No fallamos el proceso si el email no se envía, solo lo registramos
      }

      toast({
        title: "¡Solicitud enviada!",
        description: `Tu solicitud ha sido registrada exitosamente. ID: ${docRef.id}`,
      });

      // Limpiar formulario
      reset();
      setImages([]);
      setImagePreviews([]);
      
    } catch (error) {
      console.error("Error al enviar solicitud:", error);

      let errorMessage = "Hubo un problema al enviar tu solicitud.";

      if (error.code === "permission-denied") {
        errorMessage = "Permisos denegados. Verifica las reglas de seguridad de Firebase.";
      } else if (error.code === "unavailable") {
        errorMessage = "Servicio no disponible. Verifica tu conexión a internet.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Nombre completo</Label>
          <Input
            id="fullName"
            placeholder="Juan Pérez"
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="text-sm text-destructive">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Número de contacto</Label>
          <Input
            id="phoneNumber"
            placeholder="09 00000000"
            {...register("phoneNumber")}
          />
          {errors.phoneNumber && (
            <p className="text-sm text-destructive">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            type="email"
            placeholder="juan@ejemplo.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="objectType">Tipo de objeto</Label>
          <Controller
            name="objectType"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una opción" />
                </SelectTrigger>

                <SelectContent>
                  {objectTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          {errors.objectType && (
            <p className="text-sm text-destructive">
              {errors.objectType.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="loanAmount">Cantidad del préstamo ($)</Label>
          <Input
            id="loanAmount"
            type="number"
            step="0.01"
            placeholder="5000"
            {...register("loanAmount")}
          />
          {errors.loanAmount && (
            <p className="text-sm text-destructive">
              {errors.loanAmount.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Ubicación</Label>
          <Input
            id="location"
            placeholder="Cuenca, Azuay"
            {...register("location")}
          />
          {errors.location && (
            <p className="text-sm text-destructive">
              {errors.location.message}
            </p>
          )}
        </div>
      </div>

<div className="space-y-2">
        <Label>Imágenes del artículo (máximo 5, mínimo 1 obligatoria)*</Label>
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
            disabled={images.length >= 5}
          />
<label
            htmlFor="image-upload"
            className={`cursor-pointer flex flex-col items-center gap-2 ${
              images.length >= 5 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Upload className="h-10 w-10 text-muted-foreground" />
            <span className="text-muted-foreground">
              {images.length >= 5
                ? "Máximo de imágenes alcanzado"
                : "Haz clic o arrastra para subir imágenes"}
            </span>
            <span className="text-xs text-muted-foreground">
              {images.length}/5 imágenes (máximo {MAX_FILE_SIZE_KB}KB cada una) - Mínimo 1 requerida
            </span>
          </label>
        </div>

{imagePreviews.length > 0 && (
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-4">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
        
        {errors.images && (
          <p className="text-sm text-destructive mt-2">
            {errors.images.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          "Enviar solicitud"
        )}
      </Button>
    </form>
  );
};

export default LoanRequestForm;