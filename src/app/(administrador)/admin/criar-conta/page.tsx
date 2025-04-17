'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { z } from 'zod'

import { Button } from '@/components/Button'
import { AdminContext } from '@/contexts/AdminContext'
// import { AuthContext } from "@/contexts/AuthContex";
// import ReCAPTCHA from 'react-google-recaptcha'

const schema = z.object({
  email: z.string().email('Digite um email válido'),
  password: z.string().min(1, 'Digite a senha de acesso'),
})

type schemaLoginProps = z.infer<typeof schema>

export default function CriarConta() {
  const { setTitleHeader } = useContext(AdminContext)
  // const { signIn, isAuthenticated } = useContext(AuthContext);

  // const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  // const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)
  // const [recaptchaKey, setRecaptchaKey] = useState<number>(0) // Variável para recriar o reCAPTCHA

  // const handleRecaptchaChange = (value: string | null) => {
  //   // Esta função será chamada quando o usuário completar o reCAPTCHA com sucesso.
  //   setRecaptchaValue(value)
  // }

  const {
    register,
    // reset,
    formState: { errors },
  } = useForm<schemaLoginProps>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    setTitleHeader('Criar conta')
  }, [setTitleHeader])

  // async function handleLogin(data: schemaLoginProps) {
  //   setIsSubmitting(true)

  //   // if (recaptchaValue === null) {
  //   //   toast.error('Preencha o re-captcha.')
  //   //   setIsSubmitting(false)
  //   //   return
  //   // }

  //   const fnSignIn = await signIn(data)

  //   // Incrementa a chave do reCAPTCHA para recriá-lo
  //   setRecaptchaKey(recaptchaKey + 1)

  //   setIsSubmitting(false)

  //   if (fnSignIn) {
  //     reset()
  //     router.push('/admin/projetos')
  //   }
  // }

  return (
    <section className="w-full flex justify-center items-center min-h-[calc(100vh-95.83px)]">
      <div className="w-full max-w-screen-xl px-4 xl:px-0 py-4 lg:py-20 flex justify-center">
        <form
          className="w-full flex flex-col gap-16 items-center"
          // onSubmit={handleSubmit(handleLogin)}
        >
          <div className="w-full flex flex-col gap-4 max-w-screen-md">
            <div className="flex flex-col gap-2">
              <label
                className="cursor-pointer font-bold text-xl"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                {...register('email')}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Email de acesso"
              />
              {errors.email && (
                <p className="text-red-500 text-center md:text-left">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="cursor-pointer font-bold text-xl"
                htmlFor="password"
              >
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  {...register('password')}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Senha de acesso"
                />
                {showPassword ? (
                  <FaRegEyeSlash
                    size={20}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute cursor-pointer right-4 top-0 translate-y-1/2 text-secondary"
                  />
                ) : (
                  <FaRegEye
                    size={20}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute cursor-pointer right-4 bottom-[30%] text-secondary"
                  />
                )}
              </div>
              {errors.password && (
                <p className="text-red-500 text-center md:text-left">
                  {errors.password.message}
                </p>
              )}
            </div>
            {/* <ReCAPTCHA
                key={recaptchaKey}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.toString() || ''}
                onChange={handleRecaptchaChange}
                className="max-w-[300px]"
              /> */}
            <Button type="submit" variant="primary" title="Entrar" />
          </div>
        </form>
      </div>
    </section>
  )
}
