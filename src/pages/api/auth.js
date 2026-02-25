export const prerender = false;

export async function POST({ request, cookies, redirect }) {
    try {
        const formData = await request.formData();
        
        // DEBUG: Log todos los campos recibidos
        const allEntries = {};
        for (const [key, value] of formData.entries()) {
            allEntries[key] = value;
        }
        console.log('=== AUTH DEBUG ===');
        console.log('Campos recibidos:', JSON.stringify(allEntries));
        
        const type = formData.get('type')?.toString();
        console.log('Tipo detectado:', type);
        
        if (type === 'user') {
            const nombre = formData.get('nombre')?.toString().trim();
            console.log('Nombre recibido:', nombre);
            
            if (nombre && nombre.length > 0) {
                cookies.set('user_name', nombre, { 
                    path: '/', 
                    maxAge: 60 * 60 * 24,
                    httpOnly: false,
                    secure: false,
                    sameSite: 'lax'
                });
                console.log('Cookie user_name establecida, redirigiendo a /encuesta');
                return redirect('/encuesta', 302);
            } else {
                console.log('ERROR: nombre vacío o nulo');
                return redirect('/?error=nombre_vacio');
            }
        }
        
        if (type === 'admin') {
            const pwd = formData.get('password')?.toString();
            console.log('Password recibido (longitud):', pwd?.length);
            
            if (pwd === 'admin123') {
                cookies.set('admin_auth', 'true', { 
                    path: '/', 
                    maxAge: 60 * 60 * 24,
                    httpOnly: false,
                    secure: false,
                    sameSite: 'lax'
                });
                console.log('Cookie admin_auth establecida, redirigiendo a /admin/dashboard');
                return redirect('/admin/dashboard', 302);
            } else {
                console.log('ERROR: contraseña incorrecta');
                return redirect('/?error=credenciales');
            }
        }
        
        console.log('ERROR: tipo no reconocido:', type);
        return redirect('/?error=tipo_invalido&type=' + encodeURIComponent(type || 'null'));
        
    } catch (error) {
        console.error('=== ERROR COMPLETO EN AUTH ===');
        console.error(error);
        
        const errorDetails = encodeURIComponent(
            error instanceof Error ? `${error.name}: ${error.message}` : String(error)
        );
        return redirect(`/?error=servidor&details=${errorDetails}`);
    }
}
