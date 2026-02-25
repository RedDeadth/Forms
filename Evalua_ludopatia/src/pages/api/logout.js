export const prerender = false;

export const GET = ({ cookies, redirect }) => {
    cookies.delete('user_name', { path: '/' });
    cookies.delete('admin_auth', { path: '/' });
    
    return redirect('/');
}
