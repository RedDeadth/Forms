export const prerender = false;

import { pool } from '../../db.js';

export const POST = async ({ request, redirect }) => {
    try {
        const data = await request.formData();
        
        // Section 1
        const inspector_nombre = data.get('inspector_nombre');
        const tipo_vivienda = data.get('tipo_vivienda');
        const pisos = data.get('pisos');
        const area_construccion = data.get('area_construccion');
        const sector = data.get('sector');
        const pais = data.get('pais');
        const region = data.get('region');
        const provincia = data.get('provincia');
        const grado_estudios = data.get('grado_estudios');
        const zona_construccion = data.get('zona_construccion');

        // Section 2 - Scores
        const score_electrico = parseInt(data.get('score_electrico')) || 0;
        const score_incendio = parseInt(data.get('score_incendio')) || 0;
        const score_caidas = parseInt(data.get('score_caidas')) || 0;
        const score_humedad = parseInt(data.get('score_humedad')) || 0;
        const score_estructural = parseInt(data.get('score_estructural')) || 0;
        const score_salud = parseInt(data.get('score_salud')) || 0;
        const score_infantil = parseInt(data.get('score_infantil')) || 0;
        const score_total = parseInt(data.get('score_total')) || 0;
        const nivel_riesgo = data.get('nivel_riesgo');
        const respuestas_json = data.get('respuestas_json');

        const [result] = await pool.query(
            `INSERT INTO inspecciones 
            (inspector_nombre, tipo_vivienda, pisos, area_construccion, sector, pais, region, provincia, grado_estudios, zona_construccion,
             score_electrico, score_incendio, score_caidas, score_humedad, score_estructural, score_salud, score_infantil,
             score_total, nivel_riesgo, respuestas_json) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                inspector_nombre, tipo_vivienda, pisos, area_construccion, sector, pais, region, provincia, grado_estudios, zona_construccion,
                score_electrico, score_incendio, score_caidas, score_humedad, score_estructural, score_salud, score_infantil,
                score_total, nivel_riesgo, respuestas_json
            ]
        );
        
        return redirect('/gracias');
    } catch (error) {
        console.error('Error in DB Submission:', error);
        return redirect('/encuesta?error=db');
    }
}
