import React from "react";
import toast from "react-hot-toast";
import { Button } from "../../relic-ui/components/base/button/button";
import { IconButton } from "../../relic-ui/components/base/button/icon-button";
import {
  InputBase,
  useInputController,
} from "../../relic-ui/components/base/input/input-base";
import {
  CenterContainer,
  Container,
  ContainerWithAutoAnimate,
} from "../../relic-ui/components/misc/container";
import { ThemeSwitcher } from "../../relic-ui/components/misc/theme-switcher";
import { useRState } from "../../relic-ui/utils/hooks/state-hook";
import { CommonIcons } from "../../relic-ui/utils/icons";
import { useAuth, useIsEmailRegistered } from "../auth-hook";

export const NoAuthContainer = () => {
  const checkEmailRegistred = useIsEmailRegistered();
  const auth = useAuth();

  const emailController = useInputController();
  // new user
  const newUserNameController = useInputController();
  const newUserPasswordController = useInputController();
  const newUserConfirmPasswordController = useInputController();
  // existing user
  const existingPasswordController = useInputController();

  const submitEmail = () => {
    if (emailController.current!.validate()) {
      checkEmailRegistred.checkEmail(emailController.current!.value);
    }
  };

  const submitNewUser = async () => {
    if (
      newUserNameController.current!.validate() &&
      newUserPasswordController.current!.validate() &&
      newUserConfirmPasswordController.current!.validate()
    ) {
      //
      auth
        .createUser(
          emailController.current!.value,
          newUserPasswordController.current!.value,
          newUserNameController.current!.value
        )
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };
  const submitExistingUser = () => {
    if (existingPasswordController.current!.validate()) {
      auth
        .signIn(
          emailController.current!.value,
          existingPasswordController.current!.value
        )
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  const signInWithGoogle = () => {
    auth.signInWithGoogle().catch((err) => {
      // toast.error(err.message);
    });
  };

  ///
  ///

  return (
    <div className="flex items-center justify-evenly flex-col h-full p-16">
      {/* UpperPart */}

      <Container className="flex items-center flex-col">
        <div className="bg-surfaceVariant rounded-2xl p-3 mb-9">
          <CommonIcons.Files size={50} />
        </div>
        <h1 className="text-4xl font-semibold">AccountMan</h1>
        <ContainerWithAutoAnimate className="flex items-center flex-col mt-4">
          {checkEmailRegistred.isRegistered !== "registred" ? (
            <>
              <p>No Account is logged in on here,</p>
              <p>so Let's get you all setup</p>{" "}
            </>
          ) : (
            <>
              <p>Welcome back</p>
              <p>Let's get you back to where you left</p>
            </>
          )}
        </ContainerWithAutoAnimate>
      </Container>

      {/* Mid */}

      <Container className="flex flex-col items-center space-y-1 mt-10 max-w-[250px] w-full">
        {/*  */}

        <InputBase
          ref={emailController}
          type="text"
          label="Email Address"
          placeholder="harsh@example.com"
          className="w-full"
          disabled={
            checkEmailRegistred.loading ||
            checkEmailRegistred.isRegistered !== null
          }
          validator={(v) => {
            if (v.length < 1) {
              return "Email is required";
            }
            if (
              !v
                .toLowerCase()
                .match(
                  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
            ) {
              return "Email is not valid";
            }
          }}
          onSubmit={submitEmail}
          rightNode={
            checkEmailRegistred.isRegistered === null && (
              <IconButton
                loading={checkEmailRegistred.loading}
                disabled={checkEmailRegistred.isRegistered !== null}
                onClick={submitEmail}
                padding="3px"
              >
                <CommonIcons.Next />
              </IconButton>
            )
          }
        />

        <ContainerWithAutoAnimate className=" w-full flex items-center flex-col">
          {checkEmailRegistred.isRegistered === null && (
            <>
              <div className="text-xs opacity-60 pb-3 pt-2">or</div>
              <Button
                onClick={signInWithGoogle}
                loading={auth.loading ? "Loading..." : undefined}
                disabled={checkEmailRegistred.loading}
                loadingSpinnerSize={30}
                width={"100%"}
                rightIcon="next"
                bgColor="white"
                textColor="black"
                className="drop-shadow-lg"
                leftIcon={<CommonIcons.Google size={30} />}
              >
                Sign in with Google
              </Button>
            </>
          )}
        </ContainerWithAutoAnimate>

        {/* More Form */}

        {/* New User */}

        <ContainerWithAutoAnimate className="w-full">
          {checkEmailRegistred.isRegistered === "not_registerd" && (
            <>
              <InputBase
                ref={newUserNameController}
                type={"text"}
                label={"Name"}
                placeholder={"eg. Harsh"}
                onSubmit={submitNewUser}
                validator={(v) => {
                  if (v.length < 4) {
                    return "Name must be atleast 4 chars";
                  }
                }}
              />
              <InputBase
                ref={newUserPasswordController}
                type={"password"}
                label={"Password"}
                placeholder={"eg. ********"}
                onSubmit={submitNewUser}
                validator={(v) => {
                  if (v.length < 8) {
                    return "Password must be atleast 8 chars";
                  }
                }}
              />
              <InputBase
                ref={newUserConfirmPasswordController}
                type={"password"}
                label={"Confirm Password"}
                placeholder={"eg. ********"}
                onSubmit={submitNewUser}
                validator={(v) => {
                  if (v !== newUserPasswordController.current?.value) {
                    return "Ehh? Passwords do not match";
                  }
                }}
              />
              <div className="mt-4 w-full">
                <Button
                  onClick={submitNewUser}
                  loading={auth.loading ? "Loading..." : undefined}
                  width={"100%"}
                  rightIcon="next"
                >
                  Create Account
                </Button>
              </div>
            </>
          )}
        </ContainerWithAutoAnimate>

        {/* Existing User */}

        <ContainerWithAutoAnimate className="w-full">
          {checkEmailRegistred.isRegistered === "registred" && (
            <InputBase
              ref={existingPasswordController}
              disabled={auth.loading}
              type={"password"}
              label={"Password"}
              validator={(v) => {
                if (v.length < 8) {
                  return "You know, This is not your password";
                }
              }}
              onSubmit={submitExistingUser}
              rightNode={
                <IconButton
                  loading={auth.loading}
                  onClick={submitExistingUser}
                  padding="3px"
                >
                  <CommonIcons.Next />
                </IconButton>
              }
            />
          )}
        </ContainerWithAutoAnimate>
      </Container>

      {/* End  */}
      <div></div>
    </div>
  );
};
