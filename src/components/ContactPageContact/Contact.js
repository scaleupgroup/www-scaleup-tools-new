import React, { useState } from 'react';
import Select from '../Select/Select';
import { Switch } from '@headlessui/react';
import { Listbox, Transition } from '@headlessui/react';
import ReCAPTCHA from 'react-google-recaptcha';
import Spinner from '../Spinner/Spinner';
import Link from 'next/link';
import DialogWindow from '../DialogWindow/DialogWindow';

const Contact = ({ selectedItem, options }) => {
  const [agreed, setAgreed] = useState(false);
  const [captcha, setCaptcha] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    // Check honeypot protection
    if (event.target.name[0].value || event.target.email[0].value) {
      setLoading(false);
      setResponse('Something went wrong!');
    } else if (selected.text === options[0].text) {
      setLoading(false);
      setResponse('Choose type of query, please!');
    } else if (captcha) {
      const data = {
        name: event.target.honeyfreename.value,
        email: event.target.honeyfreeemail.value,
        company: event.target.company.value,
        query: selected.text,
        message: event.target.message.value,
        captcha: captcha,
      };
      console.log(data);
      const JSONdata = JSON.stringify(data);
      const endpoint = '/api/form';
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSONdata,
      };
      const response = await fetch(endpoint, options);
      const result = { status: 'OK' };
      await response.json();
      console.log(result);
      setLoading(false);
      setResponse(result.status);
    } else {
      setLoading(false);
      setResponse('Enter captcha please!');
    }
  };

  return (
    <div id='contact'>
      <div className='max-w-7xl m-[0_auto]'>
        <form
          onSubmit={handleSubmit}
          method='POST'
          className='mx-auto max-w-4xl'
        >
          <input
            type='text'
            name='name'
            className='block w-0 h-0 m-0 p-0 border-0'
            autoComplete='off'
            aria-hidden='true'
          />
          <input
            type='email'
            name='email'
            className='block w-0 h-0 m-0 p-0 border-0'
            autoComplete='off'
            aria-hidden='true'
          />
          <div className='grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2'>
            <div className='sm:col-span-2'>
              <label
                htmlFor='name'
                className='block text-xl text-primary font-bold leading-6'
              >
                Full name <span className='text-primary text-[1.15rem]'>*</span>
              </label>
              <div className='mt-2.5'>
                <input
                  type='text'
                  name='honeyfreename'
                  id='name'
                  required
                  autoComplete='name'
                  pattern="^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF ,.'-]+(\s[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF ,.'-]+){0,2}$"
                  placeholder='Your full name'
                  className='peer block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-2 ring-inset ring-primary placeholder:text-secondary-light '
                />
                <div className='invisible text-[.85rem] h-0 pt-0 mb-0 text-red-600 peer-placeholder-shown:!invisible peer-placeholder-shown:!h-0 peer-placeholder-shown:!pt-0 peer-placeholder-shown:!mb-0 peer-invalid:visible peer-invalid:h-auto peer-invalid:pt-2 peer-invalid:mb-[-1rem]'>
                  Invalid Name
                </div>
              </div>
            </div>
            <div className='sm:col-span-2'>
              <label
                htmlFor='email'
                className='block text-xl text-primary font-bold leading-6'
              >
                Email <span className='text-primary text-[1.15rem]'>*</span>
              </label>
              <div className='mt-2.5'>
                <input
                  type='email'
                  name='honeyfreeemail'
                  id='email'
                  required
                  pattern='^[\w]{1,}[\w.+-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$'
                  autoComplete='email'
                  placeholder='example@gmail.com'
                  className='peer block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-2 ring-inset ring-primary placeholder:text-secondary-light'
                />
                <div className='invisible text-[.85rem] h-0 pt-0 mb-0 text-red-600 peer-placeholder-shown:!invisible peer-placeholder-shown:!h-0 peer-placeholder-shown:!pt-0 peer-placeholder-shown:!mb-0 peer-invalid:visible peer-invalid:h-auto peer-invalid:pt-2 peer-invalid:mb-[-1rem]'>
                  Invalid Email
                </div>
              </div>
            </div>
            <div className='sm:col-span-2'>
              <label
                htmlFor='company'
                className='block text-xl text-primary font-bold leading-6'
              >
                Company name{' '}
                <span className='text-primary text-[1.15rem]'>*</span>
              </label>
              <div className='mt-2.5'>
                <input
                  type='text'
                  name='company'
                  id='company'
                  required
                  autoComplete='organization'
                  placeholder='Your company name'
                  className='block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-2 ring-inset ring-primary placeholder:text-secondary-light'
                />
              </div>
            </div>

            <div className='sm:col-span-2'>
              <label
                htmlFor='tel'
                className='block text-xl text-primary font-bold leading-6'
              >
                Telephone/Mobile number{' '}
                <span className='text-primary text-[1.15rem]'>*</span>
              </label>
              <div className='mt-2.5'>
                <input
                  type='tel'
                  name='tel'
                  id='tel'
                  required
                  autoComplete='organization'
                  placeholder='Your telephone number'
                  className='block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-2 ring-inset ring-primary placeholder:text-secondary-light'
                />
                <div className='invisible text-[.85rem] h-0 pt-0 mb-0 text-red-600 peer-placeholder-shown:!invisible peer-placeholder-shown:!h-0 peer-placeholder-shown:!pt-0 peer-placeholder-shown:!mb-0 peer-invalid:visible peer-invalid:h-auto peer-invalid:pt-2 peer-invalid:mb-[-1rem]'>
                  Invalid Phone Number
                </div>
              </div>
            </div>

            <div className='sm:col-span-2'>
              <label
                htmlFor='type-of-qury'
                className='block text-xl text-primary font-bold leading-6'
              >
                Type of enquiry{''}
                <span className='text-primary text-[1.15rem]'> *</span>
              </label>
              <Select selected={selectedItem} options={options} required />
            </div>
            <div className='sm:col-span-2'>
              <label
                htmlFor='message'
                className='block text-xl text-primary font-bold leading-6 '
              >
                Message
              </label>
              <div className='mt-2.5'>
                <textarea
                  name='message'
                  id='message'
                  rows='4'
                  className='block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-2 ring-inset ring-primary placeholder:text-secondary-light'
                ></textarea>
              </div>
            </div>
          </div>
          <ReCAPTCHA
            className='flex justify-center mt-5'
            sitekey='6LfXoqgkAAAAALMo4wrh2X--O1Il9wL1xR2suVBr'
            onChange={(event) => setCaptcha(event)}
            onErrored={() => setCaptcha('')}
            onExpired={() => setCaptcha('')}
          />
          <div className='mt-10 flex flex-col items-center gap-5'>
            <div className='text-primary text-center pb-1 text-sm'>
              By clicking Submit you agree to our{' '}
              <Link href='/privacy'>Privacy Policy</Link>
            </div>
            {loading ? (
              <Spinner />
            ) : (
              <button
                type='submit'
                className='block  min-w-[30%] px-8 font-semibold uppercase py-2 border border-b-primary rounded text-white bg-primary hover:bg-white hover:text-primary hover:border-primary active:border-primary-dark active:text-primary-dark'
              >
                Submit
              </button>
            )}
          </div>
        </form>
        <DialogWindow response={{ response, setResponse }} />
      </div>
    </div>
  );
};

export default Contact;
