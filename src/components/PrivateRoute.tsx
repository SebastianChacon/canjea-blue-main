import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/NotFound";
import { Skeleton } from "@/components/ui/skeleton";

interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    // You can show a loading spinner here
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Skeleton className="w-64 h-8" />
      </div>
    );
  }

  if (!user) {
    return <NotFound />;
  }

  return children;
};

export default PrivateRoute;
