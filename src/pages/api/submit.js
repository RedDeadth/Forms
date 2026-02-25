export const prerender = false;

import { pool } from '../../db.js';

export const POST = async ({ request, redirect }) => {
    try {
        const data = await request.formData();
        
        // Metadata
        const inspector_nombre = data.get('inspector_nombre');

        // Section 1
        const tipo_vivienda = data.get('tipo_vivienda');
        const pisos = data.get('pisos');
        const area_construccion = data.get('area_construccion');
        const sector = data.get('sector');
        const pais = data.get('pais');
        const region = data.get('region');
        const provincia = data.get('provincia');
        
        // Section 2
        const conoce_edad = data.get('conoce_edad');
        const tiene_licencia = data.get('tiene_licencia');
        const numero_licencia = data.get('numero_licencia');
        const pago_mano_obra = data.get('pago_mano_obra');
        const tiene_planos = data.get('tiene_planos');
        const autor_planos = data.get('autor_planos');
        const cuenta_asistencia = data.get('cuenta_asistencia');
        const nombre_profesional = data.get('nombre_profesional');
        
        // Section 2.3
        const danos_vivienda = data.get('danos_vivienda');
        const ubicacion_dano = data.get('ubicacion_dano');
        const tipo_dano = data.get('tipo_dano');
        
        // Section 3
        const severidad_sismo = data.get('severidad_sismo');

        const [result] = await pool.query(
            `INSERT INTO inspecciones 
            (inspector_nombre, tipo_vivienda, pisos, area_construccion, sector, pais, region, provincia, 
             conoce_edad, tiene_licencia, numero_licencia, pago_mano_obra, tiene_planos, autor_planos, cuenta_asistencia, nombre_profesional, 
             danos_vivienda, ubicacion_dano, tipo_dano, 
             severidad_sismo) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                inspector_nombre, tipo_vivienda, pisos, area_construccion, sector, pais, region, provincia,
                conoce_edad, tiene_licencia, numero_licencia, pago_mano_obra, tiene_planos, autor_planos, cuenta_asistencia, nombre_profesional,
                danos_vivienda, ubicacion_dano, tipo_dano,
                severidad_sismo
            ]
        );
        
        // Redirect a la pagina de exito
        return redirect('/gracias');
    } catch (error) {
        console.error('Error in DB Submission:', error);
        return redirect('/encuesta?error=db');
    }
}
