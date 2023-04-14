import Button from '@components/ui/Button';
import Input from '@components/ui/Input';
import Link from 'next/link';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { IoMdLogIn } from 'react-icons/io';
import getConfig from 'next/config';

const LoginForm = () => {
  const { publicRuntimeConfig } = getConfig();
  return (
    <section className="bg-background-100">
      <div className="mx-auto flex h-screen flex-col items-center justify-center px-6 py-0">
        <div className="text mb-6 flex items-center text-4xl font-semibold">Codex</div>
        <div className="bg-background-12 mt-0 w-full max-w-md rounded-lg border p-0 shadow">
          <div className="space-y-3 p-8">
            <div className="space-y-6">
              {publicRuntimeConfig.isSignUpAvailable && (
                <>
                  <Input label="Email" type="email" name="email" placeholder="name@company.com" />
                  <Input
                    label="Password"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                  />
                  <Button fluid disabled={Boolean(process.env.NEXT_PUBLIC_PASSWORD_LOGIN_ENABLED)}>
                    Sign in
                  </Button>
                  <div className="flex w-full items-center gap-2 text-gray-300">
                    <div className="h-px w-full flex-1 bg-gray-700"></div>
                    or
                    <div className="h-px w-full flex-1 bg-gray-700"></div>
                  </div>
                  <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/auth/google/callback`}>
                    <Button
                      fluid
                      intent={'secondary'}
                      className="mt-6 flex items-center justify-center"
                    >
                      <FcGoogle size={20} className="mr-2" />
                      <div>Log in with Google</div>
                    </Button>
                  </Link>
                </>
              )}
              {process.env.NEXT_PUBLIC_JWKS_ENABLED && (
                <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/auth/jwks/callback`}>
                  <Button
                    fluid
                    intent={'secondary'}
                    className="mt-6 flex items-center justify-center"
                  >
                    <IoMdLogIn size={20} className="mr-2" />
                    <div className="w-30">Log in with {process.env.NEXT_PUBLIC_JWKS_NAME}</div>
                  </Button>
                </Link>
              )}
              {publicRuntimeConfig.isSignUpAvailable && (
                <p className="text-sm font-light text-gray-400">
                  Don’t have an account yet?
                  <a href="#" className="ml-2 font-medium text-primary-100 hover:underline">
                    Sign up
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
