import { NavLink, Outlet } from 'react-router-dom'
import { cn } from '@/lib/utils'
import logo from '@/assets/club-heights-logo.jpg'

const navItems = [
  { to: '/', label: 'الرئيسية' },
  { to: '/generate', label: 'إنشاء' },
]

export function Layout() {
  return (
    <div className="flex min-h-svh flex-col overflow-x-clip">
      <header className="sticky top-0 z-40 border-b border-gold/20 bg-black/80 pt-[env(safe-area-inset-top)] backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-3 py-2.5 sm:h-16 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-4 sm:py-0">
          <NavLink to="/" className="group my-auto flex min-w-0 items-center gap-2.5 self-start sm:gap-3">
            <img
              src={logo}
              alt="كلوب هايتس 8"
              className="size-9 shrink-0 rounded-full ring-1 ring-gold/40 transition group-hover:ring-gold/70 sm:size-10"
            />
            <span className="font-brand truncate text-[0.65rem] font-semibold tracking-[0.22em] text-white uppercase sm:text-sm sm:tracking-[0.28em]">
              Club Heights
              <span className="ms-1 text-gold sm:ms-1.5">8</span>
            </span>
          </NavLink>

          <nav
            className="-mx-1 flex w-[calc(100%+0.5rem)] items-center gap-0.5 overflow-x-auto px-1 pb-0.5 sm:mx-0 sm:w-auto sm:overflow-visible sm:px-0 sm:pb-0"
            aria-label="القائمة الرئيسية"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'inline-flex h-9 shrink-0 items-center rounded-md px-2.5 text-sm font-medium transition-colors sm:h-8 sm:px-3 sm:text-[0.85rem]',
                    'text-muted-foreground hover:bg-accent hover:text-gold-soft',
                    isActive && 'bg-accent text-gold',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-3 py-6 sm:px-4 sm:py-10">
        <Outlet />
      </main>

      <footer className="border-t border-gold/15 px-3 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-center text-xs leading-relaxed text-muted-foreground sm:px-4 sm:py-6 sm:text-sm">
        كلوب هايتس 8 · مولد رمز QR
      </footer>
    </div>
  )
}
