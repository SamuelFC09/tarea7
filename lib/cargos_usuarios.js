import { supabase } from './supabase'

// Obtener todos los cargos de usuarios con información relacionada
export async function obtenerCargosUsuarios() {
  try {
    const { data, error } = await supabase
      .from('cargos_usuarios')
      .select(`
        *,
        usuarios (id, nombre, email),
        cargos (id, cargo, sueldo)
      `)
      .order('fecha_inicio', { ascending: false })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error obteniendo cargos de usuarios:', error)
    return { data: null, error: error.message }
  }
}

// Obtener usuarios disponibles para asignar cargos (versión simplificada)
export async function obtenerUsuariosSinCargo() {
  try {
    // Primero obtener todos los usuarios
    const { data: todosUsuarios, error: errorUsuarios } = await supabase
      .from('usuarios')
      .select('*')

    if (errorUsuarios) throw errorUsuarios

    // Luego obtener usuarios que ya tienen cargo activo
    const { data: usuariosConCargo, error: errorCargos } = await supabase
      .from('cargos_usuarios')
      .select('id_usuario')

    if (errorCargos) throw errorCargos

    // Filtrar usuarios que no tienen cargo asignado
    const usuariosConCargoIds = usuariosConCargo.map(item => item.id_usuario)
    const usuariosDisponibles = todosUsuarios.filter(usuario => 
      !usuariosConCargoIds.includes(usuario.id)
    )

    return { data: usuariosDisponibles, error: null }
  } catch (error) {
    console.error('Error obteniendo usuarios sin cargo:', error)
    return { data: null, error: error.message }
  }
}

// Asignar cargo a usuario
export async function asignarCargoUsuario(datos) {
  try {
    const { data, error } = await supabase
      .from('cargos_usuarios')
      .insert([datos])
      .select()

    if (error) throw error
    return { data: data[0], error: null }
  } catch (error) {
    console.error('Error asignando cargo:', error)
    return { data: null, error: error.message }
  }
}

// Actualizar cargo de usuario
export async function actualizarCargoUsuario(id, datos) {
  try {
    const { data, error } = await supabase
      .from('cargos_usuarios')
      .update(datos)
      .eq('id', id)
      .select()

    if (error) throw error
    return { data: data[0], error: null }
  } catch (error) {
    console.error('Error actualizando cargo de usuario:', error)
    return { data: null, error: error.message }
  }
}

// Eliminar asignación de cargo
export async function eliminarCargoUsuario(id) {
  try {
    const { error } = await supabase
      .from('cargos_usuarios')
      .delete()
      .eq('id', id)

    if (error) throw error
    return { error: null }
  } catch (error) {
    console.error('Error eliminando asignación de cargo:', error)
    return { error: error.message }
  }
}