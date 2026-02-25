export const prerender = false;

import { pool } from '../../db.js';

export const POST = async ({ request, redirect }) => {
    try {
        const data = await request.formData();
        
        // Datos personales
        const nombres = data.get('nombres') || null;
        const apellidos = data.get('apellidos') || null;
        const correo = data.get('correo') || null;
        const whatsapp = data.get('whatsapp') || null;
        const semestre = data.get('semestre') || null;
        const programa_estudios = data.get('programa_estudios') || null;
        const universidad = data.get('universidad') || null;
        const pais = data.get('pais') || null;
        const region = data.get('region') || null;
        const provincia = data.get('provincia') || null;

        // Respuestas
        const q = [];
        for (let i = 1; i <= 23; i++) {
            q[i] = parseInt(data.get(`q${i}`)) || 0;
        }

        // Scores
        const score_cognitiva = parseInt(data.get('score_cognitiva')) || 0;
        const score_sobreconfianza = parseInt(data.get('score_sobreconfianza')) || 0;
        const score_sustitucion = parseInt(data.get('score_sustitucion')) || 0;
        const score_compulsivo = parseInt(data.get('score_compulsivo')) || 0;
        const score_etico = parseInt(data.get('score_etico')) || 0;
        const score_total = parseInt(data.get('score_total')) || 0;

        // Resultados
        const nivel_dependencia = data.get('nivel_dependencia') || null;
        const diagnostico = data.get('diagnostico') || null;
        const idia_porcentaje = parseFloat(data.get('idia_porcentaje')) || 0;
        const idia_nivel = data.get('idia_nivel') || null;

        await pool.query(
            `INSERT INTO evaluaciones_ia (
                nombres, apellidos, correo, whatsapp, semestre, programa_estudios, universidad, pais, region, provincia,
                q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18, q19, q20, q21, q22, q23,
                score_cognitiva, score_sobreconfianza, score_sustitucion, score_compulsivo, score_etico, score_total,
                nivel_dependencia, diagnostico, idia_porcentaje, idia_nivel
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
                      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
                      ?, ?, ?, ?, ?, ?,
                      ?, ?, ?, ?)`,
            [
                nombres, apellidos, correo, whatsapp, semestre, programa_estudios, universidad, pais, region, provincia,
                q[1], q[2], q[3], q[4], q[5], q[6], q[7], q[8], q[9], q[10], q[11], q[12], q[13], q[14], q[15], q[16], q[17], q[18], q[19], q[20], q[21], q[22], q[23],
                score_cognitiva, score_sobreconfianza, score_sustitucion, score_compulsivo, score_etico, score_total,
                nivel_dependencia, diagnostico, idia_porcentaje, idia_nivel
            ]
        );
        
        return redirect('/gracias');
    } catch (error) {
        console.error('Error in DB Submission:', error);
        return redirect('/encuesta?error=db');
    }
}
