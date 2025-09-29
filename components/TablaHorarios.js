'use client'

import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Edit, Trash2, Plus } from 'lucide-react'

export default function TablaHorarios({ horarios, onEdit, onDelete, onNew, isLoading = false }) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <p>Cargando horarios...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Lista de Horarios</CardTitle>
            <CardDescription>
              Gestiona todos los horarios del sistema
            </CardDescription>
          </div>
          <Button onClick={onNew} className="flex items-center gap-2">
            <Plus className="h-4 w-4"/>
            Nuevo Horario
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {horarios.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No hay horarios registrados</p>
            <Button onClick={onNew} className="mt-4">
              Crear primer horario
            </Button>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hora de Ingreso</TableHead>
                  <TableHead>Hora de Salida</TableHead>
                  <TableHead className="w-[100px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {horarios.map((horario) => (
                  <TableRow key={horario.id}>
                    <TableCell>{horario.hora_ingreso}</TableCell>
                    <TableCell>{horario.hora_salida}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(horario)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDelete(horario)}
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