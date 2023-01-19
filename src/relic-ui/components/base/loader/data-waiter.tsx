import React from "react";
import {
  CenterContainer,
  ContainerWithAutoAnimate,
} from "../../misc/container";
import { ErrorContainer } from "../../misc/error-container";
import { GifLoader } from "./gif-loader";

export const DataWaiter = (props: {
  children: React.ReactNode;
  loading?: boolean;
  error?: string;
  doNotCenter?: boolean;
  dataObject?: {
    loading?: boolean;
    error?: string;
  };
}) => {
  const loadingContent = (
    <>
      {props.doNotCenter ? (
        <GifLoader />
      ) : (
        <CenterContainer>
          <GifLoader />
        </CenterContainer>
      )}
    </>
  );

  const errorContent = (
    <>
      {props.doNotCenter ? (
        <ErrorContainer error={props.error ?? props.dataObject?.error} />
      ) : (
        <CenterContainer>
          <ErrorContainer error={props.error ?? props.dataObject?.error} />
        </CenterContainer>
      )}
    </>
  );

  return (
    <ContainerWithAutoAnimate className="h-full">
      {props.loading ?? props.dataObject?.loading
        ? loadingContent
        : props.error ?? props.dataObject?.error
        ? errorContent
        : props.children}
    </ContainerWithAutoAnimate>
  );
};
