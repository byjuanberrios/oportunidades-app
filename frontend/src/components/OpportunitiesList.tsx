import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { OPPORTUNITY_TYPE_LABELS } from "@/lib/constants";
import {
  getOpportunities,
  getFollowedOpportunities,
  toggleFollow,
} from "@/api";

import { format } from "date-fns";

import type { OpportunitiesListProps } from "@/types";
import type { AppDispatch, RootState } from "@/store";

export const OpportunitiesList = ({
  showOnlyFollowed = false,
}: OpportunitiesListProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredList, filteredFollowedList, loading } = useSelector(
    (state: RootState) => state.opportunities
  );

  useEffect(() => {
    dispatch(getOpportunities());
    dispatch(getFollowedOpportunities());
  }, [dispatch]);

  const opportunities = showOnlyFollowed ? filteredFollowedList : filteredList;

  const handleToggleFollow = (id: number, isFollowed: boolean) => {
    dispatch(toggleFollow({ id: id.toString(), isFollowed }));
  };

  if (loading && opportunities.length === 0) {
    return <div>Cargando…</div>;
  }

  if (!loading && opportunities.length === 0) {
    return (
      <div className="border rounded-xl p-4">
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
            <TableRow>
              <TableCell colSpan={5}>
                <p className="mt-7 mb-3 text-center w-full block">
                  No hay oportunidades que coincidan con los filtros aplicados
                </p>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="border rounded-xl p-4">
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
          {opportunities.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>
                <Badge variant="outline">
                  {item.type === "tender" ? "📑" : "⚡"}{" "}
                  {OPPORTUNITY_TYPE_LABELS[item.type]}
                </Badge>
              </TableCell>
              <TableCell>
                {format(new Date(item.publish_date), "dd/MM/yyyy")}
              </TableCell>
              <TableCell>
                {format(new Date(item.close_date), "dd/MM/yyyy")}
              </TableCell>
              <TableCell>
                <Button
                  size="sm"
                  className={`cursor-pointer ${
                    item.is_followed
                      ? "bg-transparent border border-black hover:border-rose-600 text-black hover:bg-rose-600 hover:text-white"
                      : "bg-black"
                  }`}
                  onClick={() => handleToggleFollow(item.id, item.is_followed)}
                >
                  {item.is_followed ? "Ignorar" : "Seguir"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OpportunitiesList;
