export const prerender = false;

import { pool } from '../../db.js';

export const POST = async ({ request, redirect }) => {
    try {
        const data = await request.formData();
        
        // Sección 1 - Evaluador
        const evaluador_nombre = data.get('evaluador_nombre');
        const fecha = data.get('fecha');
        const pais = data.get('pais');
        const region = data.get('region');
        const provincia = data.get('provincia');
        const grado_estudios_evaluador = data.get('grado_estudios_evaluador');

        // Sección 2 - Evaluado
        const sexo = data.get('sexo');
        const edad = parseInt(data.get('edad')) || 0;
        const grado_instruccion = data.get('grado_instruccion');
        const tipo_trabajo = data.get('tipo_trabajo');
        const nivel_socioeconomico = data.get('nivel_socioeconomico');

        // Sección 3/4 - Scores
        const score_conducta = parseInt(data.get('score_conducta')) || 0;
        const score_emocional = parseInt(data.get('score_emocional')) || 0;
        const score_economico = parseInt(data.get('score_economico')) || 0;
        const score_relaciones = parseInt(data.get('score_relaciones')) || 0;
        const score_control = parseInt(data.get('score_control')) || 0;
        const score_total = parseInt(data.get('score_total')) || 0;
        const nivel_riesgo = data.get('nivel_riesgo');
        const respuestas_json = data.get('respuestas_json');

        await pool.query(
            `INSERT INTO evaluaciones 
            (evaluador_nombre, fecha, pais, region, provincia, grado_estudios_evaluador,
             sexo, edad, grado_instruccion, tipo_trabajo, nivel_socioeconomico,
             score_conducta, score_emocional, score_economico, score_relaciones, score_control,
             score_total, nivel_riesgo, respuestas_json) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                evaluador_nombre, fecha, pais, region, provincia, grado_estudios_evaluador,
                sexo, edad, grado_instruccion, tipo_trabajo, nivel_socioeconomico,
                score_conducta, score_emocional, score_economico, score_relaciones, score_control,
                score_total, nivel_riesgo, respuestas_json
            ]
        );
        
        return redirect('/gracias');
    } catch (error) {
        console.error('Error in DB Submission:', error);
        return redirect('/encuesta?error=db');
    }
}
