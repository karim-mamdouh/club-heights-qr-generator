import { useRef, useState, type FormEvent } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  isValidLocalPhone,
  sanitizeLocalPhone,
  toFullPhone,
  toTelUri,
} from '@/lib/phone'
import { cn } from '@/lib/utils'

const QR_RENDER_SIZE = 220

export function GeneratePage() {
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [qrValue, setQrValue] = useState('')
  const [displayPhone, setDisplayPhone] = useState('')
  const canvasWrapRef = useRef<HTMLDivElement>(null)

  function handleGenerate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!isValidLocalPhone(phone)) {
      setError('أدخل رقمًا مصريًا صالحًا من ١٠ أرقام يبدأ بـ 1، مثل 1159100996.')
      setQrValue('')
      setDisplayPhone('')
      return
    }

    const fullPhone = toFullPhone(phone)
    setError('')
    setDisplayPhone(fullPhone)
    setQrValue(toTelUri(phone))
  }

  function handleDownload() {
    const canvas = canvasWrapRef.current?.querySelector('canvas')
    if (!canvas) return

    const link = document.createElement('a')
    link.download = `club-heights-qr-${displayPhone.replace(/\D/g, '') || 'phone'}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="mx-auto w-full max-w-lg space-y-6 sm:space-y-8">
      <div className="space-y-2 text-center sm:space-y-3 sm:text-start">
        <p className="font-brand text-[0.6rem] font-semibold tracking-[0.28em] text-gold uppercase sm:text-[0.65rem] sm:tracking-[0.35em]">
          Club Heights 8
        </p>
        <h1 className="font-heading text-2xl font-semibold text-white sm:text-3xl">
          إنشاء رمز QR
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          أدخل رقم هاتف لإنشاء رمز QR قابل للمسح.
        </p>
      </div>

      <Card className="border-gold/25 bg-card/80 shadow-[0_0_40px_-20px] shadow-gold/30 ring-1 ring-gold/10">
        <form onSubmit={handleGenerate}>
          <CardHeader className="gap-1.5">
            <CardTitle className="text-sm sm:text-base">رقم الهاتف</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              أدخل الرقم المحلي فقط، مثل 1159100996 — سيُحفظ كـ ‎+201159100996‎.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">الهاتف</Label>
              <div
                dir="ltr"
                className={cn(
                  'flex h-11 items-stretch overflow-hidden rounded-lg border border-gold/25 bg-black/40 sm:h-10',
                  'focus-within:border-gold focus-within:ring-3 focus-within:ring-ring/50',
                  error &&
                  'border-destructive focus-within:border-destructive focus-within:ring-destructive/20',
                )}
              >
                <span className="flex items-center border-e border-gold/25 bg-muted/40 px-3 text-sm font-medium text-gold select-none">
                  +20
                </span>
                <Input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  pattern="[0-9]*"
                  maxLength={10}
                  placeholder="1159100996"
                  value={phone}
                  aria-invalid={Boolean(error) || undefined}
                  className="h-full rounded-none border-0 bg-transparent shadow-none focus-visible:border-transparent focus-visible:ring-0"
                  onChange={(event) => {
                    setPhone(sanitizeLocalPhone(event.target.value))
                    if (error) setError('')
                  }}
                  required
                />
              </div>
              {error ? (
                <p className="text-sm text-destructive" role="alert">
                  {error}
                </p>
              ) : null}
            </div>
          </CardContent>
          <CardFooter className="flex-col border-gold/15 bg-black/20 sm:flex-row">
            <Button
              type="submit"
              className="h-11 w-full text-base sm:h-8 sm:w-auto sm:text-sm"
            >
              إنشاء رمز QR
            </Button>
          </CardFooter>
        </form>
      </Card>

      {qrValue ? (
        <Card className="animate-brand-rise border-gold/25 bg-card/80 shadow-[0_0_40px_-20px] shadow-gold/30 ring-1 ring-gold/10">
          <CardHeader className="text-center sm:text-start">
            <CardTitle className="text-sm sm:text-base">رمز QR الخاص بك</CardTitle>
            <CardDescription className="break-all text-xs sm:text-sm">
              يشفّر{' '}
              <span className="font-medium text-gold-soft" dir="ltr">
                {displayPhone}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4 px-3 sm:px-(--card-spacing)">
            <div
              ref={canvasWrapRef}
              className="w-full max-w-[min(100%,13.75rem)] rounded-xl border border-gold/40 bg-white p-3 shadow-[0_0_30px_-10px] shadow-gold/40 sm:max-w-[15.5rem] sm:p-5"
            >
              <QRCodeCanvas
                value={qrValue}
                size={QR_RENDER_SIZE}
                level="M"
                marginSize={2}
                fgColor="#000000"
                bgColor="#FFFFFF"
                className="!h-auto !w-full"
                title={`رمز QR لـ ${displayPhone}`}
              />
            </div>
          </CardContent>
          <CardFooter className="flex-col justify-center border-gold/15 bg-black/20 sm:flex-row sm:justify-start">
            <Button
              type="button"
              variant="outline"
              className="h-11 w-full border-gold/40 text-base text-gold hover:bg-accent hover:text-gold-soft sm:h-8 sm:w-auto sm:text-sm"
              onClick={handleDownload}
            >
              <Download data-icon="inline-start" />
              تنزيل PNG
            </Button>
          </CardFooter>
        </Card>
      ) : null}
    </div>
  )
}
