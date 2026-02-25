import { pool } from '../../db.js';

export const POST = async ({ request, redirect }) => {
    try {
        const data = await request.formData();
        
        // Extract section 1
        const r_name = data.get('nombres');
        const r_org = data.get('organizacion');
        const r_tipo = data.get('tipo_gestion');
        const r_fecha = data.get('fecha');
        
        // Extract section 2 (sample of values)
        const v2_1 = parseFloat(data.get('v2_1')) || 0;
        const v2_2 = parseFloat(data.get('v2_2')) || 0;
        
        // Execute insertion (example logic)
        const [result] = await pool.query(
            `INSERT INTO evaluaciones (nombres, organizacion, tipo_gestion, fecha, v2_1, v2_2) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [r_name, r_org, r_tipo, r_fecha, v2_1, v2_2]
        );
        
        return redirect('/?success=true');
    } catch (error) {
        console.error('Error in DB:', error);
        return redirect('/?error=true');
    }
}
