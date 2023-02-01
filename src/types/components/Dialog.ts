import { FunctionComponent } from "react";
import { DialogProps } from "@mui/material";

export type CloseDialogFn<ReturnType> = (value: ReturnType | null) => void;

export type UseDialogComponent<PropType, ReturnType> = FunctionComponent<
  UseDialogComponentProps<PropType, ReturnType>
>;

export type OpenDialogFn<PropType, ReturnType> = (
  props: PropType
) => Promise<ReturnType | null>;

export type UseDialogComponentProps<PropType, ReturnType> = {
  closeDialog: CloseDialogFn<ReturnType>;
} & PropType;

export type DialogQueueItem<PropType, ReturnType> = {
  Component: UseDialogComponent<PropType, ReturnType>;
  props: PropType;
  closeDialog: CloseDialogFn<ReturnType>;
  dialogProps?: Partial<Omit<DialogProps, "open" | "onClose">>;
};
