import Button from '@components/ui/Button';
import Input from '@components/ui/Input';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const LoginForm = () => {
  return (
    <section className="bg-background">
      <div className="flex flex-col items-center justify-center px-6 mx-auto h-screen py-0">
        <div className="flex items-center mb-6 text-4xl font-semibold text-black">Codex</div>
        <div className="w-full rounded-lg shadow border mt-0 max-w-md p-0 bg-white">
          <div className="space-y-3 p-8">
            <form className="space-y-6">
              <Input label="Email" type="email" name="email" placeholder="name@company.com" />
              <Input
                label="Password"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
              />
              <Button fluid>Sign in</Button>
              <div className="w-full flex items-center gap-2 text-gray-300">
                <div className="w-full flex-1 h-px bg-gray-700"></div>
                or
                <div className="w-full flex-1 h-px bg-gray-700"></div>
              </div>
              <Button fluid intent={'secondary'} className="flex items-center justify-center">
                <FcGoogle size={20} className="mr-2" />
                <div>Log in with Google</div>
              </Button>
              <p className="text-sm font-light text-gray-400">
                Don’t have an account yet?
                <a href="#" className="ml-2 font-medium hover:underline text-primary-100">
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
