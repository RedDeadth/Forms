export const prerender = false;

export const GET = ({ cookies, redirect }) => {
    // Elimina ambas cookies
    cookies.delete('user_name', { path: '/' });
    cookies.delete('admin_auth', { path: '/' });
    
    return redirect('/');
}
