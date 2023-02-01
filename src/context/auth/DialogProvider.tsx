import { DialogQueueItem } from "@/types/components/Dialog";
import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Dialog } from "@mui/material";

export type DialogContextPushDialogFn<PropType, ReturnType> = (
  dialog: DialogQueueItem<PropType, ReturnType>
) => void;

export type DialogContextType<PropType, ReturnType> = {
  queue: DialogQueueItem<PropType, ReturnType>[];
  pushDialog: DialogContextPushDialogFn<PropType, ReturnType>;
  popDialog: () => void;
};

export const DialogContextDefaultValue = {
  queue: [],
  pushDialog: () => {},
  popDialog: () => {},
};

export const DialogContext = createContext<DialogContextType<any, any>>(
  DialogContextDefaultValue
);

export type DialogContextProviderProps = {
  children: ReactNode;
};

export const DialogContextProvider = ({
  children,
}: DialogContextProviderProps) => {
  const [queue, setQueue] = useState<DialogQueueItem<any, any>[]>([]);

  const pushDialog: DialogContextPushDialogFn<unknown, unknown> = useCallback(
    (dialog) => {
      setQueue((queue) => [dialog].concat(queue));
    },
    [setQueue]
  );

  const popDialog = useCallback(() => {
    setQueue((queue) => queue.slice(1));
  }, [setQueue]);

  const value = useMemo(
    () => ({ queue, pushDialog, popDialog }),
    [queue, pushDialog, popDialog]
  );

  const currentDialogComponent = useMemo(() => {
    if (queue.length === 0) {
      return null;
    }

    const CurrentDialog = queue[0];

    return (
      <Dialog
        open
        onClose={() => CurrentDialog.closeDialog(null)}
        {...CurrentDialog.dialogProps}
      >
        <CurrentDialog.Component
          {...CurrentDialog.props}
          closeDialog={CurrentDialog.closeDialog}
        />
      </Dialog>
    );
  }, [queue]);

  return (
    <DialogContext.Provider value={value}>
      {children}
      {currentDialogComponent}
    </DialogContext.Provider>
  );
};
