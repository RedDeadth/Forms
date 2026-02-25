export const prerender = false;

import { pool } from '../../db.js';

export const POST = async ({ request, redirect }) => {
    try {
        const data = await request.formData();
        
        const encuestado_nombre = data.get('encuestado_nombre') || '';
        const institucion_educativa = data.get('institucion_educativa') || '';
        const tipo_gestion = data.get('tipo_gestion') || '';
        const fecha = data.get('fecha') || '';
        const pais = data.get('pais') || '';
        const region = data.get('region') || '';
        const provincia = data.get('provincia') || '';
        const programa_estudios = data.get('programa_estudios') || '';
        const cargo_institucion = data.get('cargo_institucion') || '';
        const anios_ensenando = parseInt(data.get('anios_ensenando') || '0', 10);
        const profesion = data.get('profesion') || '';
        const score_total = parseInt(data.get('score_total') || '0', 10);
        const nivel_docente = data.get('nivel_docente') || '';
        const respuestas_json = data.get('respuestas_json') || '{}';

        await pool.query(
            `INSERT INTO evaluaciones (
                encuestado_nombre, institucion_educativa, tipo_gestion, fecha, pais, region, provincia, 
                programa_estudios, cargo_institucion, anios_ensenando, profesion, score_total, nivel_docente, respuestas_json
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                encuestado_nombre, institucion_educativa, tipo_gestion, fecha, pais, region, provincia, 
                programa_estudios, cargo_institucion, anios_ensenando, profesion, score_total, nivel_docente, respuestas_json
            ]
        );
        
        return redirect('/gracias');
    } catch (error) {
        console.error('Error in DB Submission:', error);
        return redirect('/encuesta?error=db');
    }
}
