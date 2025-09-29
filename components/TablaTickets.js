'use client'

import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Edit, Trash2, Plus } from 'lucide-react'

export default function TablaTickets({ tickets, onEdit, onDelete, onNew, isLoading = false }) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <p>Cargando tickets...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Lista de Tickets</CardTitle>
            <CardDescription>
              Gestiona todos los tickets del sistema
            </CardDescription>
          </div>
          <Button onClick={onNew} className="flex items-center gap-2">
            <Plus className="h-4 w-4"/>
            Nuevo Ticket
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {tickets.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No hay tickets registrados</p>
            <Button onClick={onNew} className="mt-4">
              Crear primer ticket
            </Button>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Hora</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="w-[100px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell>
                      {ticket.usuarios?.nombre || `Usuario ID: ${ticket.id_usuario}`}
                    </TableCell>
                    <TableCell>{ticket.fecha}</TableCell>
                    <TableCell>{ticket.hora}</TableCell>
                    <TableCell className="capitalize">{ticket.tipo}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(ticket)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDelete(ticket)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4"/>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}