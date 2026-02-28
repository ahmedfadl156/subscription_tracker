import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose"; 

export async function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isDashboardRoute = path.startsWith('/dashboard');
    const isAdminRoute = path.startsWith('/admin');

    // هنا بجيب التوكن من الكوكيز
    const token = request.cookies.get('subtracker_jwt')?.value;

    // 1. لو المسار محمي (داشبورد أو أدمن) ومفيش توكن أصلاً
    if ((isDashboardRoute || isAdminRoute) && !token) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    // 2. لو في توكن واليوزر بيحاول يدخل مسار محمي
    if (token && (isDashboardRoute || isAdminRoute)) {
        try {
            // بجيب هنا السيكريت نفس اللى استعملته فى الباك اند عشان يبقى الموضوع امن وفك التشفير صح
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            const { payload } = await jwtVerify(token, secret);

            // 3. فحص صلاحيات الأدمن لو المسار يبدأ بـ /admin
            if (isAdminRoute) {
                if (payload.role !== 'admin') {
                    // التوكن سليم بس ده يوزر عادي، نرجعه الرئيسية
                    return NextResponse.redirect(new URL('/', request.url));
                }
            }

            // لو كل حاجة تمام (يوزر رايح للداشبورد أو أدمن رايح للأدمن)
            return NextResponse.next();

        } catch (error) {
            // هنا لو حد لعب فى التوكن او التوكن اصلا انتهى بيعمل ايرور
            console.error("Invalid or Tampered Token:", error);
            
            // نمسح الكوكي المضروب ونحوله لصفحة تسجيل الدخول
            const response = NextResponse.redirect(new URL('/sign-in', request.url));
            response.cookies.delete('subtracker_jwt');
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/admin/:path*'],
}