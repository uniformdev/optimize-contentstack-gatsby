import { useUniformTracker } from '@uniformdev/optimize-tracker-react';
import { graphql } from 'gatsby';
import React from 'react';
import { useState } from 'react';
import { Splitter } from './Splitter';

export const RegisterForm: React.FC<any> = ({ heading, registered_text, button_text }) => {
  const [registered, setRegistered] = useState(
    typeof document !== 'undefined' ? !!document.cookie.match(/unfrmconf_registered/) : false
  );

  const { tracker } = useUniformTracker();

  const onRegister = () => {
    document.cookie = 'unfrmconf_registered=true; path=/; samesite=lax';
    tracker.reevaluateSignals();
    setRegistered(true);
  };

  return (
    <>
      <div className="py-24">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
            <p className="uppercase tracking-loose w-full">Uniform conf</p>
            <h1 className="my-4 text-5xl font-bold leading-tight">{heading}</h1>

            <form>
              {registered ? (
                <p>{registered_text}</p>
              ) : (
                <button
                  type="button"
                  onClick={onRegister}
                  className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg"
                >
                  {button_text}
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
      <Splitter />
    </>
  );
};

export const query = graphql`
  fragment registrationForm on Contentstack_registration_form {
    title
    button_text
    registered_text
  }
`;
