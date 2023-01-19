import { css } from "@emotion/react";
import chroma from "chroma-js";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { Button } from "../../relic-ui/components/base/button/button";
import { IconButton } from "../../relic-ui/components/base/button/icon-button";
import {
  InputBase,
  useInputController,
} from "../../relic-ui/components/base/input/input-base";
import { DataWaiter } from "../../relic-ui/components/base/loader/data-waiter";
import {
  CenterContainer,
  ContainerWithAutoAnimate,
} from "../../relic-ui/components/misc/container";
import { getAppColors } from "../../relic-ui/theme/theme";
import { useRTheme } from "../../relic-ui/theme/theme.hooks";
import { CommonIcons } from "../../relic-ui/utils/icons";
import { currentAccountBook, useAccountBooks } from "./data/account-book";

export const AccountBookProvider = (props: { children: React.ReactNode }) => {
  const accountBooks = useAccountBooks();
  const [accountBook, setAccountBook] = useAtom(currentAccountBook);

  const [showCreateAccountInput, setShowCreateAccountInput] = useState(false);

  const firstBookNameController = useInputController();

  const [addedAccountBook, setAddedAccountBook] = useState<string | undefined>(
    undefined
  );

  async function onFirstBookNameClick() {
    if (firstBookNameController.current!.validate()) {
      //
      const id = await accountBooks.add({
        name: firstBookNameController.current!.value,
        createdAt: new Date(),
      });
      setShowCreateAccountInput(false);
      setAddedAccountBook(id);
    }
  }

  useEffect(() => {
    if (addedAccountBook) {
      setAccountBook(
        accountBooks.data!.find((ab) => ab.id === addedAccountBook)
      );
    }
    // if (accountBooks.data && accountBooks.data.length === 1) {
    //   setAccountBook(accountBooks.data[0]);
    // }
  }, [addedAccountBook, accountBooks.data]);

  const hasAnyAccountBook = (accountBooks.data?.length ?? 0) > 0;
  useRTheme();
  return (
    <DataWaiter
      loading={accountBooks.loading === "loadLoading"}
      error={accountBooks.error}
    >
      {hasAnyAccountBook ? (
        accountBook ? (
          <>{props.children}</>
        ) : (
          <CenterContainer>
            <h1>Choose an account book</h1>
            <div className="flex flex-wrap items-center pt-4 select-none">
              {accountBooks.data!.map((book) => (
                <div
                  css={css`
                    background-color: ${chroma(
                      getAppColors().secondaryContainer
                    )
                      .alpha(0.8)
                      .css()};
                    &:hover {
                      background-color: ${chroma(
                        getAppColors().secondaryContainer
                      )
                        .alpha(0.9)
                        .css()};
                    }
                  `}
                  onClick={() => setAccountBook(book)}
                  key={book.id}
                  className="flex items-center justify-center w-32 h-32 m-2 rounded-2xl   cursor-pointer
                    p-4  overflow-ellipsis transition-all text-onSecondaryContainer
                  "
                >
                  <span className="truncate text-center w-32">{book.name}</span>
                </div>
              ))}
            </div>
            <div className="pt-10">
              <ContainerWithAutoAnimate>
                {showCreateAccountInput ? (
                  <div className="w-full min-w-[300px] max-w-[300px] pt-4">
                    <InputBase
                      ref={firstBookNameController}
                      placeholder="eg. Main Account Book"
                      label="Account Book Name"
                      disabled={accountBooks.loadingAny}
                      validator={(v) => {
                        if (v.length < 3) {
                          return "Name must be at least 3 characters long";
                        }
                      }}
                      onSubmit={onFirstBookNameClick}
                      rightNode={
                        <IconButton
                          padding="3px"
                          loading={accountBooks.loadingAny}
                          onClick={onFirstBookNameClick}
                        >
                          <CommonIcons.Next />
                        </IconButton>
                      }
                    />
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      setShowCreateAccountInput(true);
                    }}
                    leftIcon="add"
                  >
                    Create New Account Book
                  </Button>
                )}
              </ContainerWithAutoAnimate>
            </div>
          </CenterContainer>
        )
      ) : (
        // This is the first account book creation screen
        <CenterContainer>
          <h1>Enter a name for your First Account Book</h1>
          <div className="w-full max-w-[300px] pt-4">
            <InputBase
              ref={firstBookNameController}
              placeholder="eg. Main Account Book"
              label="Account Book Name"
              disabled={accountBooks.loadingAny}
              validator={(v) => {
                if (v.length < 3) {
                  return "Name must be at least 3 characters long";
                }
              }}
              onSubmit={onFirstBookNameClick}
              rightNode={
                <IconButton
                  padding="3px"
                  loading={accountBooks.loadingAny}
                  onClick={onFirstBookNameClick}
                >
                  <CommonIcons.Next />
                </IconButton>
              }
            />
          </div>
        </CenterContainer>
      )}
    </DataWaiter>
  );
};
