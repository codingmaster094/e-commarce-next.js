import { NextResponse } from 'next/server'
import  { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
    let cookie = request.cookies.get('fmljwt')?.value
    const loggedINuserNotacesspaths = request.nextUrl.pathname == "/login" || request.nextUrl.pathname == "/register" 
    if(loggedINuserNotacesspaths){
        if(cookie){
            return NextResponse.redirect(new URL('/', request.url))
        }
    }else{
        if(!cookie){
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/login', 
        '/register', 
        '/Men_woman_products/:path*', 
        '/MyOrder/:path*',
        '/forgetpassword/:path*',
        '/MyOrder/:path*',
        '/Order_place/:path*',
        '/passwordchange/:path*',
        '/productlist/:path*',
        '/reset-password/:path*',
    ],
  }