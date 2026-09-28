import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import logo from '@/assets/club-heights-logo.jpg'

export function HomePage() {
  return (
    <section className="flex min-h-[calc(100svh-10.5rem)] flex-col items-center justify-center px-1 py-6 text-center sm:min-h-[calc(100svh-8.5rem)] sm:py-8">
      <img
        src={logo}
        alt="كلوب هايتس 8"
        className="animate-brand-glow mb-6 w-36 max-w-[min(55vw,14rem)] rounded-full shadow-[0_0_60px_-12px] shadow-gold/40 ring-1 ring-gold/30 sm:mb-8 sm:w-56 sm:max-w-[55vw]"
      />

      <p className="animate-brand-rise font-brand text-[0.65rem] font-semibold tracking-[0.28em] text-gold uppercase sm:text-sm sm:tracking-[0.4em]">
        Club Heights 8
      </p>

      <div className="animate-gold-line my-4 h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent sm:my-5 sm:w-24" />

      <h1 className="animate-brand-rise font-heading text-2xl font-semibold text-white sm:text-4xl [animation-delay:120ms]">
        مولد رمز QR
      </h1>

      <p className="animate-brand-rise mt-3 max-w-md px-1 text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base [animation-delay:200ms]">
        أنشئ رمز QR قابل للمسح من أي رقم هاتف — جاهز للأعضاء والضيوف وتسجيل
        الحضور.
      </p>

      <div className="animate-brand-rise mt-7 w-full max-w-xs sm:mt-8 sm:w-auto sm:max-w-none [animation-delay:280ms]">
        <Button
          size="lg"
          className="h-11 w-full text-base sm:h-9 sm:min-w-44 sm:w-auto sm:text-sm"
          render={<Link to="/generate" />}
        >
          إنشاء رمز
        </Button>
      </div>
    </section>
  )
}
