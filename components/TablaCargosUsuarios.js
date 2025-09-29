'use client'

import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Edit, Trash2, UserPlus } from 'lucide-react'

export default function TablaCargosUsuarios({ 
  cargosUsuarios = [], 
  onEdit, 
  onDelete, 
  onNew, 
  isLoading = false 
}) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <p>Cargando asignaciones...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Asignaciones de Cargos</CardTitle>
            <CardDescription>
              Gestiona los cargos asignados a los usuarios
            </CardDescription>
          </div>
          <Button onClick={onNew} className="flex items-center gap-2">
            <UserPlus className="h-4 w-4"/>
            Asignar Cargo
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {cargosUsuarios.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No hay asignaciones de cargos registradas</p>
            <Button onClick={onNew} className="mt-4">
              Crear primera asignación
            </Button>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Salario</TableHead>
                  <TableHead>Fecha Inicio</TableHead>
                  <TableHead>Horario</TableHead>
                  <TableHead className="w-[100px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cargosUsuarios.map((asignacion) => (
                  <TableRow key={asignacion.id}>
                    <TableCell className="font-medium">
                      {asignacion.usuarios?.nombre || 'Usuario no encontrado'}
                    </TableCell>
                    <TableCell>
                      {asignacion.cargos?.cargo || 'Cargo no encontrado'}
                    </TableCell>
                    <TableCell>
                      {asignacion.salario ? `$${asignacion.salario}` : 'No asignado'}
                    </TableCell>
                    <TableCell>{asignacion.fecha_inicio || 'No asignada'}</TableCell>
                    <TableCell>
                      {asignacion.hora_ingreso && asignacion.hora_salida 
                        ? `${asignacion.hora_ingreso} - ${asignacion.hora_salida}`
                        : 'No asignado'
                      }
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(asignacion)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDelete(asignacion)}
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