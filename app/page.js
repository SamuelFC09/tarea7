'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import TablaUsuarios from '@/components/TablaUsuarios'
import TablaCargos from '@/components/TablaCargos'
import TablaHorarios from '@/components/TablaHorarios'
import TablaTickets from '@/components/TablaTickets'
import TablaCargosUsuarios from '@/components/TablaCargosUsuarios'
import FormularioUsuario from '@/components/FormularioUsuario'
import FormularioCargo from '@/components/FormularioCargo'
import FormularioHorario from '@/components/FormularioHorario'
import FormularioTicket from '@/components/FormularioTicket'
import FormularioCargoUsuario from '@/components/FormularioCargoUsuario'
import DialogoConfirmacion from '@/components/DialogoConfirmacion'
import {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
} from '@/lib/usuarios'
import {
  obtenerCargos,
  crearCargo,
  actualizarCargo,
  eliminarCargo
} from '@/lib/cargos'
import {
  obtenerHorarios,
  crearHorario,
  actualizarHorario,
  eliminarHorario
} from '@/lib/horarios'
import {
  obtenerTickets,
  crearTicket,
  actualizarTicket,
  eliminarTicket
} from '@/lib/tickets'
import {
  obtenerCargosUsuarios,
  asignarCargoUsuario,
  actualizarCargoUsuario,
  eliminarCargoUsuario,
  obtenerUsuariosSinCargo
} from '@/lib/cargos_usuarios'

export default function HomePage() {
  // Estados para datos
  const [usuarios, setUsuarios] = useState([])
  const [cargos, setCargos] = useState([])
  const [horarios, setHorarios] = useState([])
  const [tickets, setTickets] = useState([])
  const [cargosUsuarios, setCargosUsuarios] = useState([])
  const [usuariosSinCargo, setUsuariosSinCargo] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Estados para modales y acciones
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState('usuarios')

  // Estados para modales de formulario
  const [modalFormulario, setModalFormulario] = useState(false)
  const [modalConfirmacion, setModalConfirmacion] = useState(false)
  
  // Estados para elementos en edición/eliminación
  const [usuarioEditando, setUsuarioEditando] = useState(null)
  const [cargoEditando, setCargoEditando] = useState(null)
  const [horarioEditando, setHorarioEditando] = useState(null)
  const [ticketEditando, setTicketEditando] = useState(null)
  const [cargoUsuarioEditando, setCargoUsuarioEditando] = useState(null)
  
  const [elementoEliminando, setElementoEliminando] = useState(null)
  const [tipoEliminando, setTipoEliminando] = useState('')

  // Cargar datos al montar el componente
  useEffect(() => {
    cargarTodosLosDatos()
  }, [])

  const cargarTodosLosDatos = async () => {
    setIsLoading(true)
    await Promise.all([
      cargarUsuarios(),
      cargarCargos(),
      cargarHorarios(),
      cargarTickets(),
      cargarCargosUsuarios(),
      cargarUsuariosSinCargo()
    ])
    setIsLoading(false)
  }

  const cargarUsuarios = async () => {
    const { data, error } = await obtenerUsuarios()
    if (error) {
      toast.error('Error al cargar usuarios: ' + error)
    } else {
      setUsuarios(data || [])
    }
  }

  const cargarCargos = async () => {
    const { data, error } = await obtenerCargos()
    if (error) {
      toast.error('Error al cargar cargos: ' + error)
    } else {
      setCargos(data || [])
    }
  }

  const cargarHorarios = async () => {
    const { data, error } = await obtenerHorarios()
    if (error) {
      toast.error('Error al cargar horarios: ' + error)
    } else {
      setHorarios(data || [])
    }
  }

  const cargarTickets = async () => {
    const { data, error } = await obtenerTickets()
    if (error) {
      toast.error('Error al cargar tickets: ' + error)
    } else {
      setTickets(data || [])
    }
  }

  const cargarCargosUsuarios = async () => {
    const { data, error } = await obtenerCargosUsuarios()
    if (error) {
      toast.error('Error al cargar asignaciones: ' + error)
    } else {
      setCargosUsuarios(data || [])
    }
  }

  const cargarUsuariosSinCargo = async () => {
    const { data, error } = await obtenerUsuariosSinCargo()
    if (error) {
      console.error('Error cargando usuarios sin cargo:', error)
      setUsuariosSinCargo([])
    } else {
      setUsuariosSinCargo(data || [])
    }
  }

  // Handlers para nuevos elementos
  const handleNuevoUsuario = () => {
    setUsuarioEditando(null)
    setActiveTab('usuarios')
    setModalFormulario(true)
  }

  const handleNuevoCargo = () => {
    setCargoEditando(null)
    setActiveTab('cargos')
    setModalFormulario(true)
  }

  const handleNuevoHorario = () => {
    setHorarioEditando(null)
    setActiveTab('horarios')
    setModalFormulario(true)
  }

  const handleNuevoTicket = () => {
    setTicketEditando(null)
    setActiveTab('tickets')
    setModalFormulario(true)
  }

  const handleNuevaAsignacion = () => {
    setCargoUsuarioEditando(null)
    setActiveTab('asignaciones')
    setModalFormulario(true)
  }

  // Handlers para editar elementos
  const handleEditarUsuario = (usuario) => {
    setUsuarioEditando(usuario)
    setActiveTab('usuarios')
    setModalFormulario(true)
  }

  const handleEditarCargo = (cargo) => {
    setCargoEditando(cargo)
    setActiveTab('cargos')
    setModalFormulario(true)
  }

  const handleEditarHorario = (horario) => {
    setHorarioEditando(horario)
    setActiveTab('horarios')
    setModalFormulario(true)
  }

  const handleEditarTicket = (ticket) => {
    setTicketEditando(ticket)
    setActiveTab('tickets')
    setModalFormulario(true)
  }

  const handleEditarAsignacion = (asignacion) => {
    setCargoUsuarioEditando(asignacion)
    setActiveTab('asignaciones')
    setModalFormulario(true)
  }

  // Handlers para eliminar elementos
  const handleEliminarUsuario = (usuario) => {
    setElementoEliminando(usuario)
    setTipoEliminando('usuario')
    setModalConfirmacion(true)
  }

  const handleEliminarCargo = (cargo) => {
    setElementoEliminando(cargo)
    setTipoEliminando('cargo')
    setModalConfirmacion(true)
  }

  const handleEliminarHorario = (horario) => {
    setElementoEliminando(horario)
    setTipoEliminando('horario')
    setModalConfirmacion(true)
  }

  const handleEliminarTicket = (ticket) => {
    setElementoEliminando(ticket)
    setTipoEliminando('ticket')
    setModalConfirmacion(true)
  }

  const handleEliminarAsignacion = (asignacion) => {
    setElementoEliminando(asignacion)
    setTipoEliminando('asignacion')
    setModalConfirmacion(true)
  }

  // Handlers para enviar formularios
  const handleSubmitFormulario = async (datos) => {
    setIsSubmitting(true)
    let result

    try {
      switch (activeTab) {
        case 'usuarios':
          if (usuarioEditando) {
            result = await actualizarUsuario(usuarioEditando.id, datos)
          } else {
            result = await crearUsuario(datos)
          }
          break
        case 'cargos':
          if (cargoEditando) {
            result = await actualizarCargo(cargoEditando.id, datos)
          } else {
            result = await crearCargo(datos)
          }
          break
        case 'horarios':
          if (horarioEditando) {
            result = await actualizarHorario(horarioEditando.id, datos)
          } else {
            result = await crearHorario(datos)
          }
          break
        case 'tickets':
          if (ticketEditando) {
            result = await actualizarTicket(ticketEditando.id, datos)
          } else {
            result = await crearTicket(datos)
          }
          break
        case 'asignaciones':
          if (cargoUsuarioEditando) {
            result = await actualizarCargoUsuario(cargoUsuarioEditando.id, datos)
          } else {
            result = await asignarCargoUsuario(datos)
          }
          break
      }

      if (result.error) {
        toast.error(`Error al ${usuarioEditando || cargoEditando || horarioEditando || ticketEditando || cargoUsuarioEditando ? 'actualizar' : 'crear'} ${activeTab}: ` + result.error)
      } else {
        toast.success(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} ${usuarioEditando || cargoEditando || horarioEditando || ticketEditando || cargoUsuarioEditando ? 'actualizado' : 'creado'} correctamente`)
        setModalFormulario(false)
        // Recargar los datos de la pestaña activa
        await recargarDatosTabla()
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`)
    }

    setIsSubmitting(false)
  }

  // Función para recargar datos según la pestaña activa
  const recargarDatosTabla = async () => {
    switch (activeTab) {
      case 'usuarios':
        await cargarUsuarios()
        break
      case 'cargos':
        await cargarCargos()
        break
      case 'horarios':
        await cargarHorarios()
        break
      case 'tickets':
        await cargarTickets()
        break
      case 'asignaciones':
        await cargarCargosUsuarios()
        await cargarUsuariosSinCargo()
        break
    }
  }

  // Handler para confirmar eliminación
  const handleConfirmarEliminacion = async () => {
    if (!elementoEliminando) return

    setIsSubmitting(true)
    let result

    try {
      switch (tipoEliminando) {
        case 'usuario':
          result = await eliminarUsuario(elementoEliminando.id)
          break
        case 'cargo':
          result = await eliminarCargo(elementoEliminando.id)
          break
        case 'horario':
          result = await eliminarHorario(elementoEliminando.id)
          break
        case 'ticket':
          result = await eliminarTicket(elementoEliminando.id)
          break
        case 'asignacion':
          result = await eliminarCargoUsuario(elementoEliminando.id)
          break
      }

      if (result.error) {
        toast.error(`Error al eliminar ${tipoEliminando}: ` + result.error)
      } else {
        toast.success(`${tipoEliminando.charAt(0).toUpperCase() + tipoEliminando.slice(1)} eliminado correctamente`)
        setModalConfirmacion(false)
        setElementoEliminando(null)
        setTipoEliminando('')
        // Recargar los datos de la pestaña activa
        await recargarDatosTabla()
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`)
    }

    setIsSubmitting(false)
  }

  // Cerrar modales
  const cerrarModalFormulario = () => {
    if (!isSubmitting) {
      setModalFormulario(false)
      setUsuarioEditando(null)
      setCargoEditando(null)
      setHorarioEditando(null)
      setTicketEditando(null)
      setCargoUsuarioEditando(null)
    }
  }

  const cerrarModalConfirmacion = () => {
    if (!isSubmitting) {
      setModalConfirmacion(false)
      setElementoEliminando(null)
      setTipoEliminando('')
    }
  }

  // Renderizar formulario según la pestaña activa
  const renderFormulario = () => {
    switch (activeTab) {
      case 'usuarios':
        return (
          <FormularioUsuario
            usuario={usuarioEditando}
            onSubmit={handleSubmitFormulario}
            onCancel={cerrarModalFormulario}
            isLoading={isSubmitting}
          />
        )
      case 'cargos':
        return (
          <FormularioCargo
            cargo={cargoEditando}
            onSubmit={handleSubmitFormulario}
            onCancel={cerrarModalFormulario}
            isLoading={isSubmitting}
          />
        )
      case 'horarios':
        return (
          <FormularioHorario
            horario={horarioEditando}
            onSubmit={handleSubmitFormulario}
            onCancel={cerrarModalFormulario}
            isLoading={isSubmitting}
          />
        )
      case 'tickets':
        return (
          <FormularioTicket
            ticket={ticketEditando}
            usuarios={usuarios}
            onSubmit={handleSubmitFormulario}
            onCancel={cerrarModalFormulario}
            isLoading={isSubmitting}
          />
        )
      case 'asignaciones':
        return (
          <FormularioCargoUsuario
            cargoUsuario={cargoUsuarioEditando}
            usuarios={cargoUsuarioEditando ? usuarios : usuariosSinCargo}
            cargos={cargos}
            onSubmit={handleSubmitFormulario}
            onCancel={cerrarModalFormulario}
            isLoading={isSubmitting}
          />
        )
      default:
        return null
    }
  }

  // Renderizar tabla según la pestaña activa
  const renderTabla = () => {
    switch (activeTab) {
      case 'usuarios':
        return (
          <TablaUsuarios
            usuarios={usuarios}
            onNew={handleNuevoUsuario}
            onEdit={handleEditarUsuario}
            onDelete={handleEliminarUsuario}
            isLoading={isLoading}
          />
        )
      case 'cargos':
        return (
          <TablaCargos
            cargos={cargos}
            onNew={handleNuevoCargo}
            onEdit={handleEditarCargo}
            onDelete={handleEliminarCargo}
            isLoading={isLoading}
          />
        )
      case 'horarios':
        return (
          <TablaHorarios
            horarios={horarios}
            onNew={handleNuevoHorario}
            onEdit={handleEditarHorario}
            onDelete={handleEliminarHorario}
            isLoading={isLoading}
          />
        )
      case 'tickets':
        return (
          <TablaTickets
            tickets={tickets}
            onNew={handleNuevoTicket}
            onEdit={handleEditarTicket}
            onDelete={handleEliminarTicket}
            isLoading={isLoading}
          />
        )
      case 'asignaciones':
        return (
          <TablaCargosUsuarios
            cargosUsuarios={cargosUsuarios}
            onNew={handleNuevaAsignacion}
            onEdit={handleEditarAsignacion}
            onDelete={handleEliminarAsignacion}
            isLoading={isLoading}
          />
        )
      default:
        return null
    }
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Sistema de Gestión
          </h1>
          <p className="text-gray-600 text-lg mt-2">
            CRUD completo con Next.js 15, Supabase y shadcn/ui
          </p>
        </div>

        {/* Navegación con botones más compactos */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { id: 'usuarios', label: 'USUARIOS' },
            { id: 'cargos', label: 'CARGOS' },
            { id: 'horarios', label: 'HORARIOS' },
            { id: 'tickets', label: 'TICKETS' },
            { id: 'asignaciones', label: 'CARGOS USUARIOS' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-4 px-2 rounded-lg border-2 transition-all duration-200
                ${activeTab === tab.id
                  ? 'bg-black text-white border-black shadow-md font-bold'
                  : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50 hover:border-gray-400 font-semibold'
                }
              `}
            >
              <div className="text-center">
                <div className="text-lg tracking-wide">{tab.label}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Indicador de pestaña activa */}
        <div className="text-center">
          <span className="inline-block px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
            Mostrando: {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </span>
        </div>

        {/* Contenido de la pestaña activa */}
        <div className="mt-6">
          {renderTabla()}
        </div>
      </div>

      {/* Modal de formulario */}
      <Dialog open={modalFormulario} onOpenChange={cerrarModalFormulario}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="capitalize">
              {usuarioEditando || cargoEditando || horarioEditando || ticketEditando || cargoUsuarioEditando
                ? `Editar ${activeTab.slice(0, -1)}` 
                : `Nuevo ${activeTab.slice(0, -1)}`}
            </DialogTitle>
          </DialogHeader>
          {renderFormulario()}
        </DialogContent>
      </Dialog>

      {/* Modal de confirmación para eliminar */}
      <DialogoConfirmacion
        open={modalConfirmacion}
        onOpenChange={setModalConfirmacion}
        onConfirm={handleConfirmarEliminacion}
        title={`Eliminar ${tipoEliminando}`}
        description={
          elementoEliminando
            ? `¿Estás seguro de que deseas eliminar ${
                tipoEliminando === 'usuario' 
                  ? `a "${elementoEliminando.nombre}"` 
                  : tipoEliminando === 'cargo'
                  ? `el cargo "${elementoEliminando.cargo}"`
                  : tipoEliminando === 'horario'
                  ? `el horario de ${elementoEliminando.hora_ingreso} a ${elementoEliminando.hora_salida}`
                  : tipoEliminando === 'ticket'
                  ? `el ticket del ${elementoEliminando.fecha}`
                  : `la asignación de ${elementoEliminando.usuarios?.nombre}`
              }? Esta acción no se puede deshacer.`
            : '¿Estás seguro de que deseas realizar esta acción?'
        }
        confirmText="Eliminar"
        cancelText="Cancelar"
        isDestructive={true}
        isLoading={isSubmitting}
      />
    </main>
  )
}