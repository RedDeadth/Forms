export const prerender = false;

import { pool } from '../../db.js';

export const POST = async ({ request, redirect }) => {
    try {
        const data = await request.formData();
        
        const encuestado_nombre = data.get('encuestado_nombre');
        const respuestas_json = data.get('respuestas_json');

        await pool.query(
            `INSERT INTO respuestas (encuestado_nombre, respuestas_json) VALUES (?, ?)`,
            [encuestado_nombre, respuestas_json]
        );
        
        return redirect('/gracias');
    } catch (error) {
        console.error('Error in DB Submission:', error);
        return redirect('/encuesta?error=db');
    }
}
