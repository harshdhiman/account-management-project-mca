import React from "react";
import { Button } from "../../../relic-ui/components/base/button/button";
import { DataWaiter } from "../../../relic-ui/components/base/loader/data-waiter";
import {
  CenterContainer,
  Container,
} from "../../../relic-ui/components/misc/container";
import { CommonIcons } from "../../../relic-ui/utils/icons";
import { useCreateLicense } from "../data/license-data";

import heroImg from "./hero.svg";

export const NoLicenseView = () => {
  const licenser = useCreateLicense();

  async function onBuyClicked() {
    const id = await licenser.createLicense();
    if (id) {
      window.location.reload();
    }
  }

  return (
    <DataWaiter loading={licenser.loadingAny} error={licenser.error}>
      <Container>
        {/*  */}
        <div className="pt-8 px-8">
          <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
            <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
              <p className="tracking-loose w-full font-semibold">AccountMan</p>
              <h1 className="my-4 text-5xl font-bold leading-tight">
                The Best Accounting Software that you need!
              </h1>
              <p className="leading-normal text-2xl mb-8">
                AccountMan is a simple, easy-to-use accounting software that
                helps you manage your business finances. It is designed for
                small businesses and startups.
              </p>
              <a href="#pricing">
                <Button className="rounded-full" rightIcon="next">
                  <p className="py-2 px-2">Subscribe Now!</p>
                </Button>
              </a>
            </div>
            <div className="w-full md:w-3/5 py-6 text-center flex items-center justify-center">
              <img className="w-full md:w-4/5 z-50" src={heroImg} />
            </div>
          </div>
        </div>

        {/*  */}

        <section className="py-8" id="pricing">
          <div className="container mx-auto px-2 pt-4 pb-12 ">
            <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center ">
              Pricing
            </h2>
            <div className="w-full mb-4">
              <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center pt-12 my-12 sm:my-4">
              {/*  */}
              <div className="flex flex-col w-5/6 lg:w-1/4 mx-auto lg:mx-0 rounded-none lg:rounded-l-lg bg-primaryContainer text-onPrimaryContainer  mt-4">
                <div className="flex-1  rounded-t rounded-b-none overflow-hidden ">
                  <div className="p-8 text-3xl font-bold text-center ">
                    Basic
                  </div>
                  <ul className="w-full text-center text-sm">
                    <li className="border-b border-outline py-4">
                      Basic Functionality
                    </li>
                    <li className="border-b border-outline py-4">
                      OnTheGo Access
                    </li>
                    <li className="border-b border-outline py-4">
                      Basic Support
                    </li>
                  </ul>
                </div>
                <div className="flex-none mt-auto  rounded-b rounded-t-none overflow-hidden p-6">
                  <div className="w-full pt-6 text-3xl  font-bold text-center">
                    ₹ 999
                    <span className="text-base">for one user</span>
                  </div>
                  <div className="flex items-center justify-center my-6">
                    <Button
                      leftIcon={<CommonIcons.Money size={24} />}
                      onClick={onBuyClicked}
                      className="rounded-full"
                    >
                      Buy Now
                    </Button>
                  </div>
                </div>
              </div>
              {/*  */}
              <div className="flex flex-col w-5/6 lg:w-1/3 mx-auto lg:mx-0 rounded-3xl rounded-b-none bg-secondaryContainer text-onSecondaryContainer mt-4 sm:-mt-6  z-10">
                <div className="flex-1 rounded-t rounded-b-none overflow-hidden shadow">
                  <div className="w-full p-8 text-3xl font-bold text-center">
                    Pro
                  </div>
                  <div className="h-1 w-full gradient my-0 py-0 rounded-t"></div>
                  <ul className="w-full text-center text-base font-bold">
                    <li className="border-b border-outline py-4">Multi User</li>
                    <li className="border-b border-outline py-4">
                      Multi Accounts
                    </li>
                    <li className="border-b border-outline py-4">
                      OnTheGo Access
                    </li>
                    <li className="border-b border-outline py-4">
                      24/7 Support
                    </li>
                  </ul>
                </div>
                <div className="flex-none mt-auto  rounded-b rounded-t-none overflow-hidden shadow p-6">
                  <div className="w-full pt-6 text-4xl font-bold text-center">
                    ₹ 3000
                    <span className="text-base">/ per user</span>
                  </div>
                  <div className="flex items-center justify-center py-6">
                    <Button
                      leftIcon={<CommonIcons.Money size={24} />}
                      onClick={onBuyClicked}
                      className="rounded-full"
                    >
                      Buy Now
                    </Button>
                  </div>
                </div>
              </div>
              {/*  */}
              <div className="flex flex-col w-5/6 lg:w-1/4 mx-auto lg:mx-0 rounded-none lg:rounded-r-lg bg-primaryContainer text-onPrimaryContainer mt-4">
                <div className="flex-1   rounded-t rounded-b-none overflow-hidden ">
                  <div className="p-8 text-3xl font-bold text-center ">
                    Enterprice
                  </div>
                  <ul className="w-full text-center text-sm">
                    <li className="border-b border-outline py-4">
                      Enterprice Support
                    </li>
                    <li className="border-b border-outline py-4">
                      Unlimited Data Storage
                    </li>
                    <li className="border-b border-outline py-4">
                      Unlimited Users
                    </li>
                  </ul>
                </div>
                <div className="flex-none mt-auto  rounded-b rounded-t-none overflow-hidden p-6">
                  <div className="w-full pt-6 text-3xl  font-bold text-center">
                    ₹ 7999
                    <span className="text-base">/ per user</span>
                  </div>
                  <div className="flex items-center justify-center my-6">
                    <Button
                      leftIcon={<CommonIcons.Money size={24} />}
                      className="rounded-full"
                      onClick={onBuyClicked}
                    >
                      Buy Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*  */}

        <section className="container mx-auto text-center py-6 mb-12">
          <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-white">
            Need Help?
          </h2>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t"></div>
          </div>
          <h3 className="my-4 text-3xl leading-tight">
            We're here to help you out!, Contact us
          </h3>
          <a href="tel:+911231231231">
            <Button className="rounded-full mt-6">
              <p className="py-2 px-2">Contact Us</p>
            </Button>
          </a>
        </section>

        {/*  */}

        <section className="bg-onBackground text-background border-b py-8 flex flex-col items-center justify-center">
          <h1 className="text-xl font-semibold">AccountMan</h1>
          <p className="text-xs">All rights reserved</p>
        </section>
      </Container>
    </DataWaiter>
  );
};
