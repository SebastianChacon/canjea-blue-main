import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "@/integrations/firebase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";

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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState<LoanRequest | null>(null);

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

  const handleDeleteRequest = async () => {
    if (!requestToDelete) return;
    
    try {
      await deleteDoc(doc(db, "loan_requests", requestToDelete.id));
      setRequests(requests.filter(req => req.id !== requestToDelete.id));
      setDeleteDialogOpen(false);
      setRequestToDelete(null);
    } catch (err) {
      console.error("Error deleting request:", err);
      setError("No se pudo eliminar la solicitud.");
    }
  };

  const handleStatusChange = async (requestId: string, newStatus: string) => {
    try {
      const requestRef = doc(db, "loan_requests", requestId);
      await updateDoc(requestRef, { status: newStatus });
      setRequests(requests.map(req => 
        req.id === requestId ? { ...req, status: newStatus } : req
      ));
    } catch (err) {
      console.error("Error updating status:", err);
      setError("No se pudo actualizar el estado.");
    }
  };

  const openDeleteDialog = (request: LoanRequest) => {
    setRequestToDelete(request);
    setDeleteDialogOpen(true);
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
              <TableHead>Estado</TableHead>
              <TableHead>Imágenes</TableHead>
              <TableHead>Acciones</TableHead>
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
                    <Select
                      value={req.status}
                      onValueChange={(value) => handleStatusChange(req.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pendiente</SelectItem>
                        <SelectItem value="aceptado">Aceptado</SelectItem>
                        <SelectItem value="rechazado">Rechazado</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {req.images?.map((url, index) => (
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
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => openDeleteDialog(req)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
<TableRow>
                <TableCell colSpan={10} className="text-center">
                  No hay solicitudes para mostrar.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
</Table>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Estás seguro?</DialogTitle>
            <DialogDescription>
              ¿Estás seguro que quieres eliminar esta fila {requestToDelete?.full_name}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteRequest}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminRequests;
