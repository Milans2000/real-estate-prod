"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { NAVBAR_HEIGHT } from "@/lib/constants";
import { Button } from "./ui/button";

import { signOut } from "aws-amplify/auth";
import { Bell, MessageCircle, Plus, Search } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SidebarTrigger } from "./ui/sidebar";

import { useGetAuthUserQuery } from "@/state/api";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  /** ✅ BACKEND USER = SOURCE OF TRUTH */
  const { data: authUser, isLoading } = useGetAuthUserQuery();

  const isDashboardPage =
    pathname.startsWith("/managers") || pathname.startsWith("/tenants");

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  const handleGoToDashboard = () => {
    if (!authUser?.userRole) return;

    router.push(
      authUser.userRole.toLowerCase() === "manager"
        ? "/managers/properties"
        : "/tenants/favorites",
      { scroll: false }
    );
  };

  if (isLoading) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full z-50 shadow-xl"
      style={{ height: `${NAVBAR_HEIGHT}px` }}
    >
      <div className="flex justify-between items-center w-full py-3 px-8 bg-primary-700 text-white">
        {/* LEFT */}
        <div className="flex items-center gap-4 md:gap-6">
          {isDashboardPage && (
            <div className="md:hidden">
              <SidebarTrigger />
            </div>
          )}

          <Link href="/" scroll={false}>
            <div className="flex items-center gap-3 cursor-pointer">
              <Image
                src="/logo.svg"
                alt="Rentiful logo"
                width={24}
                height={24}
              />
              <div className="text-xl font-bold">
                RENT
                <span className="text-secondary-500 font-light">IFUL</span>
              </div>
            </div>
          </Link>

          {isDashboardPage && authUser && (
            <Button
              variant="secondary"
              className="md:ml-4 bg-primary-50 text-primary-700 hover:bg-secondary-500 hover:text-primary-50"
              onClick={() =>
                router.push(
                  authUser.userRole.toLowerCase() === "manager"
                    ? "/managers/newproperty"
                    : "/search",
                  { scroll: false }
                )
              }
            >
              {authUser.userRole.toLowerCase() === "manager" ? (
                <>
                  <Plus className="h-4 w-4" />
                  <span className="hidden md:block ml-2">
                    Add New Property
                  </span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  <span className="hidden md:block ml-2">
                    Search Properties
                  </span>
                </>
              )}
            </Button>
          )}
        </div>

        {/* CENTER */}
        {!isDashboardPage && (
          <p className="hidden md:block text-primary-200">
            Discover your perfect rental apartment with our advanced search
          </p>
        )}

        {/* RIGHT */}
        <div className="flex items-center gap-5">
          {authUser ? (
            <>
              <MessageCircle className="w-6 h-6 hidden md:block cursor-pointer text-primary-200 hover:text-primary-400" />
              <Bell className="w-6 h-6 hidden md:block cursor-pointer text-primary-200 hover:text-primary-400" />

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none">
                  <Avatar>
                    <AvatarImage src={authUser.userInfo?.image} />
                    <AvatarFallback className="bg-primary-600">
                      {authUser.userRole[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:block text-primary-200">
                    {authUser.userInfo?.name}
                  </span>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="bg-white text-primary-700">
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleGoToDashboard}
                  >
                    Go to Dashboard
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/signin">
                <Button
                  variant="outline"
                  className="text-white border-white bg-transparent hover:bg-white hover:text-primary-700"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-secondary-600 text-white hover:bg-white hover:text-primary-700">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
