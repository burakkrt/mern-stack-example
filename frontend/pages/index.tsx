import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)]`}
    >
      <main>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quas
          impedit quis doloribus et ipsum neque aperiam sequi expedita adipisci
          placeat nemo a illum quaerat, explicabo ad enim animi sed.
        </p>
      </main>
      <footer></footer>
    </div>
  );
}
