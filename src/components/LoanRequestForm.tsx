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
import { supabase } from "@/integrations/supabase/client";
import { Upload, X, Loader2 } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  phoneNumber: z.string().min(8, "Número de teléfono inválido"),
  email: z.string().email("Correo electrónico inválido"),
  objectType: z.string().min(1, "Selecciona un tipo de objeto"),
  loanAmount: z.string().min(1, "Ingresa la cantidad del préstamo"),
  location: z.string().min(3, "Ingresa tu ubicación"),
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

const LoanRequestForm = () => {
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files).slice(0, 5 - images.length);
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...newFiles]);
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async (): Promise<string[]> => {
    const uploadedUrls: string[] = [];

    for (const file of images) {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from("loan-images")
        .upload(fileName, file);

      if (error) {
        console.error("Error uploading image:", error);
        continue;
      }

      const { data: urlData } = supabase.storage
        .from("loan-images")
        .getPublicUrl(data.path);

      uploadedUrls.push(urlData.publicUrl);
    }

    return uploadedUrls;
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const imageUrls = await uploadImages();

      const { error } = await supabase.from("loan_requests").insert({
        full_name: data.fullName,
        phone_number: data.phoneNumber,
        email: data.email,
        object_type: data.objectType,
        loan_amount: parseFloat(data.loanAmount),
        location: data.location,
        images: imageUrls,
      });

      if (error) throw error;

      toast({
        title: "Solicitud enviada",
        description: "Nos pondremos en contacto contigo pronto.",
      });

      reset();
      setImages([]);
      setImagePreviews([]);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu solicitud. Intenta de nuevo.",
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
            <p className="text-sm text-destructive">{errors.fullName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Número de contacto</Label>
          <Input
            id="phoneNumber"
            placeholder="+52 555 123 4567"
            {...register("phoneNumber")}
          />
          {errors.phoneNumber && (
            <p className="text-sm text-destructive">{errors.phoneNumber.message}</p>
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
          <Select onValueChange={(value) => setValue("objectType", value)}>
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
          {errors.objectType && (
            <p className="text-sm text-destructive">{errors.objectType.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="loanAmount">Cantidad del préstamo (MXN)</Label>
          <Input
            id="loanAmount"
            type="number"
            placeholder="5000"
            {...register("loanAmount")}
          />
          {errors.loanAmount && (
            <p className="text-sm text-destructive">{errors.loanAmount.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Ubicación</Label>
          <Input
            id="location"
            placeholder="Ciudad de México, CDMX"
            {...register("location")}
          />
          {errors.location && (
            <p className="text-sm text-destructive">{errors.location.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Imágenes del artículo (máximo 5)</Label>
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
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
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
