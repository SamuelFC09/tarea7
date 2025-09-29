import { supabase } from './supabase'

// Obtener todos los tickets con información de usuarios
export async function obtenerTickets() {
  try {
    const { data, error } = await supabase
      .from('tickets')
      .select(`
        *,
        usuarios (id, nombre, email)
      `)
      .order('fecha', { ascending: false })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error obteniendo tickets:', error)
    return { data: null, error: error.message }
  }
}

// Versión alternativa si la anterior no funciona
export async function obtenerTicketsSimple() {
  try {
    const { data: tickets, error } = await supabase
      .from('tickets')
      .select('*')
      .order('fecha', { ascending: false })

    if (error) throw error

    // Obtener usuarios por separado
    const { data: usuarios } = await supabase
      .from('usuarios')
      .select('id, nombre, email')

    // Combinar datos
    const ticketsConUsuarios = tickets.map(ticket => ({
      ...ticket,
      usuarios: usuarios?.find(u => u.id === ticket.id_usuario) || null
    }))

    return { data: ticketsConUsuarios, error: null }
  } catch (error) {
    console.error('Error obteniendo tickets:', error)
    return { data: null, error: error.message }
  }
}

// Crear un nuevo ticket
export async function crearTicket(ticket) {
  try {
    const { data, error } = await supabase
      .from('tickets')
      .insert([ticket])
      .select()

    if (error) throw error
    return { data: data[0], error: null }
  } catch (error) {
    console.error('Error creando ticket:', error)
    return { data: null, error: error.message }
  }
}

// Actualizar un ticket
export async function actualizarTicket(id, ticket) {
  try {
    const { data, error } = await supabase
      .from('tickets')
      .update(ticket)
      .eq('id', id)
      .select()

    if (error) throw error
    return { data: data[0], error: null }
  } catch (error) {
    console.error('Error actualizando ticket:', error)
    return { data: null, error: error.message }
  }
}

// Eliminar un ticket
export async function eliminarTicket(id) {
  try {
    const { error } = await supabase
      .from('tickets')
      .delete()
      .eq('id', id)

    if (error) throw error
    return { error: null }
  } catch (error) {
    console.error('Error eliminando ticket:', error)
    return { error: error.message }
  }
}