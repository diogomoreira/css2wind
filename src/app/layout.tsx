import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { Fira_Code } from "next/font/google";
import { Login, House, Info } from "@/icons";
import { ClerkProvider, UserButton, currentUser } from "@clerk/nextjs";

export const firaCode = Fira_Code({
  subsets: ["latin"],
});

export const metadata = {
  title: "css2wind ̖́-",
  description: "Learn tailwind by playing!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: feels wrong to do at RootLayout and turn it async, is it the best way?
  const user = await currentUser();

  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#79CBE3",
          colorBackground: "#08080a",
          colorTextSecondary: "#a1a1aa",
          colorAlphaShade: "#fafafa",
          colorText: "#fafafa",
          colorTextOnPrimaryBackground: "#09090b",
          colorSuccess: "#4FBF85",
          colorDanger: "#E35454",
          colorWarning: "#F9F871",
          colorInputText: "#fafafa",
          colorInputBackground: "#09090b",
        },
        elements: {
          // trying to remove box shadow from clerk components
          rootBox: "bg-inherit",
          providerIcon__github: "bg-zinc-50 rounded-full",
        },
      }}
    >
      <html
        className="h-full w-full scroll-smooth pt-20 subpixel-antialiased"
        lang="en"
      >
        <body
          className={`${firaCode.className} bg-zinc-950 text-zinc-100 selection:bg-zinc-100 selection:text-zinc-900`}
        >
          <nav className="fixed top-0 flex w-full items-center justify-between border-b border-zinc-700 bg-inherit px-8 py-4 text-lg text-zinc-50">
            <Link
              href="/"
              className="flex items-center gap-4 underline-offset-4 transition-transform active:scale-95 group-hover:underline"
            >
              <Image alt="A wind vane" src="/logo.png" height={40} width={40} />
              <span className="text-2xl font-medium">css2wind</span>
            </Link>
            <ul className="flex items-center gap-10 underline-offset-4 group-hover:underline">
              <li className="border border-zinc-700 transition-all hover:border-zinc-50 active:scale-95">
                <Link
                  className="flex items-center gap-4 px-4 py-2 underline-offset-4 transition-all group-hover:underline"
                  href="/"
                >
                  <House size={24} className="fill-zinc-50" />
                  Home
                </Link>
              </li>
              <li className="group transition-all active:scale-95">
                <Link
                  href="/play"
                  className="relative flex origin-center items-center gap-4 bg-berryBlue px-4 py-2 font-bold text-zinc-950 underline-offset-4 transition-all group-hover:underline"
                >
                  Play Now
                </Link>
              </li>
              <li className="border border-zinc-700 transition-all hover:border-zinc-50 active:scale-95">
                <Link
                  className="flex items-center gap-4 px-4 py-2 underline-offset-4 transition-all group-hover:underline"
                  href="/help"
                >
                  <Info size={24} className="fill-zinc-50" />
                  Help
                </Link>
              </li>
            </ul>
            <ul className="flex items-center gap-10 underline-offset-4 group-hover:underline">
              {!user && (
                <>
                  <li className="border border-zinc-700 transition-all hover:border-zinc-50 active:scale-95">
                    <Link
                      className="flex items-center gap-4 py-2 pl-4 pr-3 underline-offset-4 transition-all group-hover:underline"
                      href="/login"
                    >
                      Login
                      <Login size={24} className="fill-zinc-50" />
                    </Link>
                  </li>
                  <li className="group transition-all active:scale-95">
                    <Link
                      className="relative flex origin-center border bg-berryBlue px-4 py-2 font-bold text-zinc-950 underline-offset-4 transition-all hover:border-zinc-50 group-hover:underline"
                      href="/signup"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
              {user && (
                <li>
                  <UserButton afterSignOutUrl="/" />
                </li>
              )}
            </ul>
          </nav>
          {children}
          <footer className="bottom-0 flex w-full items-center justify-between border-t border-zinc-700 bg-inherit px-8 py-5 text-lg">
            <ul className="flex items-center gap-10 underline-offset-4 group-hover:underline">
              <li className="group border border-zinc-50 transition-all active:scale-95">
                <a
                  href="https://github.com/LukeberryPi/css2wind"
                  className="flex items-center px-4 py-2 decoration-zinc-50 underline-offset-4 transition-all group-hover:underline"
                  target="_blank"
                >
                  GitHub
                </a>
              </li>
              <li className="group border border-twitterBlue text-twitterBlue transition-all active:scale-95">
                <a
                  href="https://twitter.com/css2wind"
                  className="flex items-center px-4 py-2 decoration-twitterBlue underline-offset-4 transition-all group-hover:underline"
                  target="_blank"
                >
                  Twitter
                </a>
              </li>
              <li className="group bg-gradient-to-r from-instagramPink via-instagramOrange to-instagramPurple p-px active:scale-95">
                <div className="h-full w-full bg-zinc-950">
                  <a
                    href="https://github.com/LukeberryPi/css2wind"
                    className="flex items-center bg-inherit bg-gradient-to-r from-instagramPink via-instagramOrange to-instagramPurple bg-clip-text px-4 py-2 text-transparent decoration-instagramPink underline-offset-4 transition-all group-hover:underline"
                    target="_blank"
                  >
                    Instagram
                  </a>
                </div>
              </li>
            </ul>
            <a
              className="border border-zinc-700 px-4 py-2 text-zinc-50 transition-all hover:border-zinc-50 active:scale-95"
              target="_blank"
              href="https://twitter.com/LukeberryPi"
            >
              ©2023 LukeberryPi
            </a>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
