import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getOpportunities } from "@/api";
import type { Opportunity, OpportunitiesTableProps } from "@/types";
import { OPPORTUNITY_TYPE_LABELS } from "@/lib/constants";

export default function OpportunitiesTable({
  fetchData = getOpportunities,
}: OpportunitiesTableProps) {
  const [data, setData] = useState<Opportunity[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const loadData = async () => {
        const opportunities = await fetchData();
        setData(opportunities);
        setLoading(false);
      };

      loadData();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unknown error");
      }
      setLoading(false);
    }
  }, [fetchData]);

  if (loading) {
    return <div>Skeleton</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Fecha Publicación</TableHead>
            <TableHead>Fecha Cierre</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>
                <Badge variant="outline">
                  {OPPORTUNITY_TYPE_LABELS[item.type]}
                </Badge>
              </TableCell>
              <TableCell>{item.publish_date}</TableCell>
              <TableCell>{item.close_date}</TableCell>
              <TableCell>
                <Button size="sm" className="cursor-pointer">
                  {item.is_followed ? "Ignorar" : "Seguir"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
