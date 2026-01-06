import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/integrations/firebase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

interface LoanRequest {
  id: string;
  full_name: string;
  email: string;
  object_type: string;
  loan_amount: number;
  phone_number: string;
  location: string;
  status: string;
  created_at: { seconds: number; nanoseconds: number };
  images?: string[];
}

const AdminRequests = () => {
  const [requests, setRequests] = useState<LoanRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      setIsLoading(true);
      try {
        const requestsCollection = collection(db, "loan_requests");
        const q = query(requestsCollection, orderBy("created_at", "desc"));
        const querySnapshot = await getDocs(q);
        const requestsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<LoanRequest, "id">),
        }));
        setRequests(requestsData);
        setError(null);
      } catch (err) {
        console.error("Error fetching loan requests:", err);
        setError(
          "No se pudieron cargar las solicitudes. Verifica los permisos de lectura en las reglas de seguridad de Firestore."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const formatDate = (timestamp: { seconds: number; nanoseconds: number }) => {
    if (!timestamp) return "Fecha no disponible";
    const date = new Date(
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
    );
    return format(date, "dd/MM/yyyy, HH:mm");
  };

  const renderSkeletons = () =>
    Array(5)
      .fill(0)
      .map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="h-4 w-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-full" />
          </TableCell>
        </TableRow>
      ));

    console.log("Rendered AdminRequests with", requests.length, requests);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Solicitudes de Préstamo</h1>
      {error && <p className="text-destructive mb-4">{error}</p>}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Nombre Completo</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Numero de teléfono</TableHead>
              <TableHead>Objeto</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Ubicación</TableHead>
              <TableHead>Imágenes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              renderSkeletons()
            ) : requests.length > 0 ? (
              requests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell>{formatDate(req.created_at)}</TableCell>
                  <TableCell>{req.full_name}</TableCell>
                  <TableCell>{req.email}</TableCell>
                  <TableCell>{req.phone_number}</TableCell>
                  <TableCell>{req.object_type}</TableCell>
                  <TableCell>${req.loan_amount.toLocaleString()}</TableCell>
                  <TableCell>{req.location}</TableCell>
                  <TableCell>
                    {req.images.map((url, index) => (
                      <div key={index}>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          Link {index + 1}
                        </a>
                      </div>
                    ))}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No hay solicitudes para mostrar.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminRequests;
