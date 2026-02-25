export const prerender = false;

export async function POST({ request, cookies, redirect }) {
    try {
        const formData = await request.formData();
        const type = formData.get('type')?.toString();
        
        if (type === 'user') {
            const nombre = formData.get('nombre')?.toString().trim();
            if (nombre && nombre.length > 0) {
                cookies.set('user_name', nombre, { 
                    path: '/', 
                    maxAge: 60 * 60 * 24,
                    httpOnly: false,
                    secure: false,
                    sameSite: 'lax'
                });
                return redirect('/encuesta', 302);
            } else {
                return redirect('/?error=nombre_vacio');
            }
        }
        
        if (type === 'admin') {
            const pwd = formData.get('password')?.toString();
            if (pwd === 'admin123') {
                cookies.set('admin_auth', 'true', { 
                    path: '/', 
                    maxAge: 60 * 60 * 24,
                    httpOnly: false,
                    secure: false,
                    sameSite: 'lax'
                });
                return redirect('/admin/dashboard', 302);
            } else {
                return redirect('/?error=credenciales');
            }
        }
        
        return redirect('/?error=tipo_invalido');
        
    } catch (error) {
        console.error('Error en auth:', error);
        const errorDetails = encodeURIComponent(
            error instanceof Error ? `${error.name}: ${error.message}` : String(error)
        );
        return redirect(`/?error=servidor&details=${errorDetails}`);
    }
}
