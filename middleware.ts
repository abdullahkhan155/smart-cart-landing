import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { userAgent } from 'next/server'

export function middleware(request: NextRequest) {
    const { device } = userAgent(request)
    const isMobile = device.type === 'mobile'

    if (isMobile) {
        // If request is coming from a mobile device, redirect to m.vexacart.shop
        const url = request.nextUrl.clone()
        url.hostname = 'm.vexacart.shop'
        url.pathname = '/' // Redirect to home page of mobile site
        url.port = '' // Clear port if any
        url.protocol = 'https'

        // Preserve any query parameters if needed, or clear.
        // Usually redirecting to home is safer for separate apps unless routes match perfectly.

        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - m. (subdomain check if configured)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
