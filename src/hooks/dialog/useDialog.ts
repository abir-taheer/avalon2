import { useCallback, useContext } from "react";
import { DialogProps } from "@mui/material";
import {
  CloseDialogFn,
  OpenDialogFn,
  UseDialogComponent,
} from "@/types/components/Dialog";
import { DialogContext } from "@/context/auth/DialogProvider";

export const useDialog = <PropType, ReturnType>(
  DialogComponent: UseDialogComponent<PropType, ReturnType>,
  dialogProps?: Partial<Omit<DialogProps, "open" | "onClose">>
) => {
  const { popDialog, pushDialog } = useContext(DialogContext);

  const openDialog: OpenDialogFn<PropType, ReturnType> = useCallback(
    (props: PropType) => {
      return new Promise((resolve) => {
        const closeDialog: CloseDialogFn<ReturnType> = (value) => {
          popDialog();
          resolve(value);
        };

        pushDialog({
          Component: DialogComponent,
          props,
          closeDialog,
          dialogProps,
        });
      });
    },
    [pushDialog, popDialog, DialogComponent, dialogProps]
  );

  return openDialog;
};
